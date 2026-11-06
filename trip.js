export const hotels = {
  kobe: 'Hotel Monte Hermana Kobe Amalie',
  osaka: 'Hearton Hotel Kita Umeda',
  kyoto: 'KOKO HOTEL Kyoto Shijo Karasuma'
};
const map = (origin, destination, travelmode = 'walking', label) => [
  label ?? '去 ' + destination.replace(/, .+$/, ''), 'https://www.google.com/maps/dir/?' + new URLSearchParams({api: '1', origin, destination, travelmode})
];
const link = (label, href) => [label, href];
const kobeStation = 'JR 三ノ宮駅, 神戸市';
const osakaStation = 'JR 大阪駅, 大阪市';
const umedaStation = '阪急 大阪梅田駅, 大阪市';
const karasuma = '阪急 烏丸駅, 京都市';
const kix = '関西国際空港 第1ターミナル';
const h2 = '京都駅八条口 H2 関西空港リムジンバス';
const hanshin = '阪神梅田本店';
const hankyu = '阪急うめだ本店';
const harbor = 'メリケンパーク BE KOBE';
const ca = 'サ・マーシュ Ça Marche 神戸';
const amam = 'AMAM DACOTAN 京都';
const eikando = '永観堂 禅林寺';
const cityGroup = 'https://s.klook.cn/c/mXbM8YMxxw';
const airwait = link('AirWAIT 当天取号', 'https://airwait.jp/WCSP/storeDetail/?storeNo=AKR7147855630');
const lawson = link('Lawson Loppi 取票图解', 'https://bus.norimono.jp/bus/popA.html');
const books = link('梅田不迷路指南', 'https://xhslink.cn/o/8fMH4WvnlbT');
const yodobashi = link('友都八喜全楼层', 'https://www.yodobashi.com/ec/store/floor/0081/');
const bal = link('京都 BAL 全楼层', 'https://www.bal-bldg.com/kyoto/floor-map/');
const hanshinFloors = link('阪神全楼层', 'https://www.hanshin-dept.jp/hshonten/floor/');
const kobeFloors = link('神户阪急全楼层', 'https://www.hankyu-dept.co.jp/kobe/floor/index.html');
const hepFloors = link('HEP FIVE 逐层店铺图', 'https://www.hepfive.jp/floor');
const lucuaFloors = link('LUCUA 两馆逐层目录', 'https://www.lucua.jp/floormap/');
const c = (time,title,body,links=[],category='',detail='') => ({time,title,body,links,category,detail});
const d = (city,title,focus,cards) => ({city,title,focus,cards});

export const days = {
  11: d('神户','落地、三宫购物','先放行李。晚到时优先 ASICS 和神户阪急。',[
    c('09:00 → 12:10','ZH673 · 无锡硕放 T1 → 关西机场 T1','入境后取托运行李，出到达大厅找「神戸三宮」机场巴士。原计划 T1 到达层外 6 号站台，现场以当天指示为准。',[
      link('关西机场 → 神户大巴攻略','https://xhslink.cn/o/45kG7V1eV0P'),
      link('神户线官方时刻表','https://www.kate.co.jp/timetable/detail/KB')]),
    c('参考 14:00 → 15:05','机场巴士 → 神户三宫','按出关时间选实际班次。跟「神戸三宮」方向，在站旁购票或按现场指引支付；交大箱子放入车下行李舱，下车后取回。',[
      map(kix,'神戸三宮 空港リムジンバス','transit','查机场到三宫')],'交通'),
    c('15:00 起办理入住','三宫下车 → 神户酒店','到 Hotel Monte Hermana Kobe Amalie。拿房卡、把大箱子放房间，再带轻便包出门。',[
      map('神戸三宮 空港リムジンバス',hotels.kobe)]),
    c('到店后看排队','HARBS Crefi 三宫店','吃水果千层。若晚到或排队挤占购物时间，先去试鞋和彩妆。',[map(hotels.kobe,'HARBS クレフィ三宮店')],'餐饮'),
    c('傍晚','ASICS KOBE','试鞋前备好常穿尺码和目标款式。试完接神户阪急。',[map('HARBS クレフィ三宮店','ASICS KOBE'),map(hotels.kobe,'ASICS KOBE','walking','从酒店直接去')],'购物'),
    c('傍晚 · 本馆 2F','神户阪急「神戸阪急」','从本馆进，上 2F HANKYU BEAUTY。ADDICTION、SUQQU、RMK、JILL STUART 都在这里，先试清单色号。',[
      map('ASICS KOBE','神戸阪急'),link('本馆 2F 柜位图','https://www.hankyu-dept.co.jp/kobe/floor/floor2f.html'),kobeFloors,link('品牌查柜位','https://www.hankyu-dept.co.jp/kobe/brand/index.html')],'购物',
      '想加逛可去本馆 3F 鞋包、4F 女装家居、6F 神户服饰与杂货，或到新馆 2F 看 MM6、Chloé、Maison Margiela、NOSE SHOP。糕点伴手礼留到本馆 B1，买完去晚餐。'),
    c('晚上','三宫晚餐 → 回酒店','餐厅随当天时间决定。回房把鞋和化妆品归位，第二天轻装出门。',[map('神戸阪急',hotels.kobe)])
  ]),
  12: d('神户','剪发、面包和港口','10:30 SHEL+L 已预约 · 面包放回房后休息整整 1 小时',[
    c('早上','Blank brunch → Flower Bakery','吐司出炉前只短停。若还没开卖或队伍长，按 10:30 理发倒推离开时间。买到的面包中午一起带回房间。',[
      map(hotels.kobe,'blank 神戸 ブランク カフェ'),map('blank 神戸 ブランク カフェ','Flower Bakery 神戸')],'餐饮'),
    c('10:30 · 已预约','SHEL+L 剪发和护理','预留约 1–2 小时。沟通时可用翻译软件，想要的发型图先存手机。',[
      map('Flower Bakery 神戸','SHEL+L 神戸 美容室')],'其他'),
    c('剪完后','Ça Marche「サ・マーシュ」','剪完去买面包。按笔记挑选，怕压的和重物分开放。',[
      map('SHEL+L 神戸 美容室',ca),link('小红书｜面包怎么选','https://xhslink.cn/o/86MVZMBGlR5')],'餐饮'),
    c('固定停留','回酒店放面包 → 房间休息一小时','从放好面包开始算满 1 小时。面包店离店到再次走出酒店合计预留 1 小时 20–30 分钟。例如 13:00 买完，约 14:20–14:30 再出门。',[map(ca,hotels.kobe,'walking','面包店 → 酒店')]),
    c('下午 · 从酒店重新出发','美利坚公园 BE KOBE','先拍 BE KOBE，同区顺看神户铁塔和海边星巴克。有余裕再沿海边走去 MOSAIC。',[map(hotels.kobe,harbor,'walking','酒店 → BE KOBE')]),
    c('弹性','MOSAIC／umie、面包超人周边','按余下时间挑纪念品店、果酱爷爷面包房、IP 商店或 MOSAIC 摩天轮。旧居留地购物仍待选日期，若落在今天就从此段腾时间。',[
      map(harbor,'神戸ハーバーランド umie MOSAIC'),link('umie 官方楼层图','https://umie.jp/floorguide')],'购物'),
    c('晚上 · 到店时间待确认','立ち食い 一切れ焼肉 松田','神户唯一一顿烤肉。单人订位状态待确认；若下午延误，缩短港区购物，保留休息和晚餐。',[
      map('神戸ハーバーランド umie MOSAIC','立ち食い 一切れ焼肉 松田 神戸'),map(harbor,'立ち食い 一切れ焼肉 松田 神戸','walking','从 BE KOBE 出发')],'餐饮')
  ]),
  13: d('神户','虎鲸、舞子拍照','优先上午虎鲸场，11:45 是旧稿参考，开场与票务待确认。',[
    c('上午 · 按虎鲸开场倒推','JR 三ノ宮 → JR 須磨海浜公園','从酒店到 JR 三ノ宮。找停「須磨海浜公園」的普通列车，下车后走到海洋世界入口，给入馆和找座留时间。',[
      map(hotels.kobe,kobeStation),map(kobeStation,'JR 須磨海浜公園駅','transit','查 JR 班次'),map('JR 須磨海浜公園駅','神戸須磨シーワールド')],'交通'),
    c('上午 · 待核实','须磨海洋世界 · 虎鲸','只看一场表演。先看官方当日表演日历，再确认入馆票。',[
      link('官方表演日历','https://www.kobesuma-seaworld.jp/guide/schedule/'),link('官方票务','https://www.kobesuma-seaworld.jp/ticket/')],'门票／体验'),
    c('午后 · 拍摄约两小时','须磨 → JR 舞子站 → 舞子公园','看完回 JR 須磨海浜公園站，查往舞子方向的列车。午饭和换装各留一段。会合点由摄影师确认，车站一带和海边沙滩都留拍摄时间，收工后走回 JR 舞子站。',[
      map('JR 須磨海浜公園駅','JR 舞子駅','transit','须磨 → 舞子'),map('JR 舞子駅','兵庫県立舞子公園')],'门票／体验'),
    c('傍晚','JR 舞子 → 三宫 → Café & Bar Anthem','拍完查往三宫的 JR。先放拍摄包还是直接去 Anthem，留两个入口。17:00–18:00 是原计划到店区间，按收工时间走。',[
      map('JR 舞子駅',kobeStation,'transit','查返程 JR'),map(kobeStation,'cafe & bar anthem 神戸','walking','三宫站 → Anthem'),map(hotels.kobe,'cafe & bar anthem 神戸','walking','酒店 → Anthem')],'餐饮')
  ]),
  14: d('大阪','阪神、阪急、友都八喜','走二楼步道桥。大件先交前台，交件时间以配送订单为准。',[
    c('早上 · 交件时间待确认','神户酒店交行李 → 退房','Smooth Porter 目标当天送到大阪 Hearton。证件、药、手机和充电宝随身。退房前看床边、浴室、插座与房卡。'),
    c('离开神户前','买 .donut 本店','取货时间按订单。Karma 暂列上午，只有能接上交件和大阪午餐时才去。买好的面包单独随身，防挤压。',[
      map(hotels.kobe,'.donut 本店 神戸'),map('.donut 本店 神戸',kobeStation,'walking','取完面包 → JR 三ノ宮')],'餐饮'),
    c('上午至中午','JR 三ノ宮 → JR 大阪','找往大阪／京都方向的 JR 神户线。新快速是原定走法，出发前点开查实时班次，确认停 JR 大阪。',[
      map(kobeStation,osakaStation,'transit','查实时 JR 路线')],'交通'),
    c('到大阪先放随身东西','JR 大阪站 → Hearton Hotel Kita Umeda','酒店前台寄存随身包，是否可放面包现场问。若已能入住，就先放进房间。晚上回来查大件是否送到。',[
      map(osakaStation,hotels.osaka,'walking','大阪站 → 酒店')]),
    c('午餐 · 9F','阪神梅田本店 · BOTANI:CURRY','从酒店去招牌「阪神百貨店」，进馆后上 9F「阪神大食堂」。周六排队和整理券规则以门店现场为准。',[
      map(hotels.osaka,hanshin),hanshinFloors],'餐饮'),
    c('下午 · 2F 连廊','阪神 9F → 2F → 阪急 2F','饭后下到阪神 2F，找「歩道橋」出口。上梅田新歩道橋，认「阪急うめだ本店」方向的桥支，到阪急 2F 入口。', [books]),
    c('2F → 4F → 2F','阪急うめだ本店 · Repetto','进来是 2F，神户没买齐的彩妆可在阪急补，按品牌查实际柜位。Repetto 上 4F 试穿，逛完回 2F 连廊层。',[
      link('Repetto 4F','https://www.repetto.jp/stockdata/?c=umeda&smp=pc'),link('阪急全馆目录','https://www.hankyu-dept.co.jp/honten/floor/')],'购物'),
    c('2F 连廊','阪急 → JR 大阪站 → 友都八喜','从阪急 2F 回步道桥，走 JR 大阪站／大丸方向。穿过站区公共通道向北侧 LUCUA／「カリヨン広場」，跟「ヨドバシ梅田」过桥，进友都八喜 2F。'),
    c('晚饭前 · 7F → 8F','LINKS UMEDA · 美瞳与晚餐','同栋楼找 LINKS UMEDA。7F Heart Up 可用包装图、花色和度数问货，再上 8F 选餐厅。美瞳库存以柜台为准。',[
      link('Heart Up 店铺页','https://www.heart-up.com/comshop/osaka/shop.php?shopId=86'),link('LINKS 全馆及餐饮','https://links-umeda.jp/')],'餐饮'),
    c('晚饭后 · 从高到低','友都八喜梅田「ヨドバシ梅田」','重点 5F 玩具 → 2F 相机、手表、香水 → 1F 药品、洗护和手机配件。1F 买完重物，直接出门回酒店。',[
      yodobashi,map('ヨドバシカメラ マルチメディア梅田',hotels.osaka,'walking','友都八喜 → 酒店')],'购物',
      '想看厨房家电和按摩设备就停 4F，想试耳机音响就停 3F。B1 是电脑配件，B2 有自行车等。回房先确认大箱子送达，再收购物袋。')
  ]),
  15: d('大阪','LUCUA 两馆、芭菲和试衣','先找招牌「LUCUA／ルクア」，2F lululemon。西馆招牌是「LUCUA 1100／ルクア イーレ」。',[
    c('10:30 左右 · LUCUA 2F','LUCUA（东馆）· lululemon','从酒店到 JR 大阪站旁的 LUCUA。先试穿，逛完留在 2F，从「アトリウム広場」过到 LUCUA 1100。',[
      map(hotels.osaka,'LUCUA Osaka ルクア'),link('LUCUA 2F 店铺图','https://www.lucua.jp/ko/floormap/lucua_2_ko.html'),lucuaFloors],'购物'),
    c('上午至中午 · 西馆由高到低','LUCUA 1100（西馆）· 6F → 3F → 2F → 1F','从 2F 中庭广场进西馆，直接上 6F mont-bell；下 3F @cosme OSAKA 买彩妆、粉扑；下 2F SHIRO；下 1F 三丽鸥。买完先休息或吃简餐，再接下一段。',[lucuaFloors],'购物'),
    c('下午 · 2F 进阪神','LUCUA 1100 → 阪神梅田本店 B2','从西馆 1F 回到 2F，往 JR 大阪站／大丸侧公共通道走，接梅田新歩道橋，按阪神方向从阪神 2F 进。店内下 B2 找「オホーツク おこっぺミルクスタンド」。草莓芭菲看当天供应。',[
      link('阪神 B2 店铺图','https://www.hanshin-dept.jp/hshonten/floor/floorb2.html'),hanshinFloors,books],'餐饮'),
    c('下午 · 试衣','阪神 → HEP FIVE 1F','芭菲吃完从 B2 上 2F，过步道桥到阪急侧再下到地面，经 HEP NAVIO 方向找红色摩天轮，从 HEP FIVE 1F 进。先圈想试的店，上最高目标层再逐层下来。',[
      hepFloors,map(hankyu,'HEP FIVE','walking','阪急侧地面 → HEP FIVE')],'购物'),
    c('傍晚','HEP FIVE 1F → EST FOODHALL · FLIPPER’S','从 HEP FIVE 1F 出，走地面到相邻的 EST，找 FOODHALL。进 HEP FIVE 时先确认松饼店最后点单，给排队留时间。',[
      map('HEP FIVE','FLIPPERS 梅田エスト店'),link('EST 店铺图','https://www.est-sc.com/floormap/'),link('FLIPPER’S 官方页','https://www.est-sc.com/shop_guide/index.php?c=shop_guide_view&pk=1585190782')],'餐饮'),
    c('晚上','回酒店收箱','按缺货清单决定要不要去 DONKI 或友都八喜。回酒店先把衣服、彩妆和零碎装箱，次日用品另放。',[
      map('EST 梅田',hotels.osaka)])
  ]),
  16: d('京都','换城、AMAM 和河原町','先交大件。AMAM 取号时把大阪到京都的车程算进去。',[
    c('早上 · 交件时间待确认','大阪酒店交大件 → 京都','Smooth Porter 目标当天送 KOKO。交件后检查房间再退房。从阪急大阪梅田乘阪急京都线，暂按乌丸站下车接酒店；以实时路线和出口指示为准。',[
      map(hotels.osaka,umedaStation),map(umedaStation,karasuma,'transit','查阪急京都线'),map(karasuma,hotels.kyoto,'walking','乌丸站 → 京都酒店')],'交通'),
    c('07:30 起取号 · 日本时间','AMAM DACOTAN 京都店','AirWAIT 是当天排队。08:00 起按号入店，叫号后 30 分钟内到店。还在大阪时先看能否赶到。时间足就先到 KOKO 寄存随身包；快叫到且轻装就从乌丸站直去。',[
      airwait,link('小红书｜手机取号教程','https://xhslink.cn/o/6dkGVC4mWDK'),link('官方叫号规则','https://peaceput.com/news/2026-03-01-8uje4qjkmnjb/'),map(hotels.kyoto,amam,'walking','酒店 → AMAM'),map(karasuma,amam,'walking','乌丸站 → AMAM'),map(amam,hotels.kyoto,'walking','买完回房放面包')],'餐饮',
      '若买了好几袋或怕压，买完先回酒店放；轻装且数量少可直接去 BAL。酒店正式入住前能否寄存按前台安排。'),
    c('下午 · 京都 BAL','5F MUJI → 3F lululemon','先进 5F 逛 MUJI。想喝咖啡可顺停 4F Café&Meal MUJI，再下到 3F 试 lululemon。逛完从街面出口走 SOU・SOU。',[
      map(hotels.kyoto,'京都BAL'),map(amam,'京都BAL','walking','AMAM → 京都 BAL'),bal],'购物'),
    c('下午 · 新京极一带','SOU・SOU 一条街','按招牌选店。着衣看女装，足袋看分趾鞋袜，布袋看包，伊勢木綿看手帕织物，おくりもの看文具礼物。足袋按现行店铺图找中之町 578-1。',[
      map('京都BAL','SOU・SOU 着衣 京都'),link('SOU・SOU 官方门店与地图','https://www.sousou.co.jp/pages/store-info')],'购物'),
    c('晚上','DONKI 四条河原町店 → 回 KOKO','找「ドン・キホーテ 四条河原町店」。药妆、美瞳和重日用品放最后，买完回酒店。确认大箱子到达、直板夹已留，整理第二天拍摄包。',[
      map('SOU・SOU 着衣 京都','ドン・キホーテ 四条河原町店'),map('ドン・キホーテ 四条河原町店',hotels.kyoto,'walking','DONKI → 酒店')],'购物'),
    c('到京都后 · 以付款期限为准','找 Lawson 付款、取巴士纸票','先看完整订单的付款期限。符合期限时可当天就取票，纸票放证件夹。详细操作见预约页。',[lawson])
  ]),
  17: d('京都','便服、和服两套红叶拍摄','10:30 摄影师会合；上午地点、妆造和归还时间、拍摄许可待落实。',[
    c('10:30 · 地点待确认','上午便服拍摄','与摄影师确认具体寺院、哪扇门或哪个地标。拍 1.5–2 小时，约 12:00–12:30 结束。出门前把约定地点截图。',[ ],'门票／体验'),
    c('中午 · 约一小时妆造','京都一番星 · 换和服','午饭、做妆造、去永观堂分开预留。先问换下的便服、鞋和随身包能否放和服店，还衣时一起拿；不能寄存就准备轻便袋。',[],'门票／体验'),
    c('下午 · 拍摄许可待确认','永观堂拍摄 → 回店归还','下午预留约两小时。先确认寺院对带摄影师拍摄的规则，按和服店最晚归还时间倒推离开永观堂的时间。堂内文化财依寺院公告执行。',[
      link('永观堂参拜说明','https://www.eikando.or.jp/mobile_jp/mb_haikan.html'),map(eikando,hotels.kyoto,'transit','永观堂 → 京都酒店')],'门票／体验',
      '出发导航和还衣导航待妆造门店地址确认后锁定。归还时取回寄存便服和包。')
  ]),
  18: d('宇治','Moment Coffee 和抹茶一日','五项必去：中村藤吉、FUKUCHA、平等院、宇治川、APPRO。',[
    c('早上','Moment Coffee Kyoto','先吃 DIY 吐司，早餐结束后再选宇治车次。',[
      map(hotels.kyoto,'Moment Coffee Kyoto'),map('Moment Coffee Kyoto','京阪 宇治駅','transit','早餐店 → 京阪宇治')],'餐饮'),
    c('抵达宇治','平等院 · 先看凤凰堂内部券','从京阪宇治站过宇治桥。若想进凤凰堂内部，先查看现场限量时段券；只逛庭园则可按甜品店排队情况换顺序。',[
      map('京阪 宇治駅','平等院 宇治'),link('平等院官方参观信息','https://www.byodoin.or.jp/guide/')],'门票／体验'),
    c('中午至午后','中村藤吉平等院店 → FUKUCHA','中村藤吉认「平等院店」，按现场排队，想吃抹茶芭菲。再去 FUKUCHA 买抹茶牛奶。若凤凰堂约了时段，按券上时间回去。',[
      map('平等院 宇治','中村藤吉 平等院店'),map('中村藤吉 平等院店','茶寮 FUKUCHA 宇治店')],'餐饮'),
    c('下午','宇治川散步 → APPRO → JR 宇治站','先沿宇治川走红叶步道。有余量再加神社或辻利兵卫本店。最后去「食品館アプロ 宇治店」买抹茶零食，购物袋直接带上回程。',[
      map('茶寮 FUKUCHA 宇治店','宇治公園'),map('宇治公園','食品館アプロ 宇治店'),map('食品館アプロ 宇治店','JR 宇治駅','walking','超市 → JR 宇治站'),map('JR 宇治駅',hotels.kyoto,'transit','JR 宇治 → 京都酒店')],'购物')
  ]),
  19: d('京都','市区散步或贵船小团','18 日宇治回来后再选。两套方案都保留。',[
    c('方案 A · 上午','CLAMP COFFEE SARASA → 鸭川三角洲','早餐吃法式吐司。吃完从店出发去鸭川三角洲，再接河合神社。',[
      map(hotels.kyoto,'CLAMP COFFEE SARASA'),map('CLAMP COFFEE SARASA','鴨川デルタ','transit','早餐店 → 鸭川三角洲')],'餐饮'),
    c('方案 A · 下午','河合神社 → 糺之森 → 下鸭神社 → 出町','轻装沿林道走。回市区看时间补逛 BAL、松本清；如果返程早上赶不上开门，把药妆放今天买。',[
      map('鴨川デルタ','河合神社'),map('河合神社','下鴨神社','walking','经糺之森 → 下鸭神社'),map('下鴨神社','出町桝形商店街')]),
    c('方案 B · 小团','三千院＋贵船神社','18 日晚上再看余位。订后按订单核对集合点、签到时间、停靠站和下车点。回京都后看时间补药妆、收箱。',[
      link('Klook 小团产品',cityGroup)],'门票／体验'),
    c('两种方案共用 · 晚上','回酒店整理返程行李','确认纸票已拿到，把纸票、护照放随身包。明早是否去松本清按已订巴士时间和门店开门时间决定。')
  ]),
  20: d('返程','京都站 H2 → 关西机场','ZH674 13:10 起飞。巴士实际发车时间与付款期限在完整订单核对。',[
    c('退房前','确认纸票、护照、大箱子','Lawson 付过款拿到的「乗車券」放随身包。松本清只有在开门时间和巴士之间有余量才插入；否则用前一晚补货。',[lawson]),
    c('发车时间待确认','京都站八条口 H2 上车','从 KOKO 退房带箱子去京都站八条口。找 JR 八条口巴士转盘 H2，预留站内步行、候车和装行李时间。上车时出示 Lawson 的纸质乘车券。',[
      map(hotels.kyoto,h2,'transit','酒店 → 八条口 H2（公共交通）'),map(hotels.kyoto,h2,'walking','酒店 → 八条口 H2（步行）'),link('官方 H2 站台图','https://www.kate.co.jp/busstop/detail/3783')],'交通'),
    c('13:10 → 15:05','ZH674 · 关西机场 T1 → 无锡硕放 T1','到 T1 拿回巴士行李，按深航航班信息办理值机、托运、安检。13:10 为日本时间，15:05 为北京时间。')
  ])
};

export const bookings = [
  {id:'hair', day:12, title:'SHEL+L 理发护理',status:'已预约',body:'10:30 到店，预留约 1–2 小时。'},
  {id:'matsuda', day:12, title:'松田烤肉',status:'待确认',body:'选店已定。单人订位状态和到店时段待确认。'},
  {id:'orca',day:13,title:'须磨海洋世界入馆',status:'待确认',body:'优先上午虎鲸场。先核对当日场次和入馆票。',links:[link('官方演出日历','https://www.kobesuma-seaworld.jp/guide/schedule/')]},
  {id:'bag-osaka',day:14,title:'Smooth Porter 神户 → 大阪',status:'待确认',body:'神户酒店交前台，当日送达 Hearton。订单、交件时间和酒店配合情况待核对。',links:[link('配送说明','https://smooth-porter.jp/guide/')]},
  {id:'donut',day:14,title:'.donut 本店取货',status:'待确认',body:'计划离开神户前取。实际是否下单和时段按订单确认。'},
  {id:'bag-kyoto',day:16,title:'Smooth Porter 大阪 → 京都',status:'待确认',body:'大阪前台交件，当日送达 KOKO。京都酒店可收件，配送订单与交件时段待确认。',links:[link('配送说明','https://smooth-porter.jp/guide/')]},
  {id:'amam',day:16,title:'AMAM DACOTAN 京都',status:'当天取号',body:'日本时间 07:30 开放，08:00 起叫号。叫号后 30 分钟内到店；从大阪过来要先估计到店时间。',links:[airwait,link('小红书取号教程','https://xhslink.cn/o/6dkGVC4mWDK')]},
  {id:'photo',day:17,title:'便服＋和服拍摄',status:'已约摄影师',body:'10:30 会合，下午永观堂。上午会合地点、妆造预约和归还时间、便服寄存与拍摄许可待核实。'},
  {id:'tour',day:19,title:'三千院＋贵船神社',status:'备选',body:'18 日回来后再选，订团时看实际余位和集合点。',links:[link('Klook 产品',cityGroup)]},
  {id:'bus',day:20,title:'京都 → 关西机场 T1',status:'已预约待付款',body:'¥2,800，计划到京都后在 Lawson 付款。实际发车与付款期限请看完整邮件；截图只显示预约号与金额。',code:'11058118521',detail:'Loppi：各種サービスメニュー → 各種代金・料金お支払い → 各種代金お支払い → 予約済高速バス代金のお支払＆発券。按完整订单输入所需号码，核对班次，打印申込券。30 分钟内到收银台付日元现金，拿正式纸质乗車券。11/20 到京都站八条口 H2 上车时出示纸票。',links:[lawson,link('京都站 H2 站台图','https://www.kate.co.jp/busstop/detail/3783')]}
];
