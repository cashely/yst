// 首页整体数据
function data() {
    var id = sessionStorage.getItem('areaId') || 2; //城市id
    var date = sessionStorage.getItem('time') || '2015-10'; //时间
    var privice = sessionStorage.getItem('areaName') || '加载中'; //城市
    var pN = 1;
    var pS = 20;
    var actionApi = url2obj(location.search).AP || '';
    var wechatCode = url2obj(location.search).code;
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
    return {
        setInit: function(){
            if (document.getElementById('privice')) document.getElementById('privice').value = sessionStorage.getItem('areaName');
            console.log(privice,'init省份');
            // document.getElementsByTagName('title')[0].innerText = url2obj(location.search).name;
            if (url2obj(location.search).title && document.title) {
                document.getElementsByTagName('title')[0].innerText = decode(url2obj(location.search).title);
                // alert(decode(url2obj(location.search).title));
            }
            if ($('.date-input')) $('.date-input').val(time2date(date));
        },
        getInitWxUser: function() {
            requestData('business/getInitWxUser', {
                code: wechatCode
            });
        },
        changeDate: function(d) {
            date = url2obj(location.search).time || d;
        },
        // 重置页面数据
        reSet: function() {
            pN = 1;
        },
        changePrivice: function(n, pn) {
            id = sessionStorage.getItem('areaId') || n;
            privice = sessionStorage.getItem('areaName') || pn;
        },
        goState: function() {},
        getIndexData: function() {
            requestData('business/getMarketInfo', {
                yearMonth: sessionStorage.getItem('time'),
                areaId: sessionStorage.getItem('areaId')
            }, function(res) {
                // 异步传递code
                if(res.businessCwm.length == 0){
                  noDataFn($('#businessCwm'));
                }else{
                  hasDataFn($('#businessCwm'));
                }
                if(res.businessSales.length == 0){
                  noDataFn($('#businessSales'));
                }else{
                  hasDataFn($('#businessSales'));
                }
                if(res.businessConcept.length == 0){
                  noDataFn($('#businessConcept'));
                }else{
                  hasDataFn($('#businessConcept'));
                }
                if(res.businessBreedUp.length == 0){
                  noDataFn($('#businessBreedUp'));
                }else{
                  hasDataFn($('#businessBreedUp'));
                }
                if(res.businessBreedDown.length == 0){
                  noDataFn($('#businessBreedDown'));
                }else{
                  hasDataFn($('#businessBreedDown'));
                }
                var str = '';

                $.each(res.businessCwm, function() {

                    str += '<li class="col-50 item-pean">';
                    str += '<h3>' + this.cwmName + '</h3>';
                    str += '<p>' + this.sales + '万</p>';
                    str += '<div class="item-pean-footer">';
                    if (this.changeCost >= 0) {
                        str += '<span class="up">' + filterDateText(this.changeCost) + '</span>';
                    } else {
                        str += '<span class="down">' + filterDateText(this.changeCost) + '</span>';
                    }
                    if (this.change >= 0) {
                        str += '<span class="up">' + filterDateText(this.change,'%') + '</span>';
                    } else {
                        str += '<span class="down">' + filterDateText(this.change,'%') + '</span>';
                    }
                    str += '</div></li>';
                });
                $('#businessCwmLink').prop('href', 'rise.html?time=' + date + '&areaId=' + id + '&pName=' + encode(privice) + '&AP=getBusinessSalesInfo&title=' + encode('分类涨幅榜'));
                $('#businessSalesLink').prop('href', 'rise.html?time=' + date + '&areaId=' + id + '&pName=' + encode(privice) + '&AP=getBusinessConceptInfo&title=' + encode('概念涨幅榜'));
                $('#businessBreedByUpInfo').prop('href', 'optional.html?time=' + date + '&areaId=' + id + '&pName=' + encode(privice) + '&AP=getBusinessBreedByUpInfo&title=' + encode('品种影响力排行榜'));
                // $('#businessBreedByDownInfo').prop('href', 'optional.html?time=' + date + '&areaId=' + id + '&pName=' + encode(privice) + '&AP=getBusinessBreedByDownInfo&title=' + encode('品种跌幅榜'));
                $('#businessCwm').html(str);
                str = '';
                $.each(res.businessSales, function(index) {
                    // console.log(this,index);
                    str += '<li class="col-33 item-pean"><a href="optional.html?id=' + this.id + '&areaId=' + this.areaId + '&pName=' + privice + '&sId=' + this.salesId + '&time=' + date + '&AP=getSalesBreedInfo&title=' + '('+translateIcoType(this.icoType)+')' + this.salesName + '" class="item-link external">';
                    if (index === 0) {
                        str += '<span class="top"><i class="fa fa-trophy"></i></span>';
                    }
                    str += '<h3 class="scroll-title"><span><i class="bradge inline">' + translateIcoType(this.icoType) + '</i>' + this.salesName + '</span></h3>';
                    str += '<p>' + this.sales + '万</p>';
                    str += '<div class="item-pean-footer">';
                    if (this.changeCost >= 0) {
                        str += '<span class="up">' + filterDateText(this.changeCost) + '</span>';
                    } else {
                        str += '<span class="down">' + filterDateText(this.changeCost) + '</span>';
                    }
                    if (this.change >= 0) {
                        str += '<span class="up">' + filterDateText(this.change,'%') + '</span>';
                    } else {
                        str += '<span class="down">' + filterDateText(this.change,'%') + '</span>';
                    }
                    str += '</div></a></li>';
                });
                $('#businessSales').html(str);
                str = '';
                $.each(res.businessConcept, function(index) {
                    str += '<li class="col-33 item-pean"><a href="optional.html?id=' + this.id + '&areaId=' + this.areaId + '&pName=' + privice + '&sId=' + this.conceptId + '&time=' + date + '&AP=getConceptBreedInfo&title=' + this.conceptName + '" class="item-link external">';
                    if (index === 0) {
                        str += '<span class="top"><i class="fa fa-trophy"></i></span>';
                    }
                    str += '<h3 class="scroll-title"><span>' + this.conceptName + '</span></h3>';
                    str += '<p>' + this.sales + '万</p>';
                    str += '<div class="item-pean-footer">';
                    if (this.changeCost >= 0) {
                        str += '<span class="up">' + filterDateText(this.changeCost) + '</span>';
                    } else {
                        str += '<span class="down">' + filterDateText(this.changeCost) + '</span>';
                    }
                    if (this.change >= 0) {
                        str += '<span class="up">' + filterDateText(this.change,'%') + '</span>';
                    } else {
                        str += '<span class="down">' + filterDateText(this.change,'%') + '</span>';
                    }
                    str += '</div></a></li>';
                })
                $('#businessConcept').html(str);
                str = '';
                $.each(res.businessBreedUp, function() {
                    str += '<li class="item-content" data-id="' + this.id + '" data-aid = "' + this.areaId + '"><div class="item-inner">';
                    str += '<div class="col-5-tym">' + (this.genericNameShort || this.genericName);
                    if (this.icoType) {
                        str += '<i class="bradge">' + translateIcoType(this.icoType) + '</i>';
                    };
                    str += '</div>';
                    str += '<div class="col-4-scgm">' + filterDateText(this.sales,'万') + '</div>';
                    str += '<div class="col-4-zdf ' + (this.changeCost >= 0 ? 'z' : 'd') + '">' + filterDateText(this.changeCost) + '</div>';
                    str += '<div class="col-4-zdf ' + (this.change >= 0 ? 'z' : 'd') + '">' + filterDateText(this.change,'%') + '</div>';
                    str += '<div class="add ' + (this.isOpt !== 0 ? 'hidden' : '') + '" onClick="addAction(this)"><i class="fa fa-plus-circle fa-lg"></i></div>';
                    str += '<div class="add ' + (this.isOpt === 0 ? 'hidden' : '') + '"><i class="fa fa-check-circle fa-lg"></i></div>';
                    str += '</div></li>';
                })
                $('#businessBreedUp').html(str);
                // str = '';
                // $.each(res.businessBreedDown, function() {
                //     str += '<li class="item-content" data-id="' + this.id + '" data-aid = "' + this.areaId + '"><div class="item-inner">';
                //     str += '<div class="col-5-tym">' + this.genericName + '<i class="bradge">' + translateIcoType(this.icoType) + '</i></div>';
                //     str += '<div class="col-4-scgm">' + this.sales + '万</div>';
                //     str += '<div class="col-4-zdf ' + (this.changeCost >= 0 ? 'z' : 'd') + '">' + this.changeCost + '</div>';
                //     str += '<div class="col-4-zdf ' + (this.change >= 0 ? 'z' : 'd') + '">' + this.change + '%</div>';
                //     str += '<div class="add ' + (this.isOpt !== 0 ? 'hidden' : '') + '" onClick="addAction(this)"><i class="fa fa-plus-circle fa-lg"></i></div>';
                //     str += '<a class="add ' + (this.isOpt === 0 ? 'hidden' : '') + '"><i class="fa fa-check-circle fa-lg"></i></a>';
                //     str += '</div></li>';
                // })


                // $('#businessBreedDown').append(str);
                $('.scroll-title').overFlowText();
            });
        },
        getOptionalData: function(cb, obj) {
            var callback = cb || function() {};
            requestData('business/' + actionApi, {
                yearMonth: sessionStorage.getItem('time'),
                areaId: sessionStorage.getItem('areaId'),
                salesId: url2obj(location.search).sId,
                conceptId: url2obj(location.search).sId,
                pageNo: pN,
                sidx: obj.sidx || '',
                sord: obj.sord || '',
                pageSize: pS
            }, function(res, total) {
                callback(res, total);
                console.log(pN);
                pN++;
            });
        },
        // 分类涨幅榜
        getRiseData: function(cb, obj) {
            var callback = cb || function() {};
            requestData('business/' + actionApi, {
                yearMonth: sessionStorage.getItem('time'),
                areaId: sessionStorage.getItem('areaId'),
                sidx: obj.sidx || '',
                sord: obj.sord || '',
                pageNo: pN,
                pageSize: pS
            }, function(res, total) {
                pN++;
                callback(res, total);
            });
        },
        //查看产品自选
        getOrderBreedInfo: function(cb,obj) {
            var callback = cb || function() {};
            requestData('business/getOrderBreedInfo', {
                yearMonth: sessionStorage.getItem('time'),
                pageNo: pN,
                pageSize: pS,
                sidx: obj.sidx || '',
                sord: obj.sord || ''
            }, function(res, total) {
                pN++;
                callback(res, total, date);
            })
        },
        // 查看自选产品样例数据
        getDefaultOrderBreedInfo: function(cb,obj) {
            var callback = cb || function() {};
            requestData('business/getDefaultOrderBreedInfo', {
                yearMonth: sessionStorage.getItem('time')
            }, function(res, total) {
                callback(res, total, date);
            })
        },
        // 删除自选产品
        editUserBreedInfo: function(cb,obj) {
            var callback = cb || function() {};
            requestData('business/getOrderBreedInfo', {
                yearMonth: sessionStorage.getItem('time'),
                pageNo: pN,
                pageSize: pS,
                sidx: obj.sidx || '',
                sord: obj.sord || ''
            }, function(res, total) {
                var str = '';
                console.log(res);
                $.each(res, function() {
                    str += '<li><label class="label-checkbox item-content"><input type="checkbox" value="' + this.id + '" name="my-radio"><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner">';
                    str += '<div class="col-4-ds"><span>' + this.areaName + '</span></div>';
                    str += '<div class="col-4-tym">' + (this.genericNameShort || this.genericName) + '<i class="bradge">' + translateIcoType(this.icoType) + '</i></div>';
                    str += '<div class="yxyy">' + this.lockCount + '/' + this.hosCount + '</div>';
                    str += '<div class="yxyy">' + this.userLockCount + '</div>';
                    str += '</div></label></li>';
                })
                $(str).appendTo($('#deleteUserBreedInfo'));
                $('#closeEdit').prop('href', 'select.html?time=' + date);
                // console.log();
                pN++;
                callback(total);
            })
        },
        deleteUserBreedInfo: function(arr, cb) {
            var callback = cb || function() {};
            console.log(arr);
            requestData('business/deleteUserBreedInfo', {
                id: JSON.stringify(arr)
            }, function() {
                callback();
            })
        },
        //删除地区品种医院信息接口
        deleteUserBreedHosInfo: function(arr, cb) {
            var callback = cb || function() {};
            console.log(arr);
            requestData('business/deleteUserBreedHosInfo', {
                id: JSON.stringify(arr)
            }, function() {
                callback();
            })
        },
        //查看自选医院列表
        getUserBreedHospitalInfo: function(cb,obj) {
            var callback = cb || function() {};
            requestData('business/getUserBreedHospitalInfo', {
                id: url2obj(location.search).id,
                breedId: url2obj(location.search).bId,
                areaId: url2obj(location.search).aId,
                type: url2obj(location.search).type,
                pageNo: pN,
                pageSize: pS,
                sidx: obj.sidx || '',
                sord: obj.sord || ''
            }, function(res, total) {
                pN++;
                callback(res, total);
            })
        },
        //自选医院列表
        getUserHostInfo: function(cb,obj) {
            var callback = cb || function() {};
            requestData('business/getUserHostInfo', {
                pageNo: pN,
                pageSize: pS,
                sidx: obj.sidx || '',
                sord: obj.sord || ''
            }, function(res, total) {
                pN++;
                callback(res, total);
            })
        },
        // 查询地区品种医院信息
        searchUserBreedHospitalInfo: function(key, cb) {
            var callback = cb || function() {};
            requestData('business/searchUserBreedHospitalInfo', {
                breedId: url2obj(location.search).bId,
                areaId: url2obj(location.search).aId,
                hospitalName: encode(key),
                pageNo: pN,
                pageSize: pS
            }, function(res, total) {
                callback(res, total);
                pN++;
            })
        },
        //添加数据接口
        insertUserBreedInfo: function(obj) {
            var o = obj;
            requestData('business/insertUserBreedInfo', {
                breedId: $(o).parents('li').data('id'),
                areaId: $(o).parents('li').data('aid'),
            }, function() {
                addAnimate(o);
            })
        },
        //添加医院数据接口
        insertUserBreedHosInfo: function(obj) {
            var o = obj;
            requestData('business/insertUserBreedHosInfo', {
                breedId: $(o).parents('li').data('id'),
                hospitalId: $(o).parents('li').data('hid'),
                areaId: $(o).parents('li').data('aid'),
                orderBreedId: url2obj(location.search).orderId,
            }, function() {
                addAnimate(o);
            })
        },
        getUserLockInfo: function(cb) {
            var callback = cb || function() {};
            requestData('business/getUserLockInfo', {}, function(res) {
                cb(res);
            })
        },
        //数据搜索接口
        actionSearch: function(cb) {
            var callback = cb || function() {};
            requestData('business/searchOrderBreedInfo', {
                areaName: encode($('#globalPrivices').val()),
                genericName: encode($('#search').val()),
                pageNo: pN,
                pageSize: pS
            }, function(res, total) {
                if(res.length == 0){
                  noDataFn($('#searchOrderBreedInfo'));
                }else{
                  hasDataFn($('#searchOrderBreedInfo'));
                }
                var str = '';
                $.each(res, function() {
                    str += '<li class="item-content" data-id="' + this.id + '" data-aid = "' + this.areaId + '"><div class="item-inner">';
                    str += '<div class="col-4-ds text-left"><span>' + this.areaName + '</span></div>';
                    str += '<div class="col-3-tym">' + this.genericName + (this.genericNameShort ? '('+this.genericNameShort+')' : '') + '<i class="bradge">' + translateIcoType(this.icoType) + '</i></div>';
                    str += '<div class="add ' + (this.isOpt !== 0 ? 'hidden' : '') + '" onClick="addAction(this)"><i class="fa fa-plus-circle fa-lg"></i></div>';
                    str += '<div class="add ' + (this.isOpt === 0 ? 'hidden' : '') + '"><i class="fa fa-check-circle fa-lg"></i></div>';
                    str += '</div></li>';
                })
                $(str).appendTo($('#searchOrderBreedInfo'));
                console.log('结束渲染操作进入回调事件');
                callback(total);
                pN++;
            });
        },
        // 解锁医院
        insertUserBreedHosLockInfo: function(num, cb) {
            var callback = cb || function() {};
            requestData('business/insertUserBreedHosLockInfo', {
                id: num
            }, function() {
                callback();
            })
        },
        //查询医院产品信息接口
        getHosProductInfo: function(cb, obj) {
            var callback = cb || function() {};
            requestData('business/getHosProductInfo', {
                hospitalId: url2obj(location.search).hId,
                breedId: url2obj(location.search).bId,
                areaId: url2obj(location.search).aId,
                yearMonth: sessionStorage.getItem('time'),
                sidx: obj.sidx || '',
                sord: obj.sord || '',
                pageNo: pN,
                pageSize: pS
            }, function(res, total) {
                callback(res, total);
            })
        },
        // 判断当前数据是否解锁
        getLockStateInfo: function(cb) {
            var callback = cb || function() {};
            requestData('business/getLockStateInfo', {
                id: url2obj(location.search).id
            }, function(res) {
                callback(res);
            })
        },
        //获取合作用户数据接口
        getProductPartnerInfo: function(cb) {
            var callback = cb || function() {};
            requestData('business/getProductPartnerInfo', {
                breedId: url2obj(location.search).bId,
                hospitalId: url2obj(location.search).hId
            }, function(res) {
                callback(res);
            })
        },
        getWxUserInfo: function(cb) {
            var callback = cb || function() {};
            requestData('business/getWxUserInfo', {}, function(res) {
                callback(res);
            })
        },
        //获取用户反馈列表
        getBusinessFeedBackInfo: function(cb) {
            var callback = cb || function() {};
            requestData('business/getBusinessFeedBackInfo', {}, function(res) {
                callback(res);
            })
        },
        insertBusinessFeedBackInfo: function(msg, cb) {
            var callback = cb || function() {};
            requestData('business/insertBusinessFeedBackInfo', {
                feedContent: msg
            }, function(res) {
                callback(res);
            });
        }
    }
}