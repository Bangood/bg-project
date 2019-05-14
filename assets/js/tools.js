Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

; (function ($, window) {
    var dss = window.dss || {};
    // request的定义
    var request = dss.request;
    if (typeof request != "function") {
        request = function (key) {
            if (typeof key == "string") {
                var data = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]+)", "i"));
                if (data != null && data.length == 2) {
                    return data[1];
                }
            }
            return "";
        }
        dss.request = request;
    }

    // rootPath
    var rootPath = dss.rootPath;
    if (typeof rootPath != "string") {
        var strFullPath = window.document.location.href,
            strPath = window.document.location.pathname,
            pos = strFullPath.indexOf(strPath),
            prePath = strFullPath.substring(0, pos),
            //postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1),
            //rootPath = prePath + postPath + "/";
            rootPath = prePath;
        dss.rootPath = rootPath;
    }

    //json转化string
    var jsonToString = dss.jsonToString;
    if (typeof jsonToString != 'function') {
        jsonToString = function (obj) {
            var THIS = this;
            switch (typeof (obj)) {
                case 'string':
                    return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
                case 'array':
                    return '[' + obj.map(THIS.jsonToString).join(',') + ']';
                case 'object':
                    if (obj instanceof Array) {
                        var strArr = [];
                        var len = obj.length;
                        for (var i = 0; i < len; i++) {
                            strArr.push(THIS.jsonToString(obj[i]));
                        }
                        return '[' + strArr.join(',') + ']';
                    } else if (obj == null) {
                        return 'null';
                    } else {
                        var string = [];
                        for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));
                        return '{' + string.join(',') + '}';
                    }
                case 'number':
                    return obj;
                default:
                    return obj;
            }
        }
        dss.jsonToString = jsonToString;
    }

    //cookie的定义
    var cookie = dss.cookie || {};
    if (typeof cookie.get != "function" && typeof cookie.add != "function") {
        cookie.get = cookie.get || function (key) {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++) {
                var arr = cookies[i].split("=");
                if (arr[0].replace(" ", "") == key)
                    return decodeURIComponent(arr[1]);
            }
            return undefined;
        };
        cookie.add = cookie.add || function (key, value, expiresMinute) {
            if (typeof key == "string" && typeof value == "string") {
                var cookieString = key + "=" + encodeURIComponent(value);
                if (typeof expiresMinute == "number") {
                    var date = new Date((new Date()).getTime() + expiresMinute * 60000);
                    cookieString += ";expires=" + date.toGMTString();
                }
                document.cookie = cookieString;
            }
        }

        dss.cookie = cookie;
    }


    var signOut = dss.signOut;
    if (typeof signOut != 'function') {
        signOut = function () {
            var obj = window;
            while (obj.parent != obj) {
                obj = obj.parent;
            }
            obj.location.href = '/admin/login.html';
        }
        dss.signOut = signOut;
    }
    // require的定义
    var require = dss.require;
    if (typeof require != "function") {
        // 常用变量定义
        var CONSTS = {
            String: "string",
            Array: "Array",
            Function: "Function"
        };
        var oString = Object.prototype.toString;
        var FunctionHelper = {
            isFunction: function (it) { return oString.call(it) === "[object Function]"; }
            , isArray: function (it) { return (oString.call(it) === "[object Array]") || it.length != undefined; }
            , type: function (it) {
                if (FunctionHelper.isFunction(it))
                    return CONSTS.Function;
                else if (typeof it == "string")
                    return CONSTS.String;
                else if (FunctionHelper.isArray(it))
                    return CONSTS.Array;
                else
                    return "Others";
            }
            , each: function (array, func) {
                if (array && FunctionHelper.isArray(array) && FunctionHelper.isFunction(func)) {
                    for (var i = 0; i < array.length; i++) {
                        if (array[i]) {
                            func(array[i], i, array);
                        }
                    }
                }
            }
            , loadScript: function (url, callback, errorback) {
                var script = document.createElement('script');
                script.src = dss.rootPath + url;
                var head = document.getElementsByTagName('head')[0];
                var scriptAdded = false;

                script.onload = script.onreadystatechange = function () {
                    if (!scriptAdded && (!this.readyState ||
                        this.readyState == 'loaded' ||
                        this.readyState == 'complete')) {
                        scriptAdded = true;
                        callback();
                        script.onload = script.onreadystatechange = null;
                        head.removeChild(script);
                    };
                };
                script.onerror = errorback;

                head.appendChild(script);
            }
        };
        // 核心入口
        require = function (dependencies, callback, errorback) {
            Context = function (type, dependencies, callback, errorback) {
                var max = (type === CONSTS.Array) ? dependencies.length : 1,
                    loaded = true,
                    index = 0,
                    invoked = 0,
                    errored = 0,
                    _instance = this;
                this.require = function () {
                    if (type == CONSTS.String) {
                        if (dependencies.length > 0) {
                            FunctionHelper.loadScript(dependencies, callback, errorback);
                        }
                    } else if (type == CONSTS.Array) {
                        this.step();
                    }
                }
                    , this.complete = function () {
                        if (errored + invoked == max) {
                            if (errored == 0) {
                                if (typeof callback == "function") {
                                }
                                callback();
                            } else {
                                errorback();
                            }
                        }
                    }
                    , this.invoke = function () { invoked++; _instance.step(); _instance.complete(); }
                    , this.error = function (file) { errored++; _instance.step(); _instance.complete(); var c = console || {}, w = c.log || function (file) { }; w(file); }
                    , this.step = function () {
                        if (index < 0 || index > max - 1)
                            return;
                        var url = dependencies[index];
                        index++;
                        if (typeof url == CONSTS.String) {
                            this.load(index, url);
                        }
                    }
                    , this.load = function (index, url) {
                        FunctionHelper.loadScript(url, this.invoke, this.error);
                    }
            }
            //
            var type = FunctionHelper.type(dependencies),
                isFunc = FunctionHelper.isFunction(callback);
            if ((type == CONSTS.String || type == CONSTS.Array) && isFunc) {
                var context = new Context(FunctionHelper.type(dependencies), dependencies, callback, errorback);
                context.require();
            } else {
                var console = console || {};
                console.log = console.log || function (message) { };
                console.log("error");
            }
        }
        // 定义为window变量
        dss.require = require;
    }
    //赋值
    window.dss = dss;







    //获取当前时间
    $.getDateNow = function (options) {
        var defaults = {
            dateType: "day"//year/month/day/hour/mi/sec
        };
        var opts = $.extend(defaults, options);
        var dd = new Date();
        var year = dd.getFullYear();
        var month = dd.getMonth() + 1; //获取当前月份的日期 
        month = month < 10 ? "0" + month : month;
        var date = dd.getDate();
        date = date < 10 ? "0" + date : date;
        var h = dd.getHours();
        h = h < 10 ? "0" + h : h;
        var m = dd.getMinutes();
        m = m < 10 ? "0" + m : m;
        var s = dd.getSeconds();
        s = s < 10 ? "0" + s : s;
        var resultStr = "";
        switch (opts.dateType.toLowerCase()) {
            case "year":
                resultStr = year;
                break;
            case "month":
                resultStr = year + "-" + month;
                break;
            case "day":
                resultStr = year + "-" + month + "-" + date
                break;
            case "hour":
                resultStr = year + "-" + month + "-" + date + " " + h + ":00:00";
                break;
            case "mi":
                resultStr = year + "-" + month + "-" + date + " " + h + ":" + m + ":00";
                break;
            case "sec":
                resultStr = year + "-" + month + "-" + date + " " + h + ":" + m + ":" + s;
                break;
        }
        return resultStr;
    }
    //获取与当前日期差值时间 日/月
    $.getDiffDate = function (options) {
        var defaults = {
            dateType: "day",//day month 目前支持2种
            diffNumber: 0//差值数
        };
        var opts = $.extend(defaults, options);
        var diffNumber = 0;
        //含当前日期
        if (opts.dateType.toLowerCase() == 'day') {
            if (parseInt(opts.diffNumber, 10) > 0) {
                diffNumber = parseInt(opts.diffNumber, 10) - 1;
            } else {
                diffNumber = parseInt(opts.diffNumber, 10) + 1;
            }
        } else {
            diffNumber = parseInt(opts.diffNumber, 10);
        }
        var now = new Date();
        var dateObj = {};
        if (opts.dateType.toLowerCase() == 'day') {
            dateObj = now;
            dateObj.setDate(now.getDate() + diffNumber);//当前日期+几天
        } else if (opts.dateType.toLowerCase() == 'month') {
            dateObj = new Date(now.getFullYear(), now.getMonth() + diffNumber, now.getDate());
            dateObj.setDate(dateObj.getDate());//当前日期+几月
        } else {
            return "";
        }
        var y = dateObj.getFullYear();
        var m = dateObj.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = dateObj.getDate();
        d = d < 10 ? "0" + d : d;

        var resultStr = "";
        if (opts.dateType.toLowerCase() == 'day') {
            resultStr = y + "-" + m + "-" + d;
        } else if (opts.dateType.toLowerCase() == 'month') {
            resultStr = y + "-" + m + "-" + d;
        } else {
            return "";
        }
        return resultStr;
    }

    //支付宝形式的弹出，黑色背景
    jQuery.showMsg1 = function (options) {
        var defaults = {
            content: "无内容",
            time: 2000,
            isShowMask: false,
            callBack: function () { }
        };
        var opts = $.extend(defaults, options);
        var alertId = "qwertyuiopPayAlert";
        var msgObj = $(document.body).find("#" + alertId);
        if (msgObj.length > 0) { msgObj.remove(); }

        msgObj = $('<div id="' + alertId + '"></div>');
        var mask = $('<div class="weui-mask" style="z-index:1028;"></div>');
        var weui_toast = $('<div class="am-toast text"><div class="am-toast-text" style="width:90%;max-width:99%;overflow: auto;white-space: inherit;" >' + opts.content + '</div></div>');
        if (opts.isShowMask) {
            msgObj.append(mask).append(weui_toast);
        } else {
            msgObj.append(weui_toast);
        }


        //添加到body
        $(document.body).append(msgObj);
        //2s后消失
        var lastTime = parseFloat(opts.time, 10);
        setTimeout(function () {
            msgObj.fadeOut(100);
            if (jQuery.isFunction(opts.callBack)) {
                opts.callBack();
            }
        }, lastTime);
    }
    //呈现自动消失的信息
    jQuery.showMsg2 = function (options) {
        var defaults = {
            content: "无内容",
            title: "提示",
            isShowTitle: true,
            isAutoHide: true,
            isShowCloseIcon: true,//呈现关闭按钮
            time: 4,
            isShowTime: true,
            bgColorTitle: "#fff",
            bgColorMsg: "#fff",
            position: "40%"
        };
        var opts = $.extend(defaults, options);
        var leftTime = opts.time;//剩余秒数 
        var alertId = "qwertyuiopPayAlert";
        var $alert = $('<div id="' + alertId + '" class="alert alert-warning alert-dismissible" role="alert"></div>');
        var $mask = $('<div></div>');
        $mask.css({
            "position": "fixed",
            "z-index": 1000,
            "top": "0",
            "right": "0",
            "left": "0",
            "bottom": "0",
            "background-color": "rgba(0, 0, 0, 0.6)"
        });

        $alert.css({
            "position": "absolute",
            "top": opts.position,
            "left": "10px",
            "right": "10px",
            "overflow": "hidden",
            "z-index": 9999,
            "text-align": "center",
            "margin": "0 auto",
            "padding-top": "0px",
            "padding-bottom": "0px",
            "background-color": opts.bgColor,
            "color": "#000",
            "word-wrap": "break-word"
        });
        var $action = $('<div></div>');
        $action.css({
            "color": "#666",
            "padding": "5px",
            "overflow": "hidden",
            "background-color": opts.bgColorTitle,
            "border-bottom": "1px solid #f6f6f6"
        });

        var $title = $('<div>' + opts.title + '</div>');
        $title.css({
            "float": "left",
            "padding-left": "5px",
            "padding-top": "5px"
        });

        var $close = $('<div class="icon_sp_area" style= "float:right;"><span></span><i class="weui-icon-cancel"></i></div>');
        if (opts.isShowCloseIcon) {
            $close.click(function () {
                clearInterval(interval);
                $mask.remove();
                $alert.remove();
            });
        } else {
            $close.find('i').hide();
        }

        //添加标题行
        $action.append($title).append($close);
        var $content = $('<div style="clear:both;padding:10px 2px;line-height:2;color:#666;"></div>');
        $content.css({ "background-color": opts.bgColorMsg });
        $content.html(opts.content);

        if (opts.isShowTime) {
            $close.find('span:eq(0)').css({ "margin-top": "5px", "display": "inline-block" });
        } else {
            $close.find('span:eq(0)').css({ "display": "none" });
        }
        var alertObj = $(document.body).find("#" + alertId);
        if (alertObj.length == 0) {
            if (opts.isShowTitle) {
                $alert.append($action).append($content);
            } else {
                $alert.append($content);
            }
            $(document.body).append($mask).append($alert);
            $alert.hide().slideDown(700);
        }
        if (opts.isAutoHide) {
            $close.find('span:eq(0)').text(leftTime + "s");
            var interval = setInterval(function () {
                leftTime--;
                if (leftTime > 0) {
                    $(document.body).find($close).find('span:eq(0)').text(leftTime + "s");
                } else {
                    clearInterval(interval);
                    $alert.slideUp(1000);
                    setTimeout(function () {
                        $mask.remove();
                        $(document.body).find("#" + alertId).remove();
                    }, 1000);
                }
            }, 1000);
        }
    }

    //仿IOS的弹出框
    jQuery.alert = function (options) {
        var defaults = {
            title: "",//标题 如果为空则不显示标题
            showText: "无内容",//显示内容
            textAlign: "center",
            primaryText: "确定",//主方法显示文本
            secondaryText: "取消",//次方法显示文本
            primaryFun: function () { },//主方法
            secondaryFun: null,//次方法
            isOnlyShowContent: false//是否只显示文本内容（即不显示操作功能按钮）
        };
        var opts = $.extend(defaults, options);
        var alertId = "asdfghjklAlert";
        var alertObj = $(document.body).find("#" + alertId);
        if (alertObj.length > 0) { alertObj.remove(); }

        var $alert = $('<div class="js_dialog" id="' + alertId + '">');
        var $mask = $('<div class="weui-mask"></div>');
        $mask.css({ "z-index": 1999 });
        var $dialog = $('<div class="weui-dialog"></div>');
        var $title = $('<div class="weui-dialog__hd"><strong class="weui-dialog__title">' + opts.title + '</strong></div>');
        var $body = $('<div class="weui-dialog__bd"></div>');
        $body.css({ "text-align": opts.textAlign });
        //追加内容
        $body.empty().append(opts.showText);
        //是否只显示文本内容
        if (!opts.isOnlyShowContent) {
            var $ft = $('<div class="weui-dialog__ft"></div>');
            var $secondary = $('<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">' + opts.secondaryText + '</a>');
            var $primary = $('<a href="javascript:;" style="color:#488FCD;text-decoration:none;" class="weui-dialog__btn weui-dialog__btn_primary">' + opts.primaryText + '</a>');
            if ($.trim(opts.title).length > 0) {
                $dialog.append($title);
            }

            if (typeof opts.secondaryFun == "function") {
                $ft.append($secondary);
                $secondary.click(function () {
                    var flag = opts.secondaryFun();
                    if (flag || typeof flag == "undefined") {
                        $alert.fadeOut(200);
                    }
                });
            }
            if (typeof opts.primaryFun == "function") {
                $ft.append($primary);
                $primary.click(function () {
                    var flag = opts.primaryFun();
                    if (flag || typeof flag == "undefined") {
                        $alert.fadeOut(200);
                    }
                });
            }
        }
        $dialog.append($body);
        if (!opts.isOnlyShowContent) {
            $dialog.append($ft);
        }
        $alert.append($mask).append($dialog);
        //添加到body
        $(document.body).append($alert);
        $alert.fadeIn(200);
    }


    //呈现加载中
    $.loading = function (isShow, tipInfo) {
        if (tipInfo == undefined || tipInfo.length == 0) {
            tipInfo = "数据加载中";
        }
        var loadingId = "libyloadingId";
        var loadingObj = $(document.body).find("#" + loadingId);
        if (isShow) {
            if (loadingObj.length == 0) {
                loadingObj = $('<div id="' + loadingId + '"></div>');
                var mask = $('<div class="weui-mask" style="z-index:10;"></div>');
                var weui_toast = $('<div class="am-toast" role="alert" aria-live="assertive"><div class="am-toast-text"><div class="am-loading-indicator white"><div class="am-loading-item"></div><div class="am-loading-item"></div><div class="am-loading-item"></div></div>' + tipInfo + '</div></div>');
                loadingObj.append(mask).append(weui_toast);
                $(document.body).append(loadingObj);
            } else {
                loadingObj.find('p').text(tipInfo).end().fadeIn(100);
            }
        } else {
            loadingObj.fadeOut(100);
        }
    }

    //呈现--已完成
    $.ok = function (callBack, tipInfo, time) {
        if (tipInfo == undefined || tipInfo.length == 0) {
            tipInfo = "已完成";
        }
        if (time == undefined || time.length == 0) {
            time = 2000;
        }
        var okId = "libyOkId";
        var okObj = $(document.body).find("#" + okId);
        if (okObj.length > 0) { okObj.remove(); }

        okObj = $('<div id="' + okId + '"></div>');
        var mask = $('<div class="weui-mask" style="z-index:10;"></div>');
        var weui_toast = $('<div class="am-toast" role="alert" aria-live="assertive"><div class="am-toast-text"><span class="am-icon toast success" aria-hidden="true"></span>' + tipInfo + '</div></div>');


        okObj.append(mask).append(weui_toast);

        //添加到body
        $(document.body).append(okObj);
        //2s后消失
        var lastTime = parseFloat(time, 10);
        // console.log('aaa')
        setTimeout(function () {
            //console.log(lastTime)
            //console.log(time)
            okObj.fadeOut(100);
            if (jQuery.isFunction(callBack)) {
                callBack();
            }
        }, lastTime);
        //parseFloat(time, 10)
    }


    //获取数据
    $.getAjaxData = function (options) {
        var defaults = {
            errorStatusHandle: null,//状态码除0和1之外的处理逻辑
            url: "",
            data: {},
            type: 'POST',
            dataType: 'json',
            beforeSend: function () { $.loading(true); },
            complete: function () { $.loading(false); },
            success: function () { },
            error: function () { }
        };
        var opts = $.extend(defaults, options);
        $.ajax({
            url: opts.url,
            data: opts.data,
            type: opts.type,
            dataType: opts.dataType,
            beforeSend: opts.beforeSend,
            complete: opts.complete,
            success: function (data) {
                if (data.status == 0) {//成功
                    if (jQuery.isFunction(opts.success)) {
                        opts.success(data);
                    }
                } else if (data.status == 1) {
                    dss.signOut();
                } else {//其他逻辑                   
                    if (jQuery.isFunction(opts.errorStatusHandle)) {
                        opts.errorStatusHandle(data);
                    } else {
                        $.alert({
                            primaryText: "知道了",
                            showText: data.data
                        });
                        return false;
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (jQuery.isFunction(opts.error)) {
                    opts.error(XMLHttpRequest, textStatus, errorThrown);
                }
            }
        });
    }



})(jQuery, window);
//公用方法


(function ($, window) {

    //获取某年某月的最大天数
    $.getMaxDaysOfMonth = function (year, month) {
        return timeTools.getMaxDaysOfMonth(year, month);
    };
    //是否是同一天
    $.isEqualDay = function (startDateStr, endDateStr) {
        return timeTools.isEqualDay(startDateStr, endDateStr);
    };

    //当前日期对象 
    //dayNowStr: dayNowStr,
    //timeNowStr: timeNowStr,
    //dateNowStr: dateNowStr
    $.getDateNowObj = function () {
        return timeTools.getDateNowObj();
    };

    //获取差N日
    $.getDiffDays = function (startDateStr, endDateStr) {
        return timeTools.getDiffDays(startDateStr, endDateStr);
    };
    //获取自定时间
    $.getCustomeTime = function (options) {
        return timeTools.getCustomeTime(options);
    };
    //增加N日的时间
    $.getAddDaysDate = function (dateStr, diffDays) {
        return timeTools.getAddDaysDate(dateStr, diffDays);
    };
    //增加N个小时后的时间
    $.getAddHoursDate = function (dateStr, diffHours) {
        return timeTools.getAddHoursDate(dateStr, diffHours);
    };
    //增加N分钟后的时间
    $.getAddMinutesDate = function (dateStr, diffMinutes) {
        return timeTools.getAddMinutesDate(dateStr, diffMinutes);
    };

    var timeTools = {
        //获取某年某月的最大天数
        getMaxDaysOfMonth: function (year, month) {
            //如果传入"1999/13/0"，会得到"1998/12/31"
            //而且最大的好处是当你传入"xxxx/3/0"，会得到xxxx年2月的最后一天，它会自动判断当年是否是闰年来返回28或29，不用自己判断，
            month = parseInt(month, 10) + 1;
            var date = new Date(year, month, 0);
            return date.getDate();
        },
        isEqualDay: function (startDateStr, endDateStr) {//是否是同一天 startDateStr格式：2017/01/08
            var startDate = new Date(startDateStr + " 00:00:00");
            var endDate = new Date(endDateStr + " 00:00:00");
            if (startDate.getTime() == endDate.getTime()) {
                return true;
            }
            return false;
        },
        //当前日期对象
        getDateNowObj: function () {
            var d = new Date();
            var yyyy = d.getFullYear();
            var mm = d.getMonth() + 1;
            if (mm < 10) {
                mm = "0" + mm;
            }
            var dd = d.getDate();
            if (dd < 10) {
                dd = "0" + dd;
            }
            var hh = d.getHours();
            if (hh < 10) {
                hh = "0" + hh;
            }
            var mi = d.getMinutes();
            if (mi < 10) {
                mi = "0" + mi;
            }
            var seconds = d.getSeconds();
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var dayNowStr = yyyy + "/" + mm + "/" + dd;//当前日期
            var timeNowStr = hh + ":" + mi + ":" + seconds;//当前时间
            var dateNowStr = dayNowStr + " " + timeNowStr;//当前完整时间
            //2017/01/11 22:35:36
            return {
                dayNowStr: dayNowStr,
                timeNowStr: timeNowStr,
                dateNowStr: dateNowStr
            };
        },
        //获取差N日
        getDiffDays: function (startDateStr, endDateStr) {
            var startDate = new Date(startDateStr);
            var endDate = new Date(endDateStr);
            var dayDiff = 0;//日差值

            var dateNowStr = timeTools.getDateNowObj().dateNowStr;
            var isEqualDay = timeTools.isEqualDay(startDateStr, dateNowStr);//是否是同一天
            if (isEqualDay) {
                dayDiff = 0;
            } else {
                dayDiff = parseInt((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));//日差值
            }
            return dayDiff;
        },
        //获取自定义时间 currDateTime:时间类型
        getCustomeTime: function (options) {
            var defaults = {
                currDateTime: currDateTime || new Date(),
                diffDays: 0,
                diffHours: 0,
                diffMinutes: 0,
                diffSeconds: 0
            };
            var opts = $.extend(defaults, options);
            var yyyy = opts.currDateTime.getFullYear();
            var mm = opts.currDateTime.getMonth();
            var dd = opts.currDateTime.getDate() + opts.diffDays;
            var hh = opts.currDateTime.getHours() + opts.diffHours;
            var mi = opts.currDateTime.getMinutes() + opts.diffMinutes;
            var seconds = opts.currDateTime.getSeconds() + opts.diffSeconds;
            return new Date(yyyy, mm, dd, hh, mi, seconds);
        },
        //增加N日的时间
        getAddDaysDate: function (dateStr, diffDays) {
            var date = new Date(dateStr);
            var yyyy = date.getFullYear();
            var mm = date.getMonth();
            var dd = date.getDate() + diffDays;
            var hh = date.getHours();
            var mi = date.getMinutes();
            var seconds = date.getSeconds();
            return new Date(yyyy, mm, dd, hh, mi, seconds);
        },
        //增加N个小时后的时间
        getAddHoursDate: function (dateStr, diffHours) {
            var date = new Date(dateStr);
            var yyyy = date.getFullYear();
            var mm = date.getMonth();
            var dd = date.getDate();
            var hh = date.getHours() + diffHours;
            var mi = date.getMinutes();
            var seconds = date.getSeconds();
            return new Date(yyyy, mm, dd, hh, mi, seconds);
        },
        //增加N分钟后的时间
        getAddMinutesDate: function (dateStr, diffMinutes) {
            var date = new Date(dateStr);
            var yyyy = date.getFullYear();
            var mm = date.getMonth();
            var dd = date.getDate();
            var hh = date.getHours();
            var mi = date.getMinutes() + diffMinutes;
            var seconds = date.getSeconds();
            return new Date(yyyy, mm, dd, hh, mi, seconds);
        }
    };
})(jQuery, window);