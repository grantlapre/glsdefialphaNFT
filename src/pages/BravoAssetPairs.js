// src/pages/BravoAssetPairs.js
import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { ASSETS_BRAVO } from "../data/assets.bravo";
import { NFTS_BRAVO, INITIAL_ASSIGNMENT_BRAVO } from "../data/nfts.bravo";

const OWNER_ADDRESS = "0x1c62cA762121F15ae516A70cc55e5870e48eFa19".toLowerCase();

const money = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export default function BravoAssetPairs() {

  const [account] = useState("0xPUBLIC_VIEWER"); // later replace with wallet
  const isOwner = account.toLowerCase() === OWNER_ADDRESS;

  const [buybackOffers, setBuybackOffers] = useState({});

  const [assignment, setAssignment] = useState(INITIAL_ASSIGNMENT_BRAVO);

  const nftsByAsset = useMemo(() => {
    const grouped = {};
    for (const nft of NFTS_BRAVO) {
      const code = assignment[nft.tokenId];
      if (!grouped[code]) grouped[code] = [];
      grouped[code].push(nft);
    }
    return grouped;
  }, [assignment]);

  function migrateAll(fromCode, toCode) {
    setAssignment((prev) => {
      const next = { ...prev };
      for (const [tokenId, code] of Object.entries(prev)) {
        if (code === fromCode) next[tokenId] = toCode;
      }
      return next;
    });
  }

  function migrateOne(tokenId, toCode) {
    setAssignment((prev) => ({ ...prev, [tokenId]: toCode }));
  }

  return (
    <div className="App">
      <Container style={{ paddingTop: 24, paddingBottom: 30 }}>
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

          <Link to="/bravo/marketplace" className="App-link">
            Bravo Marketplace
          </Link>

          <span style={{ fontWeight: 700, opacity: 0.8 }}>
            Bravo Asset ↔ NFT Pairing
          </span>
        </div>

        <h1>GLSDefi Bravo — Items ↔ NFT Pairing</h1>
        <p style={{ opacity: 0.85 }}>
          NFT owners who opt to hold can be reassigned to a different item when an
          asset is sold.
        </p>

        {ASSETS_BRAVO.map((asset) => {
          const perNft = asset.totalNfts ? asset.valueUsd / asset.totalNfts : 0;
          const assigned = nftsByAsset[asset.code] || [];

          return (
            <section
              key={asset.code}
              style={{
                marginTop: 18,
                position: "relative",
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
              }}
            >
{asset.status === "SOLD" && (
  <div
    style={{
      position: "absolute",
      right: 20,
      top: 20,
      padding: "10px 16px",
      border: "2px solid #0b3d91",
      background: "#e9f0ff",
      color: "#0b3d91",
      fontWeight: 800,
      borderRadius: 10,
      transform: "rotate(8deg)",
    }}
  >
    SOLD
  </div>
)}

              {/* ASSET HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2 style={{ marginBottom: 6 }}>{asset.name}</h2>
                  <div>
                    <strong>Asset Code:</strong> {asset.code}
                  </div>
                  <div>
                    <strong>Status:</strong> {asset.status}
                  </div>
                  {asset.status === "SOLD" && !isOwner && (
  <div style={{ marginTop: 10, opacity: 0.85 }}>
    This item has sold.  
    If you hold a paired support NFT, please watch for a buyback offer from GLSDEFI.
  </div>
)}

                </div>

                <div style={{ textAlign: "right" }}>
                  {asset.hiddenValue ? (
                    <div>
                      <strong>Asset Value:</strong>{" "}
                      <span style={{ fontStyle: "italic", opacity: 0.8 }}>
                        To be auctioned
                      </span>
                    </div>
                  ) : (
                    <>
                      <div>
                        <strong>Asset Value:</strong> {money(asset.valueUsd)}
                      </div>
                      <div>
                        <strong>Per NFT (ref):</strong> {money(perNft)}
                      </div>
                    </>
                  )}

                  <div>
                    <strong>Total NFTs:</strong> {asset.totalNfts}
                  </div>
                  <div>
                    <strong>NFTs Shown:</strong> {assigned.length}
                  </div>
                  {asset.status === "SOLD" && isOwner && (
  <button
    className="wallet-btn"
    onClick={() =>
      setBuybackOffers((prev) => ({
        ...prev,
        [asset.code]: {
          priceUsd: asset.valueUsd * 0.1, // example
          status: "OPEN",
        },
      }))
    }
  >
    Create Buyback Offer
  </button>
)}

                </div>
              </div>

             {/* MIGRATION CONTROLS (OWNER ONLY) */}
{isOwner && (
  <div
    style={{
      marginTop: 12,
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    <span style={{ fontWeight: 700 }}>
      Migrate NFTs from {asset.code} →
    </span>

    {ASSETS_BRAVO.filter((a) => a.code !== asset.code).map(
      (target) => (
        <button
          key={target.code}
          className="wallet-btn"
          type="button"
          onClick={() => migrateAll(asset.code, target.code)}
        >
          {target.code}
        </button>
      )
    )}
  </div>
)}


              {/* NFT GALLERY */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                  marginTop: 14,
                }}
              >
                {assigned.length === 0 ? (
                  <div style={{ opacity: 0.75 }}>
                    No NFTs currently assigned to this item.
                  </div>
                ) : (
                  assigned.map((nft) => (
                    <div
                      key={nft.tokenId}
                      style={{
                        border: "1px solid rgba(0,0,0,0.12)",
                        borderRadius: 12,
                        overflow: "hidden",
                        background: "#fff",
                      }}
                    >
                      <img
                        src={nft.previewImage}
                        alt={nft.name}
                        onError={() =>
                          console.log("Image failed to load:", nft.previewImage)
                        }
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div style={{ padding: 12 }}>
                        <div style={{ fontWeight: 800 }}>{nft.name}</div>
                        <div style={{ opacity: 0.8, marginTop: 4 }}>
                          Token ID: {nft.tokenId}
                        </div>
                        {asset.status === "SOLD" &&
  buybackOffers[asset.code]?.status === "OPEN" && (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        background: "#e9f0ff",
        border: "1px solid #0b3d91",
      }}
    >
      <strong>Buyback Offer:</strong>{" "}
      {money(buybackOffers[asset.code].priceUsd)}
      <div style={{ marginTop: 6 }}>
        <button className="wallet-btn secondary">
          Accept Offer
        </button>
      </div>
    </div>
)}

                       {/* MOVE SINGLE NFT (OWNER ONLY) */}
{isOwner && (
  <div style={{ marginTop: 10 }}>
    <strong>Reassign to:</strong>{" "}
    {ASSETS_BRAVO
      .filter((a) => a.code !== assignment[nft.tokenId])
      .map((target) => (
        <button
          key={target.code}
          className="wallet-btn secondary"
          type="button"
          style={{ marginLeft: 6, marginTop: 6 }}
          onClick={() => migrateOne(nft.tokenId, target.code)}
        >
          Move → {target.code}
        </button>
      ))}
  </div>
)}

                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </Container>
    </div>
  );
}
