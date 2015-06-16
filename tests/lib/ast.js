var util = require('util');
var should = require('should');
var Token = require('../../lib/token');
var Context = require('../../lib/context');
var AST = require('../../lib/ast');

var root = {};
var context = new Context(root);
var AstTree = new AST(context);

describe('linh', function() {
    describe('#AST', function() {

        it('should match the AST 1', function(done) {
            var code = 'if gt 10 5, echo "10 > 5", else echo "10 < 5".';
            var values = Token(code);

            var list = AstTree.parse(values);

            checkTree(list, [{
                name: 'if',
                isFunc: true,
                params: [{
                    name: 'gt',
                    isFunc: true,
                    params: [{
                        content: 10
                    }, {
                        content: 5
                    }]
                }, {
                    name: 'echo',
                    isFunc: true,
                    params: [{
                        content: '10 > 5'
                    }]
                }, {
                    name: 'else',
                    isFunc: true,
                    params: [{
                        name: 'echo',
                        isFunc: true,
                        params: [{
                            content: '10 < 5'
                        }]
                    }]
                }]
            }]);

            done();
        });

        it('should match the AST 2', function(done) {
            var code = 'if gt 10 5, do echo "10 > 5". else echo "10 < 5".';
            var values = Token(code);

            var list = AstTree.parse(values);

            checkTree(list, [{
                name: 'if',
                isFunc: true,
                params: [{
                    name: 'gt',
                    isFunc: true,
                    params: [{
                        content: 10
                    }, {
                        content: 5
                    }]
                }, {
                    name: 'do',
                    isFunc: true,
                    params: [{
                        name: 'echo',
                        isFunc: true,
                        params: [{
                            content: '10 > 5'
                        }]
                    }]
                }, {
                    name: 'else',
                    isFunc: true,
                    params: [{
                        name: 'echo',
                        isFunc: true,
                        params: [{
                            content: '10 < 5'
                        }]
                    }]
                }]
            }]);

            done();
        });

        it('should match the AST 3', function(done) {
            var code = 'if let 10 gt 5, echo "10 > 5", else echo "10 < 5".';
            var values = Token(code);

            var list = AstTree.parse(values);

            checkTree(list, [{
                name: 'if',
                isFunc: true,
                params: [{
                    name: 'let',
                    isFunc: true,
                    params: [{
                        content: 10
                    }, {
                        name: 'gt',
                        isFunc: true,
                        params: [{
                            content: 5
                        }]
                    }]
                }, {
                    name: 'echo',
                    isFunc: true,
                    params: [{
                        content: '10 > 5'
                    }]
                }, {
                    name: 'else',
                    isFunc: true,
                    params: [{
                        name: 'echo',
                        isFunc: true,
                        params: [{
                            content: '10 < 5'
                        }]
                    }]
                }]
            }]);

            done();
        });

        it('should match the AST 4', function(done) {
            var code = 'echo let 12 12 sum 12 12. echo "hello world"';
            var values = Token(code);

            var list = AstTree.parse(values);

            checkTree(list, [{
                name: 'echo',
                isFunc: true,
                params: [{
                    name: 'let',
                    isFunc: true,
                    params: [{
                        content: 12
                    }, {
                        content: 12
                    }, {
                        name: 'sum',
                        isFunc: true,
                        params: [{
                            content: 12
                        }, {
                            content: 12
                        }]
                    }]
                }]
            }, {
                name: 'echo',
                isFunc: true,
                params: [{
                    content: 'hello world'
                }]
            }]);

            done();
        });

        it('should match the AST 5', function(done) {
            var code = 'echo sub 13 12 sum 12 12. echo "hello world"';
            var values = Token(code);

            var list = AstTree.parse(values);

            checkTree(list, [{
                name: 'echo',
                isFunc: true,
                params: [{
                    name: 'sub',
                    isFunc: true,
                    params: [{
                        content: 13
                    }, {
                        content: 12
                    }, {
                        name: 'sum',
                        isFunc: true,
                        params: [{
                            content: 12
                        }, {
                            content: 12
                        }]
                    }]
                }]
            }, {
                name: 'echo',
                isFunc: true,
                params: [{
                    content: 'hello world'
                }]
            }]);
            done();
        });

        it('should match the AST 6', function(done) {
            var code = 'set i 10. if gt i 5, echo "i > 5".';
            var values = Token(code);

            var list = AstTree.parse(values);


            checkTree(list, [{
                name: 'set',
                isFunc: true,
                params: [{
                    content: 'i'
                }, {
                    content: 10
                }]
            }, {
                name: 'if',
                isFunc: true,
                params: [{
                    name: 'gt',
                    isFunc: true,
                    params: [{
                        content: 'i'
                    }, {
                        content: 5
                    }]
                }, {
                    name: 'echo',
                    isFunc: true,
                    params: [{
                        content: 'i > 5'
                    }]
                }]
            }]);
            done();
        });

    });
});

function tran(obj, dest) {
    if (!obj || !dest) {
        var str = 'obj ' + obj + ' should be dest ' + util.inspect(dest);
        throw new Error(str);
    }

    if (obj.name == dest.name) {
        var dparams = dest.params;
        var oparams = obj.params;

        if (!dparams.length || !oparams.length) {
            console.log('obj', obj, 'dest', dest);
            throw new Error('params not exsist');
        }

        for (var i = dparams.length - 1; i >= 0; i--) {
            if (dparams[i].isFunc) {
                tran(oparams[i], dparams[i]);
            } else if (dparams[i].content != oparams[i].content) {
                throw new Error('error');
            }
        }
        return;
    }
    str = 'name error: ' + obj.name + ' ->  should be ' + dest.name
    throw new Error(str);
}

function checkTree(result, suppose) {
    for (var i = 0; i < suppose.length; i++) {
        tran(result[i], suppose[i]);
    }
}