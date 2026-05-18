const App = () => {
  return (
    <>
      <header id="main-header">
        <div className="header-inner">
          <div className="header-title">
            <img src="./assets/img/unctad-icon.svg" alt="UNCTAD" className="header-logo" />
            <div className="header-text">
              <h3>Global Second-Hand Clothes Trade Monitor</h3>
              <h4>UNCTAD &middot; SMEP project</h4>
            </div>
          </div>

          <div className="header-controls">
            <div className="ctrl-divider"></div>

            {/* Region filter */}
            <div className="ctrl-pill">
              {['Global', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((el, i) => (
                <button key={el} className={`region-btn btn-toggle ${i === 0 ? 'active' : ''}`} data-region={el} title={el} type="button">
                  {i === 0 ? 'All' : el}
                </button>
              ))}
            </div>

            <div className="ctrl-divider"></div>

            {/* Year select */}
            <div className="ctrl-pill">
              <select id="year-select" className="ctrl-year" defaultValue="2024">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>

            {/* Flow direction filter */}
            <div className="ctrl-pill" title="Filter by economic flow direction">
              <span className="ctrl-flows-label">Flows</span>
              <label className="flow-label" title="North to South">
                <input type="checkbox" className="flow-checkbox" value="north-south" onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#009EDB' }}>N→S</span>
              </label>
              <label className="flow-label" title="South to North">
                <input type="checkbox" className="flow-checkbox" value="south-north" onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#72BF44' }}>S→N</span>
              </label>
              <label className="flow-label" title="South to South">
                <input type="checkbox" className="flow-checkbox" value="south-south" onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#FBAF17' }}>S→S</span>
              </label>
              <label className="flow-label" title="North to North">
                <input type="checkbox" className="flow-checkbox" value="north-north" onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#AEA29A' }}>N→N</span>
              </label>
            </div>
            <div id="threshold-divider" className="ctrl-divider"></div>

            {/* Threshold filter */}
            <div id="threshold-group" className="ctrl-pill" title="Visibility threshold — minimum trade value to display">
              <button className="threshold-btn btn-toggle active" type="button" data-threshold="auto">
                Auto
              </button>
              <button className="threshold-btn btn-toggle" type="button" data-threshold="10000000">
                $10M
              </button>
              <button className="threshold-btn btn-toggle" type="button" data-threshold="1000000">
                $1M
              </button>
              <button className="threshold-btn btn-toggle" type="button" data-threshold="500000">
                $500k
              </button>
              <button className="threshold-btn btn-toggle" type="button" data-threshold="100000">
                $100k
              </button>
              <button className="threshold-btn btn-toggle" type="button" data-threshold="10000">
                $10k
              </button>
            </div>

            <div className="ctrl-divider"></div>

            {/* Exporter picker */}
            <div className="picker-wrapper">
              <button type="button" id="exp-btn" className="country-picker-btn">
                <div className="picker-labels">
                  <span className="picker-type">Exporter (From)</span>
                  <span id="exp-label" className="picker-value">
                    All Exporters
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginLeft: '4px' }}>
                  <span id="exp-count" className="picker-badge hidden"></span>
                  <svg className="picker-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Picker</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div id="exp-menu" className="country-picker-menu hidden">
                <div className="picker-search-area">
                  <input type="text" id="exp-search" placeholder="Search Exporter..." />
                  <button type="button" id="exp-clear-all" className="picker-clear">
                    Clear
                  </button>
                </div>
                <div id="exp-list" className="picker-list"></div>
              </div>
            </div>

            {/* Importer picker */}
            <div className="picker-wrapper">
              <button type="button" id="imp-btn" className="country-picker-btn">
                <div className="picker-labels">
                  <span className="picker-type">Importer (To)</span>
                  <span id="imp-label" className="picker-value">
                    All Importers
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginLeft: '4px' }}>
                  <span id="imp-count" className="picker-badge hidden" style={{ background: '#b45309' }}></span>
                  <svg className="picker-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Picker</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div id="imp-menu" className="country-picker-menu hidden">
                <div className="picker-search-area">
                  <input type="text" id="imp-search" placeholder="Search Importer..." />
                  <button id="imp-clear-all" type="button" className="picker-clear">
                    Clear
                  </button>
                </div>
                <div id="imp-list" className="picker-list"></div>
              </div>
            </div>
          </div>
          {/* /.header-controls */}
        </div>
        {/* /.header-inner */}
      </header>

      {/* Legend Bar (between filters and KPI) */}
      <div id="legend-panel">
        <div className="legend-mobile-header">
          <span>Legend</span>
          <button id="mobile-legend-close" className="btn-close" type="button">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Close</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="legend-content"></div>
        <div id="total-stats">
          <div className="stat-row">
            <span className="stat-label">Shown</span>
            <span className="stat-val" id="stat-value">
              —
            </span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Bilateral</span>
            <span className="stat-secondary" id="stat-bilateral">
              —
            </span>
          </div>
          <span id="stat-coverage"></span>
        </div>
        <div className="legend-footer">
          <img src="./assets/img/smep-logo.png" alt="SMEP" />
        </div>
      </div>

      {/* ── KPI Bar ── */}
      <div id="kpi-bar">
        <div className="kpi-inner">
          <div className="kpi-item" title="Active filter: region or country selection">
            <span className="kpi-label">Filter</span>
            <span className="kpi-value" id="kpi-scope">
              Global
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item" title="Total trade value of visible flows (USD)">
            <span className="kpi-label">Volume</span>
            <span className="kpi-value" id="kpi-total">
              —
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item" title="Number of bilateral trade corridors shown on map">
            <span className="kpi-label">Corridors</span>
            <span className="kpi-value" id="kpi-flows">
              —
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item" title="Number of countries active in the current view">
            <span className="kpi-label">Countries</span>
            <span className="kpi-value" id="kpi-countries">
              —
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item kpi-item-col" title="Largest net exporter by trade balance (includes all flows, before threshold)">
            <span className="kpi-label">#1 Exporter</span>
            <span className="kpi-value" id="kpi-top-exp" style={{ color: '#0077B6' }}>
              —
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item kpi-item-col" title="Largest net importer by trade balance (includes all flows, before threshold)">
            <span className="kpi-label">#1 Importer</span>
            <span className="kpi-value" id="kpi-top-imp" style={{ color: '#C0392B' }}>
              —
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item" title="North-to-South flows as share of total visible trade value">
            <span className="kpi-label">N→S</span>
            <span className="kpi-value" id="kpi-ns-pct" style={{ color: '#009EDB' }}>
              —
            </span>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item" title="South-to-South flows as share of total visible trade value">
            <span className="kpi-label">S→S</span>
            <span className="kpi-value" id="kpi-ss-pct" style={{ color: '#FBAF17' }}>
              —
            </span>
          </div>
        </div>
      </div>

      <main>
        {/* ── Map + Overlays ── */}
        <div className="map-area">
          <div id="map-container"></div>

          <div id="tooltip"></div>

          {/* Insight Side Panel (P1) */}
          <div id="insight-panel">
            <div className="panel-header">
              <div className="panel-title-group">
                <div className="panel-country-name-row">
                  <div id="panel-country-name">—</div>
                  <button id="searoute-btn" type="button" className="searoute-btn" title="Show actual shipping routes (experimental feature)" disabled>
                    <span className="searoute-btn-label">Sea Route</span>
                    <span className="searoute-experimental-badge">EXPERIMENTAL</span>
                  </button>
                </div>
                <div id="panel-country-meta">—</div>
              </div>
              <button id="panel-close-btn" className="btn-close" title="Close" type="button">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Close</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div id="panel-body">
              <div style={{ textAlign: 'center', color: '#AEA29A', fontSize: '12px', padding: '32px 0' }}>Click a country on the map</div>
            </div>
          </div>

          {/* P2-A: Arc Detail Modal */}
          <div id="arc-modal" className="hidden">
            <div className="modal-backdrop" id="arc-modal-backdrop"></div>
            <div className="modal-card">
              <div className="modal-header">
                <div>
                  <div id="arc-modal-title" className="modal-title">
                    —
                  </div>
                  <div id="arc-modal-meta" className="modal-subtitle">
                    Bilateral Trade History
                  </div>
                </div>
                <button id="arc-modal-close" className="btn-close" type="button">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Close</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div id="arc-modal-body" className="modal-body"></div>
            </div>
          </div>

          {/* P2-B: Compare Modal */}
          <div id="compare-modal" className="hidden">
            <div className="modal-backdrop" id="compare-modal-backdrop"></div>
            <div className="modal-card">
              <div className="modal-header">
                <div id="compare-modal-title" className="modal-title">
                  Country Comparison
                </div>
                <button id="compare-modal-close" className="btn-close" type="button">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Close</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div id="compare-modal-body" className="modal-body"></div>
            </div>
          </div>

          {/* Mobile FABs */}
          <button id="mobile-legend-btn" type="button">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Legend</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            Legend
          </button>

          <button id="fit-screen-btn" title="Fit to screen" type="button">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Fit to screen</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          <button id="mobile-filter-btn" type="button">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Filter</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            <span id="mobile-filter-badge" className="filter-badge"></span>
          </button>

          {/* Backdrops (initially hidden, JS toggles .hidden) */}
          <div id="mobile-legend-backdrop" className="hidden"></div>
          <div id="mobile-filter-backdrop" className="hidden"></div>
          <div id="mobile-country-backdrop" className="hidden"></div>

          <div id="loader">
            <div className="loader-spinner"></div>
            <p>Loading Trade Data...</p>
          </div>
        </div>
        {/* /.map-area */}
      </main>

      {/* ── Map Footer ── */}
      <footer id="map-footer">
        <p>Source: BACI based on UN Comtrade. Data cover HS&nbsp;6309 (Worn clothing and other worn articles).</p>
        <p>
          Note: Sea routes are shown only for flows between different UNCTAD regions (Africa, Americas, Asia, Europe, Oceania) and represent major maritime shipping lanes computed via the Eurostat <em>searoute</em> algorithm using representative ports based on UNCTAD PLSCI scores. Flows within the same region are shown
          as arcs. Routes do not reflect actual tracked second-hand clothing (HS&nbsp;6309) cargo paths and may not represent the actual mode of transport used.
        </p>
        <p className="footer-method-link">
          <button id="methodology-btn" className="footer-link-btn" type="button">
            Methodology &amp; Data Sources
          </button>
        </p>
      </footer>

      {/* ── Methodology Modal ── */}
      <div id="methodology-modal" className="hidden">
        <div className="modal-backdrop" id="methodology-modal-backdrop"></div>
        <div className="modal-card methodology-card">
          <div className="modal-header">
            <div>
              <div className="modal-title">Methodology &amp; Data Sources</div>
              <div className="modal-subtitle">Global Second-Hand Clothes Trade Monitor &mdash; Technical Notes</div>
            </div>
            <button id="methodology-modal-close" className="btn-close" type="button">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Close</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="modal-body method-body">
            <section className="method-section">
              <h3 className="method-section-title">Data Source</h3>
              <dl className="method-dl">
                <dt>Database</dt>
                <dd>BACI International Trade Database (CEPII), derived from UN Comtrade mirror data. Harmonized bilateral trade flows at the HS 6-digit level.</dd>
                <dt>Product coverage</dt>
                <dd>
                  HS&nbsp;6309 — <em>Worn clothing and other worn articles.</em> Includes second-hand garments traded in bulk regardless of quality grade.
                </dd>
                <dt>Years available</dt>
                <dd>2015–2024 (provisional for the most recent year)</dd>
                <dt>Value unit</dt>
                <dd>Current USD (thousands, then converted to display units)</dd>
              </dl>
            </section>

            <section className="method-section">
              <h3 className="method-section-title">Flow Direction Classification</h3>
              <p className="method-note">
                Countries are classified as <strong>North</strong> (developed) or <strong>South</strong> (developing/least-developed) using the UNCTAD Development Status classification, consistent with UNCTAD flagship publications.
              </p>
              <dl className="method-dl">
                <dt>
                  <span className="method-flow-dot" style={{ background: '#009EDB' }}></span> N&rarr;S
                </dt>
                <dd>Export from a developed economy to a developing economy</dd>
                <dt>
                  <span className="method-flow-dot" style={{ background: '#72BF44' }}></span> S&rarr;N
                </dt>
                <dd>Export from a developing economy to a developed economy</dd>
                <dt>
                  <span className="method-flow-dot" style={{ background: '#FBAF17' }}></span> S&rarr;S
                </dt>
                <dd>Both exporter and importer are developing or least-developed economies</dd>
                <dt>
                  <span className="method-flow-dot" style={{ background: '#AEA29A' }}></span> N&rarr;N
                </dt>
                <dd>Both exporter and importer are developed economies</dd>
              </dl>
            </section>

            <section className="method-section">
              <h3 className="method-section-title">Trade Flow Calculation</h3>
              <dl className="method-dl">
                <dt>Net bilateral flow</dt>
                <dd>For each country pair (A, B), the net flow equals the larger reported value between A&rarr;B and B&rarr;A exports. The dominant direction determines the arc direction. This reduces double-counting from mirror reporting in UN Comtrade.</dd>
                <dt>Arc width</dt>
                <dd>Scaled proportionally to the net trade value on a square-root scale to prevent large flows from dominating small ones visually.</dd>
                <dt>Arc curvature</dt>
                <dd>
                  All arcs curve in a consistent clockwise direction (SVG <code>sweep-flag = 1</code>). This means eastward flows bend northward and westward flows bend southward, providing a secondary visual cue for flow direction that complements the color encoding.
                </dd>
              </dl>
            </section>

            <section className="method-section">
              <h3 className="method-section-title">Display Threshold (Auto Mode)</h3>
              <p className="method-note">
                To avoid visual overload, the map limits the number of displayed arcs to a maximum of <strong>40</strong> at a time.
              </p>
              <dl className="method-dl">
                <dt>Global view</dt>
                <dd>Minimum threshold: $10&thinsp;M. Arcs below this value are hidden.</dd>
                <dt>With country selection</dt>
                <dd>Floor scales down with selection breadth (1–3 countries: $10&thinsp;K; 4–10: $100&thinsp;K; 11–30: $500&thinsp;K; 31+: $1&thinsp;M). If the number of arcs above the floor exceeds 40, the threshold is raised to the 40th-highest value.</dd>
                <dt>Manual thresholds</dt>
                <dd>Fixed cut-off values ($10&thinsp;k – $10&thinsp;M) override the automatic algorithm.</dd>
              </dl>
            </section>

            <section className="method-section">
              <h3 className="method-section-title">Partner Concentration (HHI)</h3>
              <p className="method-note">Shown in the country detail panel when a country is clicked. Measures how much a country&rsquo;s trade is spread across partners versus concentrated in just a few analogous to asking &ldquo;does this country trade with everyone, or depend heavily on one partner?&rdquo;</p>
              <dl className="method-dl">
                <dt>Index used</dt>
                <dd>Herfindahl&ndash;Hirschman Index (HHI): the sum of squared partner trade shares, scaled to 0&ndash;10&thinsp;000. A score of 10&thinsp;000 means 100% of trade goes to a single partner; a score near 0 means trade is evenly spread across many partners.</dd>
                <dt>Formula</dt>
                <dd>
                  <code>
                    HHI = &sum;(share<sub>i</sub>&sup2;) &times; 10&thinsp;000
                  </code>
                  , where share<sub>i</sub> is each partner&rsquo;s fraction of that country&rsquo;s total bilateral trade value.
                </dd>
                <dt>Interpretation</dt>
                <dd>
                  <span className="method-hhi-band" style={{ color: '#72BF44' }}>
                    &#9632;
                  </span>{' '}
                  <strong>Diversified</strong> (0–2&thinsp;000): trade spread across many partners
                  <br />
                  <span className="method-hhi-band" style={{ color: '#FBAF17' }}>
                    &#9632;
                  </span>{' '}
                  <strong>Moderate</strong> (2&thinsp;000–4&thinsp;000): some partners dominate but diversification remains
                  <br />
                  <span className="method-hhi-band" style={{ color: '#ef4444' }}>
                    &#9632;
                  </span>{' '}
                  <strong>Highly concentrated</strong> (&gt;4&thinsp;000): trade heavily dependent on one or two partners
                </dd>
                <dt>Threshold note</dt>
                <dd>
                  These bands are calibrated for international trade dependency analysis. They are deliberately lower than the antitrust thresholds used in competition law (which start at 2&thinsp;500 for &ldquo;concentrated markets&rdquo;), reflecting that even moderate trade concentration poses diversification risks.
                </dd>
                <dt>Data scope</dt>
                <dd>Computed from all net bilateral flows for the selected year, regardless of the display threshold. This ensures the score is not distorted by the map&rsquo;s visibility filter.</dd>
              </dl>
            </section>

            <section className="method-section">
              <h3 className="method-section-title">Maritime Route Visualization</h3>
              <dl className="method-dl">
                <dt>Coverage</dt>
                <dd>Sea routes are displayed only for trade flows between different UNCTAD regions (Africa, Americas, Asia, Europe, Oceania). Flows within the same region are shown as straight arcs to avoid visual clutter from short intra-regional routes.</dd>
                <dt>Algorithm</dt>
                <dd>
                  Routes are computed using the Eurostat <em>searoute</em> algorithm over a navigable sea graph.
                </dd>
                <dt>Port selection</dt>
                <dd>
                  Representative ports are chosen based on UNCTAD Liner Shipping Connectivity Index (LSCI) scores; the highest-ranked port in each country is used as the routing node. For large countries spanning multiple coasts (United States, Canada, Australia), the nearest coast port to the partner country is
                  selected.
                </dd>
                <dt>Disclaimer</dt>
                <dd>Routes are indicative only. They do not represent actual tracked HS&nbsp;6309 cargo paths, may not reflect the mode of transport used, and should not be used for navigation.</dd>
              </dl>
            </section>

            <section className="method-section">
              <h3 className="method-section-title">Map Disclaimer</h3>
              <p className="method-note">
                The boundaries and names shown on this map do not imply official endorsement or acceptance by the United Nations. Dotted and dashed lines represent approximate borders for which the final status has not yet been determined. The designation of countries or territories does not imply the expression of any
                opinion on the part of UNCTAD concerning their legal status.
              </p>
            </section>

            <section className="method-section method-section-last">
              <h3 className="method-section-title">How to Cite</h3>
              <p className="method-cite">
                UNCTAD (2025). <em>Global Second-Hand Clothes Trade Monitor.</em> United Nations Conference on Trade and Development, Geneva.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Panel (bottom sheet) ── */}
      <div id="mobile-filter-panel">
        <div className="sheet-handle"></div>
        <div className="sheet-header">
          <span>Filters</span>
          <button id="mobile-filter-close" className="btn-close" type="button">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Close</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="sheet-body">
          <div className="sheet-section">
            <div className="section-label">Region</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button className="region-btn btn-toggle-lg" data-region="Global" type="button">
                All
              </button>
              <button className="region-btn btn-toggle-lg" data-region="Africa" type="button">
                Africa
              </button>
              <button className="region-btn btn-toggle-lg" data-region="Americas" type="button">
                Americas
              </button>
              <button className="region-btn btn-toggle-lg" data-region="Asia" type="button">
                Asia
              </button>
              <button className="region-btn btn-toggle-lg" data-region="Europe" type="button">
                Europe
              </button>
              <button className="region-btn btn-toggle-lg" data-region="Oceania" type="button">
                Oceania
              </button>
            </div>
          </div>

          <div className="sheet-section">
            <div className="section-label">Year</div>
            <select id="m-year-select" className="sheet-select">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
            </select>
          </div>

          <div className="sheet-section">
            <div className="section-label">Flow Direction</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <label className="flow-label-lg">
                <input type="checkbox" className="flow-checkbox" value="north-south" style={{ accentColor: '#009EDB' }} onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#009EDB' }}>N → S</span>
              </label>
              <label className="flow-label-lg">
                <input type="checkbox" className="flow-checkbox" value="south-north" style={{ accentColor: '#72BF44' }} onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#72BF44' }}>S → N</span>
              </label>
              <label className="flow-label-lg">
                <input type="checkbox" className="flow-checkbox" value="south-south" style={{ accentColor: '#FBAF17' }} onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#FBAF17' }}>S → S</span>
              </label>
              <label className="flow-label-lg">
                <input type="checkbox" className="flow-checkbox" value="north-north" style={{ accentColor: '#AEA29A' }} onChange={event => props.MainApp.changeFlowDirection(event)} />
                <span style={{ color: '#AEA29A' }}>N → N</span>
              </label>
            </div>
          </div>

          <div className="sheet-section">
            <div className="section-label">Min. Trade Value</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button className="threshold-btn btn-toggle-lg" data-threshold="auto" type="button">
                Auto
              </button>
              <button className="threshold-btn btn-toggle-lg" data-threshold="10000000" type="button">
                $10M
              </button>
              <button className="threshold-btn btn-toggle-lg" data-threshold="1000000" type="button">
                $1M
              </button>
              <button className="threshold-btn btn-toggle-lg" data-threshold="500000" type="button">
                $500k
              </button>
              <button className="threshold-btn btn-toggle-lg" data-threshold="100000" type="button">
                $100k
              </button>
              <button className="threshold-btn btn-toggle-lg" data-threshold="10000" type="button">
                $10k
              </button>
            </div>
          </div>

          <div className="sheet-section">
            <div className="section-label">Exporter (From)</div>
            <button id="m-exp-btn" className="picker-btn-full" type="button">
              <span id="m-exp-label" className="picker-value">
                All Exporters
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '8px' }}>
                <span id="m-exp-count" className="picker-badge hidden"></span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Count</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>

          <div className="sheet-section">
            <div className="section-label">Importer (To)</div>
            <button id="m-imp-btn" className="picker-btn-full" type="button">
              <span id="m-imp-label" className="picker-value">
                All Importers
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '8px' }}>
                <span id="m-imp-count" className="picker-badge hidden" style={{ background: '#b45309' }}></span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" type="button">
                  <title>Count</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
        {/* /.sheet-body */}
      </div>
      {/* /#mobile-filter-panel */}
    </>
  );
};

export default App;
