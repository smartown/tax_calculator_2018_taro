export const keys = {
    yuexin: "yuexin",
    shebao: "shebao",
    gongjijin: "gongjijin",
    znjy: "znjy",
    jxjy: "jxjy",
    dbyl: "dbyl",
    zfdklx: "zfdklx",
    zfzj: "zfzj",
    sylr: "sylr",
}
export const tags = [
    {
        key: keys.znjy,
        name: "子女教育",
    },
    {
        key: keys.jxjy,
        name: "继续教育",
    },
    {
        key: keys.dbyl,
        name: "大病医疗",
    },
    {
        key: keys.zfdklx,
        name: "住房贷款利息",
    },
    {
        key: keys.zfzj,
        name: "住房租金",
    },
    {
        key: keys.sylr,
        name: "赡养老人",
    }
];
export const rule20110901 = {
    start: 3500,
    rule: [
        {
            min: 0, max: 1500, ratio: 0.03, quick: 0
        },
        {
            min: 1500, max: 4500, ratio: 0.1, quick: 105
        },
        {
            min: 4500, max: 9000, ratio: 0.2, quick: 555
        },
        {
            min: 9000, max: 35000, ratio: 0.25, quick: 1005
        },
        {
            min: 35000, max: 55000, ratio: 0.3, quick: 2755
        },
        {
            min: 55000, max: 80000, ratio: 0.35, quick: 5505
        },
        {
            min: 80000, max: -1, ratio: 0.45, quick: 13505
        }
    ]
};
export const rule20181001 = {
    start: 5000,
    rule: [
        {
            min: 0, max: 3000, ratio: 0.03, quick: 0
        },
        {
            min: 3000, max: 12000, ratio: 0.1, quick: 210
        },
        {
            min: 12000, max: 25000, ratio: 0.2, quick: 1410
        },
        {
            min: 25000, max: 35000, ratio: 0.25, quick: 2660
        },
        {
            min: 35000, max: 55000, ratio: 0.3, quick: 4410
        },
        {
            min: 55000, max: 80000, ratio: 0.35, quick: 7160
        },
        {
            min: 80000, max: -1, ratio: 0.45, quick: 15160
        }
    ]
};

export function calculate({ yuexin, shebao, gongjijin, zhuanxiangkouchu }, rule) {
    //应纳税所得税额
    let yingnashuie = yuexin - shebao - gongjijin - zhuanxiangkouchu - rule.start;
    if (yingnashuie < 0) {
        yingnashuie = 0;
    }

    //速算扣除数
    let susuankouchushu = 0;
    //税率
    let shuilv = 0;
    //个人所得税=应纳所得税额×税率-速算扣除数
    let gerensuodeshui = 0;

    if (yingnashuie > 0) {
        let jisuanguize;
        for (let item of rule.rule) {
            if (yingnashuie > item.min && (yingnashuie <= item.max || item.max === -1)) {
                jisuanguize = item;
                break
            }
        }
        if (jisuanguize) {
            susuankouchushu = jisuanguize.quick;
            shuilv = jisuanguize.ratio;
            gerensuodeshui = yingnashuie * shuilv - susuankouchushu;
        }
    }
    return {
        yuexin: yuexin,
        shebao: shebao,
        gongjijin: gongjijin,
        zhuanxiangkouchu: zhuanxiangkouchu,
        qizhengdian: rule.start,
        yingnashuie: yingnashuie,
        shuilv: shuilv,
        gerensuodeshui: gerensuodeshui,
        susuankouchushu: susuankouchushu,
        daoshougongzi: yuexin - shebao - gongjijin - gerensuodeshui
    }
}