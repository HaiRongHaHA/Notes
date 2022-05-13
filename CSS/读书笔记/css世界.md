# 单位

- 时间单位：s/ms
- 角度单位：deg/red
- 绝对长度单位：px
- 相对字体长度单位：em/ex rem/ch
- 相对视区长度单位：vh/vw/vmin/vmax

# display

每个元素都两种盒子，外在盒子+内在盒子

外在盒子：负责结构，一行显示 or 换行显示

内在盒子(容器盒子)：负责宽高、内容呈现等

## block

- 默认换行
- 可以设置宽度
- 外在块级+内在块级

## inline

- 不换行
- 设置宽高不生效
- 边距会应用但不会撑开盒子
- 图文内容显示
- 外在内联+内在内联

## inline-block

- 即能图文一行显示
- 即可以设置宽度
- 外在内联+内在块级

## block-table

- 外在块级+内在 table

## inline-table

- 文字和表格在一行显示
- 外在块级+内在块级
- 外在内联+内在 table

## overflow

永远不可能实现一个方向溢出剪裁或滚动，另一方向内容溢出显示的效果。

```
html {
  overflow-x: hidden;
  overflow-y: auto;  /＊多余＊/
}
```

让页面滚动条不发生晃动
```
html {
  overflow-y: scroll;   /＊ for IE8 ＊/
}
:root {
  overflow-y: auto;
  overflow-x: hidden;
}
:root body {
  position: absolute;
}
body {
  width: 100vw;
  overflow: hidden;
}
```

自定义滚动条样式
```
::-webkit-scrollbar {     /＊血槽宽度＊/
  width: 8px; height: 8px;
}
::-webkit-scrollbar-thumb {     /＊拖动条＊/
  background-color: rgba(0,0,0, .3);
  border-radius: 6px;
}
::-webkit-scrollbar-track {     /＊背景槽＊/
  background-color: #ddd;
  border-radius: 6px;
}
```

## 字母x
x基数

ex

## line-height

## vertical-align