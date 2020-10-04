## Vue-项目重点

### day-07-重点

#### 01-项目-准备-项目目录说明
1. src/
2. build/ webpack相关代码
3. config/ 本地服务器配置
4. .eslintignore eslint排除工具
5. .eslintrc eslint配置文件
#### 02-项目-准备-代码规范-自定义指令-lintfix
项目采用 JavaScript Standard Style代码风格，以下是一些基本规范细则
    使用两个空格 进行缩进
    除需要转义的情况外，字符串统一使用单引号
    不要留下未使用的变量
    关键字后面加空格
    函数声明时括号与函数名间加空格
    始终使用 === 替代 ==
    字符串拼接操作符（Infix operators）之间要留空格
    逗号后面加空格
    else 关键字要与花括号保持在同一行
    多行if语句的括号不能省
    不允许有连续多行的空行
    对于三元运算符 ? 和 : 与他们所负责的代码处于同一行
1. 结尾没有 ‘;’ 号
2. 必须用全等 ‘===’
3. 

> 在package.json中scripts自定义指令：指令很长
> npm run 自定义指令名(dev)
> npm run lintfix (自动按照规范修正全部的js代码),(这个指令要在程序运行(npm run dev)时使用)
    不能修复(不允许出现未使用的变量)多余的变量
> npm run gitcus

> 自动打开浏览器 dev: 'xxxxxx --open'

> 关闭eslint build/webpack.base.conf.js 注释掉(...(config.dev.useEslint ? [createLintingRule()] : []),)

#### 03-项目-准备-element-ui-文档分析
> element-ui 是饿了么开发团队
> 适用于vue项目-PC端项目
> DDFE
> 在main.js引入
> Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

#### 04-项目-准备-element-ui-安装-引入
> npm i element-ui -S
> 在main.js import
> Vue.use(ElementUI)

#### 05-项目-准备-项目模板简化-调整
> 删除模板中我们用不到的文件/代码

#### 06-项目-准备-git版本控制
> git/svn
1. git init -> .git
2. git status
3. git add .
4. git commit -m "init"
5. 在代码托管平台(github) 新建远程仓库
6. git push

#### 07-项目-登录-新建分支-login组件-配置路由

#### 08-项目-登录-引入表单组件

#### 09-项目-登录-样式调整

#### 10-项目-准备-项目目录说明

#### 11-项目-准备-项目目录说明