const express = require('express');
const request = require('request');
const formatDay = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const now = formatDay(new Date());
const url = `http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=sh000001,day,,${now},3,qfq`;

function fetch(url, callback) {
  request({ url: url, encoding: null }, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      callback(
        null,
        cheerio.load('<body>' + body + '</body>', { decodeEntities: false })
      );
    } else {
      callback(err, cheerio.load('<body></body>'));
    }
  });
}

fetch(url);

app.listen(6688, () => {
  console.log('开启服务，端口6668');
});
