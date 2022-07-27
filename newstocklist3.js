const express = require('express');
const app = express();
const fetch = require('./fetch');

const arr = [
  // 'sh512480', 
  // 'hk00981',
  // 'sh688981',
  // 'hk01347',
  'sz002371', // huachuang
  'sh688261', // dongwei
  'sh603290', // sida
  'sh605111', // xinjieneng
  'sz300373', // yangjie
  'sh600460', // shilanwei
  'sh688396', // huarun
  'sh605358', // liang
  'sz300623', // jiejie
  'sh688187', // shidai
  // 'sh603501', // weier
  // 'sz300782', // zhuoshengwei
  'sh688012', // zhongwei
  'sh603986', // zhaoyi
  'sz300223', // junzheng
  'sh600703', // sanan
  'sz300671', // fuman
  'sz300458', // quanzhi
  'sz300327', // zhongying
  'sz300346', // nanda
  'sz300474', // jingjiawei
  'sz300661', // shengbang
  // 'sh603893', // ruixinwei
  // 'sh600584', // changdian
];

// const total = arr.map((ele) => `s_${ele}`).join();
const total = arr.join();

fetch(total);
setInterval(() => {
  fetch(total);
  // console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(4888, () => {
  console.log('开启服务，端口4888');
});
