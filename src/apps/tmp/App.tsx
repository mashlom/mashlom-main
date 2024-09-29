// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import React, { useState } from 'react';
import { Header } from './components/Header';
import { EosCalculator } from './components/EosCalculator';
import { Instructions } from './components/Instructions';
import { AntibioticTreatment } from './components/AntibioticTreatment';
import { Footer } from './components/Footer';
import './styles/eos.css';
import './App.css'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'CALCULATOR' | 'INSTRUCTIONS' | 'ANTIBIOTIC_TREATMENT'>('CALCULATOR');

  const openPanel = (panel: 'INSTRUCTIONS' | 'ANTIBIOTIC_TREATMENT') => {
    setCurrentPage(panel);
  };

  return (
    <div className="app">
      <Header credit="אסותא אשדוד" />
      <div id="eos-main" className="container main-content eos-main-content">
        {currentPage === 'CALCULATOR' && <EosCalculator />}
        {currentPage === 'INSTRUCTIONS' && <Instructions />}
        {currentPage === 'ANTIBIOTIC_TREATMENT' && <AntibioticTreatment />}
      </div>
      <Footer openPanel={openPanel} />
    </div>
  );
};

export default App