const express = require('express');
const app = express();
const fetch = require('./fetch');

const arr = [
  'sh600096', // yuntianhua
  'sz000422', // yihua
  'sz002756', // yongxing
  'sz002176', // jiangte
  'sz002192', // rongjie
  'sz002466', // tianqi
  'sh603799', // huayou
  'sz000408', // zangge
  'sz300487', // lanxiao
  'sz000792', // yanhu
  'sh600111', // beixi
  'sz002812', // enjie
  'sz300568', // xingyuan
  'sh600110', // nuode
  'sh688388', // jiayuan
  'sz300496', // zhongke
  'sz002920', // desaixiwei
  'sz300450', // xiandao
  'sz300457', // yinghe
  'sz002594', // byd
  // 'sh601689', // tuopu
];

// const total = arr.map((ele) => `s_${ele}`).join(',');
const total = arr.join(',');

fetch(total);
setInterval(() => {
  fetch(total);
  // console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(5888, () => {
  console.log('开启服务，端口5888');
});
