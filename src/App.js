import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import logo from "./logo.svg";

import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Cards from "./components/cards";

// ===== ALPHA PAGES (existing) =====
import AssetPairs from "./pages/AssetPairs";
import GLSDefiMarket from "./pages/GLSDefiMarket";


// ===== BRAVO PAGES (existing) =====

import BravoAssetPairs from "./pages/BravoAssetPairs";
import GLSDefiBravoMarket from "./pages/GLSDefiBravoMarket";

import Disclaimer from "./pages/Disclaimer";

/* ======================
   HOME (Landing Page)
====================== */
function Home() {
  return (
    <div className="App">
      <Header />

      <Container>
        <h1 className="header">GLSDefi Alpha NFT Project</h1>

        <h3 className="header">Contract Address</h3>
        <h6 className="header">
          0xA63556e4442cF10EA1d1ABdE363F3FED64d6cff9
        </h6>

        <h4>Current State: Public Sale</h4>

        <div style={{ marginTop: 16 }}>
  <h3>Projects</h3>

  {/* ===== ALPHA ===== */}
  <Link to="/alpha/asset-pairs" className="App-link">
    GLSDefi Alpha — Asset ↔ NFT Pairing
  </Link>
  <br />

  <Link to="/alpha/marketplace" className="App-link">
    GLSDefi Alpha — Marketplace
  </Link>
  <br /><br />

  {/* ===== BRAVO ===== */}
  <Link to="/bravo/asset-pairs" className="App-link">
    GLSDefi Bravo — Asset ↔ NFT Pairing
  </Link>
  <br />

  <Link to="/bravo/marketplace" className="App-link">
    GLSDefi Bravo — Marketplace
  </Link>
  <br /><br />

  {/* LEGAL */}
  <Link to="/disclaimer" className="App-link">
    Disclaimer & Risk Notes
  </Link>
</div>
      </Container>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bushido... Integrity... Trust NFT</p>

        <Cards />

        <a
          className="App-link"
          href="https://glsdefi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GLSDefi Alpha Project
        </a>
      </header>
    </div>
  );
}

/* ======================
   APP ROUTES
====================== */
function App() {
  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ===== ALPHA ===== */}
        <Route path="/alpha/asset-pairs" element={<AssetPairs />} />
        <Route path="/alpha/marketplace" element={<GLSDefiMarket />} />

        {/* ===== BRAVO ===== */}
        
        <Route path="/bravo/asset-pairs" element={<BravoAssetPairs />} />
        <Route path="/bravo/marketplace" element={<GLSDefiBravoMarket />} />
        

        {/* LEGAL / INFO */}
        <Route path="/disclaimer" element={<Disclaimer />} />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Container style={{ padding: 40 }}>
              <h2>Page not found</h2>
              <Link to="/">Return Home</Link>
            </Container>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
