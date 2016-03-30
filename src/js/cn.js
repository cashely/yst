/*!
 * =====================================================
 * light7 V0.4.3 - http://light7.org/
 *
 * =====================================================
 */
"use strict";
/* global $:true */
+function ($) {
  var modal = $.modal.prototype.defaults;
  modal.modalButtonOk = "确定";
  modal.modalButtonCancel = "取消";
  modal.modalPreloaderTitle = "正在加载...";
}($);