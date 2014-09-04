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
		preprocessor:{
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
				//不压缩require关键字，nfejs需要
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
			id:'$1',
			release:'/static/modules/$1/$1.$2'
		},{
			reg:/^\/modules\/(\w+)(?:-[\d\.]*)?[^\/]+\/\1\.(js|coffee|less|css)$/i,
			isMod:false,
			useSprite:true,
			id:'$1',
			release:'/static/modules/$1/$1.$2'
		},{
			reg:/^\/modules\/nuit(?:-[\d\.]*)\/([^\/]+)\/\1\.(js|coffee)$/i,
			isMod:false,
			useSprite:true,
			id:'nuit/$1/$1',
			release:'/static/modules/nuit/$1/$1.$2'
		},{
			reg:/^\/modules\/nuit(?:-[\d\.]*)\/([^\/]+)\/\1\.(less|css)$/i,
			isMod:false,
			useSprite:true,
			id:'nuit/$1/$1.css',
			release:'/static/modules/nuit/$1/$1.$2'
		},{
			reg:/^\/libs\/(.*\.(js|coffee|less|css))$/i,
			isMod:false,
			useSprite:true,
			id:'$1',
			release:'/static/libs/$1'
		},{
			reg:/^\/pages\/(.*)\.(js|coffee)$/i,
			isMod:true,
			useSprite:true,
			id:'$1',
			release:'/static/js/$1.$2'
		},{
			reg:/^\/pages\/(.*)\.(less|css)$/i,
			isMod:true,
            isCssLike:true,
			useSprite:true,
			id:'$1.css',
			release:'/static/css/$1'
		},{
			reg:/^\/pages\/(.*)\.(git|png|jpg|jpeg|bmp)$/i,
			useSprite:true,
			release:'/static/img/$1.$2'
		},{
			reg:/\.mixin\.less$/,
			release:false
		},{
			reg:/\.(js|coffee|less|css)$/,
			useSprite:true,
			useMap:false
		},{
			reg:/\/pages\/(.*\.(?:htm|html|php|jsp))$/,
			useSprite:true,
			release:'/template/$1'
		},{
			reg:'**',
			useHash:false,
			useComplie:false
		}]
	}
};
