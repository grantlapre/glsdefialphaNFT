import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function Disclaimer() {
  return (
    <div className="App">
      <Container style={{ maxWidth: 900, paddingTop: 24, paddingBottom: 40 }}>
        <h1 style={{ color: "#0b3d91" }}>GLSDefi — Disclaimer & Risk Notes</h1>

        <p>
          This page provides general information about GLSDefi NFTs and related
          functionality. It does not constitute financial, legal, or tax advice.
        </p>

        <h3 style={{ color: "#0b3d91" }}>Nature of GLSDefi NFTs</h3>
        <p>
          GLSDefi NFTs are digital blockchain-based tokens that may be displayed
          alongside asset listings for informational and community-support
          purposes. NFTs do not represent legal ownership, equity, profit rights,
          or entitlement to proceeds from any physical or real-world asset unless
          expressly stated in separate written agreements.
        </p>

        <h3 style={{ color: "#0b3d91" }}>Asset pairing & optional offers</h3>
        <p>
          In some cases, GLSDefi may associate an NFT with an asset listing for
          display purposes. If a related asset is sold, GLSDefi may, at its sole
          discretion, choose to present an optional offer to purchase the NFT
          back from its holder. Such offers are not guaranteed and may depend on
          market conditions and internal project considerations.
        </p>

        <p>
          NFT holders are under no obligation to accept any optional offer. If no
          offer is made or an offer is declined, the NFT remains owned by the
          holder and may later be associated with a different listing.
        </p>

        <h3 style={{ color: "#0b3d91" }}>Key risks</h3>
        <ul>
          <li>
            <strong>Market risk:</strong> NFTs are volatile and may lose value,
            including the full purchase price.
          </li>
          <li>
            <strong>Technology risk:</strong> Smart contracts, wallets, and
            blockchain networks may fail or be compromised.
          </li>
          <li>
            <strong>Network & fee risk:</strong> Blockchain transactions require
            network fees and depend on third-party infrastructure.
          </li>
          <li>
            <strong>No guarantees:</strong> Past performance does not indicate
            future results.
          </li>
        </ul>

        <h3 style={{ color: "#0b3d91" }}>Independent advice</h3>
        <p>
          You should seek independent professional advice before purchasing any
          NFTs. Only participate using funds you can afford to lose.
        </p>

        <hr />

        <p>
          <strong>Motto:</strong> “Help a seller today. Get thanked tomorrow.” —
          This phrase is aspirational only and does not create contractual or
          financial guarantees.
        </p>

        <div style={{ marginTop: 18 }}>
          <Link to="/marketplace" className="App-link">
            ← Back to Marketplace
          </Link>
        </div>
      </Container>
    </div>
  );
}
