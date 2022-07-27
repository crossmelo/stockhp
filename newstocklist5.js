const express = require('express');
const app = express();
const fetch = require('./fetch');

const arr = [
  'sz123070', // penghui
  'sz300438', // penghui
  'sh688063', // paineng
  'sz002837', // yingweike
  'sz002518', // keshida
  'sz002335', // kehua
  'sz002459', // jingao
  // 'sh601012', // longji
  'sh603185', // shangji
  'sz300751', // maiwei
  'sz300776', // dier
  'sz300274', // yangguang
  'sh600438', // tongwei
  'sz002129', // zhonghuan
  'sh603606', // dongfang
  'sz002487', // dajin
  'sh600522', // zhongtian
  'sh603169', // lanshi
  'sz000723', // meijin
  'sz300471', // houpu
  'sh600089', // tebian
];

// const total = arr.map((ele) => `s_${ele}`).join();
const total = arr.join();

fetch(total);
setInterval(() => {
  fetch(total);
  // console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(6888, () => {
  console.log('开启服务，端口6888');
});
