

module.exports = function(ret, conf, settings, opt){
	console.log('---------------------------------');

	var map = fis.config.get('framework', {});
	fis.util.map(ret.src, function(subpath, file){
		var id = file.getId();
		if(file.isMod && file.isJsLike){
		}
	});

	console.log('---------------------------------');
};
