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
        console.log(JSON.stringify($('.contentBox').html()), JSON.stringify($('.contentBox').text()));
        // console.log(JSON.stringify($('.sszjl').html()), JSON.stringify($('.sszjl').text()));
        // console.log(JSON.stringify($('sszjl').html()), JSON.stringify($('sszjl').text()));
        // console.log(JSON.stringify($('#sszjl_table').html()), JSON.stringify($('#sszjl_table').text()));
        // console.log(JSON.stringify($('sszjl_table').html()), JSON.stringify($('sszjl_table').text()));
        $('sszjl').each((i, v) => {
          console.log(JSON.stringify($(v).html().trim()));
          if (i === 1) {
            str = $(v).html().trim();
          }
        });
        // console.log(str);
        // const text = str.split(' = ')[1];
        // const text2 = text.slice(0, text.length - 1);
        // const list = JSON.parse(text2)[0];

        // return list[list.length - 1];
        return str;
      } catch (error) {
        return '';
      }
    }
  }
}

function query() {
  const url = "https://data.eastmoney.com/hsgtcg/gzcglist.html";
  const spider = new Spider();
  spider.fetch(url, async (err, $) => {
    try {
      const data = spider.parse(err, $);
      console.log(JSON.stringify(data));
  
      // console.log(data[0], data[1] + '');
      
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
