

const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const app = express();

const arr = [
  'CFF_RE_IH0',
  'CFF_RE_IF0',
  'CFF_RE_IC0',
  'CFF_RE_IF2009',
  'CFF_RE_IC2009',
];

const fetch = (num) => {
  return new Promise((resolve, reject) => {
    const url = `http://hq.sinajs.cn/list=${num}`;
    request({ url: url, encoding: null }, (err, response, body) => {
      try {
        const data = iconv.decode(body, 'gb2312');
        const list = data.toString('utf8').split('=');
        const valList = list[1].split(',');
        console.log(valList[3], valList[valList.length - 1].split('"')[0]);

        resolve();
      } catch (error) {
        // reject(error);
      }
    });
  });
};

async function query() {
  for(let x of arr) {
    await fetch(x);
  }
}

query();
setInterval(() => {
  query();
  console.log('-----------------');
}, 30000);

app.listen(1666, () => {
  console.log('开启服务，端口1666');
});
