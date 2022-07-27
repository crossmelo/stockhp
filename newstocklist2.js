const express = require('express');
const app = express();
const fetch = require('./fetch');

const arr = [
  'sh000001',
  'sz399006',
  // 'hkHSI',
  // 'hk00981',
  // 'sh688981',
  // 'hk01347',
  'sh510050', 
  // 'sh588380',
  // 'sh588000',
  'sh588050',
  'sh512690',
  'sh512170',
  'sh516160',
  'sz159755',
  'sh515790',
  'sh512480', 
  // 'sh000300',
  'sz300750',
  'sh601012', // longji
  'sh600519', // maotai
  'sh600030', // zhongxin
  'sz300059',
  'sh600036', 
  'sz000001', // pingyin
  // 'sh601318', // pingan
  // 'hk02382', // shunyu
  // 'sz000792',
  'sh688981',
  // 'hk01347',
  'sz002432', // jiuan
  'sz300760', // mairui
];

// const total = arr.map((ele) => `s_${ele}`).join();
const total = arr.join();

fetch(total);
setInterval(() => {
  fetch(total);
  console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(3888, () => {
  console.log('开启服务，端口3888');
});
