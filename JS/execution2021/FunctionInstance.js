// 函数
class FunctionInstance {
  /**
   * 
   * @param {*} name 函数名
   * @param {*} code 函数代码字符串
   * @param {*} scope 作用域（父级词法环境）
   */
  constructor(name, code, scope) {
      this.name = name;
      this.code = code;
      this.scope = scope;
      // v8在创建函数时（无需执行时），会把整个词法环境链条上所有的对象，做一个treeshaking，
      // 存在Scopes上，查找时找Scopes链就行，不需要像我们这个代码实现一样在词法环境里遍历取值
      // Scopes = [Closure,Script,Global]
  }
}
module.exports = FunctionInstance;