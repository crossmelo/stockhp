const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const app = express();

const arr = [
  "sh000001",
  "sz399006",
  'hk00981',
  'sh688981',
  'sh000300',
  'sh600030', // zhongxin
  // 'sh601066', // jiantou
  // 'sh601628', // renshou
  'sh601336', // xinhua
  // 'sh688126', // hugui
  // 'hk02382', //shunyu
  // 'sz002475', // lixun
  // 'sz002241', // geer
  'sz300433', // lansi
  // 'sz300136', // xinwei
  // 'sz002600', // lingyi
  // 'sz300782', // zhuodi
  'sh603501', // weier
  'sh603986', // zhaoyi
  'sh600584', // changdian
  'sz300623', // jiejie
  'sz300373', // yangjie
  // 'sh605111', // xinjieneng
  // 'sh605358', // liang
  // "sh600703", // sanan
  // 'sh603983', // wanmei
];

const fetch = (num) => {
  return new Promise((resolve, reject) => {
    const url = `http://qt.gtimg.cn/q=${num}`;
    request({ url: url, encoding: null }, (err, response, body) => {
      try {
        const data = iconv.decode(body, 'gb2312');
        const list = data.toString('utf8').split('~');
        console.log(list[1], list[3], list[32] + '%');

        resolve();
      } catch (error) {
        // reject(error);
      }
    });
  });
};

async function query() {
  // try {
  //   arr.forEach(async ele => {
  //     const url = `http://qt.gtimg.cn/q=${ele}`;
  //     await fetch(url);
  //   });
  // } catch (error) {
  //   // console.log('error', error);
  // }

  // const promiseArr = [];
  // for (let i = 0; i < arr.length; i++) {
  //   promiseArr.push(fetch(arr[i]));
  // }
  // Promise.all(promiseArr).then((rs) => {
  //   // console.log('finish');
  // });

  for (let x of arr) {
    await fetch(x);
  }
}

query();
setInterval(() => {
  query();
  console.log('-----------------');
}, 10000);

app.listen(1888, () => {
  console.log('开启服务，端口1888');
});
