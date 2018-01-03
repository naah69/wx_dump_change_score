# wx_dump_change_score
## 本地构建版本
微信小游戏跳一跳通过HTTP代理拦截进行更改分数

使用阿里巴巴开发的AnyProxy作为HTTP代理

node.js通过npm install -g anyproxy 安装AnyProxy

使用anyproxy-ca 生成证书
使用anyproxy -i --rule=路径+wxdump.js  启用https代理


移动端通过wifi代理启用anyproxy的服务器的ip，端口默认为8001

移动端要安装证书才能使用，不然无法拦截https请求
然后移动端通过浏览器进入 ip:8002  点击下载crt证书  进行安装

安装后 关闭wifi  重新开启wifi

将微信后台关闭  重新开启  进入小程序 此时应该已经成功刷入

将微信后台关闭  重新开启   进入跳一跳小程序排行榜进行查看

如未成功 可进行5-10次自杀游戏即可刷新成绩，重启微信进行查看

刷分规则  默认8000+2000以内随机数  最后多少分 看你们自己的造化了

## 网络使用版本
微信公众号：xyl-tech（被封了，日了狗）
本地构建失败的，可以关注该公众号，提供网络版本
证书:http://yingxiao-uat.baiwandian.cn/ca/rootCA.crt
代理ip：183.136.134.239
代理端口：8001

明天会发布自定义分数版本

