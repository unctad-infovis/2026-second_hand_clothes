import { useEffect, useRef } from 'react';

import Article from '../Article.mdx';

// General
// import BackToTop from './components/general/BackToTop.jsx';
// import ChartDataWrapper from './components/general/ChartDataWrapper.jsx';
// import Image from './components/general/Image.jsx';
// import ProgressBar from './components/general/ProgressBar.jsx';
// import Quote from './components/general/Quote.jsx';

// Minisite
// import Header from './components/minisite/Header.jsx';
// import HeaderChapter from './components/minisite/HeaderChapter.jsx';
// import SideScrollingText from './components/minisite/SideScrollingText.jsx';

import './../styles/styles.css';

import meta from './../meta.json';

import ArticleApp from './components/Article.jsx';
import { STATE } from './components/custom/config.js';

import MainApp from './components/custom/main.js';

const components = {
  ArticleApp
  // ChartDataWrapper,
  // ChartFDIExplorer,
  // Header,
  // HeaderChapter,
  // Image,
  // ProgressBar,
  // Quote,
  // SideScrollingText
};

const App = () => {
  const appRef = useRef();

  useEffect(() => {
    MainApp.init();

    document.addEventListener('shc:selection-change', () => MainApp.updateDashboard(false));
    document.addEventListener('shc:arc-click', e => MainApp.openArcModal(e.detail.exporter, e.detail.importer));
    document.addEventListener('shc:country-click', e => MainApp.openInsightPanel(e.detail));
    document.addEventListener('shc:country-hover', e => MainApp.showTooltip(e.detail.event, e.detail.country));
    document.addEventListener('shc:country-hoverend', () => MainApp.hideTooltip());
  }, []);

  window.appRef = appRef;

  return (
    <div
      className="app"
      style={
        {
          // '--main-color': 'var(--un-color-green-dark)',
          // '--secondary-color': 'var(--un-color-green-text)'
        }
      }
      ref={appRef}
    >
      <Article components={components} meta={meta} MainApp={MainApp} State={STATE} />
    </div>
  );
};

export default App;
