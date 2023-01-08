package main

import (
	"bufio"
	"compress/bzip2"
	"context"
	"flag"
	"fmt"
	"os"
	"regexp"
	"sync"

	"github.com/machinebox/graphql"
	"github.com/nxadm/tail"
)

func main() {
	// コマンドオプションの定義とデフォルト値の指定
	var (
		logFile     = flag.String("logFile", "/var/log/auth.log", "log file path")
		logType     = flag.String("logType", "main_sshd4", "mutaion logType")
		graphqlHost = flag.String("graphqlHost", "http://localhost:4000/graphql", "graphql host")
		thread      = flag.Int("thread", 2, "parallel thread")
		follow      = flag.Bool("follow", false, "like tail -F")
	)
	flag.Parse()

	if *follow {
		tail2muration(*logFile, *logType, *graphqlHost, *thread)
	} else {
		file2mutation(*logFile, *logType, *graphqlHost, *thread)
	}
}

func file2mutation(logFile string, logType string, graphqlHost string, thread int) {
	// file開く
	file, err := os.Open(logFile)
	if err != nil {
		fmt.Println(err)
	}

	var scanner *bufio.Scanner
	if regexp.MustCompile(`\.bz2$`).Match([]byte(logFile)) {
		// bz2の場合展開
		scanner = bufio.NewScanner(bzip2.NewReader(file))
	} else {
		scanner = bufio.NewScanner(file)
	}

	// 同時実行数の制限用(多すぎるとサーバのsocketファイルディスクリプタの上限になる)
	slots := make(chan struct{}, thread)
	var wg sync.WaitGroup

	// 1行ごとにMutation
	for scanner.Scan() {
		wg.Add(1)
		slots <- struct{}{}
		go mutation(scanner.Text(), logType, graphqlHost, &wg, slots)
	}

	// 全行終わるのを待つ
	wg.Wait()

	if err := scanner.Err(); err != nil {
		fmt.Println(err)
	}

	file.Close()
}

func tail2muration(logFile string, logType string, graphqlHost string, thread int) {
	// logFileをtailで読み込み
	t, err := tail.TailFile(logFile, tail.Config{Follow: true, ReOpen: true, Poll: true})
	if err != nil {
		fmt.Println(err)
	}

	// 同時実行数の制限用(多すぎるとサーバのsocketファイルディスクリプタの上限になる)
	slots := make(chan struct{}, thread)

	// 1行ごとにMutation
	for line := range t.Lines {
		slots <- struct{}{}
		go mutation(line.Text, logType, graphqlHost, nil, slots)
	}
}

func grep(logLine string, logType string) bool {
	// 正規表現の定義
	var regex string
	switch logType {
	case "general":
		regex = `sshd\[[0-9].+\]: (Failed|Accepted) password`
	case "main_sshd3":
		regex = `sshd3\[[0-9].+\]: (Fail|Success),`
	case "main_sshd4":
		regex = `sshd4\[[0-9].+\] (Fail|Success)`
	case "honeyPot_sshd2":
		regex = `sshd[[0-9].+?\]: .+\]KEXINIT:`
	case "honeyPot_sshd3_1":
		regex = `sshd3\[[0-9].+?\]: (Fail|Success),`
	case "honeyPot_sshd3_2":
		regex = `sshd3\[[0-9].+?\]: (Fail|Success),`
	case "honeyPot_sshd3_3":
		regex = `sshd3\[[0-9].+?\]: .+\]KEXINIT:`
	case "honeyPot_sshd4":
		regex = `sshd4\[[0-9].+?\]: (Fail|Success),`
	default:
		return true
	}

	return regexp.MustCompile(regex).Match([]byte(logLine))
}

func mutation(logLine string, logType string, graphqlHost string, wg *sync.WaitGroup, slots chan struct{}) {
	if slots != nil {
		defer func() {
			<-slots
			if wg != nil {
				wg.Done()
			}
		}()
	}

	// 正規表現にマッチしなければスキップ
	if grep(logLine, logType) == false {
		return
	}

	client := graphql.NewClient(graphqlHost)

	// クエリの作成
	req := graphql.NewRequest(`
	mutation($logLine: String!, $logType: LogType!){
		addDB(logLine: $logLine, logType: $logType) {
	  	unixtime
		}
	}
	`)

	// 変数への値の流し込み
	req.Var("logLine", logLine)
	req.Var("logType", logType)

	// httpヘッダ
	req.Header.Set("Cache-Control", "no-cache")
	ctx := context.Background()

	// HTTPリクエストの送信
	var respData map[string]interface{}
	if err := client.Run(ctx, req, &respData); err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(respData)
	}
}
