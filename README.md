# 2026-second_hand_clothes

**Live demo** https://unctad-infovis.github.io/2026-second_hand_clothes/

## About

The global trade in second-hand clothes moves used garments between countries, often from wealthier "Global North" economies to developing "Global South" economies, but increasingly along South-South and other routes as well. This project is a minisite exploring who exports and imports second-hand clothing and how those flows have shifted over time.

The page renders an interactive world map with bilateral trade-flow arcs between exporting and importing countries, filterable by region, year, trade value threshold, and flow direction (North-South, South-North, South-South, North-North), alongside country-level insight panels. Content is authored in MDX and rendered as a standalone React application embeddable within UNCTAD's Drupal platform.

## Embedding

```html
<script type="module" crossorigin="" src="https://storage.unctad.org/2026-second_hand_clothes/js/2026-second_hand_clothes.min.js?v=1"></script>
<link rel="stylesheet" crossorigin="" href="https://storage.unctad.org/2026-second_hand_clothes/css/2026-second_hand_clothes.min.css?v=1">
<div class="app-root-2026-second_hand_clothes" id="app-root-2026-second_hand_clothes">
  Loading...
</div>
<noscript>Your browser does not support Javascript!</noscript>
```

Update the `?v=` query parameter to match the current build version to bust the cache.

## Rights of usage

Contact Teemo Tebest.

## How to build and develop

This is a Vite + React project.

* `npm install`
* `npm run start`

Project should start at: http://localhost:8080

For developing please refer to `package.json`

## Files and folders

All public assets go to folder `public`.

All source code goes to folder `src`.

## Packages

The following packages are used in this project by default.

### Project specific

* **d3** — used to create the map and charts
* **topojson-client** — used to create the map

### Build & Dev Server

* **vite** — development server with hot module replacement and production bundler, replaces webpack
* **@vitejs/plugin-react** — adds React and JSX support to Vite

### React

* **react** — UI component library
* **react-dom** — renders React components to the DOM

### Formatter & Linter

* **@biomejs/biome** — formats and lints JS, JSX and CSS files on save, replaces ESLint + Prettier

### Minification

* **terser** — minifies the production JavaScript bundle, removes console.logs in production builds

### MDX

* **@mdx-js/rollup** — Vite/Rollup plugin that compiles MDX files into React components
* **@mdx-js/react** — provides React context for MDX components