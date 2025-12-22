import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { ASSETS } from "../data/assets";

const money = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

// Preferred GLSDefi contact method
const GLSDEFI_CONTACT_EMAIL = "glsdefi@glsdefi.com"; // update if needed

export default function GLSDefiMarket() {
  const itemsForSale = ASSETS.filter((a) => a.forSale);

  return (
    <div className="App">
      <Container style={{ paddingTop: 24, paddingBottom: 40 }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ marginBottom: 6 }}>Items for Sale</h1>
            <div style={{ opacity: 0.85, maxWidth: 820 }}>
              Items listed here are available for <strong>outright purchase</strong> via GLSDefi.
              To proceed, contact GLSDefi and reference the relevant{" "}
              <strong>Asset Code</strong>.
            </div>
          </div>

          <div style={{ alignSelf: "flex-end" }}>
            <Link to="/asset-pairs" className="App-link">
              View Asset ↔ NFT Pairing
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="market-grid">
          {itemsForSale.map((item) => (
            <div key={item.code} className="market-card">
              <div className="market-imgwrap">
                <img
                  src={item.itemImage}
                  alt={item.name}
                  className="market-img"
                />
                <div className="market-badge">Asset Code: {item.code}</div>
              </div>

              <div className="market-body">
                <div className="market-price">{money(item.valueUsd)}</div>
                <div className="market-title">{item.name}</div>

                <div className="market-meta">
                  <span>{item.condition}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>

                <div className="market-desc">{item.shortDesc}</div>

                <div className="market-actions">
                  <a
                    className="wallet-btn"
                    href={`mailto:${GLSDEFI_CONTACT_EMAIL}?subject=Outright%20Purchase%20-%20Asset%20${item.code}&body=Hi%20GLSDefi%2C%0A%0AI%20would%20like%20to%20purchase%20Asset%20${item.code}%20outright.%0A%0APlease%20advise%20next%20steps%20for%20settlement.%0A`}
                  >
                    Contact GLSDefi to Buy Outright
                  </a>
                </div>

                <div className="market-footnote">
                  Settlement is handled directly by GLSDefi in a single transaction.
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
