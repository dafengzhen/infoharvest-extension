import './main.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import NewTab from './pages/newtab.tsx';
import Options from './pages/options.tsx';

const getPageComponent = () => {
  if (window.location.pathname.includes('newtab')) {
    return <NewTab />;
  } else if (window.location.pathname.includes('options')) {
    return <Options />;
  }
};

createRoot(document.getElementById('root')!).render(<StrictMode>{getPageComponent()}</StrictMode>);
