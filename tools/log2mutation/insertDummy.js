const fs = require('fs');

const generateDummy = () => {
  const ISOString = `${new Date(new Date().getTime() + 60 * 60 * 9 * 1000)
    .toISOString()
    .slice(0, -1)}+09:00`;
  const passwdList = [
    '6a6176696572',
    '61616140313233',
    '6e696e61313233',
    '7a68656e7275696463',
  ];
  const userList = ['726f6f74', '6e696e61'];
  const ipList = [
    '47.254.251.244',
    '143.198.54.181',
    '139.59.247.236',
    '49.88.112.116',
    '119.28.105.34',
  ];

  // main_sshd4 format
  return `${ISOString} example.com sshd4[1234] Fail,${
    userList[(Math.random() * userList.length) | 0]
  },${passwdList[(Math.random() * passwdList.length) | 0]},${
    ipList[(Math.random() * ipList.length) | 0]
  },24578,0.639454,Normal,0.115542,${(new Date().getTime() / 1000) | 0},${
    (new Date().getTime() / 1000 + '').split('.')[1] * 1000
  },0.111065,0.120019`;
};

setInterval(() => {
  fs.appendFileSync('/var/log/auth.log', generateDummy() + '\n');
}, 3000);
