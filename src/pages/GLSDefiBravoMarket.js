// src/pages/GLSDefiBravoMarket.js

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import "./GLSDefiMarket.css";
import { ASSETS_BRAVO } from "../data/assets.bravo";
import BrandLogo from "../components/BrandLogo";

/**
 * GLSDefi Bravo — Registered Item Marketplace
 *
 * STRUCTURAL PRINCIPLE
 * --------------------
 *
 * This page concerns the direct sale of registered real-world items.
 *
 * GLSDefi Bravo membership NFTs and Pair / Co-Pair associations
 * are separate from the legal sale or ownership of those items.
 *
 * Pair / Co-Pair does NOT create or represent:
 *
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
 * Standard Pair / Co-Pair associations are classified:
 *
 * ER-0 — NO ECONOMIC INTEREST
 */

const GLSDEFI_CONTACT_EMAIL = "glsdefi@glsdefi.com";

export default function GLSDefiBravoMarket() {
  /**
   * Keep SOLD items visible for historical marketplace display,
   * even if forSale has later been changed to false.
   */
  const registeredItems =
    ASSETS_BRAVO.filter(
      (asset) =>
        asset.forSale ||
        asset.status === "SOLD"
    );

  /**
   * Available items first.
   * Sold items are displayed at the bottom.
   */
  const sortedItems =
    [...registeredItems].sort((a, b) => {
      const aSold =
        a.status === "SOLD" ? 1 : 0;

      const bSold =
        b.status === "SOLD" ? 1 : 0;

      return aSold - bSold;
    });

  /**
   * Image gallery index for each registered item.
   */
  const [photoIndex, setPhotoIndex] =
    useState({});

  function setIdx(code, index) {
    setPhotoIndex((previous) => ({
      ...previous,
      [code]: index,
    }));
  }

  /**
   * Format sold dates when available.
   */
  function formatSoldDate(raw) {
    if (!raw) {
      return "";
    }

    const date = new Date(raw);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString(
        undefined,
        {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }
      );
    }

    return String(raw);
  }

  return (
    <div className="market-page">
      <Container
        style={{
          maxWidth: 1200,
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >
        {/* ===================================================== */}
        {/* NAVIGATION */}
        {/* ===================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginBottom: 26,
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            className="App-link"
          >
            Home
          </Link>

          <span
            style={{
              fontWeight: 700,
              opacity: 0.8,
            }}
          >
            Bravo Marketplace
          </span>

          <Link
            to="/bravo/asset-pairs"
            className="App-link"
          >
            Bravo Pair / Co-Pair Registry
          </Link>

          <Link
            to="/disclaimer"
            className="App-link"
          >
            Disclosure &amp; Risk Information
          </Link>
        </div>
        <BrandLogo />
        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                marginBottom: 6,
              }}
            >
              GLSDefi Bravo — Registered Items for Direct Sale
            </h1>

            <div
              style={{
                opacity: 0.85,
                maxWidth: 820,
              }}
            >
              Registered real-world items displayed on this page
              may be available for direct purchase independently
              of GLSDefi Bravo membership NFTs and Pair / Co-Pair
              associations.
            </div>
          </div>

          <div
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Link
              to="/bravo/asset-pairs"
              className="App-link"
            >
              View Bravo Pair / Co-Pair Registry
            </Link>
          </div>
        </div>

        {/* ===================================================== */}
        {/* DIRECT SALE / ER-0 NOTICE */}
        {/* ===================================================== */}

        <div className="market-notice">
          <div
            style={{
              fontWeight: 800,
              marginBottom: 8,
            }}
          >
            Direct Item Sale &amp; Membership Separation
          </div>

          <p
            style={{
              marginTop: 0,
              marginBottom: 8,
            }}
          >
            Items listed here are real-world registered items.
            Purchase of an item occurs through a separate direct
            sale process. Holding a GLSDefi Bravo membership NFT,
            or having a Pair or Co-Pair association with an item
            record, does not create or represent legal ownership,
            beneficial ownership, fractional ownership, security
            interests, income rights, appreciation rights,
            sale-proceeds rights, redemption rights, or collateral
            rights in the item.
          </p>

          <div
            style={{
              fontWeight: 800,
            }}
          >
            Membership Pair / Co-Pair Classification:
            {" "}
            ER-0 — No Economic Interest
          </div>

          <div
            style={{
              marginTop: 10,
            }}
          >
            <Link to="/disclaimer">
              Read the full GLSDefi Disclosure,
              Pair/Co-Pair and Risk Information
            </Link>
          </div>
        </div>

        {/* ===================================================== */}
        {/* MARKET GRID */}
        {/* ===================================================== */}

        <div className="market-grid">
          {sortedItems.map((item) => {
            const images =
              item.images?.length
                ? item.images
                : item.itemImage
                ? [item.itemImage]
                : [];

            const currentIndex =
              photoIndex[item.code] ?? 0;

            const safeIndex =
              images.length > 0
                ? Math.max(
                    0,
                    Math.min(
                      currentIndex,
                      images.length - 1
                    )
                  )
                : 0;

            const soldRaw =
              item.soldDate ||
              item.sold_on ||
              item.soldAt ||
              item.sold_at ||
              item.dateSold;

            const soldText =
              soldRaw
                ? formatSoldDate(soldRaw)
                : "";

            const isSold =
              item.status === "SOLD";

            /**
             * Direct purchase email.
             *
             * The wording expressly separates direct item purchase
             * from GLSDefi membership and Pair / Co-Pair.
             */
            const emailSubject =
              encodeURIComponent(
                `Direct Purchase Enquiry - Bravo Registered Item ${item.code}`
              );

            const emailBody =
              encodeURIComponent(
                [
                  "Hello GLSDefi,",
                  "",
                  "I would like information about the direct purchase of the following registered item:",
                  "",
                  `Item: ${item.name}`,
                  `Item Code: ${item.code}`,
                  "",
                  "I understand that direct ownership of this item is separate from GLSDefi Bravo membership NFTs and any Pair or Co-Pair association.",
                  "",
                  "Please advise the next steps for the direct purchase process.",
                  "",
                  "Regards,",
                ].join("\n")
              );

            const emailLink =
              `mailto:${GLSDEFI_CONTACT_EMAIL}` +
              `?subject=${emailSubject}` +
              `&body=${emailBody}`;

            return (
              <div
                key={item.code}
                className="market-card"
              >
                {/* ============================================= */}
                {/* IMAGE AREA */}
                {/* ============================================= */}

                <div
                  className={`market-imgwrap ${
                    isSold ? "sold" : ""
                  }`}
                >
                  {images.length > 0 ? (
                    <img
                      src={images[safeIndex]}
                      alt={`${item.name} photo ${
                        safeIndex + 1
                      }`}
                      className="market-img"
                    />
                  ) : (
                    <div
                      className="market-img"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 220,
                        background: "#f2f2f2",
                      }}
                    >
                      No image available
                    </div>
                  )}

                  {/* SOLD OVERLAY */}
                  {isSold && (
                    <div className="sold-stamp">
                      <div className="sold-stamp-text">
                        SOLD
                      </div>

                      {soldText && (
                        <div className="sold-stamp-date">
                          {soldText}
                        </div>
                      )}
                    </div>
                  )}

                  {/* GALLERY CONTROLS */}
                  {images.length > 1 && (
                    <div className="market-gallery-controls">
                      <button
                        type="button"
                        className="market-gallery-btn"
                        onClick={() =>
                          setIdx(
                            item.code,
                            (
                              safeIndex -
                              1 +
                              images.length
                            ) %
                              images.length
                          )
                        }
                        aria-label="Previous photo"
                      >
                        ‹
                      </button>

                      <div className="market-gallery-dots">
                        {images.map(
                          (_, imageIndex) => (
                            <button
                              key={imageIndex}
                              type="button"
                              className={`market-dot ${
                                imageIndex ===
                                safeIndex
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                setIdx(
                                  item.code,
                                  imageIndex
                                )
                              }
                              aria-label={`Photo ${
                                imageIndex + 1
                              }`}
                            />
                          )
                        )}
                      </div>

                      <button
                        type="button"
                        className="market-gallery-btn"
                        onClick={() =>
                          setIdx(
                            item.code,
                            (safeIndex + 1) %
                              images.length
                          )
                        }
                        aria-label="Next photo"
                      >
                        ›
                      </button>
                    </div>
                  )}

                  <div className="market-badge">
                    Registered Item Code:
                    {" "}
                    {item.code}
                  </div>
                </div>

                {/* ============================================= */}
                {/* CARD BODY */}
                {/* ============================================= */}

                <div className="market-body">
                  {/* ITEM NAME */}

                  <div className="market-title">
                    {item.name}
                  </div>

                  {/* STATUS */}

                  <div
                    style={{
                      marginTop: 6,
                      fontWeight: 700,
                    }}
                  >
                    Status:
                    {" "}
                    {item.status}
                  </div>

                  {/* ITEM META */}

                  <div className="market-meta">
                    {item.condition && (
                      <span>
                        {item.condition}
                      </span>
                    )}

                    {item.condition &&
                      item.location && (
                        <span>•</span>
                      )}

                    {item.location && (
                      <span>
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* DESCRIPTION */}

                  {item.shortDesc && (
                    <div className="market-desc">
                      {item.shortDesc}
                    </div>
                  )}

                  {/* =========================================== */}
                  {/* DIRECT PURCHASE NOTICE */}
                  {/* =========================================== */}

                  <div className="market-direct-sale">
                    <strong>
                      Direct Item Purchase
                    </strong>

                    <div
                      style={{
                        marginTop: 4,
                      }}
                    >
                      Any purchase of this registered
                      item is separate from GLSDefi
                      Bravo membership NFTs and any
                      Pair or Co-Pair association.
                    </div>
                  </div>

                  {/* =========================================== */}
                  {/* ACTIONS */}
                  {/* =========================================== */}

                  <div className="market-actions">
                    {isSold ? (
                      <div className="market-sold-wrap">
                        <div className="market-sold-msg">
                          This registered item has been sold
                          {soldText
                            ? <> • {soldText}</>
                            : null}
                        </div>

                        <span
                          className="market-email disabled"
                          aria-disabled="true"
                        >
                          Direct Item Purchase Unavailable
                        </span>
                      </div>
                    ) : (
                      <a
                        className="wallet-btn"
                        href={emailLink}
                      >
                        Contact GLSDefi About Direct Item Purchase
                      </a>
                    )}
                  </div>

                  {/* =========================================== */}
                  {/* ER-0 FOOTNOTE */}
                  {/* =========================================== */}

                  <div className="market-footnote">
                    {isSold ? (
                      <>
                        This registered item has been
                        sold. Its sale does not create
                        any payment, distribution,
                        redemption, ownership transfer,
                        appreciation entitlement or
                        sale-proceeds entitlement for
                        GLSDefi Bravo membership NFT
                        holders merely because of a
                        Pair or Co-Pair association.
                      </>
                    ) : (
                      <>
                        A GLSDefi Bravo membership NFT
                        may be associated with this
                        registered item for membership
                        and verification purposes only.
                        Any such Pair or Co-Pair
                        association is classified
                        ER-0 — No Economic Interest.
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                    }}
                  >
                    <Link to="/disclaimer">
                      Disclosure &amp; Pair/Co-Pair Terms
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================================================== */}
        {/* FINAL CLARIFICATION */}
        {/* ===================================================== */}

        <div className="market-clarification">
          <strong>
            Bravo Marketplace Clarification
          </strong>

          <p
            style={{
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            The Bravo marketplace concerns the direct sale of
            registered real-world items. Legal ownership of an
            item may arise only through a separate lawful sale,
            transfer or other applicable ownership arrangement.
          </p>

          <p
            style={{
              marginBottom: 8,
            }}
          >
            A GLSDefi Bravo membership NFT, Pair record or Co-Pair
            record does not by itself establish, transfer, divide,
            represent or prove ownership of a registered item.
          </p>

          <strong>
            Pair / Co-Pair Classification:
            {" "}
            ER-0 — No Economic Interest
          </strong>

          <div
            style={{
              marginTop: 10,
            }}
          >
            <Link to="/disclaimer">
              View the complete GLSDefi Disclosure
              &amp; Risk Information
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}