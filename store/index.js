/**
 * flbooth状态管理器
 * 
 * @ author 上海蜂雷网络科技有限公司 <flbooth@i36k.com>
 * < 程序仅用作fladmin付费服务API测试使用，未经版权所有权人书面许可，不能用于商业用途！>
 * @ link http://www.flbooth.com
 * @ 2019年9月10日12:52:20
 * @ 2020年9月29日19:00:46
 * @ version 1.0.0
 **/
import Vue from 'vue';
import Vuex	from 'vuex';
// 模块
import common from './modules/common';
import user	from './modules/user';
import chat	from './modules/chat';
import cart from './modules/cart';
import statistics from './modules/statistics';
import update from './modules/update';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		chat, // 即时通讯
		common, // 系统初始化
		user, // 用户中心
		cart, // 购物车
		statistics, // 系统更新
		update // 系统更新
	}
});

export default store;
