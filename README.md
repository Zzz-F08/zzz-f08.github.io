# 张帆 · 个人主页（Personal Homepage）

纯静态个人简历 / 学术主页，无任何构建依赖，双击 `index.html` 即可打开，推送至 GitHub 后由 GitHub Pages 自动发布。

## 在线访问

部署完成后访问：**https://zzz-f08.github.io/**

## 目录结构

```
.
├── index.html              # 页面结构与全部文案
├── .nojekyll               # 告知 GitHub Pages 跳过 Jekyll，原样发布
└── assets
    ├── css/style.css       # 全部样式（含明/暗双主题、响应式）
    ├── js/main.js          # 交互：主题切换、滚动渐入、数字动画、导航高亮
    ├── images
    │   ├── portrait.jpg    # 首页头像（证件照）
    │   ├── life.jpg        # 关于我配图（生活照）
    │   └── thesis/         # 学位论文配图
    └── files
        └── ZhangFan_Resume.pdf   # 可下载简历（已脱敏：不含手机号）
```

## 本地预览

直接双击 `index.html`；或在本目录启动本地服务：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 内容分块

关于我 / 教育背景 / 硕士研究专题（PEMFC 健康评估与 SEH-Time-LLM）/ 学术论文 /
项目经历 / 实习经历 / 荣誉与社会工作 / 技术能力 / 联系方式。

## 如何修改

- **改文字**：编辑 `index.html`，每个 `<section>` 对应一个分块，注释已标注。
- **换图片**：替换 `assets/images/` 下同名文件，或修改 `index.html` 中的 `src`。
- **改主题色**：编辑 `assets/css/style.css` 顶部 `:root` 中的 `--primary` / `--gradient`。
- **明暗模式**：右上角按钮切换，选择会保存在浏览器本地。

## 部署（GitHub Pages）

仓库名必须为 `<用户名>.github.io`（本项目即 `zzz-f08.github.io`），推送到默认分支后，
GitHub Pages 会自动从根目录发布，约 1–2 分钟生效。

```bash
git add .
git commit -m "update homepage"
git push
```
