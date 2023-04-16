const express = require('express');
const app = express();
const request = require('request');
const iconv = require('iconv-lite');
const colors = require('colors');

const arr1 = [
  'sz300253', // weining
  'sh688351', // weidian
  'sz300122', // zhifei
  'sz300142', // wosen
  'sz300171', // dongfulong
  'sz300412', // jianan
  'sz002475', // lixun
  'sz002241', // geer
  'sz300433', // lansi
  'sz002351', // manbuzhe
  'sz002600', // lingyi
  'sz300699', // guangwei
  'sz300316', // jingsheng
  'sh688686', // aopute
  'sh600096', // yuntianhua
  'sz002183', // yiyatong
  'sh601636', // qibing
  'sh603398', // mubang
  'sh600705', // zhonghangchanrong
  'sh688039', // danghong
  // 'sz301312', // zhilifang
  // 'sh600072', // zhongchuangkeji
  'sz002077', // dagang
  // 'sz002579', // zhongjingdianzi
  'sz002384', // dongshan
  'sz002273', // shuijing
  'sz002151', // beidou
];
const arr2 = [
  'sh600745', // wentai
  // 'sz300831', // pairui
  // 'sz002079', // good
  // 'sz000670', // yingfangwei
  'sz003026', // zhongjingkeji
  'sz300458', // quanzhi
  'sh603893', // ruixinwei
  'sz300474', // jingjiawei
  'sh688256', // hanwuji
  'sz000977', // langchao
  'sh603019', // shuguang
  'sh603083', // jianqiao
  'sz300308', // zhongji
  'sz002281', // guangxun
  'sz300502', // xinyisheng
  'sh688787', // haitian
  'sh601360', // 360
  'sz002230', // xunfei
  'sz300033', // tonghuashun
  'sh601519', // dazhihui
  'sz300803', // zhinanzhen
  'sz300348', // changliang
  'sz300226', // ganglian
  'sz300785', // zhidemai
  'sz300058', // guangbiao
  'sz300678', // zhongkexinxi
  'sh603171', // shuiyou
  'sz300182', // jiecheng
];
const arr3 = [
  // 'sh688261', // dongwei
  // 'sh688187', // shidai
  // 'sh688711', // hongwei
  // 'sh603290', // sida
  // 'sh605111', // xinjieneng
  // 'sh600460', // shilanwei
  'sz300373', // yangjie
  // 'sh688396', // huarun
  'sh605358', // liang
  'sz002371', // huachuang
  'sh688012', // zhongwei
  'sz300604', // changchuan
  'sh600641', // wanye
  'sz002338', // aopu
  'sh600895', // zhangjianggaoke
  'sz002222', // fujing
  // 'sh688037', // xinyuanwei
  // 'sh688383', // xinyichang
  'sh603690', // zhichun
  'sh688082', // shengmei
  'sz300327', // zhongying
  'sz300655', // jingrui
  'sz300576', // rongda
  'sz300346', // nanda
  'sh603650', // tongcheng
  'sz300666', // jiangfeng
  'sz300260', // xinlai
  'sz002409', // yake
  'sz300054', // dinglong
  // 'sh688385', // fudan
  'sz301269', // jiutian
  // 'sh688008', // lanqi
  // 'sz300782', // zhuodi
  // 'sh603501', // weier
  // 'sh603986', // zhaoyi
  // 'sh603160', // huiding
  'sz300661', // shengbang
  'sz002156', // tongfu
  'sh600584', // changdian
];
const arr4 = [
  'sh603000', // renmin
  'sh603888', // xinhua
  'sz300188', // meiya
  'sh688030', // shanshi
  'sz002268', // dianke
  'sz300075', // shuzizhengtong
  'sz300579', // shurirenzheng
  'sz301153', // zhongkejiangnan
  'sz002063', // yuanguang
  'sh603636', // nanwei
  'sz003040', // chutiankong
  'sz002235', // anni
  'sz300339', // runhe
  'sz300479', // shensi
  'sz300546', // xiongdi
  'sz300061', // qitian
  'sz000032', // shensangda
  'sh600536', // zhongruan
  'sz000066', // changcheng
  'sz300212', // yihualu
  'sz002368', // taiji
  'sz002528', // yingfeituo
  'sz000815', // meiliyun
  'sz000948', // nantian
];
const arr5 = [
  // 'sz300124', // huichuan
  'sz301200', // dazu
  'sh603728', // mingzhi
  'sz002334', // yingweiteng
  'sz002747', // aisidun
  'sh688700', // dongwei
  'sh688017', // lvde
  'sz300161', // huazhong
  'sz002248', // huadong
  'sz002559', // yawei
  'sz300607', // tuosida
  'sh603666', // yijiahe
  'sz002553', // nanfang
  'sh688025', // jiepute
  'sh688218', // suzhou
  'sz002896', // zhongda
  'sz000837', // qinchuang
  // 'sz002176', // jiangte
  'sz002192', // rongjie
  'sz002466', // tianqi
  'sz002738', // zhongkuang
  // 'sz002460', // ganfeng
  'sz002756', // yongxing
  'sz300487', // lanxiao
  'sz300631', // jiuwu
  // 'sz000408', // zangge
  // 'sz000792', // yanhu
  // 'sz002812', // enjie
  // 'sz300568', // xingyuan
  // 'sz300496', // zhongke
  // 'sz002920', // desaixiwei
  // 'sh601689', // tuopu
  // 'sz300428', // lizhong
  // 'sh603305', // xusheng
  // 'sh688234', // tianyue
  'sh603595', // dongni
  // 'sh600703', // sanan
  'sz002617', // luxiao
];
const arr6 = [
  'sz002882', // jinlongyu
  'sz002167', // gaoye
  'sh603200', // xiba
  'sh603255', // djd
  'sz002866', // chuanyi
  'sh600152', // weike
  'sz002915', // zhongxinfucai
  'sz002992', // baoming
  'sz002585', // shuangxing
  'sz002529', // haiyuan
  'sh688630', // xinqi
  'sz002846', // yinglian
  'sz002518', // keshida
  'sz002335', // kehua
  // 'sz002121', // kelu
  'sz300693', // shenghong
  // 'sz300438', // penghui
  // 'sh688063', // paineng
  'sz002837', // yingweike
  // 'sh605117', // deye
  // 'sz300827', // shangneng
  'sz000821', // jingshan
  'sz001269', // oujing
  // 'sz002865', // junda
  'sz301266', // yubangg
  'sh601137', // bowei
  'sh600732', // aixu
  // 'sh688223', // jingke
  'sz002459', // jingao
  'sz300118', // risheng
  // 'sh603185', // shangji
  'sz300724', // jjwc
  // 'sz300776', // dier
  // 'sz300274', // yangguang
  // 'sh600438', // tongwei
  // 'sz002129', // zhonghuan
  // 'sz002487', // dajin
  // 'sh600487', // hengtong
];
const arr7 = [
  'sh000001',
  'sz399006',
  'sh510050', 
  'sh588050', 
  'sh513130',
  'sh512690',
  'sh512170',
  'sh516160',
  'sz159755',
  'sh515790',
  'sh512480', 
  'sh588200', // kechuangxinpian
  'sz300750',
  'sh601012', // longji
  // 'sh600519', // maotai
  'sh600030', // zhongxin
  'sz300059', // dongcai
  // 'sh601628', // renshou
  // 'sh600036', // zhaoshang
  // 'sz000001', // pingyin
  'sh688981', // zhongxin
  // 'sz002594', // byd
  'sh601899', // zijin
  // 'sh601088', // shenhua
  // 'sh600900', // changjiang
  'sh600150', // zhongchuan
  'sh601728', // dianxin
  'sh601698', // weitong
  'sh600118', // weixing
  'sz000831', // zhongxi
  'sz300114', // diance
  // 'sz300124', // huichuan
];

const map1 = {};
const map2 = {};
const map3 = {};
const map4 = {};
const map5 = {};
const map6 = {};
const map7 = {};

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
arr6.forEach((ele, index) => {
  map6[ele] = index;
})
arr7.forEach((ele, index) => {
  map7[ele] = index;
})

// console.log(arr1.length, arr2.length, arr3.length, arr4.length, arr5.length, arr6.length, arr7.length);
const arr = [...arr1, arr2, arr3, arr4, arr5, arr6, arr7];
const total = arr.join();

function fetch(total) {
  return new Promise((resolve, reject) => {
    const url = `http://qt.gtimg.cn/r=${Math.random()}q=${total}`;
    request({ url: url, encoding: null }, (err, response, body) => {
      // console.clear(); // 可以清屏防止卡顿
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
                const shortName = (name.includes('ETF') || name.includes('TCL')) ? name : name.slice(0, 4).replace('-', '');
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
                } else if (arr6.includes(code)) {
                  mapList[map6[code]].push(mapItem);
                } else if (arr7.includes(code)) {
                  mapList[map7[code]].push(mapItem);
                }

              } catch (error) {}
            }
          });
        console.clear(); // 可以清屏防止卡顿
        mapList.forEach(ele => {
          try {
            console.log(
              ele[0].name, ele[0].num, ele[0].percent >= 3 ? `${ele[0].shortPer}%`.yellow : `${ele[0].shortPer}%`, ele[0].discount > 1 ? ele[0].show.red : ele[0].show, '|',
              ele[1].name, ele[1].num, ele[1].percent >= 3 ? `${ele[1].shortPer}%`.yellow : `${ele[1].shortPer}%`, ele[1].discount > 1 ? ele[1].show.red : ele[1].show, '|',
              ele[2].name, ele[2].num, ele[2].percent >= 3 ? `${ele[2].shortPer}%`.yellow : `${ele[2].shortPer}%`, ele[2].discount > 1 ? ele[2].show.red : ele[2].show, '|',
              ele[3].name, ele[3].num, ele[3].percent >= 3 ? `${ele[3].shortPer}%`.yellow : `${ele[3].shortPer}%`, ele[3].discount > 1 ? ele[3].show.red : ele[3].show, '|',
              ele[4].name, ele[4].num, ele[4].percent >= 3 ? `${ele[4].shortPer}%`.yellow : `${ele[4].shortPer}%`, ele[4].discount > 1 ? ele[4].show.red : ele[4].show, '|',
              ele[5].name, ele[5].num, ele[5].percent >= 3 ? `${ele[5].shortPer}%`.yellow : `${ele[5].shortPer}%`, ele[5].discount > 1 ? ele[5].show.red : ele[5].show, '|',
              ele[6].name, ele[6].num, ele[6].percent >= 3 ? `${ele[6].shortPer}%`.yellow : `${ele[6].shortPer}%`, ele[6].discount > 1 ? ele[6].show.red : ele[6].show
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
