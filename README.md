## 目录结构
  `-`表示展开目录 
  `+`表示不展开

```
- Multiplayer-VR-Teaching-Scene
    - dist                  # webpack编译打包输出目录，由webpack根据配置文件自动生成（无需关注）
        + css               # 生成的样式文件
        + img               # 生成的图片资源
        + js                # 生成的脚本
        *.html              # 生成的页面
    + lib                   # art-template模板引擎
    - routes                # 路由，按功能模块划分
        index.js            # 首页路由
        user.js             # 用户相关（登录、注册等）路由
        game.js             # 游戏相关路由
    - src                   # 项目开发目录，重点关注的地方
        - app               # 脚本文件，按照页面（page）、组件（component）进行组织
            + components    # 组件，每个子目录都是一个组件，包含对应的css、js、html
            + page          # 入口脚本（重要！！！一个页面对应一个脚本）
        - css               # 主要样式文件
            + common        # 公共使用的样式文件
            + lib           # 导入的样式文件
            + page          # 入口页面相关的样式文件
        - assets            # 资源文件
            + models        # three.js相关模型
            + textures      # three.js相关纹理
            *.*             # 其他资源（图片、图标等）
        - view              # HTML模板
            - common        # 公共HTML模板
                header.html # 
                footer.html # 
                *.html      # 其他公共HTML模板
            *.html          # HTML模板（一般情况下是入口的HTML模板，即每个入口对应一个HTML）
    + node_modules          # 使用到的nodejs模块
    .editorconfig           # 给编辑器看的配置文件，无需管理
    .eslintrc.js            # 代码规范检查
    .gitignore              # 配置需要排除在版本管理控制之外的文件
    package.json            # 项目配置
    README.md               # 项目说明
    debug.server.js         # 本地代理服务器脚本（热加载、将请求转发到服务器端）
    app.js                  # express 配置文件
    server.js               # 服务器（本地）脚本
    server.app.js           # 服务器端（运行在本地，监听不同端口）对应的express脚本
    model.js                # 数据库（保存在内存中）
    webpack.config.js       # webpack配置文件
```
