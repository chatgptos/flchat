(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/auth/name"],{"02b1":function(t,e,n){},"39e5":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=c(n("7d5f"));function c(t){return t&&t.__esModule?t:{default:t}}var u={data:function(){return{submitDisabled:!0,account:"",pageroute:""}},onLoad:function(t){this.account=t.name,this.pageroute=t.url},methods:{onKeyInput:function(t){this.submitDisabled=!1},formSubmit:function(e){var n=this,c=[{name:"account",checkType:"notnull",errorMsg:"请输入用户名"},{name:"password",checkType:"string",checkRule:"6,16",errorMsg:"密码至少6位"}],u=e.detail.value,r=o.default.check(u,c);r?this.$api.post({url:"/flbooth/user/login",data:{account:u.account,password:u.password,client_id:t.getStorageSync("flbooth:chat_client_id")?t.getStorageSync("flbooth:chat_client_id"):null},success:function(e){n.$store.dispatch("user/login",e),n.$store.dispatch("cart/login"),n.$store.dispatch("chat/get"),t.reLaunch({url:decodeURIComponent(n.pageroute)})}}):this.$flbooth.msg(o.default.error)},retrieve:function(){this.$flbooth.to("retrieve?url=".concat(this.pageroute))},phone:function(){this.$flbooth.to("phone?url=".concat(this.pageroute))},register:function(){this.$flbooth.to("register?url=".concat(this.pageroute))},help:function(){this.$flbooth.to("/pages/user/help?url=".concat(this.pageroute))}}};e.default=u}).call(this,n("543d")["default"])},8588:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return o}));var c=function(){var t=this,e=t.$createElement;t._self._c},u=[]},"8cfc":function(t,e,n){"use strict";n.r(e);var o=n("39e5"),c=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=c.a},cb70:function(t,e,n){"use strict";n.r(e);var o=n("8588"),c=n("8cfc");for(var u in c)"default"!==u&&function(t){n.d(e,t,(function(){return c[t]}))}(u);n("d422");var r,a=n("f0c5"),i=Object(a["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=i.exports},d422:function(t,e,n){"use strict";var o=n("02b1"),c=n.n(o);c.a},fc9f:function(t,e,n){"use strict";(function(t){n("e954");o(n("66fd"));var e=o(n("cb70"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])}},[["fc9f","common/runtime","common/vendor"]]]);