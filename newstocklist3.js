const express = require('express');
const request = require('request');
const iconv = require('iconv-lite');
const colors = require('colors');
const app = express();

const arr = [
  // 'sh512480', 
  // 'hk00981',
  // 'sh688981',
  'hk01347',
  'sz002371', // huachuang
  'sh688012', // huarun
  'sh688396', // huarun
  'sh603290', // sida
  'sh600460', // shilanwei
  'sh603986', // zhaoyi
  'sz300373', // yangjie
  // 'sz300623', // jiejie
  // 'sh605111', // xinjieneng
  // 'sh605358', // liang
  'sh603501', // weier
  'sz300782', // zhuoshengwei
  'sh600703', // sanan
  'sz300458', // quanzhi
  'sz300327', // zhongying
  'sz300346', // nanda
  // 'sh600584', // changdian
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

app.listen(4888, () => {
  console.log('开启服务，端口4888');
});
