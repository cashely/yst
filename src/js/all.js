/*
time  -- 时间
pName  -- 地市
areaId  -- 地市id
*/
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
            tabTime2(p.value[1].replace('年', '') + '-' + p.value[0].replace('月', ''));
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
    // 省份选择
    $('#panel-left .item-title').on('click', function() {
        var $this = $(this);
        var privice = $this.text();
        document.getElementById('privice').value = privice;
        $.closePanel('#panel-left');
    });
});
$.fn.overFlowText = function() {
    "use strict";
    return this.each(function() {
        var that = $(this),
            cNode = that.children('*:first-child');
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
            var url = 'unlock-success.html?hId=' + ($this.parents('li').data('hId') || url2obj(location.search).hId) + '&bId=' + url2obj(location.search).bId + '&aId=' + url2obj(location.search).aId + '&time=' + url2obj(location.search).time + '&hosCode='+ (url2obj(location.search).hosCode || $this.parents('li').data('hosCode')) + '&id=' + ($this.parents('li').data('id') || url2obj(location.search).id);
            location.href = url;
        });
    });
}
// 解锁
function getHosInfo(obj) {
    var $this = $(obj)
    var isLock = ($this.parents('li').data('lockStatus') == '1' ? true : false);
    console.log($this.parents('li').data('lockStatus'));
    var url = 'unlock-success.html?hId=' + ($this.parents('li').data('hId') || url2obj(location.search).hId) + '&bId=' + url2obj(location.search).bId + '&aId=' + url2obj(location.search).aId + '&time=' + url2obj(location.search).time + '&hosCode='+ (url2obj(location.search).hosCode || $this.parents('li').data('hosCode')) + '&id=' + ($this.parents('li').data('id') || url2obj(location.search).id);
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
    $('#getHosProductInfo li').each(function(){
        $(this).find('.col-4-scfe').children('span').eq(key).removeClass('hidden')
    });
    $this.data('key', key);
}
// 阻止页面拉出浏览器外面
(function(obj) {
    obj.addEventListener('touchstart', function(e) {
        var re = obj.querySelectorAll('.content')[0];
        var headerH = obj.querySelectorAll('header.bar-nav')[0].offsetHeight;
        var footerH = re.offsetHeight;
        if (e.touches[0].clientY > footerH || e.touches[0].clientY < headerH) {
            e.preventDefault();
        }
    });
})(document);
// 获取服务器配置微信信息
requestData('business/getJsSdkInfo', {
    strBackUrl: encode(location.href)
}, function(res) {
    var ts = [];
    $.each(res, function(k, v) {
        ts.push(k + '=>' + v);
    });
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx06af7b346a9e1f77', // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名，见附录1
        jsApiList: ['getLocation', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
})
// 微信验证完成阶段
wx.ready(function() {
    // alert(1);
    wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
        }
    });
})
//ajax modal
function requestData(url, parmars, callback) {
    // var httpAddress = 'http://192.168.1.233:8021/modm/';
    var httpAddress = 'http://yst.immortalshealth.com/modm/';
    var callback = callback || function() {};
    $.ajax({
        url: httpAddress + url,
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
                    callback();
                }
            } else {
                $.alert(res.message);
            }
        },
        error: function(xhr) {
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
    return str[1] + '月 ' + str[0] + '年';
}
//12月 2012年 => 2012-12
function date2time(d) {
    var str = d.split(' ');
    return str[1].replace('年') + '-' + str[0].replace('月');
}

function getPriviceList() {
    // 获取省份接口
    requestData('business/getProvinceInfo', {}, function(res) {
        var str = '';
        $.each(res, function() {
            if (this.areaStatus) {
                str += '<div class="content-block-title" data-id="' + this.id + '" onclick="showChildProvices(this)">' + this.areaName + this.areaStatus + '</div>';
            } else {
                str += '<div class="content-block-title" data-id="' + this.id + '">' + this.areaName + '(暂未开放)</div>';
            }
        });
        $(str).appendTo($('#panel-left'));
        console.log(str);
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
    totalSelect()
}
$(document).on('change', '#deleteUserBreedInfo input,#getUserBreedHospitalInfo input', function() {
    totalSelect($(this).parents('ul').find('input:checked').length);
})

function totalSelect(num) {
    $('#totalSelect').text(num);
    console.log($('#deleteUserBreedInfo input:checked').length, '选择的个数');
}
//初始化所有接口事件
var dataApi = data();