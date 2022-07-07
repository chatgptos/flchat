<!-- * flbooth - App全局模板配置
 * @author 上海蜂雷网络科技有限公司 <flbooth@fladmin.com>
 * @link http://www.flbooth.com
 * 
 * @本程序受法律保护，著作权©软著登记号2020SR0255711 < 未经版权所有权人书面许可，不能用于商业用途！>
 *  
 -->
<script>
	import Vue from 'vue';
	export default {
		onLaunch() {
			// 检测客户端更新
			this.$store.dispatch('update/update');
			// 仅首次打开一次性加载数据
			this.$store.dispatch('common/init');
			// 同步购物车 本地 & 网络
			this.$store.dispatch('cart/get');
			// 同步 动态数据
			this.$store.dispatch('statistics/get');
		},
		onShow() {
			// 启动或重启即时通讯
			this.$store.dispatch('chat/start');
		},
		onHide() {
			// 断开即时通讯
			this.$store.dispatch('chat/close');
		}
	};
</script>

<style>
	/* #ifndef APP-NVUE */
	@import 'static/style/colorui.css';
	@import 'static/style/flbooth.css';
	@import 'static/style/iconfont.css';
	/* #endif */
</style>
