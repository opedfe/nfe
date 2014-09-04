
var path = require('path');

var u = require('underscore');

var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
var SLASH_RE = /\\\\/g;

function parseDependencies(code) {
  var ret = [];

  code.replace(SLASH_RE, "")
	  .replace(REQUIRE_RE, function(m, m1, m2) {
		if (m2) {
		  ret.push(m2)
		}
	  });

  return u.uniq(ret);
}

module.exports = function(content, file){

	//if(file.isMod){
		//content = 'define(\'' + file.getId() + '\', function(require, exports, module){' + content + '\n\n})';
	//}
		var id = file.getId();
		if(file.isMod && file.isJsLike){
			var deps = [];
			var requires = file.requires;
			if(requires.length == 0){
				requires = parseDependencies(content);
			}
			for(var i=0; i<requires.length; i++){
				var dep = requires[i];
				if(dep.indexOf('.') === 0){
					dep = path.join(path.dirname(id), dep);
				}
				deps.push('\'' + dep + '\'');
				//deps.push('\'' + file.requires[i] + '\'');
			}
			content = '/**\n * Build By nfe, Base on FIS\n * @author noahfe\n */\ndefine(\'' + file.getId() + '\', [' + deps.join(',') + '], function(require, exports, module){' + content + '});';
			file.isMod = false;
		}
	return content;
}
