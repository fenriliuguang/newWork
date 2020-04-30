四轮前端项目
===========================================

>Vue单页匿名聊天室应用 - test2

环境依赖
------------------

>node v12.15.0

使用
------------------
1. 起一个新的vue项目
>`vue init webpack test2`

2. 替换test2中相同目录

3. 运行/打包
>`npm run dev`
>`npm run build`

目录结构
------------------
```
│  .babelrc
│  .editorconfig
│  .gitignore
│  .postcssrc.js
│  dist.zip
│  index.html
│  package-lock.json
│  package.json
│  README.md
│
├─build
│
├─config
|
├─dist
|
├─src
│  │  App.vue
│  │  main.js
│  │
│  ├─assets                //图片文件
│  |
│  ├─components           
│  │      chat.vue         //聊天页
│  │      edit.vue         //新建房间
│  │      home.vue         //个人主页&登录注册页
│  │
│  ├─router
│  │      index.js         //vue路由文件
│  │
│  └─store
│          index.js        //vuex文件
│
└─static
        .gitkeep
```

v2.4.30 版本内容更新
------------------
1. 上滑加载
2. 实时反馈群聊人员在线情况
