# Gitee + Vercel 免费部署指南

## 第一步：注册 Gitee 并创建仓库

### 1.1 注册 Gitee

1. 访问 **https://gitee.com**
2. 点击右上角 **注册**
3. 填写信息完成注册（国内平台，稳定快速）

### 1.2 创建仓库

1. 登录后点击右上角 **+** → **新建仓库**
2. 填写信息：
   - 仓库名称: `ai-tiaoma-bookshelf`
   - 路径: `ai-tiaoma-bookshelf`（自动填充）
   - 选择 **公开**（公开仓库才能免费部署）
   - **不要**勾选"使用Readme文件初始化仓库"
3. 点击 **创建仓库**

### 1.3 获取仓库地址

创建后，复制你的仓库地址，格式如：
```
https://gitee.com/你的用户名/ai-tiaoma-bookshelf.git
```

---

## 第二步：推送代码到 Gitee

### 2.1 配置 Git 用户信息（首次使用需要）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

### 2.2 添加远程仓库并推送

```bash
# 进入项目目录
cd /workspace/projects

# 添加 Gitee 远程仓库（替换成你的地址）
git remote add gitee https://gitee.com/你的用户名/ai-tiaoma-bookshelf.git

# 推送到 Gitee
git push gitee main
```

如果提示输入用户名密码：
- 用户名：你的 Gitee 用户名
- 密码：你的 Gitee 密码（或个人令牌）

---

## 第三步：Vercel 导入 Gitee 项目

### 3.1 登录 Vercel

1. 访问 **https://vercel.com**
2. 点击 **Sign Up** → 选择 **Continue with GitHub**（用 GitHub 账号登录 Vercel）
   - 如果没有 GitHub，可以用邮箱注册
3. 完成登录

### 3.2 导入 Gitee 仓库

**方法一：直接导入 Git 仓库**
1. 点击 **Add New...** → **Project**
2. 点击 **Import Git Repository**
3. 选择 **Import Third-Party Git Repository**
4. 粘贴你的 Gitee 仓库地址：
   ```
   https://gitee.com/你的用户名/ai-tiaoma-bookshelf
   ```
5. 点击 **Import**

**方法二：如果 Vercel 不支持直接导入 Gitee**

需要先在 GitHub 创建一个镜像仓库：
1. 在 GitHub 创建同名仓库
2. 推送到 GitHub：
```bash
git remote add github https://github.com/你的用户名/ai-tiaoma-bookshelf.git
git push github main
```
3. Vercel 导入 GitHub 仓库

### 3.3 配置并部署

- Framework Preset: **Next.js**（自动检测）
- 点击 **Deploy**
- 等待 1-2 分钟

---

## 第四步：绑定域名 aitiaoma.com

### 4.1 添加域名

1. 部署完成后，进入项目页面
2. **Settings** → **Domains**
3. 输入 `aitiaoma.com` → **Add**
4. 再添加 `www.aitiaoma.com`

### 4.2 配置 DNS 解析

在你的域名服务商（购买 aitiaoma.com 的地方）配置：

| 类型 | 主机记录 | 记录值 |
|------|----------|--------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### 4.3 等待生效

- DNS 生效时间：5-30 分钟
- HTTPS 证书自动配置
- 完成后访问 **https://aitiaoma.com**

---

## 快速命令汇总

```bash
# 1. 进入项目
cd /workspace/projects

# 2. 添加 Gitee 远程仓库
git remote add gitee https://gitee.com/你的用户名/ai-tiaoma-bookshelf.git

# 3. 推送
git push gitee main
```

---

## 你的 Gitee 用户名是什么？

告诉我你的 Gitee 用户名，我可以直接帮你执行推送命令！
