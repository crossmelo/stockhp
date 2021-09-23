const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const colors = require('colors');
const app = express();

const arr = [
  'sh000001',
  'sz399006',
  // 'hkHSI',
  // 'hk00981',
  // 'sh688981',
  // 'hk01347',
  'sh510050', 
  'sh588380',
  'sh588000',
  'sh512690',
  'sh512170',
  'sz159755',
  // 'sh000300',
  'sh600030', // zhongxin
  'sz300059',
  'sh600036', 
  'sz000001', // pingyin
  'sh600519', // maotai
  'sz300750',
  // 'hk02382', //shunyu
  // 'sz000792',
  'sh688981',
];

// const total = arr.map((ele) => `s_${ele}`).join(',');
const total = arr.join(',');

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
                const num = Number(list[3]);

                const list1 = ele.split('~~');
                const item1 = list1[1] || '';
                const list2 = item1.split('~');
                const percent = list2[2] || '';
                const max = list2[3] ? Number(list2[3]) : num;

                const discount = (((max - num) / max) * 100).toFixed(1);
                const show = discount > 100 ? '' : `-${discount}%`;

                console.log(list[1], list[3], `${percent}%`, discount > 1 ? show.red : show);
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
  console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(3888, () => {
  console.log('开启服务，端口3888');
});
