[lerna官网](https://lerna.js.org/)

[https://juejin.cn/post/6844904151692869645#heading-0](https://juejin.cn/post/6844904151692869645#heading-0)

[https://juejin.cn/post/6844903918279852046#heading-9](https://juejin.cn/post/6844903918279852046#heading-9)

开源许可<br />[http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)<br />[https://blog.csdn.net/countofdane/article/details/82380892](https://blog.csdn.net/countofdane/article/details/82380892)

<a name="vJ41B"></a>
## 概念
Monorepo 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个 repo。

Lerna是一种Monorepo的解决方案

Lerna是一个用来优化托管在 git\npm 上的多 package 代码库的工作流的一个管理工具,可以让你在主项目下管理多个子项目，从而解决了多个包互相依赖，且发布时需要手动维护多个包的问题。

优点

- 1.节约了大量存储空间。 
   - 比如多个项目都依赖Vue,Vue-route等包，在多个仓库的项目下，node_modules会出现大量的冗余。
- 2.调试方便 
   - 在多个仓库的项目下，调试依赖的包是通过npm link，使用Lerna不需要了
- 3.资源包升级问题 
   - 一个项目依赖了多个 npm 包，当某一个子 npm 包代码修改升级时，都要对主干项目包进行升级修改。(这个问题感觉是最烦的，可能一个版本号就要去更新一下代码并发布)

缺点 ：

- 由于源码在一起，仓库变更非常常见，存储空间也变得很大，甚至几G，CI 测试运行时间也会变长

```javascript
lerna init  //初始化 lerna 项目
# 要采用 independent 模式的话
lerna init -i # lerna init --independent

lerna create <name>  //创建一个新的由 lerna 管理的包
lerna bootstrap // 安装所有依赖项并连接所有的交叉依赖
lerna add axios // 增加模块包到最外层的公共 node_modules中
lerna add a --scope=b // 增加模块包到 packages 中指定项目 下面是将 a 模块增加到 b 项目中
lerna exec --scope a -- yarn start //在 packages 中对应包下的执行任意命令 下面的命令，是对 packages 下的 a 项目执行 yarn start 命令 ，比较常用，可以把它配置到最外层的 package.json 中

如果命令中不增加 --scope a 直接使用下面的命令，这会在 packages 下所有包执行命令rm -rf ./node_modules
lerna exec -- rm -rf ./node_modules

lerna list // 显示所有的安装的包。等同于 lerna ls
lerna clean // 从所有包中删除 node_modules 目录。不会删除项目最外层的根 node_modules
lerna publish // 在当前项目中发布包。lerna publish 永远不会发布标记为 private 的包（package.json中的”private“: true）

```
[Lerna](https://link.zhihu.com/?target=https%3A//github.com/lerna/lerna%23readme)是社区主流的monorepo管理工具之一，集成了依赖管理、版本发布管理等功能。<br />使用Learn管理的项目的目录结构和yarn workspace类似。<br />Lerna的依赖管理是也基于yarn/npm，但是安装依赖的方式和yarn workspace有些差异：<br />Yarn workspace只会在根目录安装一个node_modules，这有利于提升依赖的安装效率和不同package间的版本复用。而Lerna默认会进到每一个package中运行yarn/npm install，并在每个package中创建一个node_modules。<br />目前社区中最主流的方案，也是yarn官方推荐的方案，是集成yarn workspace和lerna。使用yarn workspace来管理依赖，使用lerna来管理npm包的版本发布。

使用yarn workspaces在外部package.json中需要添加

<a name="c02ww"></a>
## 3.1 yarn workspace
<a name="bldNW"></a>
### 3.1.1 搭建环境

- 普通项目：clone下来后通过yarn install,即可搭建完项目，有时需要配合postinstall hooks,来进行自动编译，或者其他设置。
- monorepo: 各个库之间存在依赖，如A依赖于B，因此我们通常需要将B link到A的node_module里，一旦仓库很多的话，手动的管理这些link操作负担很大，因此需要自动化的link操作，按照拓扑排序将各个依赖进行link

解决方式：通过使用workspace，yarn install会自动的帮忙解决安装和link问题

```javascript
yarn install # 等价于 lerna bootstrap --npm-client yarn --use-workspaces

lerna clean # 清理所有的node_modules
yarn workspaces run clean # 执行所有package的clean操作

yarn workspace packageB add packageA
yarn workspace packageB remove packageA

yarn workspaces add lodash
yarn workspaces remove lodash
// yarn新版用yarn workspaces无法安装依赖，必须指定工作区，可以用以下命令
yarn add lodash -W
yarn remove lodash -W 
yarn add [--ignore-workspace-root-check/-W]

yarn add -W -D typescript
yarn remove -W -D typescript


```
区别于普通项目之处在于各个package之间存在相互依赖，如packageB只有在packageA构建完之后才能进行构建，否则就会出错，这实际上要求我们以一种拓扑排序的规则进行构建。

lerna支持按照拓扑排序规则执行命令, --sort参数可以控制以拓扑排序规则执行命令
```javascript
lerna run --stream --sort build

measureText
charcode
```
<a name="DtOue"></a>
### 3.3.1 lerna version 更新版本

- 找出从上一个版本发布以来有过变更的 package
- 提示开发者确定要发布的版本号
- 将所有更新过的的 package 中的package.json的version字段更新
- 将依赖更新过的 package 的 包中的依赖版本号更新
- 更新 lerna.json 中的 version 字段
- 提交上述修改，并打一个 tag
- 推送到 git 仓库

lerna publish from-package

lerna publish from-git

