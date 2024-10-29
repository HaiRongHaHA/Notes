// 例1代码实现

const ObjectEnvironmentRecords = require("../ObjectEnvironmentRecords") // 对象环境记录项
const ExecutionContext = require("../ExecutionContext") // 执行上下文
const LexicalEnvironment = require("../LexicalEnvironment") // 词法环境
const ExecutionContextStack = require("../ExecutionContextStack") // 全局执行上下文
const FunctionInstance = require("../FunctionInstance") // 函数实例

// 1. 全局准备阶段

//创建全局执行上下文栈
const ECStack = new ExecutionContextStack()

//创建全局环境记录对象，负责登记全局变量，global对象里的都会成为环境记录里的变量
const globalEnvironmentRecord = new ObjectEnvironmentRecords(global)

//创建全局词法环境，主要是登记和查找变量的
const globalLexicalEnvironment = new LexicalEnvironment(
  globalEnvironmentRecord,
  null
)

//创建全局执行上下文
let globalExecutionContext = new ExecutionContext(
  globalLexicalEnvironment,
  global
)

//把全局执行上下文放入执行上下文栈
ECStack.push(globalExecutionContext)

// 2. 全局编译阶段 进入变量登记阶段

// 登记var变量a
ECStack.current.lexicalEnvironment.createBinding("a")
ECStack.current.lexicalEnvironment.setBinding("a", undefined)

// 登记函数one
let oneFn = new FunctionInstance(
  "one",
  "var b = 2;\nconsole.log(a, b);", // v8都是懒解析的，刚开始只编译第一层，执行了才编译
  ECStack.current.lexicalEnvironment // 静态作用域，函数作用域在定义时决定的，不是执行时决定的
)
ECStack.current.lexicalEnvironment.createBinding("one")
ECStack.current.lexicalEnvironment.setBinding("one", oneFn)

// —————————————— 变量提升end ————————————————

// 3. 开始执行代码

//给a变量赋值为1
ECStack.current.lexicalEnvironment.setBinding("a", 1)

//遇到函数则创建一个新的词法环境（使用声明式词法环境）
let oneLexicalEnvironment = LexicalEnvironment.NewDeclarativeEnvironment(
  oneFn.scope
)

//创建one函数执行上下文
let oneExecutionContext = new ExecutionContext(oneLexicalEnvironment, global)

//把one函数执行上下文推入执行上下文栈并成为最新的执行上下文
ECStack.push(oneExecutionContext)

//创建并绑定变量b,执行变量提升
ECStack.current.lexicalEnvironment.createBinding("b")
ECStack.current.lexicalEnvironment.setBinding("b", undefined)

// 登记函数one
let twoFn = new FunctionInstance(
  "two",
  "console.log(a, b);",
  ECStack.current.lexicalEnvironment
)
ECStack.current.lexicalEnvironment.createBinding("two")
ECStack.current.lexicalEnvironment.setBinding("two", twoFn)

//开始执行函数代码，给变量b赋值为2
ECStack.current.lexicalEnvironment.setBinding("b", 2)

// 弹出one执行上下文
ECStack.pop()

// 编译two 创建一个let two变量的词法环境
let twoLexicalEnvironment = LexicalEnvironment.NewDeclarativeEnvironment(
  twoFn.scope
)
// 执行two 创建two函数执行上下文
let twoExecutionContext = new ExecutionContext(twoLexicalEnvironment, global)
ECStack.push(twoExecutionContext)
console.log(
  ECStack.current.lexicalEnvironment.getIdentifierReference("a"),
  ECStack.current.lexicalEnvironment.getIdentifierReference("b"),
  ECStack.current.lexicalEnvironment.getIdentifierReference("setTimeout"),
)
// 弹出two执行上下文
ECStack.pop()