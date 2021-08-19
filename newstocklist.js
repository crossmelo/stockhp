const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const app = express();

const arr = [
  // 'sh000001',
  // 'sz399006',
  // 'hk00981',
  // 'sh688981',
  // 'sh000300',
  // 'sh600030', // zhongxin
  // 'sh601995', // zhongjin
  // 'sh600906', 
  // 'sh601377', 
  // 'sh601601', // taibao
  // 'sz000001', // pingyin
  // 'sh688126', // hugui
  // 'hk02382', //shunyu
  'sz002475', // lixun
  'sz002241', // geer
  'sz300433', // lansi
  // 'sz002600', // lingyi
  // 'sz300782', // zhuodi
  // 'sh603501', // weier
  // 'sh600703', // sanan
  // 'sz002371', // huachuang
  'sh600584', // changdian
  // 'sz002156', // tongfu
  // 'sh603290', // sida
  // 'sh600460', // shilanwei
  // 'sz300623', // jiejie
  'sz300373', // yangjie
  // 'sh605111', // xinjieneng
  // 'sh605358', // liang
  'sh603986', // zhaoyi
  // 'sh688396', // huarun
  // 'sz300061',
  'sz300122',
  'sz300142',
  'sh600196', 
  'sz002410',
  'sz002351',
  'sz002008',
  'sz300253',
  // 'sz300009',
  'sh600597', 
  // 'sz002891', 
  // 'sz300124',
  // 'sh510050', 
];

const total = arr.map((ele) => `s_${ele}`).join(',');

const fetch = () => {
  return new Promise((resolve, reject) => {
    const url = `http://qt.gtimg.cn/r=${Math.random()}q=${total}`;
    request({ url: url, encoding: null }, (err, response, body) => {
      try {
        const data = iconv.decode(body, 'gb2312');
        data
          .replace(/\n/gi, '')
          .split(';')
          .forEach((ele) => {
            if (ele) {
              try {
                const list = ele.split('~');
                console.log(list[1], list[3], list[5] + '%');
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
  console.log('--------敬畏市场，控制回撤---------');
}, 10000);

app.listen(2888, () => {
  console.log('开启服务，端口2888');
});
