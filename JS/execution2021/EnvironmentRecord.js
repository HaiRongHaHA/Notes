// 环境记录项(登记变量的地方)

class EnvironmentRecord {
  constructor(bindings) {
    this.bindings = bindings || {}
  }
  /**
   * 创建变量
   * @param {*} N 名称
   */
  createBinding(N) {
    this.bindings[N] = undefined
  }
  /**
   * 给N设置值V
   * @param {*} N 名称
   * @param {*} V 值
   */
  setBinding(N, V) {
    this.bindings[N] = V
  }
  /**
   * 是否有绑定过一个变量
   * @param {*} N 名称
   */
  hasBinding(N) {
    return N in this.bindings
  }
  /**
   * 获取N的值
   * @param {*} N   名称
   */
  getBindingValue(N) {
    let value = this.bindings[N]
    // let暂时性死区
    if (value.type === "let" && value.uninitialized) {
      throw new Error(
        `ReferenceError: Cannot access '${N}' before initialization`
      )
    }
    return value
  }
}
module.exports = EnvironmentRecord
