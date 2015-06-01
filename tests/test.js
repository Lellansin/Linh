var run = require('../lib/linh');


// var code = 'add 5 sub 12 5';
// var code = 'sub 12 add 5 6';
// var code = 'if true echo 123'
// var code = 'if gt 5 12. echo 123'
// var code = 'if gt 3 2. echo "hello world,3 > 2" "test"';
// var code = 'set name 1234'
// var code = 'set num 3'
// var code = 'do 3 gt 5'
// var code = 'if do 5 lt 3, echo "5 < 3", else echo "5 > 3"'
// var code = 'do echo "world", echo "hello"'

// var code = 'set i 10';
// var code = 'i';
// var code = 'while lt i 5, do echo i, inc i.';
// var code = 'while lt i 5, do echo i, inc i. echo "over"';

var code = 'set i 0. while lt i 5, do echo i, inc i.';

console.log(run(code));
