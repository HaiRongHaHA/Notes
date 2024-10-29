// 执行上下文栈

class ExecutionContextStack {
  constructor() {
    this.executionContexts = []
  }
  // 入栈
  push(executionContext) {
    this.executionContexts.push(executionContext)
  }
  // 出栈
  pop() {
    this.executionContexts.pop()
  }
  // 获取当前执行上下文 (栈顶)
  get current() {
    return this.executionContexts[this.executionContexts.length - 1]
  }
}

module.exports = ExecutionContextStack
