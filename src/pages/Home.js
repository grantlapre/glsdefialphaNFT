import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Header from "../components/Header";
import logo from "../logo.svg";

export default function Home() {
  return (
    <div className="App">
      <Header />

      {/* ===================================================== */}
      {/* INTRODUCTION */}
      {/* ===================================================== */}

      <section className="project-info">
        <Container>
          <h1 className="header">
            GLSDefi Membership Projects
          </h1>

          <p
            style={{
              opacity: 0.85,
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Welcome to GLSDefi. Alpha and Bravo provide GLSDefi
            membership NFTs with optional Pair / Co-Pair association
            functionality. Registered item marketplace listings operate
            separately from GLSDefi membership.
          </p>

          {/* MEMBERSHIP / ER-0 NOTICE */}
          <div
            style={{
              maxWidth: 900,
              margin: "22px auto 0",
              padding: 16,
              borderRadius: 12,
              background: "#f7f9fc",
              border: "1px solid rgba(11,61,145,0.25)",
              textAlign: "left",
            }}
          >
            <strong>
              Membership &amp; Pair / Co-Pair Notice
            </strong>

            <p
              style={{
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              GLSDefi membership NFTs are membership credentials.
              Pair and Co-Pair records are authorised associations
              between membership credentials and registered item
              records.
            </p>

            <p
              style={{
                marginBottom: 8,
              }}
            >
              Pair and Co-Pair associations do not create or represent
              legal ownership, beneficial ownership, fractional ownership,
              equity, security interests, income rights, profit rights,
              appreciation rights, sale-proceeds rights, redemption rights,
              or collateral rights in a registered item.
            </p>

            <strong>
              Standard Pair / Co-Pair Classification:
              {" "}
              ER-0 — No Economic Interest
            </strong>

            <div
              style={{
                marginTop: 10,
              }}
            >
              <Link to="/disclaimer">
                Read the GLSDefi Disclosure, Pair / Co-Pair and Risk Information
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================================================== */}
      {/* PROJECT OPTIONS */}
      {/* ===================================================== */}

      <section className="project-mint">
        <Container>
          {/* Rotating logo */}
          <div
            style={{
              marginBottom: 18,
            }}
          >
            <img
              src={logo}
              className="App-logo"
              alt="GLSDefi logo"
              style={{
                maxWidth: 140,
              }}
            />
          </div>

          <h3
            style={{
              marginBottom: 14,
            }}
          >
            Choose a Membership Project
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              maxWidth: 820,
              margin: "0 auto",
            }}
          >
            {/* ================================================= */}
            {/* ALPHA */}
            {/* ================================================= */}

            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: 18,
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  marginBottom: 8,
                }}
              >
                GLSDefi Alpha Project
              </h4>

              <div
                style={{
                  opacity: 0.85,
                  fontSize: 13,
                  marginBottom: 14,
                }}
              >
                Acquire an Alpha membership NFT using ETH,
                view authorised Pair / Co-Pair associations,
                and access separate registered item marketplace
                listings.
              </div>

              <Link
                className="wallet-btn"
                to="/alpha"
              >
                Enter Alpha
              </Link>

              <div
                className="project-nav"
                style={{
                  marginTop: 12,
                }}
              >
                <Link
                  className="App-link"
                  to="/alpha/marketplace"
                >
                  Registered Item Marketplace
                </Link>

                <Link
                  className="App-link"
                  to="/alpha/asset-pairs"
                >
                  Membership Pair / Co-Pair Registry
                </Link>
              </div>
            </div>

            {/* ================================================= */}
            {/* BRAVO */}
            {/* ================================================= */}

            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 14,
                padding: 18,
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  marginBottom: 8,
                }}
              >
                GLSDefi Bravo Project
              </h4>

              <div
                style={{
                  opacity: 0.85,
                  fontSize: 13,
                  marginBottom: 14,
                }}
              >
                Acquire a Bravo membership NFT using ETH,
                view authorised Pair / Co-Pair associations,
                and access separate registered item marketplace
                listings.
              </div>

              <Link
                className="wallet-btn"
                to="/bravo"
              >
                Enter Bravo
              </Link>

              <div
                className="project-nav"
                style={{
                  marginTop: 12,
                }}
              >
                <Link
                  className="App-link"
                  to="/bravo/marketplace"
                >
                  Registered Item Marketplace
                </Link>

                <Link
                  className="App-link"
                  to="/bravo/asset-pairs"
                >
                  Membership Pair / Co-Pair Registry
                </Link>
              </div>
            </div>
          </div>

          {/* ================================================= */}
          {/* FINAL SEPARATION NOTICE */}
          {/* ================================================= */}

          <div
            style={{
              maxWidth: 820,
              margin: "28px auto 0",
              padding: 14,
              borderRadius: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              textAlign: "left",
              fontSize: 13,
            }}
          >
            <strong>
              GLSDefi Structural Separation
            </strong>

            <div
              style={{
                marginTop: 6,
                opacity: 0.88,
              }}
            >
              Membership NFT ownership and Pair / Co-Pair
              associations are separate from the direct legal
              purchase or ownership of any registered real-world
              item.
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}