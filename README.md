# dz-cli

**dz-cli** 是一个用于创建 Discuz 插件的脚手架工具。通过该工具，你可以快速生成 Discuz 插件的基础结构，从而专注于插件的具体功能开发。

## 特性

-   快速生成 Discuz 插件项目结构
-   简化插件开发流程
-   提供标准化的项目模板

## 安装

你可以通过 npm 全局安装 dz-cli：

```bash
npm install -g discuz-cli
```

## 使用方法

安装完成后，你可以使用以下命令创建一个新的 Discuz 插件项目：

```bash
discuz-cli create my-plugin
cd my-plugin
npm install
composer install
```

该命令将会在当前目录下创建一个名为 `my-plugin` 的文件夹，并在其中生成插件的基本结构。

### 打包

```
npm run build
```

将会将插件打包到 `dist` 文件夹 ，打包后的插件可以直接导入到 Discuz 中。
打包目录可在 `build/config.json` 中配置

## 模板仓库

dz-cli 使用 [discuz-plugin-template](https://github.com/MaZhaolin/discuz-plugin-template) 作为项目模板。你可以根据需要修改该模板仓库来定制生成的项目结构。
目前支持的模板:

-   simple 基础模板
-   react-admin 支持 react 开发打包后台前台页面

## 贡献

欢迎提交 issue 和 pull request 来帮助我们改进该项目。如果你有任何问题或建议，请在 GitHub 仓库中提出。

## 许可证

该项目遵循 MIT 许可证。
