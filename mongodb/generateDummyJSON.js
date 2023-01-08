const fs = require('fs');

let base = fs
  .readFileSync('./base.json', 'utf8')
  .split('\n')
  .map((v) => JSON.parse(v));

const diffTime =
  new Date().getTime() - new Date(base.slice(-1)[0].date).getTime();

base = base.map((obj) => {
  const date = new Date(new Date(obj.date).getTime() + diffTime);
  return {
    ...obj,
    unixtime: (date.getTime() / 1000) | 0,
    date: { $date: date.toISOString() },
  };
});

fs.writeFileSync('dummy.json', JSON.stringify(base));
