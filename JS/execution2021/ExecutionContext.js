// 执行上下文

class ExecutionContext {
  /**
   * @param {*} lexicalEnvironment 词法环境
   * @param {*} thisBinding this指针
   */
  constructor(lexicalEnvironment, thisBinding) {
    // 变量环境创建后不会变了，词法环境会随着函数的过程改变
    this.variableEnvironment = this.lexicalEnvironment = lexicalEnvironment
    this.thisBinding = thisBinding
  }
}
module.exports = ExecutionContext
