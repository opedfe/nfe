var plugins = {
	define: require('../plugins/postprocessor/define.js'),
	frameworkConf: require('../plugins/postpackager/framework-conf.js')
};

module.exports = {
	modules:{
		parser:{
			md:'marked',
			less:'less',
			coffee:'coffee-script'
		},
		lint:{
			js:'jshint'
		},
		postprocessor:{
			js: plugins.define
		},
		postpackager:[plugins.frameworkConf]
	},
	settings:{
		lint:{
			ignored:['lib/**'],
			i18n:'zh-CN'
		},
		optimizer:{
			'uglify-js':{
				//不压缩require关键字，seajs需要
				except:['require']
			}
		}
	},
	roadmap:{
		ext:{
			less:'css',
			coffee:'js'
		},
		path:[{
			reg:/^\/modules\/([^\/]+)\/\1\.(js|coffee|less|css)$/i,
			isMod:false,
			useSprite:true,
			id:'$1'
		},{
			reg:/^\/pages\/(.*)\.(js|coffee|less|css)$/i,
			isMod:true,
			useSprite:true,
			id:'$1'
		},{
			reg:/\.mixin\.less$/,
			release:false
		},{
			reg:/\.(js|coffee|less|css)$/,
			useSprite:true,
			useMap:false
		},{
			reg:'**',
			useHash:false,
			useComplie:false
		}]
	}
};
