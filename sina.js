const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const app = express();

const arr = [
  'sh000001',
  'sz399006',
  'hk00981',
  'sh688981',
  'sh000300',
  'sh600030', // zhongxin
  // 'sh601066', // jiantou
  // 'sh601628', // renshou
  // 'sh601336', // xinhua
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
  'sz002156', // tongfu
  'sz002371', // huachuang
  // 'sh603290', // sida
  'sz300623', // jiejie
  'sz300373', // yangjie
  'sh605111', // xinjieneng
  'sh605358', // liang
  'sh600703', // sanan
];

const total = arr.map((ele) => `s_${ele}`).join(',');

const fetch = () => {
  return new Promise((resolve, reject) => {
    const url = `http://hq.sinajs.cn/list=${total}`;
    request({ url: url, encoding: null }, (err, response, body) => {
      try {
        const data = iconv.decode(body, 'gb2312');
        data
          .replace(/\n/gi, '')
          .split(';')
          .forEach((ele) => {
            if (ele) {
              try {
                const list = ele.split(',');
                console.log(list[0].split('"')[1], list[1], list[3] + '%');
              } catch (error) {}
            }
          });
        resolve();
      } catch (error) {
        // reject(error);
      }
    });
  });
};

fetch();
setInterval(() => {
  fetch();
  console.log('-----------------');
}, 10000);

app.listen(3888, () => {
  console.log('开启服务，端口3888');
});
