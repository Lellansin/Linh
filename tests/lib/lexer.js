var lexer = require('../../lib/lexer');

console.log('parse', lexer.parse('i'));;
// console.log('parse', lexer.parse('arr[0]'));; // todo
console.log('parse', lexer.parse('$i'));;
console.log('parse', lexer.parse('name'));;
console.log('parse', lexer.parse('"name"'));;
console.log('parse', lexer.parse('"hello world"'));;
console.log('parse', lexer.parse('"hello world \\" "'));;
console.log('parse', lexer.parse('name1'));;
console.log('parse', lexer.parse('name_1'));;
console.log('parse', lexer.parse('_name'));;
console.log('parse', lexer.parse('name-1'));;
console.log('parse', lexer.parse('name-1 '));;
console.log('parse', lexer.parse('name-1?'));;
console.log('parse', lexer.parse('123'));;
console.log('parse', lexer.parse('1'));;
console.log('parse', lexer.parse('12.3'));;
