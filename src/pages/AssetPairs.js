import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ASSETS } from "../data/assets";
import { NFTS, INITIAL_ASSIGNMENT } from "../data/nfts";


const OWNER_ADDRESS = "0x1c62cA762121F15ae516A70cc55e5870e48eFa19".toLowerCase();


const money = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });



export default function AssetPairs() {

    const [account] = useState("0xPUBLIC_VIEWER"); // later replace with wallet
    const isOwner = account.toLowerCase() === OWNER_ADDRESS;

    const [buybackOffers, setBuybackOffers] = useState({});

      
  const [assignment, setAssignment] = useState(INITIAL_ASSIGNMENT);

  const assetByCode = useMemo(() => {
    const map = {};
    for (const a of ASSETS) map[a.code] = a;
    return map;
  }, []);

  const nftsByAsset = useMemo(() => {
    const grouped = {};
    for (const nft of NFTS) {
      const code = assignment[nft.tokenId];
      if (!grouped[code]) grouped[code] = [];
      grouped[code].push(nft);
    }
    return grouped;
  }, [assignment]);

  // migrate ALL NFTs from one asset to another
  function migrateAll(fromCode, toCode) {
    setAssignment((prev) => {
      const next = { ...prev };
      for (const [tokenId, code] of Object.entries(prev)) {
        if (code === fromCode) next[tokenId] = toCode;
      }
      return next;
    });
  }

  // migrate a single NFT
  function migrateOne(tokenId, toCode) {
    setAssignment((prev) => ({ ...prev, [tokenId]: toCode }));
  }

  return (
    <div className="App">
      <Container style={{ paddingTop: 30, paddingBottom: 40 }}>

        {/* ===== NAVIGATION ===== */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          <Link to="/" className="App-link">
            Home
          </Link>

          <Link to="/marketplace" className="App-link">
            Marketplace
          </Link>

          <span style={{ fontWeight: 700, opacity: 0.8 }}>
            Asset ↔ NFT Pairing
          </span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <h1 style={{ textAlign: "center", marginBottom: 10 }}>
          Items ↔ NFT Pairing
        </h1>

        <p style={{ textAlign: "center", opacity: 0.85, marginBottom: 30 }}>
          NFT holders who opt to retain ownership may be reassigned to a different
          asset if a paired item is sold.
        </p>

        {/* ===== ASSET SECTIONS ===== */}
        {ASSETS.map((asset) => {
          const perNft = asset.valueUsd / asset.totalNfts;
          const assigned = nftsByAsset[asset.code] || [];

          return (
            <section
            
              
              key={asset.code}
              style={{
                marginBottom: 28,
                position: "relative",
                padding: 20,
                borderRadius: 14,
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
                    zIndex: 2,
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
                  gap: 20,
                  flexWrap: "wrap",
                }}
              >
                {/* LEFT */}
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

                {/* RIGHT */}
                <div>
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
                        <strong>Asset Value:</strong>{" "}
                        {money(asset.valueUsd)}
                      </div>
                      <div>
                        <strong>Per NFT (ref):</strong> {money(perNft)}
                      </div>
                    </>
                  )}

                  <div>
                    <strong>Capped NFTs:</strong> {asset.cappedSupply}
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

              {/* MIGRATE ALL */}
              {isOwner && (
  <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
    <span style={{ fontWeight: 700 }}>Migrate all NFTs →</span>
    {ASSETS.filter((a) => a.code !== asset.code).map((target) => (
      <button
        key={target.code}
        className="wallet-btn"
        onClick={() => migrateAll(asset.code, target.code)}
      >
        {target.code}
      </button>
    ))}
  </div>
)}

              {/* NFT GRID */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                  marginTop: 18,
                }}
              >
                {assigned.length === 0 ? (
                  <div style={{ opacity: 0.7 }}>
                    No NFTs currently paired with this asset.
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
                        alt={nft.tokenId}
                        style={{
                          width: "100%",
                          height: 220,
                          objectFit: "cover",
                        }}
                      />

                      <div style={{ padding: 12 }}>
                        <div style={{ fontWeight: 700 }}>
                          {nft.tokenId}
                        </div>

                        <div style={{ opacity: 0.8, marginTop: 6 }}>
                          Paired to:{" "}
                          <strong>
                            {assignment[nft.tokenId]}
                          </strong>
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
  <div
    style={{
      marginTop: 10,
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
    }}
  >
    {ASSETS.filter(
      (a) => a.code !== assignment[nft.tokenId]
    ).map((target) => (
      <button
        key={target.code}
        className="wallet-btn secondary"
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
