const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const app = express();

class Spider {
  fetch(url, callback) {
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

  parse(err, $) {
    if (!err) {
      let str = '';
      try {
        $('north_h_jme').each((i, v) => {
          if (i === 1) {
            str = $(v).html().trim();
          }
        });
        const text = str.split(' = ')[1];
        const text2 = text.slice(0, text.length - 1);
        const list = JSON.parse(text2)[0];

        return list[list.length - 1];
      } catch (error) {
        return '';
      }
    }
  }
}

function query() {
  const url = "http://data.eastmoney.com/hsgt/index.html";
  const spider = new Spider();
  spider.fetch(url, async (err, $) => {
    try {
      const data = spider.parse(err, $);
  
      console.log(data[0], data[1] + '');
      
    } catch (error) {
      
    }
  });
}

query('hgtb');
query('sgtb');
setInterval(() => {
  query('hgtb');
  query('sgtb');
}, 30000);

app.listen(6868, () => {
  console.log('开启服务，端口6868');
});
