rewrite the entire marketplace.js file into a clean drop-in version, just as we did with both AssetPairs files.

Here is a clean drop-in rewrite for marketplace.js. It keeps the existing marketplace behaviour, photo gallery, sold sorting, email contact, and CSS classes, while strengthening the separation between direct item sale and GLSDefi membership / Pair / Co-Pair / ER-0.

// src/pages/marketplace.js

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { ASSETS } from "../data/assets";
import "./GLSDefiMarket.css";

/**
 * GLSDefi — Registered Item Marketplace
 *
 * IMPORTANT STRUCTURAL PRINCIPLE
 * ------------------------------
 *
 * This page concerns the direct sale of registered real-world items.
 *
 * GLSDefi membership NFTs and Pair / Co-Pair associations are
 * separate from the legal sale or ownership of these items.
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
 * Standard membership associations are classified:
 *
 * ER-0 — NO ECONOMIC INTEREST
 */

const GLSDEFI_CONTACT_EMAIL = "support@glsdefi.com";

export default function GLSDefiMarket() {
  /**
   * Only display registered items that are configured
   * for marketplace display.
   */
  const registeredItemsForSale =
    ASSETS.filter((asset) => asset.forSale);

  /**
   * Available items first.
   * Sold items appear at the bottom.
   */
  const sortedItems =
    [...registeredItemsForSale].sort((a, b) => {
      const aSold =
        a.status === "SOLD" ? 1 : 0;

      const bSold =
        b.status === "SOLD" ? 1 : 0;

      return aSold - bSold;
    });

  /**
   * Track currently displayed photograph for each item.
   */
  const [photoIndex, setPhotoIndex] =
    useState({});

  function setIdx(code, nextIndex) {
    setPhotoIndex((previous) => ({
      ...previous,
      [code]: nextIndex,
    }));
  }

  /**
   * Format an item's sold date when one is available.
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
          paddingTop: 30,
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
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <Link
            to="/"
            className="App-link"
          >
            Home
          </Link>

          <Link
            to="/alpha/asset-pairs"
            className="App-link"
          >
            Pair / Co-Pair Registry
          </Link>

          <Link
            to="/disclaimer"
            className="App-link"
          >
            Disclosure &amp; Risk Information
          </Link>
        </div>

        {/* ===================================================== */}
        {/* PAGE HEADER */}
        {/* ===================================================== */}

        <h2 className="market-title">
          Registered Items for Direct Sale
        </h2>

        <p
          style={{
            maxWidth: 850,
            margin: "0 auto 22px",
            textAlign: "center",
            opacity: 0.85,
          }}
        >
          This marketplace displays registered
          real-world items that may be available for
          direct purchase independently of GLSDefi
          membership NFTs.
        </p>

        {/* ===================================================== */}
        {/* MARKETPLACE / ER-0 NOTICE */}
        {/* ===================================================== */}

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto 30px",
            padding: 18,
            borderRadius: 12,
            background: "#f7f9fc",
            border:
              "1px solid rgba(11,61,145,0.25)",
          }}
        >
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
            Items on this page are offered as
            real-world items through a direct sale
            process. GLSDefi membership NFTs, Pair
            records and Co-Pair records do not
            represent legal ownership, beneficial
            ownership, fractional ownership, security
            interests, income rights, appreciation
            rights, sale-proceeds rights, redemption
            rights or collateral rights in these
            registered items.
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
        {/* MARKETPLACE GRID */}
        {/* ===================================================== */}

        <div className="market-grid">
          {sortedItems.map((item) => {
            /**
             * Allow either:
             *
             * item.images = [...]
             *
             * or fallback to:
             *
             * item.image
             */
            const images =
              item.images?.length
                ? item.images
                : item.image
                ? [item.image]
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

            /**
             * Support existing possible sold-date
             * property names.
             */
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
             * Email subject makes it clear this is
             * a direct real-world item purchase enquiry.
             */
            const emailSubject =
              encodeURIComponent(
                `Direct Item Purchase Enquiry - ${item.name}`
              );

            const emailBody =
              encodeURIComponent(
                [
                  "Hello GLSDefi,",
                  "",
                  `I would like information about the direct purchase of the following registered item:`,
                  "",
                  `Item: ${item.name}`,
                  `Item Code: ${item.code}`,
                  "",
                  "I understand that any GLSDefi membership NFT or Pair/Co-Pair association is separate from legal ownership of this item.",
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
                        alignItems: "center",
                        justifyContent: "center",
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

                  {/* IMAGE GALLERY CONTROLS */}
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
                            <span
                              key={imageIndex}
                              className={`dot ${
                                imageIndex ===
                                safeIndex
                                  ? "active"
                                  : ""
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
                </div>

                {/* ============================================= */}
                {/* CARD BODY */}
                {/* ============================================= */}

                <div className="market-body">
                  {/* HEADER */}

                  <div className="market-head">
                    <div className="market-name">
                      {item.name}
                    </div>

                    <div
                      className={`market-status ${
                        isSold
                          ? "sold"
                          : "available"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  {/* META INFORMATION */}

                  <div className="market-meta">
                    <span>
                      {item.code}
                    </span>

                    {item.location && (
                      <>
                        <span>•</span>
                        <span>
                          {item.location}
                        </span>
                      </>
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

                  <div
                    style={{
                      marginTop: 12,
                      padding: 10,
                      borderRadius: 8,
                      background: "#f7f9fc",
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    <strong>
                      Direct Item Purchase
                    </strong>

                    <div
                      style={{
                        marginTop: 4,
                      }}
                    >
                      Purchase of this registered
                      item is separate from GLSDefi
                      membership NFTs and any Pair or
                      Co-Pair association.
                    </div>
                  </div>

                  {/* =========================================== */}
                  {/* ACTIONS */}
                  {/* =========================================== */}

                  <div className="market-actions">
                    {isSold ? (
                      <div className="market-sold-wrap">
                        <div className="market-sold-msg">
                          This registered item has
                          been sold
                          {soldText
                            ? <> • {soldText}</>
                            : null}
                        </div>

                        <span
                          className="market-email disabled"
                          aria-disabled="true"
                        >
                          Direct Item Purchase
                          Unavailable
                        </span>
                      </div>
                    ) : (
                      <a
                        className="market-email"
                        href={emailLink}
                      >
                        Contact GLSDefi About Direct
                        Item Purchase
                      </a>
                    )}
                  </div>

                  {/* =========================================== */}
                  {/* ER-0 / SALE SEPARATION FOOTNOTE */}
                  {/* =========================================== */}

                  <div className="market-footnote">
                    {isSold
                      ? (
                        <>
                          This registered item has
                          been sold. The sale does
                          not create any payment,
                          distribution, redemption,
                          ownership transfer or
                          sale-proceeds entitlement
                          for GLSDefi membership NFT
                          holders merely because of
                          a Pair or Co-Pair
                          association.
                        </>
                      )
                      : (
                        <>
                          GLSDefi membership NFTs
                          may be associated with
                          this registered item for
                          membership and
                          verification purposes
                          only. Such association is
                          classified ER-0 — No
                          Economic Interest.
                        </>
                      )}
                  </div>

                  {/* DISCLOSURE LINK */}

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
        {/* FINAL MARKETPLACE CLARIFICATION */}
        {/* ===================================================== */}

        <div
          style={{
            marginTop: 32,
            padding: 18,
            borderRadius: 12,
            background: "#f7f9fc",
            border:
              "1px solid rgba(0,0,0,0.10)",
          }}
        >
          <strong>
            Marketplace clarification
          </strong>

          <p
            style={{
              marginTop: 8,
              marginBottom: 8,
            }}
          >
            This marketplace concerns the direct
            sale of registered real-world items.
            Ownership of an item may arise only
            through a separate lawful purchase,
            transfer or other applicable ownership
            arrangement.
          </p>

          <p
            style={{
              marginBottom: 8,
            }}
          >
            Holding a GLSDefi membership NFT, or
            having a Pair or Co-Pair association
            with an item record, does not by itself
            establish or transfer ownership of that
            item.
          </p>

          <strong>
            Pair / Co-Pair classification:
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