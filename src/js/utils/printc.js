/*
 * print colorful
 */

var util = require('util');

var styles = {
  'bold':      ['\033[1m', '\033[22m'],
  'italic':    ['\033[3m', '\033[23m'],
  'underline': ['\033[4m', '\033[24m'],
  'inverse':   ['\033[7m', '\033[27m'],
  'black':     ['\033[30m', '\033[39m'],
  'red':       ['\033[31m', '\033[39m'],
  'green':     ['\033[32m', '\033[39m'],
  'yellow':    ['\033[33m', '\033[39m'],
  'blue':      ['\033[34m', '\033[39m'],
  'magenta':   ['\033[35m', '\033[39m'],
  'cyan':      ['\033[36m', '\033[39m'],
  'white':     ['\033[37m', '\033[39m'],
  'default':   ['\033[39m', '\033[39m'],
  'grey':      ['\033[90m', '\033[39m'],
  'bgBlack':   ['\033[40m', '\033[49m'],
  'bgRed':     ['\033[41m', '\033[49m'],
  'bgGreen':   ['\033[42m', '\033[49m'],
  'bgYellow':  ['\033[43m', '\033[49m'],
  'bgBlue':    ['\033[44m', '\033[49m'],
  'bgMagenta': ['\033[45m', '\033[49m'],
  'bgCyan':    ['\033[46m', '\033[49m'],
  'bgWhite':   ['\033[47m', '\033[49m'],
  'bgDefault': ['\033[49m', '\033[49m']
}

module.exports = function() {
	var string = util.format.apply(this, arguments);
	string = string.replace(/[\d]+|true|false|(undefined)|(\"[\w\W]*?\")/g, function(text, undef, str) {
		if (!!undef) {
			return styles.grey[0] + text + styles.grey[1];
		} else if (str) {
			return styles.green[0] + text + styles.green[1];
		}
		return styles.yellow[0] + text + styles.yellow[1];
	});
	process.stdout.write(string + '\n');
};

// module.exports(true)
// module.exports('true')
// module.exports('hello 1, true, undefined \"hello world\" ')
