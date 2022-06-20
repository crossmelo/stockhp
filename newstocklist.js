const express = require('express');
const app = express();
const fetch = require('./fetch');

const arr = [
  // 'sz300061',
  'sh603392', // wantai
  'sz300122', // zhifei
  'sz300142', // wosen
  'sh600196', // fuxing
  // 'sz002410', // guanglianda
  // 'sz300253', // weining
  // 'sz300009',
  // 'sz002891', 
  // 'sz300124',
  // 'sh510050', 
  // 'sz002475', // lixun
  // 'sz002241', // geer
  // 'sz300433', // lansi
  // 'sz002351', // manbuzhe
  // 'sz002600', // lingyi
  // 'sz002008', // dazu
  // 'sh600597', // guangming
  // 'sz300124', // huichuang
  // 'sz300339', // runhe
  // 'sh600320', // zhenhua
  // 'sz002617', // luxiao
  // 'sz300708', // jucan
  'sz300363', // boteng
  'sz300204', // shutaishen
  'sh688180', // junshi
  'sh688221', // qianyan
  'sz300412', // jianan
  'sz301166', // youningwei
  'sz002915', // zhongxin
  'sz000876', // xinxiwang
  'sh601689', // tuopu
  'sz002738', // zhongkuang
  'sz128111', // zhongkuang
  'sh603078', // jianghuawei
  'sz300576', // rongda
  'sh600765', // zhongji
  'sz300065', // hailanxin
  'sz300007', // hanwei
];

// const total = arr.map((ele) => `s_${ele}`).join(',');
const total = arr.join(',');

fetch(total);
setInterval(() => {
  fetch(total);
  console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(2888, () => {
  console.log('开启服务，端口2888');
});
