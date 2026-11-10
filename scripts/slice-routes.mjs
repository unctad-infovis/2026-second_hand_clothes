// Slices data/routes.full.json into one small file per country: public/assets/data/routes/<ISO3>.json.
// The app only reads routes for the focused country, so it downloads just that slice.
// Only inter-regional pairs are kept (same-region pairs are never drawn, see TradeMap._buildRoutePath),
// coordinates are rounded to 2 decimals (~1 km) and unused properties are dropped.
// Run with: npm run slice-routes
import fs from 'node:fs';
import path from 'node:path';
import { RegionConfig } from '../src/jsx/components/tracker/custom/regions.js';

const SRC = 'data/routes.full.json';
const OUT = 'public/assets/data/routes';
const DECIMALS = 2;

const round = c => c.map(x => Number(x.toFixed(DECIMALS)));
const routes = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const slices = {};
let kept = 0;
for (const [key, route] of Object.entries(routes)) {
  const [a, b] = key.split('|');
  const ra = RegionConfig.getRegion(a);
  const rb = RegionConfig.getRegion(b);
  if (ra === rb || ra === 'Other' || rb === 'Other') continue;
  const slim = {
    type: 'Feature',
    geometry: { type: route.geometry.type, coordinates: route.geometry.coordinates.map(round) },
    properties: { origin_iso: route.properties.origin_iso }
  };
  for (const iso of [a, b]) (slices[iso] ??= {})[key] = slim;
  kept++;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
let total = 0;
let largest = 0;
for (const [iso, data] of Object.entries(slices)) {
  const json = JSON.stringify(data);
  fs.writeFileSync(path.join(OUT, `${iso}.json`), json);
  total += json.length;
  largest = Math.max(largest, json.length);
}
console.log(`${kept}/${Object.keys(routes).length} routes kept, ${Object.keys(slices).length} slices, total ${(total / 1e6).toFixed(1)} MB, largest ${(largest / 1e3).toFixed(0)} KB, avg ${(total / Object.keys(slices).length / 1e3).toFixed(0)} KB`);
