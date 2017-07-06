# express+mongodb+jade

主要参考教程[一个使用NODE JS, EXPRESS, JADE和MONGODB的极简开发教程](http://www.jianshu.com/p/3b045636bcec)

先要在本机装好mongodb，参考[Mac 上安装MongoDB](http://www.jianshu.com/p/dd0c39bf7be4)

可简单总结为

	brew update
	brew install mongodb
	mongod --config /usr/local/etc/mongod.conf
	
要操作数据库，可开启另一个终端，输入以下指令

	mongo
	use test

相关api可参考[简书-nodejs连接mongodb](http://www.jianshu.com/p/f02c0ff20db8)

再开启一个终端，必须**先开启mongodb服务，再新建一个mongodb的数据库test**
	
	yarn start
	
就可以进行正常的crud了。
