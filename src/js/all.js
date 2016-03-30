'use strict'
$(function(){
  $("#city-picker").cityPicker({
    toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">请选择地区</h1>\
    </header>',
    inputReadOnly:true
  });
  $('h3.item-title').overFlowText();
  $('span.item-list-title').overFlowText();
  
  // if($('#my-input').val() == ''){
    var today = new Date();
    var date = $('#my-input').val() == '' ? today.getMonth()+1+'月 '+today.getFullYear()+'年' :$('#my-input').val();
    $('#my-input').val(date);
  // }
  
  // 初始化日历组件
  $('#my-input').picker({
    toolbar: true,
    rotateEffect: true,
    updateValuesOnMomentum:false,
    updateValuesOnTouchmove:false,
    onChange:function(){
      return false;
    },
    onClose:function(){
      alert(2);
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
            values: (function () {
                var arr = [];
                for (var i = 1950; i <= 2030; i++) { arr.push(i+'年'); }
                return arr;
            })(),
        }
    ]
  });

  // 省份选择
  $('#panel-left .item-title').on('click',function(){
    var $this = $(this);
    var privice = $this.text();
    document.getElementById('privice').value = privice;
    $.closePanel('#panel-left');
  });

  //全国省份列表
  $('#globalPrivices').picker({
    toolbar: true,
    rotateEffect: true,
    toolbarTemplate: '<header class="bar bar-nav">\
                      <button class="button button-link pull-right close-picker">确定</button>\
                      <h1 class="title">请选择省份</h1>\
                      </header>',
    cols: [
        // Months
        {
            values: ('广东省 北京市 深圳 江苏省 安徽省').split(' ')
        }
    ]
  })
});
$.fn.overFlowText = function(){
  return this.each(function(){
    var that = $(this),cNode = that.children('*:first-child');
    var scrollText = function(len,lenH){
      var t = 1;
      setInterval(function(){
        t >= len ? t=-lenH : t++;
        cNode.css('-webkit-transform','translate3d('+(t*-1)+'px,0,0)');
      },50)
    }
    var $i = {
      h : that.width(),
      ch : cNode.width()
    };
    if($i.h<=$i.ch){
      scrollText($i.ch,$i.h);
    }
  });
};

// 中文化light7
/* global $:true */
+function ($) {
  var modal = $.modal.prototype.defaults;
  modal.modalButtonOk = "确定";
  modal.modalButtonCancel = "取消";
  modal.modalPreloaderTitle = "正在加载...";
}($);


function hideSblings(e){
  $(e).children('a').toggleClass('hidden');
  $('.yxyy').siblings('.yxyy').toggleClass('hidden');
}

// 添加
function addAction(obj){
  var $this = $(obj);
  var time = +new Date();
  var _html = '<div class="addTip" id=' + time + '>+1</div>';
  $(_html).css({
    left:$this.offset().left,
    top:$this.offset().top
  }).appendTo($('body'));
  $this.addClass('hidden').siblings('.add').toggleClass('hidden');
  setTimeout(function(){
    $('#'+time).addClass('clearTips');
  },0);
  setTimeout(function(){
    if($('#'+time).length) $('#'+time).remove();
  },1000);
  
}
// 解锁
function unlockAction(){
  $.confirm('您当前可解锁医院数为5个，是否解锁?', '提示', function () {
    $.alert('确定了解锁');
  });
}

//切换市场规模指标
function scfeAction(obj){
  var $this = $(obj);
  var key = ($this.data('key') * 1) || 0;
  $this.children('.tips-arrow').addClass('hidden');
  key >= ($this.children('.tips-arrow').length-1) ? key = 0 : key++;
  $this.children('.tips-arrow').eq(key).removeClass('hidden');
  $this.data('key',key);
}








//ajax modal

function requestData(url,parmars,callback){
  var callback = callback || function(){};
  $.ajax({
    url:url,
    data:parmars,
    dataType:'JSON',
    timeout: 40 * 1000,
    success:function(res){
      callback(res);
    },
    error:function(xhr){
      $.alert('网络故障!'+xhr);
    }
  });
}