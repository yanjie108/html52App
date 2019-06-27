//testmodule.js
ModuleDefine(function(exports){
	"use strict";
	//指定模块名称，为了按模块名称引入
	/**
		html 需要引入js (需要在pagejs前引入)
		<script type="text/javascript" src="./js/testmodule.js"></script>
		pagejs 引入module
		let testmoduleobj=this.require("testmodule") 
	*/
	
	exports.name="testmodule"


	//自定义业务方法
	function sayHello(name) {
		console.log('module_utils.js  Hello '+name+' !')
	}

	//暴露业务方法
	exports.sayHello = sayHello;

})