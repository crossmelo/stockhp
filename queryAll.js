const express = require('express');
const app = express();
const request = require('request');
const iconv = require('iconv-lite');
const colors = require('colors');

const arr1 = [
  'sz300122', // zhifei
  'sz300142', // wosen
  // 'sh600196', // fuxing
  'sz300363', // boteng
  'sh688180', // junshi
  'sz300204', // shutaishen
  'sh603538', // meinuohua
  'sz300412', // jianan
  'sz000876', // xinxiwang
  'sh601689', // tuopu
  'sz300576', // rongda
  'sz002617', // luxiao
  'sz300708', // jucan
  'sz000733', // zhenhua
  'sh600456', // baotai
  'sh688122', // chaodao
  // 'sz300124', // huichuang
  'sz301256', // huarong
  'sz300007', // hanwei
  // 'sh600549', // xiawu
  'sz300339', // runhe
  'sz002241', // geer
  'sz002475', // lixun
  'sz002410', // guanglianda
];
const arr2 = [
  'sh688261', // dongwei
  'sh603290', // sida
  'sh605111', // xinjieneng
  'sz300373', // yangjie
  'sh600460', // shilanwei
  'sh688396', // huarun
  'sh605358', // liang
  'sh688187', // shidai
  'sh688711', // hongwei
  // 'sz300623', // jiejie
  'sh603078', // jianghuawei
  'sz002371', // huachuang
  'sh603986', // zhaoyi
  'sh600703', // sanan
  'sz002409', // yake
  // 'sz300671', // fuman
  'sz300327', // zhongying
  'sh603650', // tongcheng
  'sz300346', // nanda
  'sh688019', // anji
  'sz300474', // jingjiawei
  'sz300661', // shengbang
  'sz002049', // ziguang
];
const arr3 = [
  'sh600096', // yuntianhua
  'sz000422', // yihua
  'sz002176', // jiangte
  'sz002192', // rongjie
  'sz002466', // tianqi
  'sz000155', // chuanneng
  'sz002738', // zhongkuang
  'sz002497', // yahua
  'sz002240', // shengxi 
  'sz002245', // weilan
  'sz002460', // ganfeng
  'sz002756', // yongxing
  'sz000408', // zangge
  'sz300487', // lanxiao
  'sz000792', // yanhu
  'sh603799', // huayou
  'sh600111', // beixi
  'sz002812', // enjie
  'sz300568', // xingyuan
  // 'sh600110', // nuode
  // 'sh688388', // jiayuan
  'sz300496', // zhongke
  'sz002920', // desaixiwei
  // 'sz300450', // xiandao
  // 'sz300457', // yinghe
  // 'sz002594', // byd
];
const arr4 = [
  // 'sz123070', // penghui
  'sz300438', // penghui
  'sh688063', // paineng
  'sz002837', // yingweike
  'sz002518', // keshida
  'sz002335', // kehua
  'sz002922', // yigeer
  // 'sh688390', // gudewei
  // 'sh688303', // daquan
  'sh600732', // aixu
  'sh688223', // jingke
  'sz002459', // jingao
  'sz300118', // risheng
  'sh603185', // shangji
  'sz300751', // maiwei
  'sz300776', // dier
  'sz300274', // yangguang
  'sh600438', // tongwei
  // 'sz002129', // zhonghuan
  'sh603606', // dongfang
  'sz002487', // dajin
  // 'sh600522', // zhongtian
  'sh603169', // lanshi
  'sz000723', // meijin
  'sz300471', // houpu
  'sh600089', // tebian
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
  'sh600519', // maotai
  'sh600030', // zhongxin
  'sz300059',
  'sh600036', 
  // 'sz000001', // pingyin
  'sh688981', // zhongxin
  'sz002432', // jiuan
  'sz002594', // byd
  'sh601899', // zijin
  // 'sh601088', // shenhua
  'sh600150', // zhongchuang
  // 'sh600900', // changjiang
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
const total = arr.join(',');

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
                const shortName = name.includes('ETF') ? (name.length < 6 ? `${name}  ` : name) : name.slice(0, 4);
                // const shortName = name.includes('ETF') ? name : (name.length === 3 ? name : (name.slice(0, 2) + '  '));
                // const shortName = name.includes('ETF') ? name : name.slice(0, 2);

                const percent = list2[2] ? Number(list2[2]) : 0;
                const shortPer = percent.toFixed(1);

                const max = list2[3] ? Number(list2[3]) : num;
                const discount = !max ? 0 : (((max - num) / max) * 100).toFixed(1);
                const show = discount > 50 ? '' : (discount >= 10 ? ` -${Math.floor(discount) + 1}%` : `-${discount}%`);

                const mapItem = {
                  name: shortName.includes('新 希') || shortName.includes('酒') ? `${shortName}  ` : (shortName.length > 3 ? shortName : `${shortName}  `),
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
  // console.clear();
  fetch(total);
  // console.log('---敬畏市场，控制回撤---');
}, 10000);

app.listen(8888, () => {
  console.log('开启服务，端口8888');
});
