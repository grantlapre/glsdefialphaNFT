// src/pages/BravoAssetPairs.js

import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { ASSETS_BRAVO } from "../data/assets.bravo";
import {
  NFTS_BRAVO,
  INITIAL_ASSIGNMENT_BRAVO,
} from "../data/nfts.bravo";
import "./AssetPairs.css";

/**
 * GLSDefi Bravo — Membership Pair / Co-Pair Registry
 *
 * Pair and Co-Pair are association mechanisms only.
 *
 * They do NOT create or represent:
 * - legal ownership
 * - beneficial ownership
 * - fractional ownership
 * - equity
 * - security interests
 * - income rights
 * - profit rights
 * - appreciation rights
 * - sale-proceeds rights
 * - redemption rights
 * - collateral rights
 *
 * Standard associations are classified:
 *
 * ER-0 — NO ECONOMIC INTEREST
 */

// Administrative wallet only.
// This does NOT mean ownership of any registered item.
const ADMIN_ADDRESS =
  "0x1c62cA762121F15ae516A70cc55e5870e48eFa19".toLowerCase();

export default function BravoAssetPairs() {
  // Temporary account placeholder.
  // Later replace with connected wallet address.
  const [account] = useState("0xPUBLIC_VIEWER");

  const isAdmin =
    account.toLowerCase() === ADMIN_ADDRESS;

  /**
   * Existing INITIAL_ASSIGNMENT_BRAVO is retained
   * so you do not need to rewrite your data file yet.
   *
   * In this component it is treated as an association map,
   * not as ownership assignment.
   */
  const [pairings, setPairings] =
    useState(INITIAL_ASSIGNMENT_BRAVO);

  /**
   * Association lifecycle:
   * PENDING
   * ACTIVE
   * SUSPENDED
   * ARCHIVED
   */
  const [pairingStatus, setPairingStatus] =
    useState(() => {
      const initial = {};

      for (const nft of NFTS_BRAVO) {
        initial[nft.tokenId] = "ACTIVE";
      }

      return initial;
    });

  /**
   * Group membership NFTs by registered item association.
   */
  const nftsByAsset = useMemo(() => {
    const grouped = {};

    for (const nft of NFTS_BRAVO) {
      const code = pairings[nft.tokenId];

      if (!code) continue;

      if (!grouped[code]) {
        grouped[code] = [];
      }

      grouped[code].push(nft);
    }

    return grouped;
  }, [pairings]);

  /**
   * If one credential is associated with an item:
   * PAIR
   *
   * If two or more credentials are independently associated:
   * CO-PAIR
   */
  function getAssociationType(assetCode) {
    const associated =
      nftsByAsset[assetCode] || [];

    return associated.length > 1
      ? "CO-PAIR"
      : "PAIR";
  }

  /**
   * Re-Pair every membership credential associated with
   * one registered item to another registered item.
   *
   * This changes association records only.
   */
  function rePairAll(fromCode, toCode) {
    setPairings((previous) => {
      const next = { ...previous };

      for (const [tokenId, code] of Object.entries(previous)) {
        if (code === fromCode) {
          next[tokenId] = toCode;
        }
      }

      return next;
    });

    setPairingStatus((previous) => {
      const next = { ...previous };

      for (const [tokenId, code] of Object.entries(pairings)) {
        if (code === fromCode) {
          next[tokenId] = "ACTIVE";
        }
      }

      return next;
    });
  }

  /**
   * Re-Pair one membership credential.
   */
  function rePairOne(tokenId, toCode) {
    setPairings((previous) => ({
      ...previous,
      [tokenId]: toCode,
    }));

    setPairingStatus((previous) => ({
      ...previous,
      [tokenId]: "ACTIVE",
    }));
  }

  /**
   * Suspend an association.
   */
  function suspendPairing(tokenId) {
    setPairingStatus((previous) => ({
      ...previous,
      [tokenId]: "SUSPENDED",
    }));
  }

  /**
   * Archive an association.
   */
  function archivePairing(tokenId) {
    setPairingStatus((previous) => ({
      ...previous,
      [tokenId]: "ARCHIVED",
    }));
  }

  return (
    <div className="pair-page">
      <Container
        style={{
          maxWidth: 1100,
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >
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

          <Link
            to="/bravo/marketplace"
            className="App-link"
          >
            Bravo Marketplace
          </Link>

          <Link
            to="/disclaimer"
            className="App-link"
          >
            Disclosure &amp; Risk Information
          </Link>

          <span
            style={{
              fontWeight: 700,
              opacity: 0.8,
            }}
          >
            Bravo Membership Pair / Co-Pair Registry
          </span>
        </div>

        {/* PAGE HEADER */}
        <h1
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          GLSDefi Bravo — Membership Pair / Co-Pair Associations
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: 0.85,
            maxWidth: 850,
            margin: "0 auto 22px",
          }}
        >
          GLSDefi Bravo membership credentials may maintain
          authorised Pair or Co-Pair associations with registered
          item records. These associations are membership and
          verification functions only.
        </p>

        {/* ER-0 NOTICE */}
        <div className="pair-notice">
          <div
            style={{
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Pair / Co-Pair Association Notice
          </div>

          <p
            style={{
              marginTop: 0,
              marginBottom: 8,
            }}
          >
            Pair and Co-Pair are membership association mechanisms
            only. They do not create or represent legal ownership,
            beneficial ownership, fractional ownership, equity,
            security interests, income rights, profit rights,
            appreciation rights, sale-proceeds rights, redemption
            rights, or collateral rights in a registered item.
          </p>

          <div
            style={{
              fontWeight: 800,
            }}
          >
            Economic Rights Classification: ER-0 — No Economic Interest
          </div>

          <div
            style={{
              marginTop: 10,
            }}
          >
            <Link to="/disclaimer">
              Read the full Disclosure, Pair/Co-Pair and Risk Information
            </Link>
          </div>
        </div>

        {/* REGISTERED ITEM SECTIONS */}
        {ASSETS_BRAVO.map((asset) => {
          const associatedNfts =
            nftsByAsset[asset.code] || [];

          const associationType =
            getAssociationType(asset.code);

          return (
            <section
              key={asset.code}
              className="pair-card"
              style={{
                marginBottom: 28,
                position: "relative",
              }}
            >
              {/* SOLD STATUS */}
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
                  ITEM SOLD
                </div>
              )}

              {/* REGISTERED ITEM HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <h2
                    style={{
                      marginBottom: 6,
                    }}
                  >
                    {asset.name}
                  </h2>

                  <div>
                    <strong>
                      Registered Item Code:
                    </strong>
                    {" "}
                    {asset.code}
                  </div>

                  <div>
                    <strong>Status:</strong>
                    {" "}
                    {asset.status}
                  </div>

                  <div>
                    <strong>
                      Association Type:
                    </strong>
                    {" "}
                    {associationType}
                  </div>

                  <div>
                    <strong>
                      Rights Classification:
                    </strong>
                    {" "}
                    ER-0
                  </div>

                  {asset.status === "SOLD" && (
                    <div
                      style={{
                        marginTop: 10,
                        opacity: 0.85,
                        maxWidth: 650,
                      }}
                    >
                      This registered item is no longer active for
                      new Pair or Co-Pair associations. Existing
                      associations may be suspended or archived.
                      Eligible GLSDefi members may later request
                      a new association with another available
                      registered item.
                    </div>
                  )}
                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <div>
                    <strong>
                      Active Membership Associations:
                    </strong>
                    {" "}
                    {associatedNfts.length}
                  </div>

                  <div>
                    <strong>
                      Ownership Represented:
                    </strong>
                    {" "}
                    No
                  </div>

                  <div>
                    <strong>
                      Economic Interest:
                    </strong>
                    {" "}
                    None
                  </div>
                </div>
              </div>

              {/* ADMIN RE-PAIR ALL */}
              {isAdmin &&
                associatedNfts.length > 0 && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 12,
                      borderTop:
                        "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      Administrator Association Controls
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 700,
                        }}
                      >
                        Re-Pair all from {asset.code} →
                      </span>

                      {ASSETS_BRAVO
                        .filter(
                          (target) =>
                            target.code !== asset.code &&
                            target.status !== "SOLD"
                        )
                        .map((target) => (
                          <button
                            key={target.code}
                            className="wallet-btn"
                            type="button"
                            onClick={() =>
                              rePairAll(
                                asset.code,
                                target.code
                              )
                            }
                          >
                            {target.code}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

              {/* MEMBERSHIP NFT GALLERY */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                  marginTop: 14,
                }}
              >
                {associatedNfts.length === 0 ? (
                  <div
                    style={{
                      opacity: 0.75,
                    }}
                  >
                    No membership credentials are currently
                    associated with this registered item.
                  </div>
                ) : (
                  associatedNfts.map((nft) => {
                    const status =
                      pairingStatus[nft.tokenId] ||
                      "ACTIVE";

                    return (
                      <div
                        key={nft.tokenId}
                        className="pair-card"
                        style={{
                          overflow: "hidden",
                          padding: 0,
                        }}
                      >
                        <img
                          src={nft.previewImage}
                          alt={nft.name}
                          onError={() =>
                            console.log(
                              "Image failed to load:",
                              nft.previewImage
                            )
                          }
                          style={{
                            width: "100%",
                            height: 220,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        <div
                          style={{
                            padding: 12,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: 800,
                            }}
                          >
                            {nft.name}
                          </div>

                          <div
                            style={{
                              opacity: 0.8,
                              marginTop: 4,
                            }}
                          >
                            Token ID: {nft.tokenId}
                          </div>

                          {/* ASSOCIATION DETAILS */}
                          <div
                            style={{
                              opacity: 0.85,
                              marginTop: 8,
                              lineHeight: 1.6,
                            }}
                          >
                            <div>
                              <strong>
                                Association:
                              </strong>
                              {" "}
                              {associationType}
                            </div>

                            <div>
                              <strong>
                                Registered Item:
                              </strong>
                              {" "}
                              {pairings[nft.tokenId]}
                            </div>

                            <div>
                              <strong>
                                Pair Status:
                              </strong>
                              {" "}
                              {status}
                            </div>

                            <div>
                              <strong>
                                Rights Class:
                              </strong>
                              {" "}
                              ER-0 — No Economic Interest
                            </div>

                            <div>
                              <strong>
                                Ownership Represented:
                              </strong>
                              {" "}
                              No
                            </div>

                            <div>
                              <strong>
                                Fractional Interest:
                              </strong>
                              {" "}
                              No
                            </div>

                            <div>
                              <strong>
                                Right to Asset Income:
                              </strong>
                              {" "}
                              No
                            </div>

                            <div>
                              <strong>
                                Right to Sale Proceeds:
                              </strong>
                              {" "}
                              No
                            </div>
                          </div>

                          {/* ADMIN SINGLE-PAIR CONTROLS */}
                          {isAdmin && (
                            <div
                              style={{
                                marginTop: 12,
                                paddingTop: 10,
                                borderTop:
                                  "1px solid rgba(0,0,0,0.08)",
                              }}
                            >
                              <div
                                style={{
                                  fontWeight: 700,
                                  fontSize: 13,
                                  marginBottom: 8,
                                }}
                              >
                                Association Controls
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  gap: 8,
                                  flexWrap: "wrap",
                                }}
                              >
                                {ASSETS_BRAVO
                                  .filter(
                                    (target) =>
                                      target.code !==
                                        pairings[nft.tokenId] &&
                                      target.status !==
                                        "SOLD"
                                  )
                                  .map((target) => (
                                    <button
                                      key={target.code}
                                      className="wallet-btn secondary"
                                      type="button"
                                      onClick={() =>
                                        rePairOne(
                                          nft.tokenId,
                                          target.code
                                        )
                                      }
                                    >
                                      Re-Pair →{" "}
                                      {target.code}
                                    </button>
                                  ))}

                                {status === "ACTIVE" && (
                                  <button
                                    className="wallet-btn secondary"
                                    type="button"
                                    onClick={() =>
                                      suspendPairing(
                                        nft.tokenId
                                      )
                                    }
                                  >
                                    Suspend Pair
                                  </button>
                                )}

                                {status !== "ARCHIVED" && (
                                  <button
                                    className="wallet-btn secondary"
                                    type="button"
                                    onClick={() =>
                                      archivePairing(
                                        nft.tokenId
                                      )
                                    }
                                  >
                                    Archive Pair
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          );
        })}

        {/* FINAL CLARIFICATION */}
        <div className="pair-clarification">
          <strong>
            Important clarification
          </strong>

          <p
            style={{
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            A GLSDefi Bravo Pair or Co-Pair record confirms only
            that an authorised membership association exists
            between a membership credential and a registered
            item record.
          </p>

          <p
            style={{
              marginBottom: 8,
            }}
          >
            It does not establish, transfer, divide, or prove
            legal title, beneficial ownership, fractional
            ownership, security interests, rights to income,
            rights to appreciation, rights to sale proceeds,
            or rights of redemption in relation to the
            registered item.
          </p>

          <strong>
            Standard classification: ER-0 — No Economic Interest
          </strong>

          <div
            style={{
              marginTop: 10,
            }}
          >
            <Link to="/disclaimer">
              View the complete GLSDefi Disclosure &amp; Risk Information
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
