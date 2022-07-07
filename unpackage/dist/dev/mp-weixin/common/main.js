(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],[
/* 0 */
/*!*******************************************!*\
  !*** D:/soft/fenglei/code/flshop/main.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {__webpack_require__(/*! uni-pages */ 5);







var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 6));

var _store = _interopRequireDefault(__webpack_require__(/*! ./store */ 12));

var _request = _interopRequireDefault(__webpack_require__(/*! ./common/request/request */ 18));
var _flbooth_function = _interopRequireDefault(__webpack_require__(/*! ./common/flbooth_function */ 22));
var _config = _interopRequireDefault(__webpack_require__(/*! ./common/config/config */ 19));
var _mpShare = _interopRequireDefault(__webpack_require__(/*! ./common/libs/mixin/mpShare */ 26));





var _base = _interopRequireDefault(__webpack_require__(/*! ./common/base64 */ 27));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__; /**
                                                            * flbooth - App全局配置
                                                            * @author 上海蜂雷网络科技有限公司 <flbooth@fladmin.com>
                                                            * @link http://www.flbooth.com
                                                            *  
                                                            **/ // 小程序分享的mixin封装
_vue.default.mixin(_mpShare.default); // 阻止启动生产消息，常用作指令。
_vue.default.config.productionTip = _config.default.debug; // 挂载
_vue.default.prototype.$api = _request.default; //Request
_vue.default.prototype.$store = _store.default; //挂载在 Vue 实例上

// 1.1.3升级
_vue.default.prototype.$base64 = new _base.default();

// 配置请求
_request.default.setConfig({
  baseUrl: _config.default.appurl,
  debug: _config.default.debug });


// 请求拦截
_request.default.interceptor.request = function (config) {
  // 给header添加全局请求参数token
  if (!config.header.token || !config.header.flbooth) {
    var wanlLogin = uni.getStorageSync("flbooth:user");
    if (wanlLogin) {
      config.header.token = uni.getStorageSync("flbooth:user").token;
    }












    config.header['App-Client'] = 'mp-flbooth';

    // 设置语言
    config.header['Accept-Language'] = 'zh-CN,zh;q=0.9';
  }
  // 添加一个自定义的参数，默认异常请求都弹出一个toast提示
  if (config.toastError === undefined) {
    config.toastError = true;
  }
  return config;
};

/**
    * 全局的业务拦截
    * @上海蜂雷网络科技有限公司 <www.flbooth.com>
    */
_request.default.interceptor.response = function (res, config) {
  if (res.code === 1) {
    res.success = true;
  } else if (res.code === 401) {// token失效，需要重新登录
    to('/pages/user/auth/auth');
  }
  _config.default.debug ? console.log(res) : '';
  return res;
};

/**
    * 全局错误提示
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @statusCode 200 业务错误
    * @statusCode 401 没有登录
    * @statusCode 403 没有权限
    * @statusCode 404 找不到文件
    * @statusCode 500 服务器内部错误
    */
_request.default.interceptor.fail = function (res, config) {
  var error = '';
  //业务错误、没有登录、没有权限
  if (res.statusCode === 200) {
    error = res.data.msg;
  } else if (res.statusCode === 401) {
    error = res.data.msg;
  } else if (res.statusCode === 403) {
    error = res.data.msg;
  } else if (res.statusCode === 404) {
    error = 'API接口不存在';
  } else if (res.statusCode === 500) {
    error = '服务器繁忙';
  } else {
    error = 'API接口异常';
  }
  if (res.errMsg == 'request:fail abort statusCode:-1') {
    _config.default.debug ? console.log(res) : '';
  } else {
    config.toastError ? msg(error) : '';
  }
  return res;
};

/**
    * 提示信息
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} title 提示标题
    * @param {Object} duration 提示时间
    * @param {Object} mask 遮罩层
    * @param {Object} icon 图标层
    */
var msg = function msg(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;var mask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'none';
  //统一提示方便全局修改
  if (Boolean(title) === false) {
    return;
  }
  uni.showToast({ title: title, duration: duration, mask: mask, icon: icon });
  if (_store.default.state.user.shock) {
    uni.vibrateShort();
  }
};

/**
    * 获取当前页面栈
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * 示例在地址管理，登录要参考下
    */
var prePage = function prePage() {
  var pages = getCurrentPages();
  var prePage = pages[pages.length - 2];



  return prePage.$vm;
};

/**
    * 获取系统信息
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    */
var wanlsys = function wanlsys() {
  var sys = uni.getSystemInfoSync();
  var data = {
    top: sys.statusBarHeight,
    height: sys.statusBarHeight + uni.upx2px(90),
    screenHeight: sys.screenHeight,
    platform: sys.platform,
    model: sys.model,
    windowHeight: sys.windowHeight,
    windowBottom: sys.windowBottom,
    deviceId: sys.deviceId };

  //
  // const custom = uni.getMenuButtonBoundingClientRect();
  // data.height = custom.bottom + custom.top - sys.statusBarHeight;
  //



  return data;
};

/**
    * 修改标题栏
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} text 新标题
    * @param {Object} barColor 导航栏颜色
    */
var title = function title() {var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';var setbar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (text) {
    uni.setNavigationBarTitle({
      title: text });

  }
  if (JSON.stringify(setbar) != "{}") {
    uni.setNavigationBarColor(setbar);
  }
};

/**
    * 获取图片完整地址
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} url 提示标题，不需要OSS处理
    */
var appstc = function appstc(url) {
  return _config.default.cdnurl + '/assets/addons/flbooth/img' + url;
};

/**
    * 数字格式化
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} number 数字
    * @param {Object} type 类型 thousand:万,hundred:百
    */
var toFormat = function toFormat(number, type) {
  //格式千位以上
  if (type == 'thousand') {
    if (number > 9999) {
      number = (number / 10000).toFixed(1) + 'w';
    } else if (number > 999) {
      number = (number / 1000).toFixed(1) + 'k';
    }
  }
  //格式百位
  if (type == 'hundred' && number > 99) {
    number = '99+';
  }
  return number;
};

/**
    * 加法精度计算
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} number 数字
    */
var bcadd = function bcadd(a, b) {
  return _flbooth_function.default.bcadd(a, b);
};

/**
    * 减法精度计算
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} number 数字
    */
var bcsub = function bcsub(a, b) {
  return _flbooth_function.default.bcsub(a, b);
};

/**
    * 乘法精度计算
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} number 数字
    */
var bcmul = function bcmul(a, b) {
  return _flbooth_function.default.bcmul(a, b);
};

/**
    * 除法精度计算
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} number 数字
    */
var bcdiv = function bcdiv(a, b) {
  return _flbooth_function.default.bcdiv(a, b);
};

/**
    * 时间格式化
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param String timestamp 时间戳
    * @param String fmt 返回的时间格式
    * yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
    */
var timeFormat = function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
};


/**
    * 社交时间友好
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param String timestamp 时间戳
    * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
    * 如果为布尔值false，无论什么时间，都返回多久以前的格式
    */
var timeToDate = function timeToDate() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = timeFormat(timestamp, format);
      }}

  return tips;
};

/**
    * IM时间友好
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param String timestamp 时间戳
    * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
    * 如果为布尔值false，无论什么时间，都返回多久以前的格式
    */
var timeToChat = function timeToChat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 86400:
      tips = timeFormat(timestamp, 'hh:MM');
      break;
    case timer >= 86400 && timer < 86400 * 7:
      var now = new Date(timestamp);
      var week = ['日', '一', '二', '三', '四', '五', '六'];
      switch (new Date().getDate() - now.getDate()) {
        case 1:
          tips = timeFormat(timestamp, '昨天 hh:MM');
          break;
        case 2:
          tips = timeFormat(timestamp, '前天 hh:MM');
          break;
        default:
          tips = '星期' + week[now.getDay()] + timeFormat(timestamp, 'hh:MM');}

      break;
    case timer >= 86400 * 7:
      tips = timeFormat(timestamp, 'mm-dd hh:MM');
      break;
    default:
      tips = timeFormat(timestamp, 'yyyy-mm-dd hh:MM');}

  return tips;
};


/**
    * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
    * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
    * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
    * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
    * v-for的时候,推荐使用后端返回的id而不是循环的index
    * @param {Number} len uuid的长度
    * @param {Boolean} firstU 将返回的首字母置为"u"
    * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
    */
var guid = function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
};

/**
    * 图像处理
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * @param {Object} url 图像地址
    * @param {Object} h  高度
    * @param {Object} w  宽度  
    * @param {Object} modenum 1.自适应 2.固定宽高短边缩放 3.固定宽高居中裁剪 4.强制宽高
    * @param {Object} type  使用类型  
    * @param {Object} format  图形格式  
    * @param {Object} resize  resize  
    * @param {Object} multiple  放大倍数  
    * 
    * $flbooth.oss(url, 120, 0, 2, 'transparent', 'png')
    */
var oss = function oss(url) {var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 120;var modenum = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';var format = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'jpg';var resize = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'resize';var multiple = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 3;
  var image = '';
  var mode = ["m_lfit", "m_mfit", "m_fill", "m_fixed"];
  // 图像，自适应方向：1，渐进显示：1，转换格式：jpg，图片质量：q_90，图片锐化：50，浓缩图
  var rule = ["?x-oss-process=image", "auto-orient,1", "interlace,1", "format,jpg", "quality,q_90", "sharpen,50", "resize,m_fixed,w_120,h_120"];
  // 转换格式
  if (format == 'png') {
    rule[3] = ["format", "png"].join(",");
  }
  // 判断是否有高度
  if (w == 0) {
    rule[6] = [resize, mode[modenum], "h_".concat(h * multiple)].join(",");
  } else if (h == 0) {
    rule[6] = [resize, mode[modenum], "w_".concat(w * multiple)].join(",");
  } else {
    rule[6] = [resize, mode[modenum], "w_".concat(w * multiple), "h_".concat(h * multiple)].join(",");
  }
  //当地址不存在
  if (url) {
    if (/^data:image\//.test(url)) {
      image = url;
    } else if (/^(http|https):\/\/.+/.test(url)) {
      rule.pop();
      image = type == 'video' ? url : url + rule.join("/");
    } else {
      image = type == 'video' ? _config.default.cdnurl + url : _config.default.cdnurl + url + rule.join("/");
    }
  } else {
    if (type == 'transparent') {

    } else if (type == 'avatar') {
      image = appstc('/common/mine_def_touxiang_3x.png');
    } else {
      image = appstc('/common/img_default3x.png');
    }
  }
  return image;
};

/**
    * 页面跳转
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} url 需要跳转的应用内非 tabBar 的页面的路径
    * @param {Object} animationType 窗口显示的动画效果
    * @param {Object} animationDuration 窗口动画持续时间，单位为 ms
    */
var to = function to(url) {var animationType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pop-in';var animationDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  uni.navigateTo({
    url: url,
    animationType: animationType,
    animationDuration: animationDuration,
    success: function success(res) {
      _config.default.debug ? console.log(res) : '';
    },
    fail: function fail(e) {
      _config.default.debug ? console.log(e) : '';
    } });

};

/**
    * 页面返回
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} num 返回页面数量
    */
var back = function back() {var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  console.log(num);
  uni.navigateBack({
    delta: num });

};

/**
    * 页面认证
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} url 地址
    */
var auth = function auth(url) {
  to(_store.default.state.user.isLogin ? url : '/pages/user/auth/auth');
};

/**
    * 打开任意链接
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {Object} url 页面地址
    */
var on = function on(url) {
  url = decodeURIComponent(url);
  // 关闭所有页面，跳转链接
  if (
  url == '/pages/index' ||
  url == '/pages/category' ||
  url == '/pages/find' ||
  url == '/pages/cart' ||
  url == '/pages/user')
  {
    uni.switchTab({
      url: url });

  } else {
    to(url);
  }
};

/**
    * 发送消息
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {JSON} data 页面地址
    */
var send = function send(data) {
  //将发送保存本地
  _request.default.post({
    url: '/flbooth/chat/send',
    data: data,
    success: function success(res) {
      _flbooth_function.default.setChat(data, 'send');
    } });

};

/**
    * 拨打电话
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {JSON} number 电话号码
    */
var phone = function phone(number) {
  uni.makePhoneCall({
    phoneNumber: number //仅为示例
  });
};

/**
    * 格式化kb
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {JSON} limit kb
    */
var conver = function conver(limit) {var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return (limit / (1024 * 1024)).toFixed(1) + (unit ? 'MB' : '');
};

/**
    * 遮罩
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    */
var maks = function maks() {






  return '';

};

/**
    * 获取配置
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {JSON} name 配置名称
    */
var config = function config(name) {
  return _config.default[name];
};


/**
    * 复制方法
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @param {JSON} content 复制内容
    */
var copy = function copy(content) {var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  // 复制内容，必须字符串，数字需要转换为字符串
  content = typeof content === 'string' ? content : content.toString();

  uni.setClipboardData({
    data: content,
    success: function success() {
      display ? msg("\u590D\u5236\u6210\u529F ".concat(content)) : msg('复制成功');
    },
    fail: function fail() {
      msg('复制失败');
    } });




















};

/**
    * flbooth 全局方法
    * @author 上海蜂雷网络科技有限公司 <www.flbooth.com>
    * 
    * @method $msg 全局提示
    * @method $prePage 页面栈
    * @method $wanlsys 系统配置
    * @method $title 动态修改标题
    * @method $appstc 服务器图片地址
    * @method $toFormat 数字格式化
    * @method $timeToDate 社交时间友好
    * @method $timeToChat IM时间友好
    * @method $timeFormat 时间格式化
    * @method $guid 生成guid
    * @method $oss OSS图片处理
    * @method $to 打开链接
    * @method $on 打开任意链接
    * @method $auth 认证页面
    * @method $back 返回
    * @method $send 发送消息
    * @method $phone 拨打电话
    * @method $con 获取配置
    * 
    */
_vue.default.prototype.$flbooth = {
  msg: msg,
  prePage: prePage,
  wanlsys: wanlsys,
  title: title,
  appstc: appstc,
  toFormat: toFormat,
  timeToDate: timeToDate,
  timeToChat: timeToChat,
  timeFormat: timeFormat,
  conver: conver,
  guid: guid,
  oss: oss,
  to: to,
  on: on,
  auth: auth,
  back: back,
  maks: maks,
  send: send,
  phone: phone,
  config: config,
  bcadd: bcadd,
  bcsub: bcsub,
  bcmul: bcmul,
  bcdiv: bcdiv,
  copy: copy };


// 全局商品链接
_vue.default.prototype.onGoods = function (id) {to("/pages/product/goods?id=".concat(id));};

// 全局订单详情
_vue.default.prototype.orderDetails = function (order_id) {to("/pages/user/order/details?id=".concat(order_id));};


// 全局店铺链接
_vue.default.prototype.onShop = function (id) {
  to("/pages/shop/index?id=".concat(id));
};

// 全局店铺链接
_vue.default.prototype.onShopGoods = function (id) {
  to("/pages/shop/product/list?shop_id=".concat(id));
};

//  全局物流动态
_vue.default.prototype.onLogistics = function (order_id) {to("/pages/user/order/logistics?id=".concat(order_id));};

// 全局联系方式 1.0.2升级
_vue.default.prototype.toChat = function (shop_id) {var goods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  goods ? to("/pages/notice/chat?shop_id=".concat(shop_id, "&goods=").concat(JSON.stringify(goods))) : to("/pages/notice/chat?shop_id=".concat(shop_id));
};

// 打开详情页
_vue.default.prototype.onDetails = function (id, title) {to("/pages/article/details?id=".concat(id, "&title=").concat(title));};

// 打开广告
_vue.default.prototype.onAdvert = function (data) {data.url && !/^(http|https):\/\/.+/.test(data.url) ? on(data.url) : to("/pages/article/advert?id=".concat(data.id));};

// 打开直播
_vue.default.prototype.onLive = function (id) {
  auth("/pages/apps/find/details/live?id=".concat(id));
};

// 打开发现
_vue.default.prototype.onFind = function (data) {var comments = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (data.type == 'live') {
    this.onLive(data.live_id);
  } else if (data.type == 'video') {
    to("/pages/apps/find/details/video?id=".concat(data.id));
  } else {
    if (comments) {
      to("/pages/apps/find/details/details?id=".concat(data.id, "&afferent=comments"));
    } else {
      to("/pages/apps/find/details/details?id=".concat(data.id));
    }
  }
};


_App.default.mpType = 'app';
var app = new _vue.default(_objectSpread({
  store: _store.default },
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!*******************************************!*\
  !*** D:/soft/fenglei/code/flshop/App.vue ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ 9);
/* harmony import */ var _hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 11);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 7 */
/*!********************************************************************!*\
  !*** D:/soft/fenglei/code/flshop/App.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../hbuild/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 8);
/* harmony import */ var _hbuild_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 8 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/soft/fenglei/code/flshop/App.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;







var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
var _default = { onLaunch: function onLaunch() {// 检测客户端更新
    this.$store.dispatch('update/update'); // 仅首次打开一次性加载数据
    this.$store.dispatch('common/init'); // 同步购物车 本地 & 网络
    this.$store.dispatch('cart/get'); // 同步 动态数据
    this.$store.dispatch('statistics/get');},
  onShow: function onShow() {
    // 启动或重启即时通讯
    this.$store.dispatch('chat/start');
  },
  onHide: function onHide() {
    // 断开即时通讯
    this.$store.dispatch('chat/close');
  } };exports.default = _default;

/***/ }),
/* 9 */
/*!****************************************************************************!*\
  !*** D:/soft/fenglei/code/flshop/App.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuild_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../hbuild/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../hbuild/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../hbuild/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../hbuild/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */ 10);
/* harmony import */ var _hbuild_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuild_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuild_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuild_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuild_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_hbuild_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_hbuild_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_hbuild_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuild_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 10 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/soft/fenglei/code/flshop/App.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })
],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map