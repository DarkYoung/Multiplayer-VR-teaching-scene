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
    - src                   # 项目开发目录，重点关注的地方
        - app               # 脚本文件，按照页面（page）、组件（component）进行组织
            + components    # 组件，每个子目录都是一个组件，包含对应的css、js、html
            + page          # 入口脚本
        - css               # 主要样式文件
            + common        # 公共使用的样式文件
            + lib           # 导入的样式文件
            + page          # 入口页面相关的样式文件
        + img               # 图片资源
        - view              # HTML模板
            - common        # 公共HTML模板
                header.html # 
                footer.html # 
                *.html      # 其他公共HTML模板
            *.html          # 其他HTML模板
    + node_modules          # 使用到的nodejs模块
    .editorconfig           # 给编辑器看的配置文件，无需管理
    .eslintrc.js            # 代码规范检查
    .gitignore              # 配置需要排除在版本管理控制之外的文件
    package.json            # 项目配置
    README.md               # 项目说明
    webpack.config.js       # webpack配置文件
```
