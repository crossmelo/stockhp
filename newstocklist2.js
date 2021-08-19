const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const app = express();

const arr = [
  'sh000001',
  'sz399006',
  'hkHSI',
  // 'hk00981',
  'sh688981',
  'hk01347',
  'sh510050', 
  // 'sh000300',
  'sh600030', // zhongxin
  'sh601995', // zhongjin
  'sz300059',
  'sh600519', // maotai
  // 'sh600906', 
  // 'sh601377', 
  // 'sh601601', // taibao
  'sz000001', // pingyin
  // 'sh688126', // hugui
  'hk02382', //shunyu
  'sz000792',
  'sz300750',
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

app.listen(3888, () => {
  console.log('开启服务，端口3888');
});
