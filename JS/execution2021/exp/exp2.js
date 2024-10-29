// 例2： let 词法环境
var a = 1
function one() {
  // 创建一个词法环境对象
  var b = 2

  // 遇到新代码块，创建一个新的词法环境对象，让新的词法环境.outer = 当前词法环境
  {
    let c = 3
    console.log(a, b, c)
  }
  {
    let c = 4
    console.log(a, b, c)
  }
}
one()
