import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import logo from "../logo.svg";

export default function Home() {
  return (
    <div className="App">
      <Header />

      {/* WHITE INFO SECTION */}
      <section className="project-info">
        <Container>
          <h1 className="header">GLSDefi NFT Projects</h1>

          <p
            style={{
              opacity: 0.85,
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Welcome to GLSDefi. Select a project below to explore NFT minting,
            asset pairings, and marketplace listings.
          </p>
        </Container>
      </section>

      {/* DARK OPTIONS SECTION */}
      <section className="project-mint">
        <Container>
          {/* Rotating logo */}
          <div style={{ marginBottom: 18 }}>
            <img
              src={logo}
              className="App-logo"
              alt="GLSDefi logo"
              style={{ maxWidth: 140 }}
            />
          </div>

          <h3 style={{ marginBottom: 14 }}>Choose a Project</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              maxWidth: 820,
              margin: "0 auto",
            }}
          >
            {/* Alpha */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: 18,
                textAlign: "center",
              }}
            >
              <h4 style={{ marginBottom: 8 }}>GLSDefi Alpha Project</h4>
              <div style={{ opacity: 0.85, fontSize: 13, marginBottom: 14 }}>
                Mint Alpha NFTs (ETH) and view Alpha marketplace and asset pairing.
              </div>

              <Link className="wallet-btn" to="/alpha">
                Enter Alpha
              </Link>

              <div className="project-nav" style={{ marginTop: 12 }}>
                <Link className="App-link" to="/alpha/marketplace">
                  Marketplace
                </Link>
                <Link className="App-link" to="/alpha/asset-pairs">
                  Asset ↔ NFT Pairing
                </Link>
              </div>
            </div>

            {/* Bravo */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: 18,
                textAlign: "center",
              }}
            >
              <h4 style={{ marginBottom: 8 }}>GLSDefi Bravo Project</h4>
              <div style={{ opacity: 0.85, fontSize: 13, marginBottom: 14 }}>
                Mint Bravo NFTs (ETH) and view Bravo marketplace and asset pairing.
              </div>

              <Link className="wallet-btn" to="/bravo">
                Enter Bravo
              </Link>

              <div className="project-nav" style={{ marginTop: 12 }}>
                <Link className="App-link" to="/bravo/marketplace">
                  Marketplace
                </Link>
                <Link className="App-link" to="/bravo/asset-pairs">
                  Asset ↔ NFT Pairing
                </Link>
              </div>
            </div>
          </div>

          
        </Container>
      </section>
    </div>
  );
}
