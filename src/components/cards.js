/* global BigInt */


import React, { useEffect, useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import { ethers } from "ethers";

import Amount from "./amount";
import PixelateImage from "./pixelateImage";

import alphaAbi from "../abi/alphaAbi.json";
import bravoAbi from "../abi/bravoAbi.json";
import { CONTRACTS } from "../config/contracts";
import { MINT_IMAGES_ALPHA } from "../data/mintImages.alpha";
import { MINT_IMAGES_BRAVO } from "../data/mintImages.bravo";


function Cards({ project = "alpha" }) {
  const [account, setAccount] = useState("");
  const [mintPriceWei, setMintPriceWei] = useState(null);
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [minting, setMinting] = useState(false);
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);

  const hasProvider = typeof window !== "undefined" && !!window.ethereum;

  const contractMeta = useMemo(() => {
    const safeProject = project === "bravo" ? "bravo" : "alpha";
    const abi = safeProject === "bravo" ? bravoAbi : alphaAbi;
    const address = CONTRACTS?.[safeProject]?.address;
    return { abi, address, project: safeProject };
  }, [project]);

  async function connectWallet() {
    setError("");
    if (!hasProvider) {
      setError("MetaMask not detected. Please install MetaMask to continue.");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts?.[0] || "");
  }

  async function fetchMintPrice() {
    setError("");
    if (!hasProvider) return;
    if (!contractMeta.address) {
      setError("Contract address is missing for this project.");
      return;
    }

    try {
      setLoadingPrice(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        contractMeta.address,
        contractMeta.abi,
        provider
      );
      const price = await contract.mintPrice();
      setMintPriceWei(price);
    } catch (e) {
      setError(e?.reason || e?.message || "Failed to load mint price.");
    } finally {
      setLoadingPrice(false);
    }
  }

  useEffect(() => {
    fetchMintPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractMeta.address, contractMeta.project]);

  useEffect(() => {
    if (!hasProvider) return;

    const handleAccountsChanged = (accounts) => {
      setAccount(accounts?.[0] || "");
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [hasProvider]);

  async function mint() {
    setError("");

    if (!hasProvider) {
      setError("MetaMask not detected.");
      return;
    }

    if (!contractMeta.address) {
      setError("Contract address is missing for this project.");
      return;
    }

    // Ensure wallet connected
    if (!account) {
      await connectWallet();
      // If user rejected connect, stop
      const selected = window.ethereum?.selectedAddress;
      if (!selected) return;
    }

    try {
      setMinting(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractMeta.address,
        contractMeta.abi,
        signer
      );

      // Refresh mint price just-in-time
      const price = await contract.mintPrice();
      setMintPriceWei(price);

      const safeQty = Math.max(1, Number(qty || 1));
      const totalValue = price * BigInt(safeQty);

      const tx = await contract.publicSaleMint(safeQty, { value: totalValue });
      await tx.wait();

      // Optional: refresh price after mint
      fetchMintPrice();
    } catch (e) {
      setError(e?.reason || e?.message || "Mint failed.");
    } finally {
      setMinting(false);
    }
  }

  const mintPriceEth =
    mintPriceWei != null ? ethers.formatEther(mintPriceWei) : null;

  return (
    <Card style={{ width: "18rem" }}>
      <PixelateImage project={contractMeta.project} />

      <Card.Body>
        <Card.Title>
          {contractMeta.project === "bravo"
            ? "GLSDefi Bravo Mint"
            : "GLSDefi Alpha Mint"}
        </Card.Title>

        <Card.Text style={{ marginBottom: 8 }}>
          {loadingPrice ? (
            <>Loading mint price…</>
          ) : mintPriceEth ? (
            <>
              Mint Price: <strong>{mintPriceEth} ETH</strong> each
            </>
          ) : (
            <>
              Mint Price: <strong>—</strong>
            </>
          )}
        </Card.Text>

        <Card.Text style={{ marginBottom: 10, opacity: 0.85 }}>
          Contract:{" "}
          <span style={{ fontFamily: "monospace" }}>
            {contractMeta.address || "—"}
          </span>
        </Card.Text>

        {/* Wallet */}
        <div style={{ marginBottom: 10 }}>
          {account ? (
            <div style={{ fontSize: 12, opacity: 0.85 }}>
              Connected:{" "}
              <span style={{ fontFamily: "monospace" }}>
                {account.slice(0, 6)}…{account.slice(-4)}
              </span>
            </div>
          ) : (
            <button className="wallet-btn" type="button" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>

        {/* Quantity */}
        <Amount value={qty} onChange={setQty} />

        <div style={{ marginTop: 12 }}>
          <button
            className="wallet-btn"
            type="button"
            onClick={mint}
            disabled={minting || !mintPriceWei}
          >
            {minting ? "Minting…" : "Mint Now"}
          </button>
        </div>

        {!!error && (
          <div style={{ marginTop: 10, fontSize: 12 }}>
            <strong>Error:</strong> {error}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Cards;
