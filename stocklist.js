const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const app = express();

const arr = [
  // 'hk00981',
  'sh688981',
  // 'sh000300',
  'sz300433',
  // 'sz300136',
  'sz002600',
  'sh603986',
  "sh600030", // zhongxin
  "sh601066", // jiantou
  "sz002241", // geer
  'hk02382',  //shunyu
  "sh688126", // hugui
  // "sh600703", // sanan
  "sh603983", // wanmei
  "sh601628", // renshou
];

function fetch(url) {
  request({ url: url, encoding: null }, (err, response, body) => {
    try {
      const data = iconv.decode(body, 'gb2312');
      const list = data.toString('utf8').split('~');
      console.log(list[1], list[3], list[32] + '%');
    } catch (error) {}
  });
}

function query() {
  try {
    arr.forEach((ele) => {
      const url = `http://qt.gtimg.cn/q=${ele}`;
      fetch(url);
    });
  } catch (error) {
    // console.log('error', error);
  }
}

query();
setInterval(() => {
  query();
  console.log('-----------------');
}, 30000);

app.listen(1888, () => {
  console.log('开启服务，端口1888');
});
