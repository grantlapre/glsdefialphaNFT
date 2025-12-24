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

import AlphaProject from "./pages/AlphaProject";
import BravoProject from "./pages/BravoProject";

import Home from "./pages/Home";



/* ======================
   APP ROUTES
====================== */
function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Home />} />

  <Route path="/alpha" element={<AlphaProject />} />
  <Route path="/alpha/asset-pairs" element={<AssetPairs />} />
  <Route path="/alpha/marketplace" element={<GLSDefiMarket />} />

  <Route path="/bravo" element={<BravoProject />} />
  <Route path="/bravo/asset-pairs" element={<BravoAssetPairs />} />
  <Route path="/bravo/marketplace" element={<GLSDefiBravoMarket />} />

  {/* Fallback */}
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
