import React from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../components/BrandLogo";
import "./Disclaimer.css";

/**
 * GLSDefi — Disclosure, Membership, Pairing & Risk Information
 *
 * IMPORTANT ARCHITECTURAL PRINCIPLE
 * ---------------------------------
 * GLSDefi membership NFTs may be associated with registered asset records
 * through PAIR or CO-PAIR functionality.
 *
 * A PAIR or CO-PAIR is an association record only.
 *
 * It does NOT create:
 * - legal ownership
 * - beneficial ownership
 * - fractional ownership
 * - an interest in property
 * - a security interest
 * - rights to income
 * - rights to rent
 * - rights to profit
 * - rights to dividends
 * - rights to appreciation
 * - rights to sale proceeds
 * - redemption rights
 * - collateral rights
 *
 * Standard Pair/Co-Pair relationships are classified:
 *
 * ER-0 — NO ECONOMIC INTEREST
 *
 * Legal review should be obtained before production release or before
 * introducing any functionality that changes these rights.
 */

export default function Disclaimer() {
  const navigate = useNavigate();
  const BRAND = "#0b3d91";
  const LAST_UPDATED = "6 Sep 2026";

  return (
    <div className="disclaimer-page">
      <Container>
         <BrandLogo />
         <div className="disclaimer-content">
        <h1 className="disclaimer-title">
          GLSDefi — Disclosure, Membership, Pairing &amp; Risk Information
        </h1>

        {LAST_UPDATED ? (
          <p
            style={{
              marginTop: 0,
              opacity: 0.8,
            }}
          >
            <em>Last updated: {LAST_UPDATED}</em>
          </p>
        ) : null}

        {/* GENERAL INFORMATION */}

        <h3 style={{ color: BRAND }}>General information</h3>

        <p>
          This page provides general information about{" "}
          <strong>GLSDefi membership NFTs</strong>, GLSDefi{" "}
          <strong>Pair</strong> and <strong>Co-Pair</strong> functionality,
          registered asset records, and related functionality within the
          GLSDefi ecosystem.
        </p>

        <p>
          GLSDefi is an <strong>early-stage project</strong>. Features,
          technical architecture, services, presentation, and functionality
          may change as development progresses and as legal, regulatory,
          security, and technical requirements are reviewed.
        </p>

        <p>
          Nothing on this website or any associated GLSDefi platform
          constitutes <strong>financial, legal, tax, or investment advice</strong>.
        </p>

        {/* NATURE OF NFT */}

        <h3 style={{ color: BRAND }}>
          Nature of GLSDefi membership NFTs
        </h3>

        <p>
          GLSDefi NFTs are digital blockchain-based tokens intended to provide
          membership, access, identification, verification, community, and
          other defined utility within the GLSDefi ecosystem.
        </p>

        <p>
          GLSDefi membership NFTs are{" "}
          <strong>not designed or offered as interests in real-world assets</strong>.
          Acquiring or holding a GLSDefi membership NFT does not, merely by
          reason of holding that NFT, provide the holder with ownership of any
          real-world asset.
        </p>

        <p>Unless expressly established under a separate written legal agreement:</p>

        <ul>
          <li>
            an NFT does <strong>not</strong> represent legal title to an asset;
          </li>

          <li>
            an NFT does <strong>not</strong> represent beneficial ownership
            of an asset;
          </li>

          <li>
            an NFT does <strong>not</strong> represent fractional ownership
            of an asset;
          </li>

          <li>
            an NFT does <strong>not</strong> create an interest in property;
          </li>

          <li>
            an NFT does <strong>not</strong> provide equity in GLSDefi or
            another entity;
          </li>

          <li>
            an NFT does <strong>not</strong> provide a right to profits,
            dividends, rent, interest, distributions, or income;
          </li>

          <li>
            an NFT does <strong>not</strong> provide a right to the increase
            in value of a paired asset;
          </li>

          <li>
            an NFT does <strong>not</strong> provide a right to proceeds from
            the sale, disposal, insurance, liquidation, or refinancing of a
            paired asset;
          </li>

          <li>
            an NFT does <strong>not</strong> create a mortgage, charge, lien,
            security interest, or collateral interest over a paired asset;
          </li>

          <li>
            an NFT does <strong>not</strong> give its holder a right to redeem
            the NFT for a paired asset or any proportion of that asset; and
          </li>

          <li>
            GLSDefi does not intend or design its standard membership NFTs,
            Pair relationships, or Co-Pair relationships to operate as
            investments or financial interests in paired assets.
          </li>
        </ul>

        {/* PAIR */}

        <h3 style={{ color: BRAND }}>
          Pair — Asset Association
        </h3>

        <p>
          <strong>Pair</strong> means the authorised creation of a digital
          association between an eligible GLSDefi membership credential and a
          registered GLSDefi asset record.
        </p>

        <p>
          A Pair records that a particular membership credential has an
          authorised relationship with a particular asset record.
        </p>

        <p>
          <strong>
            Pairing is an association mechanism only. Pairing is not ownership.
          </strong>
        </p>

        <p>
          A Pair does not transfer, create, divide, assign, register, or
          evidence legal or beneficial ownership of the associated asset.
          The existence of a Pair must not be interpreted as proof that the
          NFT holder owns the asset.
        </p>

        <p>
          A Pair may provide functionality such as:
        </p>

        <ul>
          <li>displaying an asset record within a member account;</li>
          <li>verifying that an authorised association exists;</li>
          <li>maintaining a history of that association;</li>
          <li>providing cryptographic verification of the association;</li>
          <li>providing access to permitted GLSDefi services; and</li>
          <li>allowing the association to be suspended, revoked, or removed.</li>
        </ul>

        {/* CO-PAIR */}

        <h3 style={{ color: BRAND }}>
          Co-Pair — Multi-Member Asset Association
        </h3>

        <p>
          <strong>Co-Pair</strong> means that two or more independently
          eligible GLSDefi membership credentials have each been authorised
          to maintain an association with the same registered asset record.
        </p>

        <p>
          Co-Pairing does <strong>not</strong> divide an asset between the
          participating members and does <strong>not</strong> establish
          percentages, units, shares, fractions, or proportional ownership
          interests in that asset.
        </p>

        <p>
          For example, two membership NFTs may both be Co-Paired with the same
          registered asset record. This means only that two authorised
          associations exist.
        </p>

        <p>
          It does <strong>not</strong> mean that each holder owns 50% of the
          asset, or any other percentage of the asset.
        </p>

        {/* ER-0 */}

        <h3 style={{ color: BRAND }}>
          ER-0 — No Economic Interest
        </h3>

        <p>
          Unless expressly stated otherwise under a separately documented and
          legally reviewed arrangement, every standard GLSDefi Pair and
          Co-Pair relationship is classified:
        </p>

        <p
          style={{
            fontWeight: "bold",
            fontSize: "1.1rem",
          }}
        >
          ER-0 — NO ECONOMIC INTEREST
        </p>

        <p>
          ER-0 means that the Pair or Co-Pair relationship does not itself
          provide the member with any economic participation in the associated
          asset.
        </p>

        <ul>
          <li>No ownership entitlement.</li>
          <li>No fractional ownership entitlement.</li>
          <li>No beneficial interest.</li>
          <li>No entitlement to rent or income.</li>
          <li>No entitlement to profits or distributions.</li>
          <li>No entitlement to asset appreciation.</li>
          <li>No entitlement to sale proceeds.</li>
          <li>No redemption entitlement.</li>
          <li>No collateral or security interest.</li>
          <li>No guaranteed repurchase entitlement.</li>
        </ul>

        {/* UNDERLYING OWNERSHIP */}

        <h3 style={{ color: BRAND }}>
          Ownership exists independently of GLSDefi Pairing
        </h3>

        <p>
          Legal ownership of a real-world asset, where applicable, arises from
          the relevant external legal arrangements, records, contracts,
          registrations, laws, or other evidence governing that asset.
        </p>

        <p>
          GLSDefi Pair or Co-Pair records do not create that ownership.
        </p>

        <p>
          A person may independently own an asset and also Pair a membership
          credential with its GLSDefi asset record. In that situation,
          ownership exists independently of the Pair.
        </p>

        <p>
          Conversely, the existence of a Pair or Co-Pair does not establish
          that the member owns the asset.
        </p>

        {/* ASSET RECORD */}

        <h3 style={{ color: BRAND }}>
          Registered asset records
        </h3>

        <p>
          A GLSDefi asset record is a digital record used to identify,
          describe, reference, or verify information concerning an asset.
        </p>

        <p>
          Registration of an asset within GLSDefi does not itself establish
          legal ownership, authenticity, value, provenance, title, or an
          enforceable interest in that asset unless GLSDefi expressly states
          that a particular matter has been independently verified.
        </p>

        {/* TRANSFER */}

        <h3 style={{ color: BRAND }}>
          NFT transfers and existing Pair relationships
        </h3>

        <p>
          Transfer of a GLSDefi membership NFT does not automatically transfer
          legal ownership, beneficial ownership, or any economic interest in a
          real-world asset associated with that NFT.
        </p>

        <p>
          GLSDefi may suspend or terminate an existing Pair or Co-Pair when
          ownership or control of the relevant membership NFT changes.
        </p>

        <p>
          A new token holder may be required to satisfy identity, membership,
          authority, eligibility, consent, or verification requirements before
          a Pair or Co-Pair relationship is activated or reactivated.
        </p>

        {/* ASSET SALE */}

        <h3 style={{ color: BRAND }}>
          Sale or disposal of a paired asset
        </h3>

        <p>
          The sale, transfer, disposal, refinancing, insurance settlement,
          destruction, or other change affecting a paired asset does not give
          the NFT holder a right to receive any proceeds, profits,
          distributions, compensation, or other economic benefit arising from
          that event merely because the NFT was Paired or Co-Paired with the
          asset.
        </p>

        <p>
          GLSDefi may update, suspend, archive, or terminate a Pair or Co-Pair
          relationship where the status of the underlying asset changes.
        </p>

        {/* REPURCHASE */}

        <h3 style={{ color: BRAND }}>
          Discretionary NFT repurchase
        </h3>

        <p>
          GLSDefi may independently choose to offer to acquire a GLSDefi NFT
          from a holder. Any such offer is entirely discretionary unless a
          separate written agreement expressly provides otherwise.
        </p>

        <p>
          A discretionary repurchase offer is not a redemption right,
          guaranteed exit mechanism, investment return, or entitlement of the
          NFT holder.
        </p>

        <p>
          Importantly, the amount of any discretionary repurchase offer is not
          intended to represent or provide the holder with a share of the
          value, appreciation, income, profit, sale proceeds, or other
          economic performance of a Paired or Co-Paired asset.
        </p>

        <p>
          Holders should not acquire or retain a GLSDefi NFT in expectation
          that GLSDefi will repurchase it.
        </p>

        {/* NO INVESTMENT EXPECTATION */}

        <h3 style={{ color: BRAND }}>
          No promise of financial return
        </h3>

        <p>
          GLSDefi does not promise that a membership NFT will increase in
          market value and does not guarantee that a secondary market will
          exist.
        </p>

        <p>
          GLSDefi does not undertake to use the purchase price of a membership
          NFT to generate a financial return for the NFT holder.
        </p>

        <p>
          Membership NFTs should be acquired for their stated membership,
          access, verification, community, or other defined utility and not
          on the basis of an expectation of profit generated by GLSDefi or by
          a Paired or Co-Paired asset.
        </p>

        {/* TECHNICAL RECORD */}

        <h3 style={{ color: BRAND }}>
          Blockchain and cryptographic records
        </h3>

        <p>
          Blockchain entries, smart-contract records, hashes, Merkle proofs,
          digital signatures, and other cryptographic mechanisms may be used
          to verify that particular GLSDefi records or associations exist or
          existed at a particular time.
        </p>

        <p>
          Cryptographic verification of a Pair or Co-Pair proves the relevant
          recorded association according to the GLSDefi system. It does not,
          by itself, prove legal title or beneficial ownership of the
          underlying real-world asset.
        </p>

        {/* KEY RISKS */}

        <h3 style={{ color: BRAND }}>Key risks</h3>

        <ul>
          <li>
            <strong>Value risk:</strong> A secondary-market price for an NFT,
            if one exists, may fluctuate substantially and may fall to zero.
          </li>

          <li>
            <strong>Liquidity risk:</strong> There may be no purchaser or
            secondary market available if a holder wishes to transfer an NFT.
          </li>

          <li>
            <strong>Technology risk:</strong> Smart contracts, wallets,
            applications, blockchain networks, and supporting infrastructure
            may fail, be attacked, exploited, unavailable, or behave
            unexpectedly.
          </li>

          <li>
            <strong>Network and fee risk:</strong> Blockchain transactions may
            rely upon third-party infrastructure and incur variable network
            fees.
          </li>

          <li>
            <strong>Regulatory risk:</strong> Laws and regulatory treatment of
            NFTs, blockchain systems, digital assets, and associated services
            may change.
          </li>

          <li>
            <strong>Association risk:</strong> Asset information may become
            outdated, disputed, incomplete, or inaccurate and a Pair or
            Co-Pair may therefore be suspended or revoked.
          </li>

          <li>
            <strong>No financial guarantee:</strong> GLSDefi does not
            guarantee market value, liquidity, appreciation, resale,
            repurchase, or financial return.
          </li>
        </ul>

        {/* USER RESPONSIBILITY */}

        <h3 style={{ color: BRAND }}>User responsibility</h3>

        <p>Users are responsible for:</p>

        <ul>
          <li>securing their wallets, credentials, and private keys;</li>

          <li>understanding relevant blockchain and NFT functionality;</li>

          <li>
            ensuring information supplied for an asset association is accurate
            and authorised;
          </li>

          <li>
            complying with applicable laws and contractual obligations; and
          </li>

          <li>
            making their own independent decision about acquiring or using a
            GLSDefi membership NFT.
          </li>
        </ul>

        {/* INDEPENDENT ADVICE */}

        <h3 style={{ color: BRAND }}>Independent advice</h3>

        <p>
          Users should obtain independent professional advice where
          appropriate before acquiring NFTs, entering arrangements concerning
          valuable assets, or relying upon blockchain-based records.
        </p>

        {/* ASPIRATIONAL */}

        <h3 style={{ color: BRAND }}>Aspirational statements</h3>

        <p>
          Statements concerning future functionality, development goals,
          proposed services, values, or project philosophy are{" "}
          <strong>aspirational unless expressly incorporated into a binding agreement</strong>.
        </p>

        <p>
          Such statements do not themselves create ownership, financial,
          investment, repayment, redemption, or profit rights.
        </p>

        {/* REGULATORY CLASSIFICATION */}

        <h3 style={{ color: BRAND }}>
          Regulatory classification
        </h3>

        <p>
          Digital assets and arrangements involving digital assets may be
          subject to different legal and regulatory requirements depending on
          their actual rights, benefits, functionality, marketing, and manner
          of operation.
        </p>

        <p>
          Nothing in this disclosure should be interpreted as a representation
          by GLSDefi that terminology alone determines the legal or regulatory
          classification of a digital asset or associated arrangement.
        </p>

        {/* UPDATES */}

        <h3 style={{ color: BRAND }}>Contact &amp; updates</h3>

        <p>
          This disclosure may be updated to reflect changes to GLSDefi
          functionality, technical architecture, legal requirements, or
          regulatory developments.
        </p>

        <p>
          Where a material change would alter the rights associated with an
          existing membership NFT, Pair, or Co-Pair, GLSDefi may provide
          additional terms, notices, or obtain consent where required.
        </p>

        <hr />

        <p style={{ marginBottom: 6 }}>
          <strong>Core principle:</strong>{" "}
          A GLSDefi Pair or Co-Pair records an authorised association.
          It does not create ownership of the associated asset.
        </p>

        <p style={{ marginBottom: 6 }}>
          <strong>Standard economic-rights classification:</strong>{" "}
          ER-0 — No Economic Interest.
        </p>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 12,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: BRAND,
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
        </div>
      </Container>
    </div>
  );
}