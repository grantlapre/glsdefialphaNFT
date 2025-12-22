import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Cards from "./components/cards";

import { HashRouter, Routes, Route, Link } from "react-router-dom";
import AssetPairs from "./pages/AssetPairs";

function Home() {
  return (
    <div className="App">
      {/* Header now includes the MetaMask Connect Wallet button */}
      <Header />

      <Container>
        <h1 className="header">GLSDefi Alpha Project</h1>
        <h3 className="header">Contract Address:</h3>
        <h6 className="header">0xA63556e4442cF10EA1d1ABdE363F3FED64d6cff9</h6>

        <h4>Current State: Public Sale...</h4>

        {/* Link to the new page */}
        <div style={{ marginTop: 12 }}>
          <Link to="/asset-pairs" className="App-link">
            View Asset ↔ NFT Pairs
          </Link>
        </div>
      </Container>

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Bushido...Integrity...Trust NFT :)</p>

        <Cards />

        <a
          className="App-link"
          href="https://glsdefi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GLSDefi Alpha Project Launched 21/12/2025
        </a>
      </header>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asset-pairs" element={<AssetPairs />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

