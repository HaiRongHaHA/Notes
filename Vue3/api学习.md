ref：
  生成值类型的响应数据
  可用于模版和 reactive （不用.value使用）
  通过.value修改值
  ref变量的命名方式，xxxRef，以便区分数据
  ref(null)变量名如果对应了模版里的ref，可以再mounted后直接获取dom
toRef：
  针对一个响应式对象（ reactive ）里的属性，具备有响应式。
  两者保持引用关系，不管改reactive.x，还是修改toRef后的变量都能修改。
toRefs：
  针对一个响应式对象（ reactive ）转换为普通对象，让里面的每个单个的属性都具备响应式。
  两者保持引用关系
  返回toRefs的对象，可以直接使用单个属性，不用state.a了，可以直接使用a
reactive：
  普通对象实现响应式
  不能解构返回，会失去响应式

Vue3-script-setup
  defineProps
  defineEmits
  defineExpose
  不用return
  组件直接引入不用注册
  可以配合其他script标签一起用
  建议把script写在template上面，便于阅读