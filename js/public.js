function isFunction(functionToCheck) {
    const getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

$(function () {
    $("img").on('error', function () { $(this).attr('src', '/public/static/sky/public/img/df_ava.png'); });
})
/**
 * 验证方法
 * @type type
 */
var reg = {
    empty: /^\s*$/g, //空判断
    tel: /^1\d{10}$/, //手机号判断
    phone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, //座机号判断
    tax: /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/, //税号判断
    number: /^[0-9]*$/, //数字组合判断
    integer: /^[1-9]+\d*$/, //正整数判断不含0
    plus: /^\d+(\.\d{1,2})?$/, //含0正数判断最多2位小数
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, //邮箱判断
    time: /^(19|20)\d{2}-(0?\d|1[012])-(0?\d|[12]\d|3[01])$/, //时间正则
    numerical: /^(\-)?\d+(\.\d{1,2})?$/, //正负数值2位小数
    serial: /^[0-9a-zA-Z]*$/ //串码正则
};

function CHECK_URL(url) {
    //url= 协议://(ftp的登录信息)[IP|域名](:端口号)(/或?请求参数)
    var strRegex = '^((https|http|ftp)://)?'//(https或http或ftp):// 可有可无
            + '(([\\w_!~*\'()\\.&=+$%-]+: )?[\\w_!~*\'()\\.&=+$%-]+@)?' //ftp的user@  可有可无
            + '(([0-9]{1,3}\\.){3}[0-9]{1,3}' // IP形式的URL- 3位数字.3位数字.3位数字.3位数字
            + '|' // 允许IP和DOMAIN（域名）
            + '(localhost)|'	//匹配localhost
            + '([\\w_!~*\'()-]+\\.)*' // 域名- 至少一个[英文或数字_!~*\'()-]加上.
            + '\\w+\\.' // 一级域名 -英文或数字  加上.
            + '[a-zA-Z]{1,6})' // 顶级域名- 1-6位英文
            + '(:[0-9]{1,5})?' // 端口- :80 ,1-5位数字
            + '((/?)|' // url无参数结尾 - 斜杆或这没有
            + '(/[\\w_!~*\'()\\.;?:@&=+$,%#-]+)+/?)$';//请求参数结尾- 英文或数字和[]内的各种字符

    var strRegex1 = '^(?=^.{3,255}$)((http|https|ftp)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/)?(?:\/(.+)\/?$)?(\/\w+\.\w+)*([\?&]\w+=\w*|[\u4e00-\u9fa5]+)*$';
    var re = new RegExp(strRegex, 'i');//i不区分大小写
    //将url做uri转码后再匹配，解除请求参数中的中文和空字符影响
    if (re.test(encodeURI(url))) {
        return (true);
    } else {
        return (false);
    }
}
/**
 * 通用预设正则判断
 * @param {type} key 类型
 * @param {type} val 参数
 * @returns {unresolved}
 */
function reg_test(key, val) {
    return reg[key].test(val);
}


/**
 * 信息框|刷新OR跳转
 * @param {type} info 提示信息
 * @param {type} status 提示类型
 * @param {type} url 跳转网址
 * @param {type} state 是否新窗口打开
 * @returns {undefined}
 */
function jump_info(info, status, url, state) {
    var state = state || false;
    dump(info, status);
    setTimeout(function () {
        if (url === undefined) {
            location.reload();
        } else {
            state ? window.open(url) : window.location.href = url;
        }
    }, 2000);
}

/**
 * 消息警告框
 * @param msg
 * @param options
 */
function msg_tips(msg, options) {
    layui.use('layer', function () {
        var default_options = {
            scrollbar: false,
            move: false,
            btn: false,
            title: "Tips",
            time: 4000,
        };
        default_options = $.extend({}, default_options, options);
        layui.layer.alert(msg, default_options);
    });
}

/**
 *
 * @param msg_text
 * @param status
 * @param _time
 */
function dump(msg_text, status, _time) {
    if (!_time) {
        if(window.hasOwnProperty('Config')) {
            _time = (window.Config.login_type == 'co' || window.Config.login_type == 'adm') ? 2000 : _time
        }

    }
    layui.use('layer', function () {
        let default_options = {
            scrollbar: false,
            move: false,
            btn: false,
            shadeClose: false,
            shade: 0.6,
            title: "Tips",
            time: _time || 4000,
        };
        default_options = $.extend({}, default_options, {icon: status});
        layui.layer.alert(msg_text, default_options);
    });
}
function toast(e){
    var iconHtml='';
    if(typeof e == 'string'){
        e = {msg: e}
    }
    if (!e.msg) {
        console.error('text 不能为空!');
        return;
    }
    if (e.icon) {
        iconHtml=`<i class="layui-icon ${e.icon}" style="font-size: 34px;"></i>`;
    }
    var m = document.createElement('div');
    m.id = 'toastId';
    m.classList.add('toast', 'in');
    m.innerHTML = `<p class="text">${iconHtml}<div>${e.msg}</div></p>`;
    var toastId = document.getElementById('toastId');
    if(toastId==null){
        document.body.appendChild(m);
        toastId = document.getElementById('toastId');
        toastId.classList.add('in');
        var hideTimeOut = setTimeout(()=> {
            toastId.classList.remove('in');
            clearInterval(hideTimeOut)
            document.body.removeChild(m)
        }, e.time || 3E3);
    }
}
/**
 * 消息|非跳转
 * @param {type} msg_text 提示信息
 * @param {type} dom dom节点
 * @returns {undefined}
 */
function dump_tips(msg_text, dom, options) {
    layui.use('layer', function () {
        layui.layer.tips(msg_text, dom, options)
    });
}

function openConfirm(msg,_function="",_title=" ",_area=['400px','auto'],_btn=["confirm", "cancel"]) {
    layui.use(['form'], function () {
        layer.confirm(msg, {btn:_btn, title: _title, skin: "confirm-sky",area:_area}, _function);
    });
}
//通用遮罩AJAX
function ajax(type,url,data,fun,async_type,bool=true,dataType="json"){
    layui.use(['layer'],function(){
        $.ajax({
            type: type,
            url: url,
            data: data,
            async: async_type,
            dataType: dataType,
            success: fun,
            cache:false,
            error: function(resule){
                console.log(resule);
                localStorage.setItem('TR_Error',resule.responseText);
                let msg=resule.responseText;
                if(resule.responseJSON){
                    msg=resule.responseJSON.msg;
                }
                dump(msg,5);
            },
            beforeSend:function(){
                if(bool){
                    layer.load(1, {
                        shade: [0.1,'#000']
                    });
                }
            },
            complete:function(){
                if(bool){
                    layer.closeAll('loading');
                }
            }
        });
    });
}

function countDown(_data, fn) {
    var maxtime=(new Date(_data.replace(/-/g,'/')).getTime()-new Date().getTime())/1000;
    var timer = setInterval(function () {
        if (maxtime>=0) {
            var day = Math.floor(maxtime / 86400),
                    hour = Math.floor((maxtime % 86400) / 3600)+(day*24),
                    minutes = Math.floor((maxtime % 3600) / 60),
                    seconds = Math.floor(maxtime % 60);
                    if(seconds<10){
                        seconds="0"+seconds;
                    }
                    if(minutes<10){
                        minutes="0"+minutes;
                    }
                    if(hour<10){
                        hour="0"+hour;
                    }
            var msg = hour + ":" + minutes + ":" + seconds;
            fn(msg);
            --maxtime;
        } else {
            clearInterval(timer);
            fn("时间到，结束!");
        }
    }, 1000);
}
function countDown2(_data,_dataos, fn,_addtime=0,_fn=function(){}) {
    var maxtime = (new Date(_data.replace(/-/g,'/')).getTime() - new Date(_dataos.replace(/-/g,'/')).getTime()) / 1000;
    maxtime=maxtime +_addtime;
    var timer = setInterval(function () {
        if (maxtime>0) {
            var day = Math.floor(maxtime / 86400),
                    hour = Math.floor((maxtime % 86400) / 3600)+(day*24),
                    minutes = Math.floor((maxtime % 3600) / 60),
                    seconds = Math.floor(maxtime % 60),
                    msg =  hour + ":" + minutes + ":" + seconds;
            $("#span" + fn).html(msg);
            _fn(true,fn);
            --maxtime;
        } else {
            clearInterval(timer);
            _fn(false,fn);
            $("#span" + fn).html("00:00:00");
        }
    }, 1000);
}
function countDown3(_data,_dataos, fn,_addtime=0) {
    var maxtime=(_data-_dataos);
    maxtime=maxtime +_addtime;
    var timer = setInterval(function () {
        if (maxtime>=0) {
            var day = Math.floor(maxtime / 86400),
                    hour = Math.floor((maxtime % 86400) / 3600)+(day*24),
                    minutes = Math.floor((maxtime % 3600) / 60),
                    seconds = Math.floor(maxtime % 60);
                    if(seconds<10){
                        seconds="0"+seconds;
                    }
                    if(minutes<10){
                        minutes="0"+minutes;
                    }
                    if(hour<10){
                        hour="0"+hour;
                    }
            var msg = hour + ":" + minutes + ":" + seconds;
            fn(msg);
            --maxtime;
        } else {
            clearInterval(timer);
            fn("Overtime");
        }
    }, 1000);
}
//日期加天数
function dateAddDays(dataStr,dayCount) {
    var strdate=dataStr;
    var isdate = new Date(strdate.replace(/-/g,"/"));
    isdate = new Date((isdate/1000+(86400*dayCount))*1000);
    var pdate = isdate.getFullYear()+"-"+(isdate.getMonth()+1)+"-"+(isdate.getDate());
    return pdate;
}

function Timeadd(_data, fn) {
    var severtime=new Date(_data.replace(/-/g,'/'));
    //获取服务器日期
    var year = severtime.getFullYear();
    var month = severtime.getMonth() + 1;
    var date = severtime.getDate();
    //获取服务器时间
    var hour = severtime.getHours();
    var minu = severtime.getMinutes();
    var seco = severtime.getSeconds();
    setInterval(function () {
        seco++;
    if (seco == 60) {
        minu += 1;
        seco = 0;
    }
    if (minu == 60) {
        hour += 1;
        minu = 0;
    }
    if (hour == 24) {
        date += 1;
        hour = 0;
    }
    //日期处理
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (date == 32) {
            date = 1;
            month += 1;
        }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (date == 31) {
            date = 1;
            month += 1;
        }
    } else if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0) {//闰年处理
            if (date == 29) {
                date = 1;
                month += 1;
            }
        } else {
            if (date == 28) {
                date = 1;
                month += 1;
            }
        }
    }
    if (month == 13) {
        year += 1;
        month = 1;
    }
    var sseco = addZero(seco);
    var sminu = addZero(minu);
    var shour = addZero(hour);
    var sdate = addZero(date);
    var smonth = addZero(month);
    var syear = year;
     $("#span" + fn).html(syear + "-" + smonth + "-" + sdate + " " + shour + ":" + sminu + ":" + sseco + " " );
    },1000);
}
function addZero(num) {
    num = Math.floor(num);
    return ((num <= 9) ? ("0" + num) : num);
}



function countDown4(_data,_dataos,_datastr, fn) {
    var maxtime=(_data-_dataos);
    var timer = setInterval(function () {
        if (maxtime>=0) {
            var day = Math.floor(maxtime / 86400),
                    hour = Math.floor((maxtime % 86400) / 3600)+(day*24),
                    minutes = Math.floor((maxtime % 3600) / 60),
                    seconds = Math.floor(maxtime % 60);
                    if(seconds<10){
                        seconds="0"+seconds;
                    }
                    if(minutes<10){
                        minutes="0"+minutes;
                    }
                    if(hour<10){
                        hour="0"+hour;
                    }
            var msg = hour + ":" + minutes + ":" + seconds;
            if(maxtime<60){
                fn(msg,true);
            }else{
                fn(msg,false);
            }
            --maxtime;
        } else {
            clearInterval(timer);
            var _mintime=(_dataos-_data);
            Timeadd2(_mintime,fn);
        }
    }, 1000);
}


function Timeadd2(maxtime, fn) {
        if(maxtime<0){
            window.location.href=window.location.pathname;
        }
       var date = Math.floor(maxtime / 86400),
                    hour = Math.floor((maxtime % 86400) / 3600)+(date*24),
                    minu = Math.floor((maxtime % 3600) / 60),
                    seco = Math.floor(maxtime % 60);
    setInterval(function () {
        seco++;
        if (seco == 60) {
            minu += 1;
            seco = 0;
        }
        if (minu == 60) {
            hour += 1;
            minu = 0;
        }
        if (hour == 24) {
            date += 1;
            hour = 0;
        }
        var sseco = addZero(seco);
        var sminu = addZero(minu);
        var shour = addZero(hour);
        var sdate = addZero(date);
        if(minu>=12||hour>0||hour<0||minu<0){
            window.location.href=window.location.pathname;
        }else if(minu>=10){
            fn("<span style='color:#ff5622'>"+shour + ":" + sminu + ":" + sseco+"</span>",true);
        }else if(minu>=5){
            fn("<span style='color:#f39800'>"+shour + ":" + sminu + ":" + sseco+"</span>",true);
        }else{
            fn(shour + ":" + sminu + ":" + sseco,true);
        }
    },1000);
}

/**
 * 获取URL参数
 * @param name
 * @returns {string|null}
 */
function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    };
    return null;
}


function _canvasWM({
        container = document.body,
        width = '200px',
        height = '150px',
        textAlign = 'center',
        textBaseline = 'middle',
        font = "20px microsoft yahei",
        fillStyle = 'rgba(180, 180, 180, 0.25)',
        content = 'DEMO演示版',
        rotate = '30',
        zIndex = 1,
        fillX = 110,
        fillY = 50,
    } = {}) {

    var canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    var ctx = canvas.getContext("2d");

    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, fillX, fillY);

    var base64Url = canvas.toDataURL();
    const watermarkDiv = document.createElement("div");
    watermarkDiv.setAttribute('style', `
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:${zIndex};
          pointer-events:none;
          background-repeat:repeat;
          background-image:url('${base64Url}')`);
    container.style.position = 'relative';
    container.insertBefore(watermarkDiv, container.firstChild);
}

/**
 * 埋点统计
 * @param source string 来源
 * @param target string 目标
 * @param event
 */
function statistics(source = "none", target = "none", event = null) {
    /*$.ajax({
        type: "get",
        url: "/statistics",
        data: {
            source: source,
            url: window.location.href,
            target: target
        },
        async: true,
        success: function() {
        },
        cache:false,
        error: function(result){
        }
    });*/

    if(event) {
        event.stopPropagation();
    }
}

// <script crossorigin="anonymous" src="{:cdn_resource('/static/lib/layui/modules/xm-select.js')}" type="text/javascript" charset="utf-8"></script>
function xmSelectCityRender(element, fieldName, remoteUrl, max, selected, options) {
    // FIXME fix 重复执行
    if ($(element).find('xm-select').length) return;
    var html = '<input type="hidden" class="xm-search-input-text">';
    $(element).after(html);

    function  setSelected(data, selected) {
        if(!selected) {
            return data
        }
        selected = selected.split(',')
        selected = selected.map(select => {
            return parseInt(select.replace('/\'/g', ''))
        })
        data = data.map(item => {
            if (selected.includes(item.id)) {
                item.selected = true
            }
            return item
        });
        return data
    }

    let text = $(element).text();
    if(text.length === 0) {
        text = $(element).attr('data-text')
    }
    console.log(text)

    return xmSelect.render(Object.assign({
        el: element,
        name: fieldName,
        initValue: [],
        tips: text,
        height: '220px',
        theme: {
            color: '#6684f2',
        },
        delay: 600,
        autoRow: false,
        toolbar: {
            show: true,
            list: ['ALL', 'CLEAR', 'REVERSE']
        },
        filterable: true,
        searchTips: '输入关键词搜索',
        prop: {
            name: 'name',
            value: 'id',
        },
        max: max,
        maxMethod(seles, item) {
            layer.msg(`${item.name} 不能选了, 已经超了`)
        },
        paging: true,
        pageRemote: true,
        remoteSearch: true,
        show() {
            var text = $(element).next('.xm-search-input-text').val()
            $(element).find('.xm-search-input').val(text)
        },
        hide() {
            var search_string = $(element).find('.xm-search-input').val();
            $(element).next('.xm-search-input-text').val(search_string)
        },
        remoteMethod: function (val, cb, show, pageIndex) {
            if ($(element).hasClass('div-placeholder')) {
                $(element).removeClass('div-placeholder').text('');
            }
            $.ajax({
                method: 'post',
                dataType: 'json',
                async: true,
                url: remoteUrl,
                data: {
                    keyword: val,
                    page: pageIndex,
                    limit: 6,
                    adlist: 1 // 请注意这里，广告页面才要加
                },
                success: function (res) {
                    let data = setSelected(res.data, selected);
                    cb(data, res.page);
                },
                error: function (e, code) {
                    cb([], 0);
                }
            });
        },
    },options))
}