import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate, Link } from "react-router-dom";

/**
 * GLSDefi — Disclosure & Risk Information
 * Drop-in replacement for your existing disclosures page.
 *
 * Notes:
 * - Update LAST_UPDATED as needed (or set to null to hide the line).
 * - Adjust the "Back" link route if your app uses a different path.
 */
export default function Disclaimer() {
  const navigate = useNavigate();
  const BRAND = "#0b3d91";
  const LAST_UPDATED = "25 Dec 2025"; // <-- change to your preferred date (e.g., "1 Jan 2026") or set to null

  return (
    <div className="App">
      <Container style={{ maxWidth: 900, paddingTop: 24, paddingBottom: 40 }}>
        <h1 style={{ color: BRAND, marginBottom: 6 }}>
          GLSDefi — Disclosure &amp; Risk Information
        </h1>

        {LAST_UPDATED ? (
          <p style={{ marginTop: 0, opacity: 0.8 }}>
            <em>Last updated: {LAST_UPDATED}</em>
          </p>
        ) : null}

        <h3 style={{ color: BRAND }}>General information</h3>
        <p>
          This page provides general information about <strong>GLSDefi NFTs</strong> and related
          functionality. GLSDefi is an <strong>early-stage project</strong>, and features, structure,
          presentation, and direction may change as development progresses.
        </p>
        <p>
          Nothing on this website or associated platforms constitutes{" "}
          <strong>financial, legal, tax, or investment advice</strong>.
        </p>

        <h3 style={{ color: BRAND }}>Nature of GLSDefi NFTs</h3>
        <p>
          GLSDefi NFTs are <strong>digital blockchain-based tokens</strong> designed for
          informational, community, and access-related purposes within the GLSDefi ecosystem.
        </p>
        <p>Unless explicitly stated in separate written agreements:</p>
        <ul>
          <li>NFTs do <strong>not</strong> represent legal ownership of any asset.</li>
          <li>NFTs do <strong>not</strong> confer equity, profit rights, dividends, or income.</li>
          <li>
            NFTs do <strong>not</strong> constitute securities, financial products, or investments.
          </li>
        </ul>
        <p>
          Any described utility, association, or context is <strong>informational only</strong> and
          may evolve over time.
        </p>

        <h3 style={{ color: BRAND }}>Asset association &amp; optional offers</h3>
        <p>
          In some cases, GLSDefi may associate an NFT with an asset listing for display or
          contextual purposes.
        </p>
        <p>
          If a related asset is sold, GLSDefi may — at its <strong>sole discretion</strong> — choose
          to present an <strong>optional offer</strong> to purchase the NFT from its holder. Such
          offers are <strong>not guaranteed</strong>, may depend on market conditions and project
          considerations, and should not be expected or relied upon.
        </p>
        <p>
          NFT holders are under <strong>no obligation</strong> to accept any optional offer. If no
          offer is made or an offer is declined, the NFT remains owned by the holder and may later
          be associated with a different listing or context.
        </p>

        <h3 style={{ color: BRAND }}>Key risks</h3>
        <ul>
          <li>
            <strong>Market risk:</strong> NFTs are volatile and may lose value, including the full
            purchase price.
          </li>
          <li>
            <strong>Technology risk:</strong> Smart contracts, wallets, and blockchain networks may
            fail, be exploited, or behave unexpectedly.
          </li>
          <li>
            <strong>Network &amp; fee risk:</strong> Transactions depend on third-party
            infrastructure and may incur variable network fees.
          </li>
          <li>
            <strong>Regulatory risk:</strong> Laws and regulatory treatment of NFTs and digital
            assets may change and could impact availability, use, or transferability.
          </li>
          <li>
            <strong>No guarantees:</strong> Past performance or examples do not indicate future
            outcomes.
          </li>
        </ul>
        <p>No system is risk-free, and no guarantees are provided.</p>

        <h3 style={{ color: BRAND }}>User responsibility</h3>
        <p>You are responsible for:</p>
        <ul>
          <li>Securing your wallet and private keys.</li>
          <li>Understanding blockchain and NFT risks.</li>
          <li>Complying with applicable laws in your jurisdiction.</li>
          <li>Making your own independent decisions.</li>
        </ul>
        <p>
          Only participate using funds you can afford to lose.
        </p>

        <h3 style={{ color: BRAND }}>Independent advice</h3>
        <p>
          You should seek <strong>independent professional advice</strong> before acquiring any NFTs
          or interacting with blockchain-based systems.
        </p>

        <h3 style={{ color: BRAND }}>Aspirational statements</h3>
        <p>
          Any statements regarding goals, values, or philosophy are <strong>aspirational only</strong>{" "}
          and do not create contractual, financial, or legal obligations.
        </p>

        <h3 style={{ color: BRAND }}>Contact &amp; updates</h3>
        <p>
          This disclosure may be updated from time to time to reflect project evolution or
          regulatory considerations. Continued use of GLSDefi platforms indicates acceptance of the
          current version.
        </p>

        <hr />

        <p style={{ marginBottom: 6 }}>
          <strong>Closing note:</strong> GLSDefi is being built carefully, transparently, and
          iteratively. This disclosure exists to ensure clarity, not complexity.
        </p>

        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#0b3d91",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        </div>
      </Container>
    </div>
  );
}