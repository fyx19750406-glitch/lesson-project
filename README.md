# GitHub + Vercel 部署配置指南

## 📋 项目结构
- `package.json` - 项目配置文件
- `vercel.json` - Vercel 部署配置
- `index.html` - 入口页面
- `.gitignore` - Git 忽略文件配置

## 🚀 部署步骤

### 1. GitHub 配置

#### 创建 GitHub 仓库
1. 登录 [GitHub](https://github.com)
2. 点击右上角 `+` → `New repository`
3. 填写仓库名称（如：lesson-project）
4. 选择 Public 或 Private
5. 点击 `Create repository`

#### 关联本地仓库到 GitHub
```bash
# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/lesson-project.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 2. Vercel 配置

#### 方式一：通过 Vercel 网站
1. 登录 [Vercel](https://vercel.com)
2. 点击 `Add New...` → `Project`
3. 选择 `Import Git Repository`
4. 选择你的 GitHub 仓库
5. 点击 `Import`
6. 配置项目设置：
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. 点击 `Deploy`

#### 方式二：通过 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 3. 自动部署配置

配置完成后，每次你推送代码到 GitHub，Vercel 会自动部署：

```bash
# 修改代码后
git add .
git commit -m "Update project"
git push
```

Vercel 会自动检测到推送并开始部署。

## 🔧 环境变量配置（可选）

如果项目需要环境变量：
1. 在 Vercel 项目设置中
2. 进入 `Settings` → `Environment Variables`
3. 添加你的环境变量
4. 重新部署项目

## 📝 常用命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 🎯 部署完成后

Vercel 会提供一个 HTTPS 链接，例如：
- `https://lesson-project.vercel.app`

你可以：
- 自定义域名
- 查看部署日志
- 设置分支预览
- 配置自动部署规则

## 📚 更多信息

- [Vercel 文档](https://vercel.com/docs)
- [GitHub 文档](https://docs.github.com)