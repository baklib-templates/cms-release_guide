# release guide 模板

## 介绍

## 开发

```shell
# 安装 npm 包
yarn install
# 执行此命令，可在实时把 src 目录的 js/css 代码编译到 assets 目录
yarn dev
```


```shell
# 安装 guard-livereload，浏览器安装 livereload 插件，可实现代码改动，浏览器页面自动刷新
bundle install
bundle exec guard
```

### 安装配置TailwindCSS
[TailwindCSS官网](https://www.tailwindcss.cn/docs/installation)

#### 1.安装Tailwindcss
通过`npm`安装`tailwindcss`，然后创建`tailwind.config.js`配置文件
```bash
npm add -D tailwindcss
npx tailwindcss init
```
#### 2.配置模板文件的路径和自定义样式
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.liquid", "./snippets/**/*.liquid", "./layout/**/*.liquid", "./statics/**/*.liquid"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: () => {
        return {
          slate: {
            150: "#E9EEF5"
          },
          ...["primary", "secondary", "accent", "info", "success", "warning", "error"].reduce((map, name) => {
            return {
              ...map,
              [name]: {
                DEFAULT: `hsl(var(--theme-color-${name}) / <alpha-value>)`,
                lighten: `hsl(var(--theme-color-${name}-hsl-h) var(--theme-color-${name}-hsl-s) calc(var(--theme-color-${name}-hsl-l) + 15%))`,
                darken: `hsl(var(--theme-color-${name}-hsl-h) var(--theme-color-${name}-hsl-s) calc(var(--theme-color-${name}-hsl-l) - 15%))`,
                ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce((map,lightness) => {
                  return {
                    ...map,
                    [lightness]: `hsl(var(--theme-color-${name}-hsl-h) var(--theme-color-${name}-hsl-s) ${100 - lighten/10}%)`
                  }
                }, {})
              }
            }
          }, {})
        }
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
      },
    },
  },
  plugins: [],
}
```
#### 3.引入Tailwindcss到css文件中
例如：`./src/main.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@config '../tailwind.config.js'
```
#### 4.在`package.json`中配置css编译路径
```json
"scripts": {
  "build": "npm-run-all --parallel build:css build:js",
  "build:css": "npx tailwindcss -i ./src/main.css -o ./assets/css/main.css",
  ......
  "dev": "npm-run-all --parallel 'build:css -- --watch' 'build:js -- --watch'"
}
```
#### 5.在`theme.liquid`文件中引入css
```html
{{ 'css/main.css' | asset_url | stylesheet_tag: data-turbo-track: 'reload' }}
```


## 编译&发布

```bash
bun run build
```
