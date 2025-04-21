// 実績データの定義
const achievementsData = {
  nihonSankei: {
    title: "日本三景",
    type: "list",
    spots: {
      amanohashidate: {
        name: "天橋立",
        dates: ["2024-05-03"],
        coordinates: [35.56988273017662, 135.1918669565685],
      },
      matsushima: {
        name: "松島",
        dates: ["2019-08-13"],
        coordinates: [38.36871093676138, 141.06334161173962],
      },
      miyajima: {
        name: "宮島",
        dates: ["2017-03-14"],
        coordinates: [34.29598381599792, 132.31983402362258],
      },
    },
  },
  shinNihonHakkei: {
    title: "新日本八景",
    type: "list",
    spots: {
      murotomisaki: {
        name: "室戸岬",
        dates: ["2021-03-26"],
        coordinates: [33.24496605391711, 134.17652734687914],
      },
      towadako: {
        name: "十和田湖",
        dates: ["2021-09-01"],
        coordinates: [40.469603472541735, 140.88640410315762],
      },
      onsentake: {
        name: "温泉岳（雲仙岳）",
        dates: ["2023-10-06"],
        coordinates: [32.780413495468984, 130.26724073274684],
      },
      kisogawa: {
        name: "木曽川",
        dates: ["2018-05-03"],
        coordinates: [35.39299665217276, 136.94539837446166],
      },
      kamikochi: {
        name: "上高地",
        dates: [],
        coordinates: [36.248736299092386, 137.63812154144924],
      },
      kegonnotaki: {
        name: "華厳滝",
        dates: ["2024-08-31"],
        coordinates: [36.73784098692607, 139.50403549776578],
      },
      beppuonsen: {
        name: "別府温泉",
        dates: ["2025-03-24"],
        coordinates: [33.31617362621019, 131.4777995690647],
      },
      karikachitoge: {
        name: "狩勝峠",
        dates: ["2024-06-05"],
        coordinates: [43.13601959291394, 142.76488124783648],
      },
    },
  },
  nihonNijuugoshou: {
    title: "日本二十五勝",
    type: "list",
    spots: {
      yashima: {
        name: "屋島",
        dates: ["2022-08-20"],
        coordinates: [34.35942821684223, 134.10252158608236],
      },
      tomonoura: {
        name: "鞆の浦",
        dates: [],
        coordinates: [34.384816302817036, 133.3818867277094],
      },
      wakasatakahama: {
        name: "若狭高浜",
        dates: [],
        coordinates: [35.49250630029996, 135.544770631589],
      },
      fujigoko: {
        name: "富士五湖",
        dates: ["2023-08-18"],
        coordinates: [35.473711718223754, 138.57367586691373],
      },
      biwako: {
        name: "琵琶湖",
        dates: ["xxxx-xx-xx"],
        coordinates: [35.326671702128024, 136.14857375686464],
      },
      onuma: {
        name: "大沼",
        dates: [],
        coordinates: [41.98381303703611, 140.67214770556117],
      },
      tateyama: {
        name: "立山",
        dates: ["2024-04-27"],
        coordinates: [36.57579639841373, 137.6198297564912],
      },
      asozan: {
        name: "阿蘇山",
        dates: ["2024-02-06", "2025-03-25"],
        coordinates: [32.99922222222222, 131.03305555555556],
      },
      kisoontake: {
        name: "木曾御嶽",
        dates: [],
        coordinates: [35.8824242481705, 137.44931770737156],
      },
      hakubadake: {
        name: "白馬岳",
        dates: [],
        coordinates: [36.75851223306643, 137.75855747151041],
      },
      tonegawa: {
        name: "利根川",
        dates: ["2025-01-12"],
        coordinates: [36.10917464213397, 139.7766164206228],
      },
      kumagawa: {
        name: "球磨川",
        dates: [],
        coordinates: [32.40232686570598, 130.6501563563135],
      },
      nagaragawa: {
        name: "長良川",
        dates: ["xxxx-xx-xx"],
        coordinates: [35.43940162842088, 136.7720953484525],
      },
      dorohaccho: {
        name: "瀞八丁",
        dates: [],
        coordinates: [33.90269458254083, 135.88058704449028],
      },
      kurobekyokoku: {
        name: "黒部峡谷",
        dates: [],
        coordinates: [36.6967538794155, 137.65913532405455],
      },
      shosenkyo: {
        name: "昇仙峡",
        dates: ["2021-06-27"],
        coordinates: [35.74547815930833, 138.567628375013],
      },
      tenryukyo: {
        name: "天竜峡",
        dates: [],
        coordinates: [35.441446665825026, 137.81865356352824],
      },
      nachinotaki: {
        name: "那智滝",
        dates: ["2017-03-28"],
        coordinates: [33.67530253531357, 135.88760713266066],
      },
      yourounotaki: {
        name: "養老の滝",
        dates: ["xxxx-xx-xx"],
        coordinates: [35.280387445410156, 136.5342674329461],
      },
      fukurodanotaki: {
        name: "袋田滝",
        dates: [],
        coordinates: [36.764460017686645, 140.4070021781735],
      },
      atamionsen: {
        name: "熱海温泉",
        dates: ["2014-05-08"],
        coordinates: [35.10389526850315, 139.07796824024447],
      },
      shiobaraonsen: {
        name: "塩原温泉",
        dates: [],
        coordinates: [36.96831438030112, 139.8230988645598],
      },
      hakoneonsen: {
        name: "箱根温泉",
        dates: ["2024-11-04"],
        coordinates: [35.233204098345794, 139.10379124212514],
      },
      narabonchi: {
        name: "奈良盆地",
        dates: ["2023-05-03"],
        coordinates: [34.689908048662176, 135.79428186182147],
      },
      hitabonchi: {
        name: "日田盆地",
        dates: ["2024-02-07"],
        coordinates: [33.32061034635207, 130.94041601097],
      },
    },
  },
  nihonnoToshikouen100sen: {
    title: "日本の都市公園100選",
    type: "list",
    spots: {
        常磐公園_1: {
            name: "常磐公園",
            dates: [],
            coordinates: [43.775,142.3572222],
            city: "北海道旭川市",
            notes: ""
            },
        北海道子どもの国_2: {
            name: "北海道子どもの国",
            dates: [],
            coordinates: [43.5213888,141.9383333],
            city: "北海道砂川市",
            notes: ""
            },
        大通公園_3: {
            name: "大通公園",
            dates: [],
            coordinates: [43.0594444,141.3447222],
            city: "北海道札幌市中央区",
            notes: ""
            },
        中島公園_4: {
            name: "中島公園",
            dates: [],
            coordinates: [43.0447222,141.3544444],
            city: "北海道札幌市中央区",
            notes: ""
            },
        鷹揚公園弘前公園_5: {
            name: "鷹揚公園（弘前公園）",
            dates: [],
            coordinates: [40.6083333,140.4652777],
            city: "青森県弘前市",
            notes: "日本の歴史公園百選選定"
            },
        合浦公園_6: {
            name: "合浦公園",
            dates: [],
            coordinates: [40.8308333,140.7791666],
            city: "青森県青森市",
            notes: "日本の歴史公園百選選定"
            },
        岩手公園_7: {
            name: "岩手公園",
            dates: [],
            coordinates: [39.7005555,141.1519444],
            city: "岩手県盛岡市",
            notes: "日本の歴史公園百選選定"
            },
        高田松原公園_8: {
            name: "高田松原公園",
            dates: [],
            coordinates: [39.0055555,141.635],
            city: "岩手県陸前高田市",
            notes: "日本の歴史公園百選選定"
            },
        松島公園_9: {
            name: "松島公園",
            dates: [],
            coordinates: [38.3697222,141.0641666],
            city: "宮城県松島町、塩籠町、七ヶ浜町、利府町",
            notes: ""
            },
        榴岡公園_10: {
            name: "榴岡公園",
            dates: [],
            coordinates: [38.2605555,140.8961111],
            city: "宮城県仙台市宮城野区",
            notes: ""
            },
        千秋公園_11: {
            name: "千秋公園",
            dates: [],
            coordinates: [39.7225,140.1241666],
            city: "秋田県秋田市",
            notes: "日本の歴史公園百選選定"
            },
        霞城公園_12: {
            name: "霞城公園",
            dates: [],
            coordinates: [38.2555555,140.3280555],
            city: "山形県山形市",
            notes: "日本の歴史公園百選選定"
            },
        日和山公園_13: {
            name: "日和山公園",
            dates: [],
            coordinates: [38.9191666,139.8277777],
            city: "山形県酒田市",
            notes: ""
            },
        翠ヶ丘公園_14: {
            name: "翠ヶ丘公園",
            dates: [],
            coordinates: [37.2908333,140.3816666],
            city: "福島県須賀川市",
            notes: ""
            },
        偕楽園_15: {
            name: "偕楽園",
            dates: [],
            coordinates: [36.375,140.4530555],
            city: "茨城県水戸市",
            notes: "日本の歴史公園百選選定"
            },
        長峰公園_16: {
            name: "長峰公園",
            dates: [],
            coordinates: [36.8113888,139.9375],
            city: "栃木県矢板市",
            notes: ""
            },
        栃木県井頭公園_17: {
            name: "栃木県井頭公園",
            dates: [],
            coordinates: [36.4961111,139.9955555],
            city: "栃木県真岡市",
            notes: ""
            },
        華蔵寺公園_18: {
            name: "華蔵寺公園",
            dates: [],
            coordinates: [36.3422222,139.1977777],
            city: "群馬県伊勢崎市",
            notes: ""
            },
        敷島公園_19: {
            name: "敷島公園",
            dates: [],
            coordinates: [36.4163888,139.0516666],
            city: "群馬県前橋市",
            notes: ""
            },
        大宮公園_20: {
            name: "大宮公園",
            dates: [],
            coordinates: [35.9180555,139.6316666],
            city: "埼玉県さいたま市大宮区",
            notes: ""
            },
        国営武蔵丘森林公園_21: {
            name: "国営武蔵丘森林公園",
            dates: [],
            coordinates: [36.0913888,139.3716666],
            city: "埼玉県滑川町",
            notes: ""
            },
        さきたま古墳公園_22: {
            name: "さきたま古墳公園",
            dates: [],
            coordinates: [36.1263888,139.4780555],
            city: "埼玉県行田市",
            notes: ""
            },
        川口グリーンセンター_23: {
            name: "川口グリーンセンター",
            dates: [],
            coordinates: [35.8455555,139.7275],
            city: "埼玉県川口市",
            notes: ""
            },
        昭和の森_24: {
            name: "昭和の森",
            dates: [],
            coordinates: [35.5177777,140.2797222],
            city: "千葉県千葉市緑区",
            notes: ""
            },
        富津公園_25: {
            name: "富津公園",
            dates: [],
            coordinates: [35.3116666,139.7983333],
            city: "千葉県富津市",
            notes: ""
            },
        音無親水公園_26: {
            name: "音無親水公園",
            dates: [],
            coordinates: [35.7527777,139.7363888],
            city: "東京都北区",
            notes: ""
            },
        東京都立日比谷公園_27: {
            name: "東京都立日比谷公園",
            dates: [],
            coordinates: [35.6738888,139.7561111],
            city: "東京都千代田区",
            notes: "日本の歴史公園百選選定"
            },
        東京都立上野恩賜公園_28: {
            name: "東京都立上野恩賜公園",
            dates: [],
            coordinates: [35.7166666,139.7741666],
            city: "東京都台東区",
            notes: "日本の歴史公園百選選定"
            },
        東京都立水元公園_29: {
            name: "東京都立水元公園",
            dates: [],
            coordinates: [35.7805555,139.8733333],
            city: "東京都葛飾区",
            notes: ""
            },
        代々木公園_30: {
            name: "代々木公園",
            dates: [],
            coordinates: [35.6697222,139.6955555],
            city: "東京都渋谷区",
            notes: ""
            },
        国営昭和記念公園_31: {
            name: "国営昭和記念公園",
            dates: [],
            coordinates: [35.7111111,139.3947222],
            city: "東京都立川市、昭島市",
            notes: ""
            },
        東高根森林公園_32: {
            name: "東高根森林公園",
            dates: [],
            coordinates: [35.6047222,139.5866666],
            city: "神奈川県川崎市宮前区",
            notes: ""
            },
        山下公園_33: {
            name: "山下公園",
            dates: [],
            coordinates: [35.4461111,139.6494444],
            city: "神奈川県横浜市中区",
            notes: ""
            },
        港の見える丘公園_34: {
            name: "港の見える丘公園",
            dates: [],
            coordinates: [35.4408333,139.6538888],
            city: "神奈川県横浜市中区",
            notes: ""
            },
        三笠公園_35: {
            name: "三笠公園",
            dates: [],
            coordinates: [35.2861111,139.6736111],
            city: "神奈川県横須賀市",
            notes: "日本の歴史公園百選選定"
            },
        秦野中央運動公園_36: {
            name: "秦野中央運動公園",
            dates: [],
            coordinates: [35.3802777,139.2022222],
            city: "神奈川県秦野市",
            notes: ""
            },
        七沢森林公園_37: {
            name: "七沢森林公園",
            dates: [],
            coordinates: [35.4480555,139.3011111],
            city: "神奈川県厚木市",
            notes: ""
            },
        五十公野公園_38: {
            name: "五十公野公園",
            dates: [],
            coordinates: [37.9380555,139.3552777],
            city: "新潟県新発田市",
            notes: ""
            },
        白山公園_39: {
            name: "白山公園",
            dates: [],
            coordinates: [37.915,139.0386111],
            city: "新潟県新潟市",
            notes: ""
            },
        悠久山公園_40: {
            name: "悠久山公園",
            dates: [],
            coordinates: [37.4291666,138.8838888],
            city: "新潟県長岡市",
            notes: ""
            },
        県民公園太閤山ランド_41: {
            name: "県民公園太閤山ランド",
            dates: [],
            coordinates: [36.6925,137.1036111],
            city: "富山県射水市",
            notes: ""
            },
        高岡古城公園_42: {
            name: "高岡古城公園",
            dates: [],
            coordinates: [36.7491666,137.0225],
            city: "富山県高岡市",
            notes: "日本の歴史公園百選選定"
            },
        兼六園_43: {
            name: "兼六園",
            dates: [],
            coordinates: [36.5619444,136.6619444],
            city: "石川県金沢市",
            notes: "日本の歴史公園百選選定"
            },
        越前陶芸公園_44: {
            name: "越前陶芸公園",
            dates: [],
            coordinates: [35.9347222,136.0591666],
            city: "福井県越前町",
            notes: ""
            },
        山梨県小瀬スポーツ公園_45: {
            name: "山梨県小瀬スポーツ公園",
            dates: [],
            coordinates: [35.6230555,138.5875],
            city: "山梨県甲府市",
            notes: ""
            },
        鳥居平やまびこ公園_46: {
            name: "鳥居平やまびこ公園",
            dates: [],
            coordinates: [36.0686111,138.0311111],
            city: "長野県岡谷市",
            notes: ""
            },
        中央公園_47: {
            name: "中央公園",
            dates: [],
            coordinates: [36.2377777,137.9691666],
            city: "長野県松本市",
            notes: ""
            },
        国営木曽三川公園_48: {
            name: "国営木曽三川公園",
            dates: [],
            coordinates: [35.1475,136.6669444],
            city: "岐阜県海津市",
            notes: ""
            },
        城山公園_49: {
            name: "城山公園",
            dates: [],
            coordinates: [36.1358333,137.2630555],
            city: "岐阜県高山市",
            notes: "日本の歴史公園百選選定"
            },
        姫の沢公園_50: {
            name: "姫の沢公園",
            dates: [],
            coordinates: [35.1191666,139.0497222],
            city: "静岡県熱海市",
            notes: ""
            },
        城北公園_51: {
            name: "城北公園",
            dates: [],
            coordinates: [34.9894444,138.3786111],
            city: "静岡県静岡市",
            notes: ""
            },
        舘山寺総合公園_52: {
            name: "舘山寺総合公園",
            dates: [],
            coordinates: [34.7647222,137.6308333],
            city: "静岡県浜松市",
            notes: ""
            },
        岡崎公園_53: {
            name: "岡崎公園",
            dates: [],
            coordinates: [34.9569444,137.1608333],
            city: "愛知県岡崎市",
            notes: "日本の歴史公園百選選定"
            },
        東山公園_54: {
            name: "東山公園",
            dates: [],
            coordinates: [35.1558333,136.9805555],
            city: "愛知県名古屋市",
            notes: ""
            },
        大高緑地_55: {
            name: "大高緑地",
            dates: [],
            coordinates: [35.0638888,136.9547222],
            city: "愛知県名古屋市",
            notes: ""
            },
        名城公園_56: {
            name: "名城公園",
            dates: [],
            coordinates: [35.1888888,136.9011111],
            city: "愛知県名古屋市",
            notes: "日本の歴史公園百選選定"
            },
        落合公園_57: {
            name: "落合公園",
            dates: [],
            coordinates: [35.2711111,136.9902777],
            city: "愛知県春日井市",
            notes: ""
            },
        中部台運動公園_58: {
            name: "中部台運動公園",
            dates: [],
            coordinates: [34.5455555,136.5058333],
            city: "三重県松阪市",
            notes: ""
            },
        金亀公園_59: {
            name: "金亀公園",
            dates: [],
            coordinates: [35.2788888,136.2533333],
            city: "滋賀県彦根市",
            notes: "日本の歴史公園百選選定"
            },
        湖岸緑地_60: {
            name: "湖岸緑地",
            dates: [],
            coordinates: [35.3772222,136.2625],
            city: "滋賀県大津市ほか",
            notes: ""
            },
        円山公園_61: {
            name: "円山公園",
            dates: [],
            coordinates: [35.0036111,135.7830555],
            city: "京都府京都市",
            notes: ""
            },
        宝ヶ池公園_62: {
            name: "宝ヶ池公園",
            dates: [],
            coordinates: [35.0577777,135.7830555],
            city: "京都府京都市",
            notes: ""
            },
        京都府立立山総合運動公園_63: {
            name: "京都府立立山総合運動公園",
            dates: [],
            coordinates: [34.8711111,135.8047222],
            city: "京都府宇治市",
            notes: ""
            },
        大阪城公園_64: {
            name: "大阪城公園",
            dates: [],
            coordinates: [34.6858333,135.5316666],
            city: "大阪府大阪市",
            notes: "日本の歴史公園百選選定"
            },
        中之島公園_65: {
            name: "中之島公園",
            dates: [],
            coordinates: [34.6916666,135.5102777],
            city: "大阪府大阪市",
            notes: ""
            },
        服部緑地_66: {
            name: "服部緑地",
            dates: [],
            coordinates: [34.7766666,135.4877777],
            city: "大阪府豊中市",
            notes: ""
            },
        五月山緑地_67: {
            name: "五月山緑地",
            dates: [],
            coordinates: [34.8316666,135.4308333],
            city: "大阪府池田市",
            notes: ""
            },
        大仙公園_68: {
            name: "大仙公園",
            dates: [],
            coordinates: [34.5586111,135.4822222],
            city: "大阪府堺市",
            notes: "日本の歴史公園百選選定"
            },
        中央公園_69: {
            name: "中央公園",
            dates: [],
            coordinates: [34.4691666,135.3936111],
            city: "大阪府岸和田市",
            notes: ""
            },
        兵庫県立甲山森林公園_70: {
            name: "兵庫県立甲山森林公園",
            dates: [],
            coordinates: [34.7738888,135.3344444],
            city: "兵庫県西宮市",
            notes: ""
            },
        神戸市立須磨離宮公園_71: {
            name: "神戸市立須磨離宮公園",
            dates: [],
            coordinates: [34.6530555,135.1169444],
            city: "兵庫県神戸市",
            notes: ""
            },
        兵庫県立明石公園_72: {
            name: "兵庫県立明石公園",
            dates: [],
            coordinates: [34.6527777,134.9919444],
            city: "兵庫県明石市",
            notes: "日本の歴史公園百選選定"
            },
        奈良公園_73: {
            name: "奈良公園",
            dates: [],
            coordinates: [34.6822222,135.8469444],
            city: "奈良県奈良市",
            notes: ""
            },
        平草原公園_74: {
            name: "平草原公園",
            dates: [],
            coordinates: [33.6697222,135.3502777],
            city: "和歌山県白浜町",
            notes: ""
            },
        打吹公園_75: {
            name: "打吹公園",
            dates: [],
            coordinates: [35.4297222,133.8236111],
            city: "鳥取県倉吉市",
            notes: ""
            },
        県立浜山公園_76: {
            name: "県立浜山公園",
            dates: [],
            coordinates: [35.3775,132.7072222],
            city: "島根県出雲市",
            notes: ""
            },
        後楽園_77: {
            name: "後楽園",
            dates: [],
            coordinates: [34.6672222,133.935],
            city: "岡山県岡山市",
            notes: "日本の歴史公園百選選定"
            },
        平和記念公園_78: {
            name: "平和記念公園",
            dates: [],
            coordinates: [34.3936111,132.4522222],
            city: "広島県広島市",
            notes: "日本の歴史公園百選選定"
            },
        中央公園_79: {
            name: "中央公園",
            dates: [],
            coordinates: [34.2494444,132.5644444],
            city: "広島県呉市",
            notes: ""
            },
        維新百年記念公園_80: {
            name: "維新百年記念公園",
            dates: [],
            coordinates: [34.1563888,131.4383333],
            city: "山口県山口市",
            notes: ""
            },
        常盤公園_81: {
            name: "常盤公園",
            dates: [],
            coordinates: [33.9530555,131.2855555],
            city: "山口県宇部市",
            notes: ""
            },
        徳島中央公園_82: {
            name: "徳島中央公園",
            dates: [],
            coordinates: [34.075,134.5544444],
            city: "徳島県徳島市",
            notes: "日本の歴史公園百選選定"
            },
        栗林公園_83: {
            name: "栗林公園",
            dates: [],
            coordinates: [34.3294444,134.0427777],
            city: "香川県高松市",
            notes: "日本の歴史公園百選選定"
            },
        城山公園_84: {
            name: "城山公園",
            dates: [],
            coordinates: [33.8444444,132.7661111],
            city: "愛媛県松山市",
            notes: "日本の歴史公園百選選定"
            },
        南楽園_85: {
            name: "南楽園",
            dates: [],
            coordinates: [33.1325,132.5038888],
            city: "愛媛県宇和島市",
            notes: ""
            },
        春野総合運動公園_86: {
            name: "春野総合運動公園",
            dates: [],
            coordinates: [33.5105555,133.5016666],
            city: "高知県高知市",
            notes: ""
            },
        響灘緑地_87: {
            name: "響灘緑地",
            dates: [],
            coordinates: [33.9183333,130.7263888],
            city: "福岡県北九州市",
            notes: ""
            },
        天地山公園_88: {
            name: "天地山公園",
            dates: [],
            coordinates: [33.5952777,131.1097222],
            city: "福岡県豊前市",
            notes: ""
            },
        海の中道海浜公園_89: {
            name: "海の中道海浜公園",
            dates: [],
            coordinates: [33.6575,130.3536111],
            city: "福岡県福岡市",
            notes: ""
            },
        南公園_90: {
            name: "南公園",
            dates: [],
            coordinates: [33.5738888,130.3886111],
            city: "福岡県福岡市",
            notes: ""
            },
        佐賀城公園_91: {
            name: "佐賀城公園",
            dates: [],
            coordinates: [33.2458333,130.3002777],
            city: "佐賀県佐賀市",
            notes: "日本の歴史公園百選選定"
            },
        上山公園_92: {
            name: "上山公園",
            dates: [],
            coordinates: [32.8402777,130.0438888],
            city: "長崎県諫早市",
            notes: "日本の歴史公園百選選定"
            },
        水前寺江津湖公園_93: {
            name: "水前寺江津湖公園",
            dates: [],
            coordinates: [32.7902777,130.7344444],
            city: "熊本県熊本市",
            notes: ""
            },
        うしぶか公園_94: {
            name: "うしぶか公園",
            dates: [],
            coordinates: [32.2002777,130.0230555],
            city: "熊本県天草市",
            notes: ""
            },
        高尾山自然公園_95: {
            name: "高尾山自然公園",
            dates: [],
            coordinates: [33.2122222,131.6544444],
            city: "大分県大分市",
            notes: ""
            },
        宮崎県立総合運動公園_96: {
            name: "宮崎県立総合運動公園",
            dates: [],
            coordinates: [31.8252777,131.4505555],
            city: "宮崎県宮崎市",
            notes: ""
            },
        特別史跡公園西都原古墳群_97: {
            name: "特別史跡公園西都原古墳群",
            dates: [],
            coordinates: [32.1172222,131.3883333],
            city: "宮崎県西都市",
            notes: "日本の歴史公園百選選定"
            },
        吉野公園_98: {
            name: "吉野公園",
            dates: [],
            coordinates: [31.6333333,130.5938888],
            city: "鹿児島県鹿児島市",
            notes: ""
            },
        国営沖縄記念公園_99: {
            name: "国営沖縄記念公園",
            dates: [],
            coordinates: [26.6894444,127.8741666],
            city: "沖縄県本部町",
            notes: ""
            },
        東平安名崎公園_100: {
            name: "東平安名崎公園",
            dates: [],
            coordinates: [24.7241666,125.4613888],
            city: "沖縄県宮",
            notes: ""
            }
    },
  },
};
