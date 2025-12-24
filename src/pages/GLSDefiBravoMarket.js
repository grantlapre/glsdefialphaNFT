// src/pages/GLSDefiBravoMarket.js
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { ASSETS_BRAVO } from "../data/assets.bravo";

const money = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

const GLSDEFI_CONTACT_EMAIL = "glsdefi@glsdefi.com"; // update if needed

export default function GLSDefiBravoMarket() {
  const itemsForSale = ASSETS_BRAVO.filter((a) => a.forSale);

  const [photoIndex, setPhotoIndex] = useState({});
  const setIdx = (code, idx) =>
    setPhotoIndex((prev) => ({ ...prev, [code]: idx }));

  return (
    <div className="App">
      <Container style={{ paddingTop: 24, paddingBottom: 40 }}>
        {/* NAVIGATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 26,
            flexWrap: "wrap",
          }}
        >
          <Link to="/" className="App-link">
            Home
          </Link>

          <span style={{ fontWeight: 700, opacity: 0.8 }}>
            Bravo Marketplace
          </span>

          <Link to="/bravo/asset-pairs" className="App-link">
            Bravo Asset ↔ NFT Pairing
          </Link>
        </div>

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
            <h1 style={{ marginBottom: 6 }}>GLSDefi Bravo — Items for Sale</h1>
            <div style={{ opacity: 0.85, maxWidth: 820 }}>
              Items listed here are available for <strong>outright purchase</strong>{" "}
              via GLSDefi. To proceed, contact GLSDefi and reference the relevant{" "}
              <strong>Asset Code</strong>.
            </div>
          </div>

          <div style={{ alignSelf: "flex-end" }}>
            <Link to="/bravo/asset-pairs" className="App-link">
              View Asset ↔ NFT Pairing (Bravo)
            </Link>
          </div>
        </div>

        {/* GRID */}
        <div className="market-grid">
          {itemsForSale.map((item) => {
            const imgs =
              item.images && item.images.length
                ? item.images
                : [item.itemImage].filter(Boolean);

            const idx = photoIndex[item.code] ?? 0;
            const safeIdx = Math.max(0, Math.min(idx, imgs.length - 1));

            return (
              <div key={item.code} className="market-card">
                <div className="market-imgwrap">
                  <img
                    src={imgs[safeIdx]}
                    alt={`${item.name} photo ${safeIdx + 1}`}
                    className="market-img"
                  />

                  {imgs.length > 1 && (
                    <div className="market-gallery-controls">
                      <button
                        type="button"
                        className="market-gallery-btn"
                        onClick={() =>
                          setIdx(
                            item.code,
                            (safeIdx - 1 + imgs.length) % imgs.length
                          )
                        }
                        aria-label="Previous photo"
                      >
                        ‹
                      </button>

                      <div className="market-gallery-dots">
                        {imgs.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`market-dot ${
                              i === safeIdx ? "active" : ""
                            }`}
                            onClick={() => setIdx(item.code, i)}
                            aria-label={`Photo ${i + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        className="market-gallery-btn"
                        onClick={() => setIdx(item.code, (safeIdx + 1) % imgs.length)}
                        aria-label="Next photo"
                      >
                        ›
                      </button>
                    </div>
                  )}

                  <div className="market-badge">Asset Code: {item.code}</div>
                </div>

                <div className="market-body">
                  <div className="market-price">
                    {item.hiddenValue ? (
                      <span style={{ fontStyle: "italic", opacity: 0.85 }}>
                        To be auctioned
                      </span>
                    ) : (
                      money(item.valueUsd)
                    )}
                  </div>

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
                      href={`mailto:${GLSDEFI_CONTACT_EMAIL}?subject=Outright%20Purchase%20-%20Bravo%20Asset%20${item.code}&body=Hi%20GLSDefi%2C%0A%0AI%20would%20like%20to%20purchase%20Bravo%20Asset%20${item.code}%20outright.%0A%0APlease%20advise%20next%20steps%20for%20settlement.%0A`}
                    >
                      Contact GLSDefi to Buy Outright
                    </a>
                  </div>

                  <div className="market-footnote">
                    Settlement is handled directly by GLSDefi in a single transaction.
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
