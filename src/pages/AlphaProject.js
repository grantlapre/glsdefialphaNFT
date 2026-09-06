import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Header from "../components/Header";
import Cards from "../components/cards";

import BrandLogo from "../components/BrandLogo";

const ALPHA_CONTRACT =
  "0xA63556e4442cF10EA1d1ABdE363F3FED64d6cff9";

export default function AlphaProject() {
  const [acceptedDisclosure, setAcceptedDisclosure] =
    useState(false);

  return (
    <div className="App">
      <Header />

      {/* ===================================================== */}
      {/* PROJECT INFORMATION */}
      {/* ===================================================== */}

      <section className="project-info">
        <Container>
        <BrandLogo />
          <h1 className="header">
            GLSDefi Alpha Project
          </h1>

          <p
            style={{
              opacity: 0.85,
              maxWidth: 900,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            Acquire a GLSDefi Alpha membership NFT and
            view authorised Pair / Co-Pair associations
            with registered item records. Direct item
            marketplace listings operate separately from
            GLSDefi membership.
          </p>

          {/* MEMBERSHIP CONTRACT */}

          <div
            className="contract-box"
            style={{
              marginTop: 12,
            }}
          >
            <strong>
              Alpha Membership NFT Contract Address:
            </strong>

            <div className="contract-address">
              {ALPHA_CONTRACT}
            </div>
          </div>

          {/* NAVIGATION */}

          <div className="project-nav">
            <Link
              className="App-link"
              to="/alpha/marketplace"
            >
              Alpha Registered Item Marketplace
            </Link>

            <Link
              className="App-link"
              to="/alpha/asset-pairs"
            >
              Alpha Membership Pair / Co-Pair Registry
            </Link>

            <Link
              className="App-link"
              to="/disclaimer"
            >
              Disclosure &amp; Risk Information
            </Link>

            <Link
              className="App-link"
              to="/"
            >
              Back to Home
            </Link>
          </div>
        </Container>
      </section>

      {/* ===================================================== */}
      {/* MEMBERSHIP NFT MINT SECTION */}
      {/* ===================================================== */}

      <section className="project-mint">
        <Container>
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
              marginBottom: 6,
            }}
          >
            Acquire Alpha Membership NFT
          </h3>

          <div
            style={{
              opacity: 0.85,
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            GLSDefi Alpha membership NFTs are minted
            using ETH through the Alpha membership NFT
            smart contract.
          </div>

          {/* ================================================= */}
          {/* MEMBERSHIP / ER-0 NOTICE */}
          {/* ================================================= */}

          <div
            style={{
              maxWidth: 850,
              margin: "18px auto",
              padding: 16,
              borderRadius: 12,
              background:
                "rgba(255,255,255,0.08)",
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
              A GLSDefi Alpha NFT is a membership
              credential. A Pair or Co-Pair association
              records an authorised relationship between
              that membership credential and a registered
              item record.
            </p>

            <p
              style={{
                marginBottom: 8,
              }}
            >
              Pair and Co-Pair associations do not create
              or represent legal ownership, beneficial
              ownership, fractional ownership, equity,
              security interests, income rights, profit
              rights, appreciation rights, sale-proceeds
              rights, redemption rights or collateral
              rights in a registered item.
            </p>

            <strong>
              Standard Pair / Co-Pair Classification:
              {" "}
              ER-0 — No Economic Interest
            </strong>
          </div>

          {/* ================================================= */}
          {/* DISCLOSURE ACCEPTANCE */}
          {/* ================================================= */}

          <div
            style={{
              maxWidth: 850,
              margin: "18px auto",
              textAlign: "left",
            }}
          >
            <label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <input
                type="checkbox"
                checked={acceptedDisclosure}
                onChange={(event) =>
                  setAcceptedDisclosure(
                    event.target.checked
                  )
                }
                style={{
                  marginTop: 5,
                }}
              />

              <span>
                I have read and accept the GLSDefi
                Disclosure and Pair / Co-Pair terms,
                and I acknowledge that standard Pair /
                Co-Pair associations are classified
                ER-0 — No Economic Interest.
              </span>
            </label>

            <p
              style={{
                marginTop: 10,
              }}
            >
              <Link to="/disclaimer">
                Read the Disclosure, Pair / Co-Pair
                and Risk Information
              </Link>
            </p>
          </div>

          {/* ================================================= */}
          {/* NFT MINT COMPONENT */}
          {/* ================================================= */}

          <div className="mint-center">
            <Cards
              project="alpha"
              acceptedDisclosure={
                acceptedDisclosure
              }
            />
          </div>
        </Container>
      </section>
    </div>
  );
}