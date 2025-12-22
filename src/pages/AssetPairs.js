import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import { ASSETS } from "../data/assets";
import { NFTS, INITIAL_ASSIGNMENT } from "../data/nfts";

const money = (n) => n.toLocaleString(undefined, { style: "currency", currency: "USD" });

export default function AssetPairs() {
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

  // Migrates ALL NFTs currently assigned to fromCode -> toCode
  function migrateAll(fromCode, toCode) {
    setAssignment((prev) => {
      const next = { ...prev };
      for (const [tokenId, code] of Object.entries(prev)) {
        if (code === fromCode) next[tokenId] = toCode;
      }
      return next;
    });
  }

  // Migrates a single NFT tokenId -> toCode
  function migrateOne(tokenId, toCode) {
    setAssignment((prev) => ({ ...prev, [tokenId]: toCode }));
  }

  return (
    <div className="App">
      <Container style={{ paddingTop: 24, paddingBottom: 30 }}>
        <h1>Items ↔ NFT Pairing</h1>
        <p style={{ opacity: 0.85 }}>
          NFT Owners who opt to hold can be reassigned to a different items when an asset is sold.
        </p>

        {ASSETS.map((asset) => {
          const perNft = asset.valueUsd / asset.totalNfts;
          const assigned = nftsByAsset[asset.code] || [];

          return (
            <section
              key={asset.code}
              style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "#fff",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ margin: 0 }}>{asset.name}</h2>
                  <div style={{ marginTop: 6, opacity: 0.85 }}>
                    <strong>Asset Code:</strong> {asset.code} &nbsp;|&nbsp; <strong>Status:</strong> {asset.status}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div><strong>Value:</strong> {money(asset.valueUsd)}</div>
                  <div><strong>Total NFTs:</strong> {asset.totalNfts} (1/{asset.totalNfts})</div>
                  <div><strong>Per NFT (ref):</strong> {money(perNft)}</div>
                  <div><strong>Assigned NFTs on this page:</strong> {assigned.length}</div>
                </div>
              </div>

              {/* MIGRATION CONTROLS */}
              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontWeight: 700 }}>Migrate NFTs from {asset.code} →</span>

                {ASSETS.filter((a) => a.code !== asset.code).map((target) => (
                  <button
                    key={target.code}
                    className="wallet-btn"
                    type="button"
                    onClick={() => migrateAll(asset.code, target.code)}
                  >
                    {target.code}
                  </button>
                ))}
              </div>

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
                  <div style={{ opacity: 0.75 }}>No NFTs currently assigned to this item.</div>
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
                        style={{ width: "100%", height: 220, objectFit: "cover" }}
                      />
                      <div style={{ padding: 12 }}>
                        <div style={{ fontWeight: 700 }}>{nft.tokenId}</div>
                        <div style={{ opacity: 0.8, marginTop: 6 }}>
                          Currently paired to item: <strong>{assignment[nft.tokenId]}</strong>
                        </div>

                        {/* migrate one token */}
                        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {ASSETS.filter((a) => a.code !== assignment[nft.tokenId]).map((target) => (
                            <button
                              key={target.code}
                              className="wallet-btn secondary"
                              type="button"
                              onClick={() => migrateOne(nft.tokenId, target.code)}
                            >
                              Move to {target.code}
                            </button>
                          ))}
                        </div>
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
