# Bonus Drop #23 Companion Repo

The live site is at <https://rud.is/wpe/2023-08-27/>.

The entire site is written in Vanilla JS with Lit webcomponents. All you need is a web server to kick the tyres. No "npm". 

Consider using one from <a href="https://dailyfinds.hrbrmstr.dev/p/drop-145-2022-11-29-http-right-now">Drop #145</a>.

Top-level bits that really matter:

```plain
.
├── components
│   ├── plot-element.js
│   └── shiki-element.js
├── css
│   └── index.css
├── data
│   ├── ip-bytes.json
│   ├── mtcars.csv
│   └── tags-ips.json
├── dist
│   └── onig.wasm
├── index.html
├── js
│   └── shared.js
├── languages
├── shiki
│   ├── dist
│   │   ├── index.browser.mjs
│   │   └── onig.wasm
│   ├── package.json
│   └── samples
└── themes
```