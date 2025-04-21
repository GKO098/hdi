// 実績データの定義
const achievementsData = {
    nihonSankei: {
        title: "日本三景",
        type: "list",
        spots: {
            amanohashidate: { 
                name: "天橋立",
                dates: ["2024-05-03"],
                coordinates: [35.56988273017662, 135.1918669565685]
            },
            matsushima: { 
                name: "松島",
                dates: ["2019-08-13"],
                coordinates: [38.36871093676138, 141.06334161173962]
            },
            miyajima: { 
                name: "宮島",
                dates: ["2017-03-14"],
                coordinates: [34.29598381599792, 132.31983402362258]
            }
        }
    },
    shinNihonHakkei: {
        title: "新日本八景",
        type: "list",
        spots: {
            murotomisaki: {
                name: "室戸岬",
                dates: ["2021-03-26"],
                coordinates: [33.24496605391711, 134.17652734687914]
            },
            towadako: {
                name: "十和田湖",
                dates: ["2021-09-01"],
                coordinates: [40.469603472541735, 140.88640410315762]
            },
            onsentake: {
                name: "温泉岳（雲仙岳）",
                dates: ["2023-10-06"],
                coordinates: [32.780413495468984, 130.26724073274684]
            },
            kisogawa: {
                name: "木曽川",
                dates: ["2018-05-03"],
                coordinates: [35.39299665217276, 136.94539837446166]
            },
            kamikochi: {
                name: "上高地",
                dates: [],
                coordinates: [36.248736299092386, 137.63812154144924]
            },
            kegonnotaki: {
                name: "華厳滝",
                dates: ["2024-08-31"],
                coordinates: [36.73784098692607, 139.50403549776578]
            },
            beppuonsen: {
                name: "別府温泉",
                dates: ["2025-03-24"],
                coordinates: [33.31617362621019, 131.4777995690647]
            },
            karikachitoge: {
                name: "狩勝峠",
                dates: ["2024-06-05"],
                coordinates: [43.13601959291394, 142.76488124783648]
            }
        }
    },
    nihonNijuugoshou: {
        title: "日本二十五勝",
        type: "list",
        spots: {
            yashima: {
                name: "屋島",
                dates: ["2022-08-20"],
                coordinates: [34.35942821684223, 134.10252158608236]
            },
            tomonoura: {
                name: "鞆の浦",
                dates: [],
                coordinates: [34.384816302817036, 133.3818867277094]
            },
            wakasatakahama: {
                name: "若狭高浜",
                dates: [],
                coordinates: [35.49250630029996, 135.544770631589]
            },
            fujigoko: {
                name: "富士五湖",
                dates: ["2023-08-18"],
                coordinates: [35.473711718223754, 138.57367586691373]
            },
            biwako: {
                name: "琵琶湖",
                dates: ["xxxx-xx-xx"],
                coordinates: [35.326671702128024, 136.14857375686464]
            },
            onuma: {
                name: "大沼",
                dates: [],
                coordinates: [41.98381303703611, 140.67214770556117]
            },
            tateyama: {
                name: "立山",
                dates: ["2024-04-27"],
                coordinates: [36.57579639841373, 137.6198297564912]
            },
            asozan: {
                name: "阿蘇山",
                dates: ["2024-02-06", "2025-03-25"],
                coordinates: [32.99922222222222, 131.03305555555556]
            },
            kisoontake: {
                name: "木曾御嶽",
                dates: [],
                coordinates: [35.8824242481705, 137.44931770737156]
            },
            hakubadake: {
                name: "白馬岳",
                dates: [],
                coordinates: [36.75851223306643, 137.75855747151041]
            },
            tonegawa: {
                name: "利根川",
                dates: ["2025-01-12"],
                coordinates: [36.10917464213397, 139.7766164206228]
            },
            kumagawa: {
                name: "球磨川",
                dates: [],
                coordinates: [32.40232686570598, 130.6501563563135]
            },
            nagaragawa: {
                name: "長良川",
                dates: ["xxxx-xx-xx"],
                coordinates: [35.43940162842088, 136.7720953484525]
            },
            dorohaccho: {
                name: "瀞八丁",
                dates: [],
                coordinates: [33.90269458254083, 135.88058704449028]
            },
            kurobekyokoku: {
                name: "黒部峡谷",
                dates: [],
                coordinates: [36.6967538794155, 137.65913532405455]
            },
            shosenkyo: {
                name: "昇仙峡",
                dates: ["2021-06-27"],
                coordinates: [35.74547815930833, 138.567628375013]
            },
            tenryukyo: {
                name: "天竜峡",
                dates: [],
                coordinates: [35.441446665825026, 137.81865356352824]
            },
            nachinotaki: {
                name: "那智滝",
                dates: ["2017-03-28"],
                coordinates: [33.67530253531357, 135.88760713266066]
            },
            yourounotaki: {
                name: "養老の滝",
                dates: ["xxxx-xx-xx"],
                coordinates: [35.280387445410156, 136.5342674329461]
            },
            fukurodanotaki: {
                name: "袋田滝",
                dates: [],
                coordinates: [36.764460017686645, 140.4070021781735]
            },
            atamionsen: {
                name: "熱海温泉",
                dates: ["2014-05-08"],
                coordinates: [35.10389526850315, 139.07796824024447]
            },
            shiobaraonsen: {
                name: "塩原温泉",
                dates: [],
                coordinates: [36.96831438030112, 139.8230988645598]
            },
            hakoneonsen: {
                name: "箱根温泉",
                dates: ["2024-11-04"],
                coordinates: [35.233204098345794, 139.10379124212514]
            },
            narabonchi: {
                name: "奈良盆地",
                dates: ["2023-05-03"],
                coordinates: [34.689908048662176, 135.79428186182147]
            },
            hitabonchi: {
                name: "日田盆地",
                dates: ["2024-02-07"],
                coordinates: [33.32061034635207, 130.94041601097]
            }
        }
    }
}; 
