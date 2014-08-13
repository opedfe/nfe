

module.exports = function(ret, conf, settings, opt){

	//var map = fis.config.get('framework', {});
	//
	var fis_sea_conf = fis.config.get('seajs', {});
	fis_sea_conf.alias = fis_sea_conf.alias || {};
	fis.util.map(ret.map.res, function(id, res){
		fis_sea_conf.alias[id] = res.uri;
	});
	//构造seajs的config.js配置文件
	var seajs_config = fis.file(fis.project.getProjectPath(), 'sea-config.js');
	//拼接字符串，生成sea.config调用
	seajs_config.setContent('seajs.config(' + JSON.stringify(fis_sea_conf, null, opt.optimize ? null : 4) + ');');
	//把新生成的文件放到打包文件输出表
	ret.pkg[seajs_config.subpath] = seajs_config;
	//构造页面插入的script标签内容
	var script = '<script src="' + seajs_config.getUrl(opt.hash, opt.domain) + '"></script>';
	//找到所有的源码文件，对其进行配置文件script标签插入
	fis.util.map(ret.src, function(subpath, file){
		var id = file.getId();
		if(file.isMod && file.isJsLike){
			var deps = [];
			for(var i=0; i<file.requires.length; i++){
				deps.push('\'' + file.requires[i] + '\'');
			}
			var cnt = file.getContent();
			cnt = '/**\n * Build By nfe, Base on FIS\n * @author noahfe\n */\ndefine(\'' + file.getId() + '\', [' + deps.join(',') + '], function(require, exports, module){' + cnt + '});';
			file.setContent(cnt);
			//ret.pkg[subpath + '.js'] = file;
		}
		if(file.isHtmlLike){
			var cnt = file.getContent();
			if(/\bseajs\.use\s*\(/.test(cnt)){//有用到seajs.use才插入配置
				cnt = cnt.replace(/<\/head>/, script + '\n$&');
				file.setContent(cnt);
			}
		}
	});

};
