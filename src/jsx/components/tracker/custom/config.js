import { format } from 'd3';

export const CONFIG = {
  geoJsonUrl: './assets/data/worldmap-economies-4326.topo.json',

  thresholds: {
    value: { large: 5000000, medium: 500000 }
  },

  colors: {
    value: { label: 'Export Value ($)', discrete: { large: '#009edb', medium: '#a05fb4', small: '#4f4740' } }
  },

  // Flow category base colors (North = Developed, South = Developing/LDC)
  flowColors: {
    'north-south': '#009edb', // --un-color-blue
    'south-north': '#72bf44', // --un-color-green
    'south-south': '#fbaf17', // --un-color-yellow
    'north-north': '#a05fb4'  // --un-color-purple
  },

  // Development status: 'north' = Developed economies.
  // All unlisted countries default to 'south' (Developing/LDC).
  development: {
    USA: 'north',
    CAN: 'north',
    GRL: 'north',
    GBR: 'north',
    FRA: 'north',
    DEU: 'north',
    ITA: 'north',
    ESP: 'north',
    NLD: 'north',
    BEL: 'north',
    AUT: 'north',
    SWE: 'north',
    NOR: 'north',
    DNK: 'north',
    FIN: 'north',
    CHE: 'north',
    PRT: 'north',
    GRC: 'north',
    IRL: 'north',
    POL: 'north',
    CZE: 'north',
    HUN: 'north',
    ROU: 'north',
    BGR: 'north',
    SVK: 'north',
    SVN: 'north',
    HRV: 'north',
    EST: 'north',
    LVA: 'north',
    LTU: 'north',
    LUX: 'north',
    MLT: 'north',
    CYP: 'north',
    ISL: 'north',
    AND: 'north',
    SMR: 'north',
    MCO: 'north',
    LIE: 'north',
    MNE: 'north',
    SRB: 'north',
    BIH: 'north',
    MKD: 'north',
    ALB: 'north',
    RUS: 'north',
    UKR: 'north',
    BLR: 'north',
    MDA: 'north',
    ISR: 'north',
    AUS: 'north',
    NZL: 'north',
    JPN: 'north',
    KOR: 'north'
  }
};

// Metric display formatting (used by tooltips and legends)
export const METRIC_FORMAT = {
  value: {
    grossLabel: 'Gross Volume:',
    netLabel: 'Net Balance:',
    fmt: v => {
      const a = Math.abs(v);
      const s = v < 0 ? '-' : '';
      if (a >= 1e9) return `${s}$${format('.2f')(a / 1e9)}B`;
      if (a >= 1e6) return `${s}$${format('.2f')(a / 1e6)}M`;
      if (a >= 1e3) return `${s}$${format('.2f')(a / 1e3)}K`;
      return `${s}$${format(',.0f')(a)}`;
    }
  }
};

export const STATE = {
  // Per-year pre-computed net flows, keyed by year number
  yearCache: {},

  // Gross trade volume per country per year: { iso: { "YYYY": value } }
  trendSummary: {},

  // Raw bilateral flows per country pair across all years (lazy-loaded)
  bilateralHistory: null,
  _bilateralPromise: null,

  geoData: null,
  filteredData: [],
  nodeStats: {},
  totalBilateral: 0,
  totalBilateralCount: 0,

  year: 2024,
  metric: 'value',

  selectedExporters: new Set(),
  selectedImporters: new Set(),

  // Flow category visibility filters
  flowFilters: new Set(['north-south', 'south-north', 'south-south', 'north-north']),

  countryCoords: {},
  countryNames: {},
  countryHierarchy: {}, // iso3cd → { maplab, stscod } from BNDA_CTY.csv
  routes: {},

  // Border line layers from TopoJSON (dashed/dotted/dash-dotted for disputed borders)
  borderLayers: null,

  // Label visibility toggles
  showExporterLabels: true,
  showImporterLabels: true,

  // Threshold mode: 'auto' | 500000 | 100000 | 10000
  thresholdMode: 'auto'
};
