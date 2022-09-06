const express = require('express');
const app = express();
const request = require('request');
const iconv = require('iconv-lite');
const colors = require('colors');

const arr1 = [
  // 'sz300363', // boteng
  // 'sh603127', // zhaoyan
  'sz301080', // baipusaisi
  'sz300204', // shutaishen
  // 'sh600079', // renfu
  'sz300171', // dongfulong
  'sz300412', // jianan
  'sh688351', // weidian
  'sh600259', // guangsheng
  // 'sh600456', // baotai
  // 'sz000519', // zhongbing
  'sh603636', // nanwei
  'sz003040', // chutiankong
  'sz300339', // runhe
  'sz002747', // aisidun
  'sz300007', // hanwei
  'sz300831', // pairui
  'sz300655', // jingrui
  'sz002617', // luxiao
  'sz002079', // good
  'sz002156', // tongfu
  'sz002384', // dongshan
  'sz002241', // geer
  'sz002475', // lixun
  'sz002351', // manbuzhe
  'sz002600', // lingyi
];
const arr2 = [
  'sh688261', // dongwei
  'sh688187', // shidai
  'sh688711', // hongwei
  'sh603290', // sida
  'sh605111', // xinjieneng
  'sh600460', // shilanwei
  'sz300373', // yangjie
  'sh688396', // huarun
  'sh605358', // liang
  'sz301269', // jiutian
  'sh688206', // gailun
  'sz002371', // huachuang
  'sh600641', // wanye
  'sz300604', // changchuan
  'sh688037', // xinyuanwei
  // 'sh603690', // zhichun
  // 'sh603986', // zhaoyi
  // 'sh600703', // sanan
  'sz300666', // jiangfeng
  // 'sh603078', // jianghuawei
  'sz300260', // xinlai
  'sz002409', // yake
  // 'sz300671', // fuman
  // 'sz300327', // zhongying
  'sz300054', // dinglong
  'sh603650', // tongcheng
  // 'sz300655', // jingrui
  'sz300346', // nanda
  // 'sz300576', // rongda
  // 'sh688019', // anji
  // 'sz300223', // junzheng
  // 'sz300474', // jingjiawei
  // 'sz300661', // shengbang
  // 'sz002049', // ziguang
  // 'sz002156', // tongfu
  // 'sh600584', // changdian
];
const arr3 = [
  'sh600096', // yuntianhua
  'sz300437', // qingshuiyuan
  // 'sz000422', // yihua
  'sz002176', // jiangte
  'sz002192', // rongjie
  'sz002466', // tianqi
  'sz000155', // chuanneng
  'sz002738', // zhongkuang
  // 'sz002497', // yahua
  'sz002240', // shengxin 
  // 'sz002245', // weilan
  // 'sz002460', // ganfeng
  'sz002756', // yongxing
  'sz300487', // lanxiao
  'sz000408', // zangge
  'sz000792', // yanhu
  'sh603799', // huayou
  // 'sh600111', // beixi
  'sz000831', // wukuang
  'sz002812', // enjie
  'sz300568', // xingyuan
  'sz300496', // zhongke
  'sz002920', // desaixiwei
  'sh601689', // tuopu
  'sz300428', // lizhong
  'sz002906', // huayang
];
const arr4 = [
  'sz300693', // shenghong
  'sz300438', // penghui
  'sh688063', // paineng
  'sz002837', // yingweike
  'sz002518', // keshida
  'sz002335', // kehua
  'sz002922', // yigeer
  'sh601137', // bowei
  'sh600732', // aixu
  'sh688223', // jingke
  'sz002459', // jingao
  'sz300118', // risheng
  'sh603185', // shangji
  // 'sz300751', // maiwei
  'sz300776', // dier
  'sz300274', // yangguang
  'sh600438', // tongwei
  // 'sz002129', // zhonghuan
  'sz002487', // dajin
  'sh603606', // dongfang
  'sh600522', // zhongtian
  'sh600089', // tebian
  'sz000400', // xuji
];
const arr5 = [
  'sh000001',
  'sz399006',
  'sh510050', 
  'sh588050',
  'sh512690',
  'sh512170',
  'sh516160',
  'sz159755',
  'sh515790',
  'sh512480', 
  'sz300750',
  'sh601012', // longji
  // 'sh600519', // maotai
  'sh600030', // zhongxin
  'sz300059',
  // 'sh600036', 
  // 'sz000001', // pingyin
  'sh688981', // zhongxin
  'sz002594', // byd
  'sh601899', // zijin
  'sh600150', // zhongchuang
  // 'sh601628', // renshou
  // 'sh601088', // shenhua
  // 'sh600900', // changjiang
  // 'sz002241', // geer
  // 'sz002475', // lixun
  'sz002410', // guanglianda
  'sz300122', // zhifei
  'sz300142', // wosen
  // 'sh600196', // fuxing
];

const map1 = {};
const map2 = {};
const map3 = {};
const map4 = {};
const map5 = {};

const length = arr1.length;

arr1.forEach((ele, index) => {
  map1[ele] = index;
})
arr2.forEach((ele, index) => {
  map2[ele] = index;
})
arr3.forEach((ele, index) => {
  map3[ele] = index;
})
arr4.forEach((ele, index) => {
  map4[ele] = index;
})
arr5.forEach((ele, index) => {
  map5[ele] = index;
})

const arr = [...arr1, arr2, arr3, arr4, arr5];
const total = arr.join();

function fetch(total) {
  return new Promise((resolve, reject) => {
    const url = `http://qt.gtimg.cn/r=${Math.random()}q=${total}`;
    request({ url: url, encoding: null }, (err, response, body) => {
      try {
        const mapList = [...Array.from({ length }).keys()].map(() => []);
        const data = iconv.decode(body, 'gb2312');
        data
          .replace(/\n/gi, '')
          .split(';')
          .forEach((ele) => {
            if (ele) {
              try {
                const list = ele.split('~');
                const num = Number(list[3]);

                const codeItem = list[0] || '';
                const codeItemList = codeItem.split('_');
                const codePart = codeItemList[1] || '';
                const codePartList = codePart.split('=');
                const code = codePartList[0] || '';

                const list1 = ele.split('~~');
                const item1 = list1[1] || '';
                const list2 = item1.split('~');

                const name = list[1] || '';
                const shortName = name.includes('ETF') ? name : name.slice(0, 4).replace('-', '');
                // const shortName = name.includes('ETF') ? name : (name.length === 3 ? name : (name.slice(0, 2) + '  '));
                // const shortName = name.includes('ETF') ? name : name.slice(0, 2);

                const percent = list2[2] ? Number(list2[2]) : 0;
                const shortPer = percent.toFixed(1);

                const max = list2[3] ? Number(list2[3]) : num;
                const discount = !max ? '0.0' : (((max - num) / max) * 100).toFixed(1);
                const show = discount > 50 ? '' : (discount >= 10 ? ` -${Math.floor(discount) + 1}%` : `-${discount}%`);

                const mapItem = {
                  name: shortName.includes(' ') || shortName.includes('酒') || shortName.includes('XD') || shortName.includes('DR') ? `${shortName}  ` : (shortName.length > 3 ? shortName.includes('C') ? `${shortName} ` : shortName : `${shortName}  `),
                  num: list[3].length > 5 ?  Number(list[3]).toFixed(2) : (list[3].length > 4 ? ` ${Number(list[3]).toFixed(2)}` : `  ${Number(list[3]).toFixed(2)}`),
                  percent,
                  shortPer: (percent < 0 || percent > 9.9) ? (percent <= -9.99 ? ` ${Math.floor(shortPer)}` : shortPer) : ` ${shortPer}`,
                  discount,
                  show,
                };

                if (arr1.includes(code)) {
                  mapList[map1[code]].push(mapItem);
                } else if (arr2.includes(code)) {
                  mapList[map2[code]].push(mapItem);
                } else if (arr3.includes(code)) {
                  mapList[map3[code]].push(mapItem);
                } else if (arr4.includes(code)) {
                  mapList[map4[code]].push(mapItem);
                } else if (arr5.includes(code)) {
                  mapList[map5[code]].push(mapItem);
                }

              } catch (error) {}
            }
          });
        mapList.forEach(ele => {
          try {
            console.log(
              ele[0].name, ele[0].num, ele[0].percent >= 3 ? `${ele[0].shortPer}%`.yellow : `${ele[0].shortPer}%`, ele[0].discount > 1 ? ele[0].show.red : ele[0].show, '|',
              ele[1].name, ele[1].num, ele[1].percent >= 3 ? `${ele[1].shortPer}%`.yellow : `${ele[1].shortPer}%`, ele[1].discount > 1 ? ele[1].show.red : ele[1].show, '|',
              ele[2].name, ele[2].num, ele[2].percent >= 3 ? `${ele[2].shortPer}%`.yellow : `${ele[2].shortPer}%`, ele[2].discount > 1 ? ele[2].show.red : ele[2].show, '|',
              ele[3].name, ele[3].num, ele[3].percent >= 3 ? `${ele[3].shortPer}%`.yellow : `${ele[3].shortPer}%`, ele[3].discount > 1 ? ele[3].show.red : ele[3].show, '|',
              ele[4].name, ele[4].num, ele[4].percent >= 3 ? `${ele[4].shortPer}%`.yellow : `${ele[4].shortPer}%`, ele[4].discount > 1 ? ele[4].show.red : ele[4].show
            );
          } catch {
            console.log('-----')
          }
        })
        resolve();
      } catch (error) {
        // reject(error);
      }
    });
  });
};

fetch(total);
setInterval(() => {
  // console.clear(); // 可以清屏防止卡顿
  const hour = new Date().getHours();
  if ([9, 10, 11, 13, 14].includes(hour)) {
    fetch(total);
  }
  // console.log('---敬畏市场，控制回撤---');
}, 5000);

app.listen(8888, () => {
  console.log('开启服务，端口8888');
});
