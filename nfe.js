
var fis = module.exports = require('fis');

fis.require.prefixes = ['nfe', 'fis'];
fis.cli.name = 'nfe';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
fis.cli.version = 'v0.1.0';
fis.cli.help.commands = ['release', 'install', 'server'];

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

//alias
Object.defineProperty(global, 'nfe', {
	enumerable:true,
	writable:false,
	value:fis
});
