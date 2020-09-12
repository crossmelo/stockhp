const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const app = express();
const reg = /\n|\s+/g;
const reg2 = /<[^>]*>/g;
const reg3 = /发自|手机|虎扑|m.hupu.com|客户端|iPhone|Android/g;
const tiezi = 33405590;
const tieziUrl = `https://m.hupu.com/bbs/${tiezi}.html`;

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

  parseLen(err, $) {
    if (!err) {
      let result = JSON.stringify($('body').html());
      return result;
    }
  }

  parseData(err, $) {
    if (!err) {
      $('#t_main .floor').each((i, v) => {
        const author = $(v)
          .find('.floor_box .author .left')
          .find('a')
          .eq(0)
          .text();
        const text = $(v)
          .find('.floor_box tbody')
          .html()
          .replace(reg, '')
          .replace(reg2, '')
          .replace(reg3, '');
        console.log(author, ':', text);
      });
    }
  }
}

function queryLen() {
  const spider = new Spider();
  spider.fetch(tieziUrl, async (err, $) => {
    const len = spider.parseLen(err, $);
    console.log(len);
    // await queryData(len - 1);
    // await queryData(len);

    console.log('--------------------------------------------------');
  });
}

function queryData(len) {
  return new Promise((resolve, reject) => {
    const spider = new Spider();
    spider.fetch(`https://bbs.hupu.com/${tiezi}-${len}.html`, (err, $) => {
      console.log(`第${len}页`, '----------------------------');
      const result = spider.parseData(err, $);
      resolve();
    });
  });
}

queryLen();
setInterval(() => {
  queryLen();
}, 20000);

app.listen(6688, () => {
  console.log('开启服务，端口6688');
});
