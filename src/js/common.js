function translateIcoType(num) {
    var icoType = '';
    switch (num) {
        case 1:
            icoType = '口服';
            break;
        case 2:
            icoType = '外用';
            break;
        case 3:
            icoType = '鼻用';
            break;
        case 4:
            icoType = '耳用';
            break;
        case 5:
            icoType = '灌肠';
            break;
        case 6:
            icoType = '舌下';
            break;
        case 7:
            icoType = '吸入';
            break;
        case 8:
            icoType = '眼用';
            break;
        case 9:
            icoType = '阴道';
            break;
        case 10:
            icoType = '直肠';
            break;
        case 11:
            icoType = '注射';
            break;
        case 12:
            icoType = '植入';
            break;
        case 13:
            icoType = '尿道';
            break;
        case 14:
            icoType = '口腔';
            break;
        case 201:
            icoType = '中';
            break;
        case 202:
            icoType = '西';
            break;
        case 301:
            icoType = '三甲';
            break;
        case 302:
            icoType = '三乙';
            break;
        case 303:
            icoType = '三丙';
            break;
        case 304:
            icoType = '三级';
            break;
        case 305:
            icoType = '二甲';
            break;
        case 306:
            icoType = '二乙';
            break;
        case 307:
            icoType = '二丙';
            break;
        case 308:
            icoType = '二级';
            break;
        case 309:
            icoType = '一甲';
            break;
        case 310:
            icoType = '一乙';
            break;
        case 311:
            icoType = '一丙';
            break;
        case 312:
            icoType = '一级';
            break;
        case 313:
            icoType = '未评';
            break;
        case 314:
            icoType = '不详';
            break;
    }
    return icoType;
}