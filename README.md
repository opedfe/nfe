
#前端模块化开发框架


###v0.0.3
 - 支持模块化依赖自动合并，如：`require('./view?_inline');`

##安装
```sh
npm install -g nfe
nfe -v
```

##使用

```sh
nfe start server [-p 8080]
```

```sh
nfe release
```

##页面结构

####编译前
```sh
- root
- | - pages
- | - | - modA
- | - | - index.html
- | - libs
- | - modules （模块化文件，不需要封装）
```

####编译后
```sh
- root
- | - template
- | - | - index.html
- | - static
- | - | - js
- | - | - css
- | - | - libs
- | - | - modules
```
