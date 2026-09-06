import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Cards from "../components/cards";
import logo from "../logo.svg";

const ALPHA_CONTRACT = "0xA63556e4442cF10EA1d1ABdE363F3FED64d6cff9";


export default function AlphaProject() {

  const [acceptedDisclosure, setAcceptedDisclosure] = useState(false);
  
  return (
    <div className="App">
      <Header />

      {/* WHITE INFO SECTION */}
      <section className="project-info">
        <Container>
          <h1 className="header">GLSDefi Alpha Project</h1>

          <p
            style={{
              opacity: 0.85,
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Mint GLSDefi Alpha NFTs and view linked asset pairings and marketplace listings.
          </p>

          <div className="contract-box" style={{ marginTop: 12 }}>
            <strong>Contract Address:</strong>
            <div className="contract-address">{ALPHA_CONTRACT}</div>
          </div>

          <div className="project-nav">
            <Link className="App-link" to="/alpha/marketplace">
              Alpha Marketplace
            </Link>
            <Link className="App-link" to="/alpha/asset-pairs">
              Alpha Asset ↔ NFT Pairing
            </Link>
            <Link className="App-link" to="/">
              Back to Home
            </Link>
          </div>
        </Container>
      </section>

      {/* DARK MINT SECTION */}
      <section className="project-mint">
        <Container>
          {/* Rotating logo here */}
          <div style={{ marginBottom: 18 }}>
            <img
              src={logo}
              className="App-logo"
              alt="GLSDefi logo"
              style={{ maxWidth: 140 }}
            />
          </div>

          <h3 style={{ marginBottom: 6 }}>Minting</h3>
          <div style={{ opacity: 0.85, fontSize: 13 }}>
            Mint occurs in ETH on the Alpha contract.
          </div>
          <p>
  By acquiring a GLSDefi membership NFT, you acknowledge that
  Pair and Co-Pair relationships are association records only
  and are classified ER-0 — No Economic Interest.
</p>

<p>
  <Link to="/disclaimer">
    Read the Disclosure, Pair/Co-Pair and Risk Information
  </Link>
</p>
<label>
        <input
          type="checkbox"
          checked={acceptedDisclosure}
          onChange={(e) => setAcceptedDisclosure(e.target.checked)}
        />

        I have read and accept the GLSDefi Disclosure,
        Pair/Co-Pair terms and ER-0 classification.
      </label>

      <p>
        <Link to="/disclaimer">
          Read the Disclosure, Pair/Co-Pair and Risk Information
        </Link>
      </p>

      <button
        disabled={!acceptedDisclosure}
        onClick={() => {
          // your existing NFT purchase/mint function goes here
        }}
      >
        Acquire Membership NFT
      </button>
          <div className="mint-center">
            <Cards project="alpha" />
          </div>
        </Container>
      </section>
    </div>
  );
}
