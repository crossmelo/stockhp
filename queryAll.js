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
  // 'sz002384', // dongshan
  'sz002273', // shuijing
  'sz003021', // zhaoweijidian
  // 'sz002876', // sanlipu
  // 'sz000810', // chuangwei
  // 'sh688001', // huaxing
  'sh688496', // qingyue
  'sh603722', // akeli
  // 'sz002045', // guoguang
  'sz301312', // zhilifang
  'sz300556', // silu
  'sz000681', // shijue
  'sh688039', // danghong
  'sh688088', // hongruan
  'sh603186', // huazheng
  'sz002436', // xingsen
  'sz300476', // shenghong
  'sh688401', // luwei
  'sh688138', // qingyi
];
const arr2 = [
  'sz300474', // jingjiawei
  'sh688256', // hanwuji
  'sz300499', // gaolan
  'sz300684', // zhongshi
  'sz300913', // zhaolong
  'sh603083', // jianqiao
  'sz300308', // zhongji
  'sz002281', // guangxun
  'sz300502', // xinyisheng
  'sz300620', // guangku
  'sz301205', // liante
  'sz300570', // taichenguang
  'sz300394', // tianfu
  'sz002229', // hongbo
  'sz300624', // wanxing
  'sz300418', // kunlun
  'sz002261', // tuowei
  'sz300229', // tuoersi
  // 'sz300785', // zhidemai
  'sz300058', // guangbiao
  'sz300678', // zhongkexinxi
  'sz301110', // qingmu
  'sh603918', // jinqiao
  // 'sh603171', // shuiyou
  'sz300033', // tonghuashun
  'sh688787', // haitian
  'sh688343', // yuntian
];
const arr3 = [
  // 'sz300831', // pairui
  // 'sz002079', // good
  // 'sz000670', // yingfangwei
  // 'sz003026', // zhongjingkeji
  // 'sh688261', // dongwei
  // 'sh688187', // shidai
  // 'sh688711', // hongwei
  // 'sh603290', // sida
  // 'sh688396', // huarun
  // 'sh605111', // xinjieneng
  // 'sh600460', // shilanwei
  'sz002371', // huachuang
  'sh688012', // zhongwei
  'sz300604', // changchuan
  'sh600641', // wanye
  'sz002338', // aopu
  'sh600895', // zhangjianggaoke
  'sz002222', // fujing
  'sh688195', // tengjing
  // 'sh688037', // xinyuanwei
  // 'sh688383', // xinyichang
  // 'sh603690', // zhichun
  // 'sh688082', // shengmei
  // 'sz300327', // zhongying
  'sh688525', // baiwei
  'sz000021', // shenkeji
  'sz002654', // wanrun
  'sz300655', // jingrui
  'sz300576', // rongda
  // 'sz300346', // nanda
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
  'sh603986', // zhaoyi
  // 'sh603160', // huiding
  // 'sz300661', // shengbang
  'sz300458', // quanzhi
  'sh603893', // ruixinwei
  'sz002156', // tongfu
  'sh600584', // changdian
  'sz300480', // guangli
];
const arr4 = [
  'sh601858', // kechuan 
  'sh601949', // chuban
  'sh601595', // shanghaidianying 
  'sz300182', // jiecheng
  'sz300280', // zitian
  'sz300031', // baotong
  'sz300533', // bingchuan
  'sz300002', // shenzhouyuetai
  'sz300188', // meiya
  'sh688030', // shanshi
  'sz301165', // ruijie
  'sz300075', // shuzizhengtong
  // 'sz300579', // shurirenzheng
  'sz301153', // zhongkejiangnan
  // 'sz002063', // yuanguang
  'sh603636', // nanwei
  // 'sz003040', // chutiankong
  // 'sz002235', // anni
  'sz300339', // runhe
  'sz300479', // shensi
  'sz300546', // xiongdi
  'sz000032', // shensangda
  'sh600536', // zhongruan
  // 'sz000066', // changcheng
  'sz002368', // taiji
  'sz002528', // yingfeituo
  // 'sz000815', // meiliyun
  'sz300212', // yihualu
  'sz002268', // dianke
  'sz300061', // qitian
  'sz000948', // nantian
];
const arr5 = [
  // 'sz300124', // huichuan
  'sz300545', // liande
  'sz300024', // jiqiren
  'sh603728', // mingzhi
  'sz002334', // yingweiteng
  'sh688700', // dongwei
  'sh688017', // lvde
  'sz300161', // huazhong
  'sz002559', // yawei
  'sz300607', // tuosida
  'sh603666', // yijiahe
  'sh688025', // jiepute
  'sh688218', // suzhou
  'sz002896', // zhongda
  // 'sz000837', // qinchuang
  'sh688322', // aobi
  'sh688686', // aopute
  'sz002747', // aisidun
  'sz002553', // nanfang
  'sz002077', // dagang
  'sz300373', // yangjie
  'sh605358', // liang
  // 'sh688234', // tianyue
  'sh603595', // dongni
  // 'sh600703', // sanan
  'sz002617', // luxiao
  'sh600705', // zhonghangchanrong
  'sz300699', // guangwei
  'sz002933', // xinxing
];
const arr6 = [
  'sh600415', // shazhucheng
  'sh603773', // woge
  'sz300820', // yingjie
  'sz300226', // ganglian
  // 'sz002176', // jiangte
  // 'sz002192', // rongjie
  // 'sz002466', // tianqi
  'sz002738', // zhongkuang
  // 'sz002460', // ganfeng
  // 'sz002756', // yongxing
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
  'sh603305', // xusheng
  'sz002518', // keshida
  // 'sz002335', // kehua
  // 'sz300693', // shenghong
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
  // 'sz002459', // jingao
  // 'sz300118', // risheng
  // 'sh603185', // shangji
  // 'sz300724', // jjwc
  // 'sz300776', // dier
  // 'sz300274', // yangguang
  // 'sh600438', // tongwei
  // 'sz002129', // zhonghuan
  // 'sz002487', // dajin
  // 'sh600487', // hengtong
  // 'sz002882', // jinlongyu
  'sz002167', // gaoye
  // 'sh603200', // xiba
  'sh603255', // djd
  // 'sz002915', // zhongxinfucai
  'sz002992', // baoming
  'sz002529', // haiyuan
  'sh688630', // xinqi
  // 'sz002846', // yinglian
  'sz002866', // chuanyi
  'sh600152', // weike
  'sz002585', // shuangxing
  'sh603398', // mubang
  'sh600096', // yuntianhua
];
const arr7 = [
  'sh000001',
  'sz399006',
  'sh510050', 
  'sh588050', 
  'sh513130',
  // 'sh512690',
  // 'sh512170',
  // 'sh516160',
  // 'sz159755',
  // 'sh515790',
  // 'sh512480', 
  'sh588200', // kechuangxinpian
  'sh688981', // zhongxin
  'sz300750',
  // 'sh601012', // longji
  // 'sh600519', // maotai
  'sh600030', // zhongxin
  // 'sz300059', // dongcai
  // 'sh601628', // renshou
  // 'sh600036', // zhaoshang
  // 'sz000001', // pingyin
  // 'sz002594', // byd
  // 'sh601899', // zijin
  'sh601857', // zhongshiyou
  'sh601728', // dianxin
  // 'sh601088', // shenhua
  // 'sh600900', // changjiang
  // 'sh600150', // zhongchuan
  'sh600072', // zhongchuankeji
  'sh601698', // weitong
  'sh600118', // weixing
  // 'sz000831', // zhongxi
  // 'sz300114', // diance
  // 'sz300124', // huichuan
  'sh603000', // renmin
  'sh603888', // xinhua
  'sz000977', // langchao
  'sh603019', // shuguang
  'sz002463', // hudian
  'sh601138', // fulian
  'sh601360', // 360
  'sz002230', // xunfei
  'sz300316', // jingsheng
  'sz002183', // yiyatong
  'sh601636', // qibing
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
              ele[0].name, ele[0].num, ele[0].percent >= 3 ? `${ele[0].shortPer}%`.yellow : ele[0].percent <= -4 ? `${ele[0].shortPer}%`.green : `${ele[0].shortPer}%`, ele[0].discount > 1 ? ele[0].show.red : ele[0].show, '|',
              ele[1].name, ele[1].num, ele[1].percent >= 3 ? `${ele[1].shortPer}%`.yellow : ele[1].percent <= -4 ? `${ele[1].shortPer}%`.green : `${ele[1].shortPer}%`, ele[1].discount > 1 ? ele[1].show.red : ele[1].show, '|',
              ele[2].name, ele[2].num, ele[2].percent >= 3 ? `${ele[2].shortPer}%`.yellow : ele[2].percent <= -4 ? `${ele[2].shortPer}%`.green : `${ele[2].shortPer}%`, ele[2].discount > 1 ? ele[2].show.red : ele[2].show, '|',
              ele[3].name, ele[3].num, ele[3].percent >= 3 ? `${ele[3].shortPer}%`.yellow : ele[3].percent <= -4 ? `${ele[3].shortPer}%`.green : `${ele[3].shortPer}%`, ele[3].discount > 1 ? ele[3].show.red : ele[3].show, '|',
              ele[4].name, ele[4].num, ele[4].percent >= 3 ? `${ele[4].shortPer}%`.yellow : ele[4].percent <= -4 ? `${ele[4].shortPer}%`.green : `${ele[4].shortPer}%`, ele[4].discount > 1 ? ele[4].show.red : ele[4].show, '|',
              ele[5].name, ele[5].num, ele[5].percent >= 3 ? `${ele[5].shortPer}%`.yellow : ele[5].percent <= -4 ? `${ele[5].shortPer}%`.green : `${ele[5].shortPer}%`, ele[5].discount > 1 ? ele[5].show.red : ele[5].show, '|',
              ele[6].name, ele[6].num, ele[6].percent >= 3 ? `${ele[6].shortPer}%`.yellow : ele[6].percent <= -4 ? `${ele[6].shortPer}%`.green : `${ele[6].shortPer}%`, ele[6].discount > 1 ? ele[6].show.red : ele[6].show
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
