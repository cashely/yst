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
            icoType = '中药';
            break;
        case 202:
            icoType = '西药';
            break;
        case 301:
            icoType = '一甲';
            break;
        case 302:
            icoType = '二甲';
            break;
    }
    return icoType;
}