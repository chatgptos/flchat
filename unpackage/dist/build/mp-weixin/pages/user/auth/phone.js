(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/auth/phone"],{"12c8":function(e,t,n){"use strict";(function(e){n("e954");o(n("66fd"));var t=o(n("6e54"));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n("543d")["createPage"])},"1ff2":function(e,t,n){},"20e0":function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var u=function(){var e=this,t=e.$createElement;e._self._c},r=[]},"2e12":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("7d5f"));function u(e){return e&&e.__esModule?e:{default:e}}var r={data:function(){return{mobile:"",pageroute:""}},onLoad:function(e){this.mobile=e.mobile,this.pageroute=e.url},methods:{formSubmit:function(e){var t=[{name:"mobile",checkType:"phoneno",errorMsg:"请输入正确的手机号"}],n=e.detail.value,u=o.default.check(n,t);u?this.$flbooth.to("validcode?event=mobilelogin&mobile=".concat(e.detail.value.mobile,"&url=").concat(this.pageroute),"slide-in-bottom",200):this.$flbooth.msg(o.default.error)},phoneKey:function(e){var t=this.value.trim();if(8!==e.keyCode){var n=t.length;3!==n&&8!==n||(t+=" ",this.value=t)}else this.value=t},name:function(){this.$flbooth.to("name?name=".concat(this.mobile,"&url=").concat(this.pageroute))},register:function(){this.$flbooth.to("register?url=".concat(this.pageroute))},help:function(){this.$flbooth.to("/pages/user/help?url=".concat(this.pageroute))}}};t.default=r},4019:function(e,t,n){"use strict";n.r(t);var o=n("2e12"),u=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=u.a},"48d2":function(e,t,n){"use strict";var o=n("1ff2"),u=n.n(o);u.a},"6e54":function(e,t,n){"use strict";n.r(t);var o=n("20e0"),u=n("4019");for(var r in u)"default"!==r&&function(e){n.d(t,e,(function(){return u[e]}))}(r);n("48d2");var i,a=n("f0c5"),c=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);t["default"]=c.exports}},[["12c8","common/runtime","common/vendor"]]]);