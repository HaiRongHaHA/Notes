// 例1： var 词法环境
var a = 1;
function one() {
    var b = 2;
    console.log(a, b);
}
one();