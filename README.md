# GIRAF — Overseas Site

GIRAF 海外站（GIRAF 是 LONGSAIL International Logistics 的国际品牌）。
**英语为主语言**（根路径），可选 **Deutsch / Español / ไทย**，语言系统设计为可继续扩展。

- 品牌与内容蓝本：<https://www.longsailing.net/>（国内站）与 <https://www.longsailing.net/en/>（海外站）
- 欧盟签约主体：**Girafsail Logistics GmbH**（Hamburg）
- 品牌标语：*Simplify the cross-border trade*

| 语言 | 代码 | URL 前缀 | 说明 |
|---|---|---|---|
| English | `en` | *（根路径）* | 主语言，SEO 与品牌记忆的基准版本 |
| Deutsch | `de` | `/de` | 德国及 DACH 市场 |
| Español | `es` | `/es` | 西班牙及拉美西语市场 |
| ไทย | `th` | `/th` | 泰国及东南亚市场 |

---

## 技术栈

| 项 | 版本 / 说明 |
|---|---|
| Vue | 3.5（`<script setup>`，纯 JS，无 TypeScript） |
| Vite | 6 |
| vue-router | 4（`createWebHistory`，按「语言 × 页面」生成路由） |
| vue-i18n | 11（global scope，`legacy: false`） |
| ogl | 1.0（仅 Aurora 背景的 WebGL 渲染，已拆为懒加载 chunk） |
| CSS | 手写设计令牌，无 Tailwind |

## 常用命令

```bash
npm install
npm run dev        # 本地开发，http://127.0.0.1:5173
npm run build      # 产出 dist/
npm run preview    # 预览构建产物

npm run i18n       # 键位一致性：四门语言文案树同构 + 无残留中文（快速，无需浏览器）
npm run lang       # 多语言矩阵：8 页 × 4 语言，断言标题/描述/html lang/hreflang/og:locale/切换器
npm run verify     # 回归校验：多语言正确性、横向溢出、控制台错误（逐页截图到 _shots/）
npm run inspect    # 运行时检查：WebGL 存活、揭示动画完整性、滚动状态 + 全页截图
npm run measure    # 栅格与尺寸测量：页头/正文容器对齐、移动端是否裁切
npm run og         # 重新生成社交分享图 public/og-image.png（1200×630）
```

`lang` / `verify` / `inspect` / `measure` 依赖 `playwright-core` + 本机 Microsoft Edge（无需下载 Chromium），
直接以 `http://127.0.0.1` 本地静态服务 + 无头 Edge 运行。`i18n` 是纯 Node 脚本，改动文案后可先跑它。

> 开发回归顺序建议：`npm run i18n` → `npm run build` → `npm run lang` → `npm run verify`。

---

## 目录结构

```
src/
  i18n/
    locales.js          # ★ 语言注册表（单一来源）：扩展语言只改这里
    index.js            # i18n 实例、语言持久化读写
    en.js / de.js / es.js / th.js   # 文案（键结构必须逐一对齐）
  router/
    pages.js            # ★ 页面路径表：英语为根路径，其余语言自动加前缀
    index.js            # 路由生成、语言偏好引导、<html lang> 写入
  data/
    company.js          # ★ 公司法定信息单一来源（GmbH、HRB、USt-IdNr、地址、电话、邮箱）
    entities.js         # ★ 全球法定主体：8 家分公司 / 子公司的登记名称、注册地址、电话
    network.js          # 覆盖能力数据（自有网点城市 / 合作网点）——不承载任何法律主体信息
  styles/base.css       # 设计令牌、排版、栅格、区块、卡片、按钮等基础设施
  components/
    effects/            # 特效组件（见下）
    EntityGrid.vue      # 法定主体卡片网格（网络页 + 联系页共用，单一数据源）
    …                   # SiteHeader / SiteFooter / SectionCta / ContactForm / StatsBand / PageHero / AppIcon
  pages/                # Home / Services / Solutions / About / Network / Contact / Imprint / Privacy
scripts/
  i18n-check.mjs        # 键位一致性 + 残留中文检查（纯 Node）
  lang-matrix.mjs       # 8 页 × 4 语言运行时断言
  verify.mjs            # 逐页截图 + 语言/溢出/控制台回归
  inspect.mjs           # WebGL、揭示动画、滚动状态
  measure.mjs           # 栅格对齐与裁切测量
  og-image.mjs          # 社交分享图生成
```

---

## 扩展一门新语言（两步）

1. 在 `src/i18n/locales.js` 的 `locales` 数组追加一项（含 `ogLocale`）：

   ```js
   { code: 'fr', label: 'Français', short: 'FR', htmlLang: 'fr', prefix: '/fr', ogLocale: 'fr_FR' }
   ```

2. 复制 `src/i18n/en.js` 为 `fr.js` 并翻译，然后在 `src/i18n/index.js` 中 import 并注册。

路由（`/fr/services` 等）、页头语言切换器、`<html lang>`、`canonical`、
`hreflang`（含 `x-default`）与 `og:locale` / `og:locale:alternate`
会**自动适配**，无需改动任何页面组件。

### 两条必须遵守的约定

**① 文案树严格同构。** `en.js` 与其后每门语言的键路径、数组长度、数组内对象字段名
必须完全一致（展平后 422 条文案）。改完先跑：

```bash
npm run i18n
```

它会逐条列出「缺失 / 多余」的键路径，并顺带扫描文案中是否残留中文（漏译防呆）。

**② 结构化数据用 `pick()`，不要写三元判断。**
公司地址、网点职责这类不属于 vue-i18n 消息树的数据，一律写成多语言映射：

```js
// src/data/company.js
country: { en: 'Germany', de: 'Deutschland', es: 'Alemania', th: 'เยอรมนี' }

// 组件里
countryName(lang)          // → pick(company.address.country, lang)，缺失语言回退英语
```

> 本项目**刻意不提供** `isEn` / `altLink` 这类二元语言接口。
> 已有 4 门语言且可持续扩展，任何 `if (lang === 'en')` 都是「加语言时静默漏译」的隐患；
> 需要按语言出文案时，一律走 `t()`/`tm()` 消息树或 `pick()`。

### 排版特化

新语言若字形结构特殊（如泰文无大小写、上下延伸大），在 `src/styles/base.css`
**末尾**追加 `:lang(xx)` 规则。该区块必须是文件最后一段：其中多条规则与上方同权重，
依赖「后者胜出」才能覆盖组件内的同名类。

已内置：`:lang(th)` 泰文专属字体栈 + 行高放宽 + 取消 `text-transform`/字距 + 允许词内断行；
`:lang(de)` 长复合词自动连字断行；`:lang(es)` 正文本行高与 `¿¡`/重音字符留白。

---

## 维护分公司（法定主体）

`src/data/entities.js` 是**分公司 / 子公司**的单一数据源，网络页与联系页共用同一份数据。
增减一家公司只改这一个文件，两个页面与覆盖跑马灯会自动更新：

```js
{
  key: 'uk',                               // 唯一标识
  region: 'europe',                        // europe | americas | asia | africa
  legalName: 'GIRAF LOGISTICS (UK) LTD',   // ← 登记原文，不翻译
  city: { en: 'London', es: 'Londres', th: 'ลอนดอน' },
  country: { en: 'United Kingdom', de: 'Großbritannien', es: 'Reino Unido', th: 'สหราชอาณาจักร' },
  addressLines: [                          // ← 登记原文，逐行渲染
    'Suite 203, Gable House',
    '18-24 Turnham Green Terrace',
    'Chiswick, London W4 1QP',
    'United Kingdom'
  ],
  phone: '+44 7904 077141',                // 显示文本
  phoneHref: '+447904077141'               // tel: 链接：无空格、无括号、无连字符
}
```

**两条硬规则：**

1. **`legalName` 与 `addressLines` 不翻译。** 它们是工商登记文本，翻译会造成法律失真；
   只有 `city` / `country` / `region` 这类描述性标签走多语言映射。
   `npm run lang` 把「四门语言下登记名称逐字一致」作为断言执行，改坏会直接红。
2. **电话先按 E.164 清理，再拆成「显示文本 + `tel:` 链接」。**
   原始登记写法常带国内中继号，例如英国 `+44 0790 4077141` 应规范为 `+447904077141`
   （国际格式下去掉尾随的国内 `0`）。校验脚本会断言 `tel:` 形如 `tel:+<纯数字>`。

**主体 ≠ 网点，不要混用：**
`entities.js` 回答「在哪些司法辖区有法人、合同跟谁签」；
`network.js` 回答「覆盖能力到哪、货在哪儿操作」。
同一城市若已由自有主体承接，就**不应**再出现在 `worldOffices`（合作网点）里，
否则同一座城市会同时被描述成「自有公司」和「合作方」（伦敦 / 曼谷 / 胡志明市 / 墨西哥城已按此规则移出）。

> ⚠️ 汉堡主体（`key: 'de'`）的名称与电话取自 `company.js`，**不在 `entities.js` 里重复定义**，
> 以保证 Impressum、联系页与主体卡片永远一致。改汉堡电话只改 `company.js` 一处。

---

## 特效组件（Vue Bits）

背景与交互特效参考 <https://vue-bits.dev>（上游仓库 `DavidHDev/vue-bits`）。
官方组件是 **TypeScript + Tailwind 单文件**，本项目为**纯 JS + 手写 CSS**，
因此按官方「复制源码后自由改造」的授权方式**移植**而非直接引用：

| 组件 | 处理方式 |
|---|---|
| `AuroraBackground.vue` | 忠实移植官方 **ogl WebGL 着色器**实现（GLSL 300 es + simplex 噪声 + 三色 ramp） |
| `LogoLoop.vue` / `Magnet.vue` / `TiltCard.vue` | 移植为无 Tailwind 的纯 JS + CSS 版本 |
| `GradientText` / `ShinyText` / `CountUp` / `SpotlightCard` / `GlowButton` / `MarqueeStrip` / `RevealText` / `ScrollProgress` / `GrainOverlay` | 自建等价实现，零额外依赖 |

**刻意未引入** `gsap` / `ScrollTrigger`（与已有 IntersectionObserver 指令 `v-reveal` 重复）与
`motion-v`（可用 rAF 等价实现），以控制体积。

Aurora 具备三层降级：WebGL 不可用 → CSS 光场；上下文丢失 → CSS 光场；元素离屏 → 暂停渲染。
同时遵循 `prefers-reduced-motion`。

> 上游组件源码缓存在 `_ref/vb/`（已 gitignore），便于后续继续移植新组件。

---

## 部署

`base` 通过环境变量控制，默认 `/`（根路径）：

```bash
npm run build                    # 部署到域名根
VITE_BASE=/giraf/ npm run build  # 部署到子路径
```

**SPA 回退必须配置**：本项目使用 HTML5 History 路由，服务器需将未命中的路径回退到 `index.html`。

- Nginx：`try_files $uri $uri/ /index.html;`
- 腾讯云 CloudBase 静态托管：子路径部署时同时设置 `VITE_BASE`，并确保 404 回退到 `index.html`
- 未匹配的地址会由路由兜底重定向到 `/`（主语言首页）

### GitHub Pages（仓库自带的工作流）

仓库 `sivan-xiang/GIRAF` 是 **project page**，站点位于 **`/GIRAF/` 子路径**，
因此构建必须覆盖 `base`，否则资源会按 `/assets/*` 请求而 404。

`.github/workflows/deploy-pages.yml` 在每次推送到 `main` 时自动执行：
`npm ci` → `VITE_BASE=/GIRAF/ npm run build` → `node scripts/static-routes.mjs dist` →
`actions/upload-pages-artifact` → `actions/deploy-pages`。

**为什么需要 `static-routes.mjs`：** 纯静态托管上，直接访问 `/GIRAF/services`、`/GIRAF/de/contact`
这类深链默认返回 **HTTP 404**（即使 `404.html` 兜底让页面照常渲染，状态码仍是 404，
搜索引擎与社交分享预览会当成死链）。该脚本为「语言前缀 × 页面路径」的每条组合写出实体
`index.html`，使 32 条已知路由全部返回 **200**；未知路径仍由 `404.html` 兜底，行为不变。
路由表与语言表**从源码解析**，解析数量不符会报错退出，避免源文件结构调整后静默漏生成。

本地等价复现（Windows 请在 Git Bash 中执行）：

```bash
VITE_BASE=/GIRAF/ npm run build && npm run routes -- dist
```

> 首次部署需在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
> （工作流已带 `enablement: true` 尝试自动开启；若账号权限不足则需手动点一次）。
> 发布地址：<https://sivan-xiang.github.io/GIRAF/> 

**上线前需核对**：`index.html` 中 `og:image` / `twitter:image` 写死了
`https://www.girafsail-logistics.com/og-image.png`。若最终域名不同，需同步修改这三处 URL
（社交平台抓取器不执行 JS，无法像 `og:url` 那样运行时替换）。

---

## 合规说明

- **不使用 Google Fonts CDN**：德国法院已判定从 Google 服务器加载网页字体构成未经同意的个人数据传输（DSGVO 风险）。本项目改用系统字体栈，**零外部请求**，除语言偏好外不写入任何 Cookie。
- **询价表单不向服务器传输数据**：校验通过后在本地组装 `mailto:` 唤起邮件客户端，与 Datenschutz 页面「表单不向我们的服务器传输数据」的表述一致。
- 全部法定信息（GmbH、HRB 186908、USt-IdNr DE323296008、Steuer-Nr.、Geschäftsführer）集中存放在 `src/data/company.js`，Impressum / Datenschutz / 联系页共用，避免多处不一致。
