/**
 * flbooth 多用户电商系统核心配置项
 * @author 上海蜂雷网络科技有限公司 <flbooth@fladmin.com>
 * < 本程序，未经版权所有权人书面许可，不能自行用于商业用途！>
 * 
 * @config socketUrl 即时通讯服务器地址，微信必须使用wss:// 如：wss://chat.flbooth.com
 * @config cdnUrl OSS服务地址  如：https://oss.flbooth.com 或 https://www.flbooth.com
 * @config appUrl API服务器地址 如：https://api.flbooth.com 或 https://www.flbooth.com/api
 * @config amapKey 高德网页Key
 * @config debug 全局调试
 * 
 * @ 相关文档 https://doc.fladmin.net/flbooth/265.html
 */
export default {
	socketurl: 'ws://flshop.com:7272', //如果是ws:// 地址为ws://你服务器IP:7272 如 ws://123.4.56.78:7272，使用wss 后面不需要添加 :7272 端口
	cdnurl: 'http://flshop.com',
	appurl: 'http://flshop.com/api', //如二级域名：https://api.flbooth.com 或不使用二级域名 https://www.flbooth.com/api
	amapkey: '0a9f67a6******fde88b',
	appid: 'wxb21542e7323fd115', // 公众号appid
	versionName: '1.1.4',
	versionCode: '114',
	debug: false
}