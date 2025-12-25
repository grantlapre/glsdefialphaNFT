import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { ASSETS } from "../data/assets";
import "./GLSDefiMarket.css";

const GLSDEFI_CONTACT_EMAIL = "support@glsdefi.com"; // change if needed

export default function GLSDefiMarket() {
  const itemsForSale = ASSETS.filter((a) => a.forSale);

  // Push SOLD items to the bottom of the grid
  const sortedItems = [...itemsForSale].sort((a, b) => {
    const aSold = a.status === "SOLD" ? 1 : 0;
    const bSold = b.status === "SOLD" ? 1 : 0;
    return aSold - bSold;
  });

  const formatSoldDate = (raw) => {
    if (!raw) return "";
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
    }
    return String(raw);
  };

  const [photoIndex, setPhotoIndex] = useState({});

  const setIdx = (code, next) =>
    setPhotoIndex((prev) => ({ ...prev, [code]: next }));

  return (
    <div className="market-page">
      <Container>
        <h2 className="market-title">Items for Sale</h2>

        <div className="market-grid">
          {sortedItems.map((item) => {
            const imgs = item.images?.length ? item.images : [item.image];
            const idx = photoIndex[item.code] ?? 0;
            const safeIdx = Math.max(0, Math.min(idx, imgs.length - 1));

            const soldRaw =
              item.soldDate ||
              item.sold_on ||
              item.soldAt ||
              item.sold_at ||
              item.dateSold;

            const soldText = soldRaw ? formatSoldDate(soldRaw) : "";

            return (
              <div key={item.code} className="market-card">
                <div
                  className={`market-imgwrap ${
                    item.status === "SOLD" ? "sold" : ""
                  }`}
                >
                  <img
                    src={imgs[safeIdx]}
                    alt={`${item.name} photo ${safeIdx + 1}`}
                    className="market-img"
                  />

                  {/* SOLD overlay */}
                  {item.status === "SOLD" && (
                    <div className="sold-stamp">
                      <div className="sold-stamp-text">SOLD</div>
                      {soldText && (
                        <div className="sold-stamp-date">{soldText}</div>
                      )}
                    </div>
                  )}

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
                          <span
                            key={i}
                            className={`dot ${i === safeIdx ? "active" : ""}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        className="market-gallery-btn"
                        onClick={() =>
                          setIdx(item.code, (safeIdx + 1) % imgs.length)
                        }
                        aria-label="Next photo"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                <div className="market-body">
                  <div className="market-head">
                    <div className="market-name">{item.name}</div>
                    <div
                      className={`market-status ${
                        item.status === "SOLD" ? "sold" : "available"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>

                  <div className="market-meta">
                    <span>{item.code}</span>
                    <span>•</span>
                    <span>{item.location}</span>
                  </div>

                  <div className="market-desc">{item.shortDesc}</div>

                  {/* ACTIONS */}
                  <div className="market-actions">
                    {item.status === "SOLD" ? (
                      <div className="market-sold-wrap">
                        <div className="market-sold-msg">
                          This item has been sold
                          {soldText ? <> • {soldText}</> : null}
                        </div>

                        {/* Disabled "button" (anchor cannot truly be disabled) */}
                        <span className="market-email disabled" aria-disabled="true">
  Contact GLSDefi to Buy Outright
</span>
                      </div>
                    ) : (
<a className="market-email" href={`mailto:${GLSDEFI_CONTACT_EMAIL}?...`}>
  Contact GLSDefi to Buy Outright
</a>

                    )}
                  </div>

                  <div className="market-footnote">
                    {item.status === "SOLD"
                      ? "This listing is marked as SOLD. Contact GLSDefi for availability updates."
                      : "Settlement is handled directly by GLSDefi in a single transaction."}
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
