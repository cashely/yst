/*
time  -- 时间
pName  -- 地市
areaId  -- 地市id
*/
var httpAddress = 'http://yst.immortalshealth.com/modm/';
var encode = function(str) {
    return encodeURI(encodeURI(str));
}
var decode = function(str) {
    return decodeURI(decodeURI(str));
}
$(function() {
    "use strict";
    $("#city-picker").cityPicker({
        toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">请选择地区</h1>\
</header>',
        inputReadOnly: true
    });
    $('h3.item-title').overFlowText();
    $('span.item-list-title').overFlowText();
    // if($('#my-input').val() == ''){
    var today = new Date();
    var date = $('#my-input').val() === '' ? today.getMonth() + 1 + '月 ' + today.getFullYear() + '年' : $('#my-input').val();
    $('#my-input').val(date);
    // }
    // 初始化日历组件
    $('#my-input').picker({
        toolbar: true,
        rotateEffect: true,
        // updateValuesOnMomentum:false,
        // updateValuesOnTouchmove:false,
        onClose: function(p) {
            var month = p.value[0].replace('月', '');
            tabTime2(p.value[1].replace('年', '') + '-' + ((month.length < 2) ? ('0' + month) : month));
        },
        toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择日期和时间</h1>\
</header>',
        cols: [
            // Months
            {
                values: ('1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月').split(' '),
                displayValues: ('1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月').split(' '),
                textAlign: 'left'
            },
            // Years
            {
                values: (function() {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) {
                        arr.push(i + '年');
                    }
                    return arr;
                })(),
            }
        ]
    });
});
$.fn.overFlowText = function() {
    "use strict";
    return this.each(function() {
        var that = $(this);
        var cNode = that.children('*:first-child');
        var scrollText = function(len, lenH) {
            var t = 1;
            setInterval(function() {
                t >= len ? t = -lenH : t += 1;
                cNode.css('-webkit-transform', 'translate3d(' + (t * -1) + 'px,0,0)');
            }, 50);
        };
        var $i = {
            h: that.width(),
            ch: cNode.width()
        };
        if ($i.h <= $i.ch) {
            scrollText($i.ch, $i.h);
        }
    });
};
// 中文化light7
/* global $:true */
+ function($) {
    var modal = $.modal.prototype.defaults;
    modal.modalButtonOk = "确定";
    modal.modalButtonCancel = "取消";
    modal.modalPreloaderTitle = "正在加载...";
}($);

function hideSblings(e) {
    $(e).children('a').toggleClass('hidden');
    $('.yxyy').siblings('.yxyy').toggleClass('hidden');
}
// 添加
function addAnimate(obj) {
    var $this = $(obj);
    var time = +new Date();
    var _html = '<div class="addTip" id=' + time + '>+1</div>';
    $(_html).css({
        left: $this.offset().left,
        top: $this.offset().top
    }).appendTo($('body'));
    $this.addClass('hidden').siblings('.add').toggleClass('hidden');
    setTimeout(function() {
        $('#' + time).addClass('clearTips');
    }, 100);
    setTimeout(function() {
        if ($('#' + time).length) $('#' + time).remove();
    }, 1100);
    // cb();
    $.toast('添加成功！');
}

function addAction(obj) {
    dataApi.insertUserBreedInfo(obj);
}

function addHosAction(obj) {
    dataApi.insertUserBreedHosInfo(obj);
}

function unlockAction(obj) {
    var $this = $(obj);
    var num = $('#allHospital').text();
    $.confirm('您当前可解锁医院数为' + num + '个，是否解锁?', '提示', function() {
        dataApi.insertUserBreedHosLockInfo(($this.parents('li').data('id') || url2obj(location.search).id), function() {
            var url = 'unlock-success.html?title='+ (url2obj(location.search).hosCode || $this.parents('li').data('hosCode')) +'&hId=' + ($this.parents('li').data('hId') || url2obj(location.search).hId) + '&bId=' + url2obj(location.search).bId + '&aId=' + url2obj(location.search).aId + '&time=' + url2obj(location.search).time + '&hosCode=' + (url2obj(location.search).hosCode || $this.parents('li').data('hosCode')) + '&id=' + ($this.parents('li').data('id') || url2obj(location.search).id);
            location.href = url;
        });
    });
}
// 解锁
function getHosInfo(obj) {
    var $this = $(obj);
    var isLock = ($this.parents('li').data('lockStatus') == '1' ? true : false);
    console.log($this.parents('li').data('lockStatus'));
    var url = 'unlock-success.html?title='+ (url2obj(location.search).hosCode || $this.parents('li').data('hosCode')) +'&hId=' + ($this.parents('li').data('hId') || url2obj(location.search).hId) + '&bId=' + url2obj(location.search).bId + '&aId=' + url2obj(location.search).aId + '&time=' + url2obj(location.search).time + '&hosCode=' + (url2obj(location.search).hosCode || $this.parents('li').data('hosCode')) + '&id=' + ($this.parents('li').data('id') || url2obj(location.search).id);
    location.href = url;
}
//切换市场规模指标
function scfeAction(obj) {
    var $this = $(obj);
    var key = ($this.data('key') * 1) || 0;
    $this.children('.tips-arrow').addClass('hidden');
    $('#getHosProductInfo li .col-4-scfe').children('span').addClass('hidden');
    key >= ($this.children('.tips-arrow').length - 1) ? key = 0 : key++;
    $this.children('.tips-arrow').eq(key).removeClass('hidden');
    $('#getHosProductInfo li').each(function() {
        $(this).find('.col-4-scfe').children('span').eq(key).removeClass('hidden')
    });
    $this.data('key', key);
}
// 阻止页面拉出浏览器外面
// (function(obj) {
//     obj.addEventListener('touchstart', function(e) {
//         var re = obj.querySelectorAll('.content')[0];
//         var headerH = obj.querySelectorAll('header.bar-nav')[0].offsetHeight;
//         var footerH = re.offsetHeight;
//         if (e.touches[0].clientY > footerH || e.touches[0].clientY < headerH) {
//             e.preventDefault();
//         }
//     });
// })(document);
// 获取服务器配置微信信息
requestData('business/getJsSdkInfo', {
    strBackUrl: encode(location.href)
}, function(res) {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx06af7b346a9e1f77', // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: ['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
})
// 微信验证完成阶段
wx.ready(function() {
    // 分享
    var info = {
        title: '药市通-医药行业的「股市」利器',
        link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx06af7b346a9e1f77&redirect_uri=http://yst.immortalshealth.com/yst/template/index.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
        imgUrl: 'http://yst.immortalshealth.com/test/src/images/logo.jpg',
        desc: '通过市场行情引导，进行产品自选和医院绑定，辅助销售人员管理自己的重点客户和重要信息，以达成销售目标'
    };
    wx.onMenuShareTimeline({
        title: info.title, // 分享标题
        link: info.link, // 分享链接
        imgUrl: info.imgUrl, // 分享图标
        success: function() {
            $.toast('分享成功！');
        }
    });
    wx.onMenuShareAppMessage({
        title: info.title,
        desc: info.desc, // 分享描述
        link: info.link, // 分享链接
        imgUrl: info.imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
            // 用户确认分享后执行的回调函数
            $.toast('分享成功！');
        }
    });
})
//ajax modal
function requestData(url, parmars, cb) {
    $.showPreloader();
    // var httpAddress = 'http://192.168.1.233:8021/modm/';

    var callback = cb || function() {};
    $.ajax({
        url: httpAddress + url + '?' + +new Date(),
        data: parmars,
        dataType: 'JSON',
        type: 'POST',
        timeout: 40 * 1000,
        success: function(res) {
            var res = JSON.parse(res);
            if (res.state === 1) {
                if (res.datas) {
                    callback(res.datas, res.totalSize);
                } else {
                    try {
                        callback();
                    } catch (e) {}
                }
                setTimeout(function() {
                    $.hidePreloader();
                }, 300);
            } else {
                $.hidePreloader();
                $.alert(res.message);
            }
        },
        error: function(xhr) {
            $.hidePreloader();
            $.alert('网络故障!' + xhr);
        }
    });
}
//a链接跳转   暂时框架不支持自定义扩展链接方法，待修正
function state(obj) {
    // alert(1);
    e.preventDefault();
    console.log(obj);
    return false;
}
// url查询字符串转换
function url2obj(s) {
    var str = s.slice(1);
    str = str.split('&');
    var obj = {};
    str.forEach(function(ele) {
        var _index = ele.indexOf('=');
        obj[ele.slice(0, _index)] = decode(ele.slice(_index + 1));
    })
    return obj;
};
//2012-12 => 2012年12月
function time2date(t) {
    var str = t.split('-');
    var month = str[1];
    str[1] = (str[1].indexOf('0') === 0) ? str[1].slice(1) : str[1];
    return str[1] + '月 ' + str[0] + '年';
}
//12月 2012年 => 2012-12
function date2time(d) {
    var str = d.split(' ');
    var month = str[0].replace('月');
    return str[1].replace('年') + '-' + ((month.length < 2) ? ('0' + month) : month);
}

function getPriviceList() {
    // 获取省份接口
    requestData('business/getProvinceInfo', {}, function(res) {
        var str = '';
        $.each(res, function() {
            if (this.areaStatus) {
                str += '<div class="content-block-title" data-id="' + this.id + '" onclick="showChildProvices(this)">' + this.areaName + '</div>';
            } else {
                str += '<div class="content-block-title" data-id="' + this.id + '">' + this.areaName + '(暂未开放)</div>';
            }
        });
        $(str).appendTo($('#panel-left'));
    });
};
// 获取省份下面的地市信息
function showChildProvices(obj) {
    var _this = $(obj);
    // console.log(_this.next().filter('div.list-block'));
    _this.siblings('.list-block').hide(500);
    if (_this.next('div.list-block').filter('div.list-block').length) {
        _this.next().filter('div.list-block').show(500);
        return;
    } else {
        requestData('business/getAreaAllInfo', {
            id: _this.data('id')
        }, function(res) {
            var str = '<div class="list-block"><ul>';
            $.each(res, function() {
                str += '<li class="item-content" data-id=' + this.id + ' onClick="tabProvices2(this)">';
                str += '<div class="item-inner">';
                str += '<div class="item-title">' + this.areaName + '</div>';
                str += '</div></li>';
            })
            str += '</ul></div>';
            $(str).insertAfter(_this);
        })
    }
}
getPriviceList();

function tabProvices2(obj) {
    $this = $(obj);
    var openUrl;
    var url;
    var isIndex = location.href.indexOf('?') === -1;
    if (isIndex) {
        openUrl = location.href += '?';
        url = {};
    } else {
        openUrl = location.href.slice(0, location.href.indexOf('?') + 1);
        url = url2obj(location.search);
    }
    console.log(openUrl);
    url.pName = $this.text();
    url.areaId = $this.data('id');
    sessionStorage.setItem('areaName', url.pName);
    sessionStorage.setItem('areaId', url.areaId);
    var n = [];
    $.each(url, function(k, v) {
        n.push(k + '=' + v);
    });
    openUrl += n.join('&');
    console.log(openUrl);
    location.href = openUrl;
}

function tabTime2(time) {
    var openUrl;
    var url;
    var isIndex = location.href.indexOf('?') === -1;
    if (isIndex) {
        openUrl = location.href += '?';
        url = {};
    } else {
        openUrl = location.href.slice(0, location.href.indexOf('?') + 1);
        url = url2obj(location.search);
    }
    url.time = time;
    sessionStorage.setItem('time', url.time);
    var n = [];
    $.each(url, function(k, v) {
        n.push(k + '=' + v);
    });
    openUrl += n.join('&');
    console.log(openUrl);
    location.href = openUrl;
}

function selectAll() {
    +($('.label-checkbox').children('input:first-child')).each(function() {
        if (!$(this).prop('checked')) $(this).prop('checked', 'checked');
    });
    totalSelect($('.label-checkbox').children('input:first-child').length)
}
$(document).on('change', '#deleteUserBreedInfo input,#getUserBreedHospitalInfo input', function() {
    totalSelect($(this).parents('ul').find('input:checked').length);
})

function totalSelect(num) {
    $('#totalSelect').text(num);
    console.log($('#deleteUserBreedInfo input:checked').length, '选择的个数');
}
// 排序变换元素展现功能
function sortFn(element) {
    
    var $this = $(element);
    $this.parent().find('.fa').remove();
    $this.siblings('.sort').data('sortType', 'asc');
    if ($this.data('sortType') == 'asc' || $this.data('sortType') == undefined || $this.data('sortType') == '') {
        $this.data('sortType', 'desc');
        $('<i class="fa fa-sort-down"></i>').appendTo($this);
    } else {
        $this.data('sortType', 'asc');
        $('<i class="fa fa-sort-up"></i>').appendTo($this);
    }

    $this.parent().data('sidx', $this.data('sortName'));
    $this.parent().data('sord', $this.data('sortType'));
    dataApi.reSet();
}

// 没有数据的处理方法
function noDataFn(ele){
    var element = ele || $('.content');
    
    if(element.children('.noDataTip').length > 0) return;
    $('<div class="noDataTip">:( 没有数据 ~ ~</div>').appendTo(element);
    element.addClass('noData');
    return;
}
function hasDataFn(ele){
    var element = ele || $('.content');
    element.removeClass('noData').children('.noDataTip').remove();
}
//初始化所有接口事件
var dataApi = data();
setInterval(function(){
    dataApi.getInitWxUser();
},15*60*1000)