# taro-demo
用Taro构建的2个简单页面(列表页和详情页),列表页可以跳转详情页

### Taro简介
[Taro](https://github.com/NervJS/taro) 是由凹凸实验室打造的一套遵循 React 语法规范的多端统一开发框架。
使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。

### 安装
使用 npm 或者 yarn 全局安装 [Taro 开发工具](https://taro.js.org/)

```
$ npm install -g @tarojs/cli
$ yarn global add @tarojs/cli
```

### 下载代码
```sh
git clone https://github.com/gdutwyg/taro-demo.git

cd taro-demo

# 安装依赖
`yarn` 或者 `npm i`
```

### 访问
h5
* 执行`yarn run dev:h5`或者`npm run dev:h5`，在浏览器查看

其它端
* 执行对应端的代码，然后把dist目录放在它们端的开发工具上面查看，具体可以查看[文章](https://nervjs.github.io/taro/docs/GETTING-STARTED.html)

### 文件目录：

```
├── dist                   编译结果目录
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── pages              页面文件目录
|   |   ├── index          index页面目录
|   |   |   ├── index.js   index页面逻辑
|   |   |   └── index.scss index页面样式
|   ├── app.scss           项目总通用样式
|   └── app.js             项目入口文件
|   ├── static             静态资源目录
└── package.json           依赖文件
```