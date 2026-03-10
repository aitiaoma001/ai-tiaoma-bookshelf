# 免费部署指南 - AI 跳马思维书架

## 部署平台：Vercel（完全免费）

Vercel 是 Next.js 的官方部署平台，提供：
- ✅ 完全免费（个人项目无限带宽）
- ✅ 自动 HTTPS
- ✅ 自定义域名支持
- ✅ 自动构建和部署
- ✅ 全球 CDN 加速

---

## 第一步：推送代码到 GitHub

### 1.1 创建 GitHub 仓库

1. 访问 [github.com](https://github.com) 并登录
2. 点击右上角 **+** → **New repository**
3. 填写仓库信息：
   - Repository name: `ai-tiaoma-bookshelf`（或你喜欢的名字）
   - 选择 **Public**（公开，免费部署必须）
   - **不要**勾选 "Add a README file"
4. 点击 **Create repository**

### 1.2 推送代码

在终端执行以下命令：

```bash
# 进入项目目录
cd /workspace/projects

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/ai-tiaoma-bookshelf.git

# 推送到 GitHub
git push -u origin main
```

如果提示登录，请使用 GitHub Personal Access Token：
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token，勾选 repo 权限
3. 密码处填入 token

---

## 第二步：在 Vercel 部署

### 2.1 导入项目

1. 访问 [vercel.com](https://vercel.com)
2. 点击 **Sign Up** → 选择 **Continue with GitHub**
3. 授权后，点击 **Add New...** → **Project**
4. 选择你刚创建的 `ai-tiaoma-bookshelf` 仓库
5. 点击 **Import**

### 2.2 配置项目

- Framework Preset: **Next.js**（自动检测）
- Root Directory: `./`
- Build Command: `pnpm run build`（默认）
- Output Directory: `.next`（默认）

点击 **Deploy**，等待约 1-2 分钟完成部署。

---

## 第三步：绑定自定义域名 aitiaoma.com

### 3.1 在 Vercel 添加域名

1. 部署完成后，进入项目页面
2. 点击 **Settings** → **Domains**
3. 输入 `aitiaoma.com`，点击 **Add**
4. 同时添加 `www.aitiaoma.com`（可选）

### 3.2 配置 DNS 解析

在你的域名服务商（如阿里云、腾讯云、GoDaddy 等）配置 DNS：

**方案 A：使用 A 记录（推荐）**
| 类型 | 名称 | 值 |
|------|------|-----|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

**方案 B：使用 CNAME（部分服务商支持）**
| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | @ | cname.vercel-dns.com |
| CNAME | www | cname.vercel-dns.com |

### 3.3 等待生效

- DNS 生效需要 5-30 分钟
- Vercel 会自动配置 HTTPS 证书
- 完成后访问 https://aitiaoma.com 即可

---

## 常见问题

### Q: 推送代码时提示权限错误？
A: 使用 Personal Access Token 代替密码，或在 Vercel 直接导入仓库。

### Q: 域名解析不生效？
A: 
1. 检查 DNS 配置是否正确
2. 等待 DNS 缓存刷新（最多 48 小时）
3. 使用 `nslookup aitiaoma.com` 检查解析

### Q: 如何更新网站？
A: 只需推送新代码到 GitHub，Vercel 会自动重新部署：
```bash
git add .
git commit -m "更新内容"
git push
```

### Q: 部署失败？
A: 
1. 查看 Vercel 的 Build Logs
2. 确认 package.json 和 .coze 配置正确
3. 本地先运行 `pnpm run build` 测试

---

## 预计完成时间

| 步骤 | 时间 |
|------|------|
| 推送 GitHub | 2 分钟 |
| Vercel 部署 | 2 分钟 |
| DNS 配置 | 3 分钟 |
| DNS 生效 | 5-30 分钟 |

**总计：约 15-40 分钟即可完成！**

---

## 备选方案

如果 Vercel 不方便，还可以选择：

1. **Netlify** - netlify.com
   - 同样免费，支持 Next.js
   - 配置方式类似

2. **Cloudflare Pages** - pages.cloudflare.com
   - 免费，全球 CDN
   - 需要 Next.js 静态导出

---

祝你部署顺利！🎉
