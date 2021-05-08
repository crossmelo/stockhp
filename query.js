const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const app = express();
const reg = /\n|\s+/g;
const reg2 = /<[^>]*>/g;
const reg3 = /发自|手机|虎扑|m.hupu.com|客户端|iPhone|Android/g;
const tiezi = 278826533871598; //

const options = {
  method: 'GET',
  headers: {
    cookie:
      '_cnzz_CV30020080=buzi_cookie%7Ca0d623e4.972b.76eb.2632.0d0b68376fa2%7C-1; _dacevid3=a0d623e4.972b.76eb.2632.0d0b68376fa2; _HUPUSSOID=a9a5403a-f262-4a3a-a446-66c66a91af38; _CLT=918ebe7bb324d8673460f7af1d701a5c; AUM=dglffPP1dTHUwywLAGx5n_vXjN5nt-yqlWtWpTno5j7lw; __dacevid3=0x0a4089f156ccefbb; UM_distinctid=174100047f2a96-0d042e0642557-31647304-1aeaa0-174100047f3b5f; Hm_lvt_3d37bd93521c56eba4cc11e2353632e2=1597996288; PHPSESSID=76apt0ujfa5r9i48uuacou82n0; _cnzz_CV30020080=buzi_cookie%7Ca0d623e4.972b.76eb.2632.0d0b68376fa2%7C-1; Hm_lpvt_3d37bd93521c56eba4cc11e2353632e2=1599103773; smidV2=20201030155800d87c8cd914fde47d3974a3b2ca4e68a7006661ae800d54c40; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22172322bd7ff5e-028e07a6493372-5437971-250125-172322bd800bf4%22%2C%22%24device_id%22%3A%22172322bd7ff5e-028e07a6493372-5437971-250125-172322bd800bf4%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D; bbs_2020=1; __gads=ID=ad33fc8b33fbf510:T=1590395312:R:S=ALNI_MbgxXgMiAyJM4PUp8OWzEyWRxfWAw; Hm_lvt_b241fb65ecc2ccf4e7e3b9601c7a50de=1608017366; Hm_lvt_4fac77ceccb0cd4ad5ef1be46d740615=1608017366; acw_tc=76b20f6516081979026958172e3f1fb6c189e198fac78acffdc9041084108d; u=3189936|Y3Jvc3NtZWxv|309f|51d0ac930b3d2a1bc2152f4f7da23104|0b3d2a1bc2152f4f|Y3Jvc3NtZWxv; us=938925a80888565eff0971935d799c582622fb8eaca693a3e4a20c85bc79fab9242c76f7a56a54d87ff7a2424fc82b9904caac1e08a51fbe03f26217e36309a8; ua=43464824; _fmdata=QvSb3lcv9x60gmVPTg2ngksWIBLQaknnIDcv%2BcatnIXwrkbXolsDdI3ZKvzkkvp7DHFHFTw3Y2qlhVzb9O8m98%2Bg5hje7BIfG2Mzr5O4P18%3D; __dacevst=49a110a5.434f9afb|1608200542564; Hm_lpvt_4fac77ceccb0cd4ad5ef1be46d740615=1608198743; Hm_lpvt_b241fb65ecc2ccf4e7e3b9601c7a50de=1608198743',
  },
};

class Spider {
  fetch(url, callback) {
    request({ url: url, encoding: null, ...options }, (err, response, body) => {
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
      let result = $('#bbstopic_set').attr('data-maxpage');
      return result;
    }
  }

  parseData(err, $) {
    if (!err) {
      $('#content .topic_reply').each((i, v) => {
        const text = $(v).find('p').last().html() || '';
        console.log(text.replace(reg, '').replace(reg2, '').replace(reg3, ''));
      });
    }
  }
}

function queryLen() {
  const spider = new Spider();
  spider.fetch(
    `https://my.hupu.com/278826533871598/topic-allreply-1`,
    async (err, $) => {
      // const len = spider.parseLen(err, $);
      // await queryData(len - 1);
      // await queryData(len);

      const result = spider.parseData(err, $);

      console.log('--------------------------------------------------');
    }
  );
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
// setInterval(() => {
//   queryLen();
// }, 20000);

app.listen(9899, () => {
  console.log('开启服务，端口9899');
});
