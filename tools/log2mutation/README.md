# graphql-ssh/tools/log2mutation

ssh のログファイルから、GraphQL サーバへ mutation を発行するツール

テキスト形式および bz2 圧縮されたファイルに対応
`-follow` で監視し、追記された行の mutation を発行

```bash
Usage of log2mutation:
  -follow
        like tail -F
  -graphqlHost string
        graphql host (default "http://localhost:4000/graphql")
  -logFile string
        log file path (default "/var/log/auth.log")
  -logType string
        mutaion logType (default "main_sshd4")
  -thread int
        parallel thread (default 2)
```

## insertDummy.js

/var/log/auth.log に 3 秒ごとにダミーログを挿入
