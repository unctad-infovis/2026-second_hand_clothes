# 2026-second_hand_clothes

**Live demo** https://unctad-infovis.github.io/2026-second_hand_clothes/

## About

The global trade in second-hand clothes moves used garments between countries, often from wealthier "Global North" economies to developing "Global South" economies, but increasingly along South-South and other routes as well. This project is a minisite exploring who exports and imports second-hand clothing and how those flows have shifted over time.

The page renders an interactive world map with bilateral trade-flow arcs between exporting and importing countries, filterable by region, year, trade value threshold, and flow direction (North-South, South-North, South-South, North-North), alongside country-level insight panels. Content is authored in MDX and rendered as a standalone React application embeddable within UNCTAD's Drupal platform.

The map logic is a React port of the stand-alone [UNCTAD-TED/SHC-trade-visualization](https://github.com/UNCTAD-TED/SHC-trade-visualization) monitor (`src/jsx/components/tracker/custom/`); the React wrapper is `Tracker.jsx`.

## Features

* **Metric and year** – switch between trade value (USD) and weight (kg), 2015–2024
* **Filters** – region, exporter and importer country pickers, trade value threshold, top-N limit and flow direction
* **Insight panels** – country panels and corridor (arc) modals with trend charts, concentration (HHI) and KPIs
* **Animate** – bar-chart race over the years, with hosted round flags from `@unctad-infovis/unctad-flags`
* **Guided tour** – spotlight walkthrough of the features (`custom/tour/`)
* **CSV export** – per country, per corridor or for the current view
* **Deep links** – the visible view is serialised into the URL hash, for example `#m=value&y=2024&r=Africa&f=ns,sn&x=USA,DEU`. Keys: `m` metric, `y` year, `r` region, `t` threshold, `n` top-N, `f` flow categories, `x`/`i` exporters/importers, `p` drawn `EXPORTER-IMPORTER` pairs. See `custom/deepLink.js`.
* **Accessibility** – honours `prefers-reduced-motion` (`custom/motion.js`, `styles/reduced-motion.css`)

## Data

Static JSON in `public/assets/data/`, loaded at runtime: `<year>.json` (bilateral flows by year), `weight/<year>.json` (weight data), `trend_summary.json`, `meta.json` (UN M49 names and coordinates), `country_classification.json`, `country_hierarchy.json` and the world map TopoJSON. In production the data is fetched relative to the bundle (`ASSET_BASE` in `custom/dom.js`), so it works when the script is loaded from `storage.unctad.org` into a Drupal page. The host does not compress responses, so file size is download size.

Loaded only when needed, to keep the first visit small:

* `bilateral_history.json` (and `weight/bilateral_history.json`, about 2 MB each) – fetched when a country panel, corridor modal, compare modal or CSV export first needs it
* `routes/<ISO3>.json` – sea routes, sliced per country (average 70 KB, largest about 240 KB). Only the focused country's slice is fetched, when **Sea routes** is switched on.

Source data kept outside the build, in `data/`:

* `routes.full.json` – the full sea-route set. `npm run slice-routes` (`scripts/slice-routes.mjs`) regenerates `public/assets/data/routes/` from it, keeping only inter-regional pairs, rounding coordinates to 2 decimals and dropping unused properties. Re-run it whenever `routes.full.json` changes.
* `worldmap-economies-54030.topo.json`, `ports.json` – not used by the app

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

### Shared UNCTAD packages

* **@unctad-infovis/general-tools** — shared React components (`ButtonAnchor`, `ButtonShare`, `ChartDataWrapper`, `Image`, `ProgressBar`, `Quote`, `Select`, `Tooltip`, `UNCTADSiteHeader`, `BackToTop`, …), helpers (`BasePath`, `LoadFile`, `CsvToJson`, `FormatNr`, `RoundNr`, `UseIsVisible`, …) and base design-token styles
* **@unctad-infovis/unctad-flags** — hosted round country flag SVGs, resolved with `getFlagUrl(iso2)` (used in the Animate panel)

These packages are published from the [`un-init-project`](https://github.com/unctad-infovis/un-init-project) monorepo to GitHub Packages, so installing needs an `.npmrc` with `@unctad-infovis:registry=https://npm.pkg.github.com` and a `GITHUB_PACKAGES_TOKEN` environment variable.

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