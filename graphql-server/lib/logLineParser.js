import dayjs from 'dayjs';
import 'dayjs/locale/ja.js';
dayjs.locale('ja');

// sshdごとに共通の定義
const _SSHDPROPS = {
  sshd4: [
    { prop: 'result', func: (v) => v },
    { prop: 'user', func: (v) => decodeHex(v) },
    { prop: 'password', func: (v) => decodeHex(v) },
    { prop: 'ip', func: (v) => v },
    { prop: 'port', func: (v) => Number(v) },
    { prop: 'authtime', func: (v) => Number(v) },
    { prop: 'detect', func: (v) => v },
    { prop: 'rtt', func: (v) => Number(v) },
    { prop: 'unixtime', func: (v) => Number(v) },
    { prop: 'usec', func: (v) => Number(v) },
    { prop: 'kex', func: (v) => Number(v) },
    { prop: 'newkey', func: (v) => Number(v) },
  ],
  sshd3: [
    { prop: 'result', func: (v) => v },
    { prop: 'user', func: (v) => decodeHex(v) },
    { prop: 'password', func: (v) => decodeHex(v) },
    { prop: 'ip', func: (v) => v },
    { prop: 'authtime', func: (v) => Number(v) },
    { prop: 'detect', func: (v) => v },
    { prop: 'rtt', func: (v) => Number(v) },
    { prop: 'unixtime', func: (v) => Number(v) },
    { prop: 'usec', func: (v) => Number(v) },
    { prop: 'kex', func: (v) => Number(v) },
    { prop: 'newkey', func: (v) => Number(v) },
  ],
  sshd2: [
    { prop: 'result', func: (v) => v.split(':')[1] },
    { prop: 'user', func: (v) => v.split(':')[1] },
    { prop: 'ip', func: (v) => v.split(':')[1] },
    { prop: 'authtime', func: (v) => Number(v.split(':')[1]) },
    { prop: 'detect', func: (v) => v.split(':')[1] },
    { prop: 'rtt', func: (v) => Number(v.split(':')[1]) },
    { prop: '_Year', func: (v) => v.split(':')[1] },
    { prop: '_Month', func: (v) => v.split(':')[1] },
    { prop: '_Day', func: (v) => v.split(':')[1] },
    { prop: '_Hour', func: (v) => v.split(':')[1] },
    { prop: '_Minute', func: (v) => v.split(':')[1] },
    { prop: '_Second', func: (v) => v.split(':')[1] },
    { prop: 'usec', func: (v) => v.split(':')[1] },
    { prop: 'kex', func: (v) => Number(v.split(':')[1]) },
    { prop: 'newkey', func: (v) => Number(v.split(':')[1]) },
  ],
  sshd3_1: [
    { prop: 'result', func: (v) => v },
    { prop: 'user', func: (v) => v },
    { prop: 'ip', func: (v) => v },
    { prop: 'authtime', func: (v) => Number(v) },
    { prop: 'detect', func: (v) => v },
    { prop: 'rtt', func: (v) => Number(v) },
    { prop: '_Year', func: (v) => Number(v) },
    { prop: '_Month', func: (v) => Number(v) },
    { prop: '_Day', func: (v) => Number(v) },
    { prop: '_Hour', func: (v) => Number(v) },
    { prop: '_Minute', func: (v) => Number(v) },
    { prop: '_Second', func: (v) => Number(v) },
    { prop: 'usec', func: (v) => Number(v) },
    { prop: 'kex', func: (v) => Number(v) },
    { prop: 'newkey', func: (v) => Number(v) },
  ],

  sshd3_2: [
    { prop: 'result', func: (v) => v },
    { prop: 'user', func: (v) => decodeHex(v) },
    { prop: 'password', func: (v) => decodeHex(v) },
    { prop: 'ip', func: (v) => v },
    { prop: 'authtime', func: (v) => Number(v) },
    { prop: 'detect', func: (v) => v },
    { prop: 'rtt', func: (v) => Number(v) },
    { prop: 'unixtime', func: (v) => Number(v) },
    { prop: 'usec', func: (v) => Number(v) },
    { prop: 'kex', func: (v) => Number(v) },
    { prop: 'newkey', func: (v) => Number(v) },
  ],

  sshd3_3: [
    { prop: 'result', func: (v) => v.split(':')[1] },
    { prop: 'user', func: (v) => v.split(':')[1] },
    { prop: 'ip', func: (v) => v.split(':')[1] },
    { prop: 'authtime', func: (v) => Number(v.split(':')[1]) },
    { prop: 'detect', func: (v) => v.split(':')[1] },
    { prop: 'rtt', func: (v) => Number(v.split(':')[1]) },
    { prop: '_Year', func: (v) => v.split(':')[1] },
    { prop: '_Month', func: (v) => v.split(':')[1] },
    { prop: '_Day', func: (v) => v.split(':')[1] },
    { prop: '_Hour', func: (v) => v.split(':')[1] },
    { prop: '_Minute', func: (v) => v.split(':')[1] },
    { prop: '_Second', func: (v) => v.split(':')[1] },
    { prop: 'usec', func: (v) => v.split(':')[1] },
    { prop: 'kex', func: (v) => Number(v.split(':')[1]) },
    { prop: 'newkey', func: (v) => Number(v.split(':')[1]) },
  ],
};

// プロパティ名と型変換の定義
const PROPS = {
  general: {
    toArr: (logLine) =>
      logLine.replace(/password for (invalid user )?/, '').split(/ +/),
    props: [
      { prop: '_month', func: (v) => v },
      { prop: '_day', func: (v) => v },
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      { prop: 'result', func: (v) => v },
      { prop: 'user', func: (v) => v },
      { prop: '_from', func: (v) => v },
      { prop: 'ip', func: (v) => v },
      { prop: '_port', func: (v) => v },
      { prop: 'port', func: (v) => Number(v) },
      { prop: '_ssh2', func: (v) => v },
    ],
    finalize: (logLineObj) => ({
      ...logLineObj,
      unixtime: dayjs(
        `${logLineObj._month} ${logLineObj._day} ${logLineObj._time}`
      ).unix(),
      usec: 0,
    }),
  },
  main_sshd4: {
    toArr: (logLine) => logLine.split(/ +|,/),
    props: [
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd4,
    ],
    finalize: (logLineObj) => logLineObj,
  },
  main_sshd3: {
    toArr: (logLine) => logLine.split(/ +|,/),
    props: [
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd3,
    ],
    finalize: (logLineObj) => logLineObj,
  },
  honeyPot_sshd4: {
    toArr: (logLine) => logLine.split(/ +|,/),
    props: [
      { prop: '_month', func: (v) => v },
      { prop: '_day', func: (v) => v },
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd4,
      { prop: '_preauth', func: (v) => v },
    ],
    finalize: (logLineObj) => logLineObj,
  },
  honeyPot_sshd2: {
    toArr: (logLine) => logLine.split(/: \[|\](?=KEXINIT)| +|,/),
    props: [
      { prop: '_month', func: (v) => v },
      { prop: '_day', func: (v) => v },
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd2,
      { prop: '_preauth', func: (v) => v },
    ],
    finalize: (logLineObj) => ({
      ...logLineObj,
      unixtime: Math.trunc(
        new Date(
          `${logLineObj._Year}/${logLineObj._Month}/${logLineObj._Day} ${logLineObj._Hour}:${logLineObj._Minute}:${logLineObj._Second}`
        ).getTime() / 1000
      ),
    }),
  },

  honeyPot_sshd3_1: {
    toArr: (logLine) => logLine.split(/ +|: |,/),
    props: [
      { prop: '_month', func: (v) => v },
      { prop: '_day', func: (v) => v },
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd3_1,
      { prop: '_preauth', func: (v) => v },
    ],
    finalize: (logLineObj) => ({
      ...logLineObj,
      unixtime: Math.trunc(
        new Date(
          `${logLineObj._Year}/${logLineObj._Month}/${logLineObj._Day} ${logLineObj._Hour}:${logLineObj._Minute}:${logLineObj._Second}`
        ).getTime() / 1000
      ),
    }),
  },

  honeyPot_sshd3_2: {
    toArr: (logLine) => logLine.split(/ +|: |,/),
    props: [
      { prop: '_month', func: (v) => v },
      { prop: '_day', func: (v) => v },
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd3_2,
    ],
    finalize: (logLineObj) => logLineObj,
  },

  honeyPot_sshd3_3: {
    toArr: (logLine) => logLine.split(/: \[|\](?=KEXINIT)| +|,/),
    props: [
      { prop: '_month', func: (v) => v },
      { prop: '_day', func: (v) => v },
      { prop: '_time', func: (v) => v },
      {
        prop: 'sshdHost',
        func: (v) => v,
      },
      { prop: '_sshd', func: (v) => v },
      ..._SSHDPROPS.sshd3_3,
      { prop: '_preauth', func: (v) => v },
    ],
    finalize: (logLineObj) => ({
      ...logLineObj,
      unixtime: Math.trunc(
        new Date(
          `${logLineObj._Year}/${logLineObj._Month}/${logLineObj._Day} ${logLineObj._Hour}:${logLineObj._Minute}:${logLineObj._Second}`
        ).getTime() / 1000
      ),
    }),
  },
};

const decodeHex = (str) => {
  const len = 2;
  const arr = [...str].reduce(
    (a, v, i) => (i % len ? a : [...a, str.slice(i, i + len)]),
    []
  );
  return arr.map((v) => String.fromCharCode(`0x${v}`)).join('');
};

export const logLineParser = ({ logLine, logType }) => {
  const { props, toArr, finalize } = PROPS[logType];

  try {
    const logLineArr = toArr(logLine);
    let logLineObj = Object.fromEntries(
      logLineArr.map((v, i) => [props[i]?.prop, props[i]?.func(v)])
    );
    logLineObj = finalize(logLineObj);

    // logLineObjの型チェック
    // undefinedかNaNが含まれている
    if (
      Object.values(logLineObj).some((v) => v === undefined || Number.isNaN(v))
    )
      return new Error('logType may not correct');

    console.debug(
      new Date(
        logLineObj.unixtime * 1000 + logLineObj.usec / 1000
      ).toLocaleString(),
      logLineObj.sshdHost
    );

    //現状_付きのプロパティも返している(DBに格納される)
    return logLineObj;
  } catch (e) {
    return new Error('Parse Error');
  }
};
