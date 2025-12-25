import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";


/* =========================
   CONFIG
========================= */
const GLSD_TOKEN = "0xA63556e4442cF10EA1d1ABdE363F3FED64d6cff9";
const FEE_COLLECTOR = "0xE3d30B0531E1278B0535B9b06A3CE051e946352D";

const AMOY_CHAIN_ID = 80002;
const AMOY_CHAIN_ID_HEX = "0x13882"; // 80002
const AMOY_RPC = "https://rpc-amoy.polygon.technology";
const AMOY_EXPLORER = "https://amoy.polygonscan.com/";

const GLSD_SYMBOL = "GLSD";
const GLSD_DECIMALS = 18;
// Optional logo URL (must be https). Leave undefined if not ready.
const GLSD_IMAGE = undefined;

const tooltipWrap = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  marginLeft: 8,
};

const tooltipIcon = {
  width: 18,
  height: 18,
  borderRadius: "50%",
  border: "1px solid #0b3d91",
  color: "#0b3d91",
  fontSize: 12,
  lineHeight: "16px",
  textAlign: "center",
  cursor: "help",
  userSelect: "none",
};

const tooltipBoxBase = {
  position: "absolute",
  top: 26,
  right: 0,
  width: 320,
  background: "#ffffff",
  border: "1px solid #0b3d91",
  borderRadius: 10,
  padding: 12,
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  zIndex: 20,
  fontSize: "0.85rem",
  color: "#0b3d91",
  lineHeight: 1.35,
};


/* =========================
   ABIs
========================= */
const erc20Abi = [
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
];

const feeCollectorAbi = [
  "function quote(bytes32 feeId) view returns (uint256 baseFee, uint256 discountedFee)",
  "function payFee(bytes32 feeId)",
];

export default function PayWithGLSD() {
  /* =========================
     STATE
  ========================= */
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(null);

  const [symbol, setSymbol] = useState(GLSD_SYMBOL);
  const [decimals, setDecimals] = useState(GLSD_DECIMALS);
  const [balance, setBalance] = useState("0");

  const [baseFee, setBaseFee] = useState("0");
  const [discountedFee, setDiscountedFee] = useState("0");

  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const [showUtilityTip, setShowUtilityTip] = useState(false);


  /* =========================
     CONSTANTS
  ========================= */
  const feeId = useMemo(
    () => ethers.keccak256(ethers.toUtf8Bytes("LISTING_FEE")),
    []
  );

  const token = useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(GLSD_TOKEN, erc20Abi, signer);
  }, [signer]);

  const collector = useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(FEE_COLLECTOR, feeCollectorAbi, signer);
  }, [signer]);

  /* =========================
     WALLET ACTIONS
  ========================= */
  async function connect() {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected.");
        return;
      }

      const p = new ethers.BrowserProvider(window.ethereum);

      const accounts = await p.send("eth_requestAccounts", []);
      if (!accounts || accounts.length === 0) {
        setStatus("No accounts returned by MetaMask.");
        return;
      }

      // Use the explicit address to avoid “no such account” edge cases
      const s = await p.getSigner(accounts[0]);

      setProvider(p);
      setSigner(s);
      setAddress(accounts[0]);

      const net = await p.getNetwork();
      setChainId(Number(net.chainId));

      setStatus("Connected.");
    } catch (e) {
      console.error(e);

      // MetaMask "request already pending"
      if (e?.error?.code === -32002 || e?.code === -32002) {
        setStatus("MetaMask request already pending. Open MetaMask to approve.");
        return;
      }

      // MetaMask stream glitch
      if ((e?.message || "").toLowerCase().includes("unknown response id")) {
        setStatus("MetaMask connection glitch. Close & reopen browser, then try again.");
        return;
      }

      setStatus(e?.shortMessage || e?.message || "Failed to connect MetaMask.");
    }
  }

  function disconnect() {
    setProvider(null);
    setSigner(null);
    setAddress("");
    setChainId(null);

    setBalance("0");
    setBaseFee("0");
    setDiscountedFee("0");

    setStatus("Disconnected. Reconnect to choose another wallet.");
  }

  async function addGLSDToMetaMask() {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected.");
        return;
      }

      const added = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: GLSD_TOKEN,
            symbol: GLSD_SYMBOL,
            decimals: GLSD_DECIMALS,
            ...(GLSD_IMAGE ? { image: GLSD_IMAGE } : {}),
          },
        },
      });

      setStatus(added ? "✅ GLSD added to MetaMask." : "GLSD not added.");
    } catch (e) {
      console.error(e);
      setStatus("Could not add GLSD to MetaMask.");
    }
  }

  async function switchToAmoy() {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected.");
        return;
      }

      // Try switch first
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: AMOY_CHAIN_ID_HEX }],
      });

      setStatus("Switched to Polygon Amoy ✅");
    } catch (e) {
      // Chain not added → add it
      if (e?.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: AMOY_CHAIN_ID_HEX,
                chainName: "Polygon Amoy",
                nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
                rpcUrls: [AMOY_RPC],
                blockExplorerUrls: [AMOY_EXPLORER],
              },
            ],
          });
          setStatus("Polygon Amoy added and selected ✅");
        } catch (err) {
          console.error(err);
          setStatus("Could not add Polygon Amoy. Please add it in MetaMask.");
        }
        return;
      }

      console.error(e);
      setStatus("Could not switch network. Open MetaMask and switch to Polygon Amoy.");
    }
  }

  /* =========================
     DATA REFRESH
  ========================= */
  async function refresh() {
    if (!provider || !token || !collector || !address) return;

    const net = await provider.getNetwork();
    setChainId(Number(net.chainId));

    const d = await token.decimals();
    setDecimals(Number(d));

    const sym = await token.symbol();
    setSymbol(sym);

    const bal = await token.balanceOf(address);
    setBalance(ethers.formatUnits(bal, d));

    const [base, discounted] = await collector.quote(feeId);
    setBaseFee(ethers.formatUnits(base, d));
    setDiscountedFee(ethers.formatUnits(discounted, d));
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, signer, address]);

  // If user switches accounts or networks in MetaMask, update state
  useEffect(() => {
    if (!window.ethereum) return;

    const onAccountsChanged = (accs) => {
      if (!accs || accs.length === 0) {
        disconnect();
        return;
      }
      setAddress(accs[0]);
      setStatus("Account changed.");
    };

    const onChainChanged = (hexId) => {
      const cid = Number.parseInt(hexId, 16);
      setChainId(cid);
      setStatus("Network changed.");
    };

    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged", onChainChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================
     PAY FEE
  ========================= */
  async function payFee() {
    if (!provider || !token || !collector || !address) return;

    if (chainId !== AMOY_CHAIN_ID) {
      setStatus("Please switch MetaMask to Polygon Amoy (chainId 80002).");
      return;
    }

    try {
      setBusy(true);

      const need = ethers.parseUnits(discountedFee || "0", decimals);
      const allowance = await token.allowance(address, FEE_COLLECTOR);

      if (allowance < need) {
        setStatus(`Approving ${discountedFee} ${symbol}...`);
        const txA = await token.approve(FEE_COLLECTOR, need);
        await txA.wait();
      }

      setStatus("Paying fee...");
      const txP = await collector.payFee(feeId);
      await txP.wait();

      setStatus("✅ Listing fee paid with 5% GLSD discount.");
      await refresh();
    } catch (e) {
      console.error(e);
      setStatus(e?.shortMessage || e?.message || "Transaction failed.");
    } finally {
      setBusy(false);
    }
  }

  /* =========================
     UI
  ========================= */
  const wrongNetwork = address && chainId && chainId !== AMOY_CHAIN_ID;

  return (
    <div
      style={{
        border: "1px solid #0b3d91",
        padding: 16,
        borderRadius: 12,
        background: "#fff",
      }}
    >
<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
  <h3 style={{ marginTop: 0, marginBottom: 0, color: "#0b3d91" }}>
    Pay Listing Fee with GLSD (5% off)
  </h3>

  <span
    style={tooltipWrap}
    onMouseEnter={() => setShowUtilityTip(true)}
    onMouseLeave={() => setShowUtilityTip(false)}
    onClick={() => setShowUtilityTip((v) => !v)}

  >
    <span
      style={tooltipIcon}
      aria-label="Token utility information"
      title="Token utility information"
    >
      i
    </span>

    {showUtilityTip && (
      <div style={tooltipBoxBase}>
        <strong>GLSD Utility</strong>
        <div style={{ marginTop: 6 }}>
          GLSD is a utility token used within the GLSDefi platform for optional
          fee payments and discounts. It does not represent ownership, equity,
          profit rights, or an investment. Token values may be volatile and you
          may lose some or all of the amount paid.
        </div>
        <div style={{ marginTop: 8 }}>
        <Link
  to="/disclaimer"
  style={{ color: "#0b3d91", textDecoration: "underline" }}
>
  View full disclaimer & risk notes
</Link>

        </div>
      </div>
    )}
  </span>
</div>


      {!address ? (
        <>
          <button
            onClick={addGLSDToMetaMask}
            style={{
              background: "white",
              color: "#0b3d91",
              border: "1px solid #0b3d91",
              padding: "10px 14px",
              borderRadius: 10,
              marginRight: 10,
              cursor: "pointer",
            }}
          >
            Add GLSD to MetaMask
          </button>

          <button
            onClick={connect}
            style={{
              background: "#0b3d91",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Connect MetaMask
          </button>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 8 }}>
            <strong>Wallet:</strong> {address.slice(0, 6)}…{address.slice(-4)}
            <button
              onClick={disconnect}
              style={{
                marginLeft: 12,
                background: "white",
                color: "#0b3d91",
                border: "1px solid #0b3d91",
                padding: "4px 8px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </div>

          <div style={{ marginBottom: 8 }}>
            <strong>Network:</strong>{" "}
            {chainId === AMOY_CHAIN_ID
              ? "Polygon Amoy ✅"
              : chainId
              ? `Wrong (chainId ${chainId})`
              : "Unknown"}
          </div>

          {wrongNetwork && (
            <div style={{ marginBottom: 12 }}>
              <button
                onClick={switchToAmoy}
                style={{
                  background: "white",
                  color: "#0b3d91",
                  border: "1px solid #0b3d91",
                  padding: "8px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  marginRight: 10,
                }}
              >
                Switch MetaMask to Amoy
              </button>

              <button
                onClick={addGLSDToMetaMask}
                style={{
                  background: "white",
                  color: "#0b3d91",
                  border: "1px solid #0b3d91",
                  padding: "8px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Add GLSD to MetaMask
              </button>
            </div>
          )}

          <div style={{ marginBottom: 8 }}>
            <strong>{symbol} balance:</strong> {Number(balance).toLocaleString()}
          </div>

          <div style={{ marginBottom: 8 }}>
            <strong>Fee:</strong> {baseFee} →{" "}
            <strong>
              {discountedFee} {symbol}
            </strong>
          </div>

          <button
            disabled={busy || chainId !== AMOY_CHAIN_ID}
            onClick={payFee}
            style={{
              background: busy ? "#999" : "#0b3d91",
              color: "#fff",
              border: "none",
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            {busy ? "Processing..." : `Pay ${discountedFee} ${symbol}`}
          </button>
          <div
  style={{
    marginTop: 10,
    fontSize: "0.85rem",
    color: "#555",
    lineHeight: 1.4,
  }}
>
  <p style={{ margin: 0 }}>
    Payments using GLSD are optional and provided for utility purposes only.
    Fees, discounts, and availability may change. NFTs and tokens do not
    represent ownership, equity, or guaranteed value.
  </p>

  <p style={{ margin: "4px 0 0 0" }}>
    <a
      href="#/disclaimer"
      style={{ color: "#0b3d91", textDecoration: "underline" }}
    >
      View full disclaimer & risk notes
    </a>
  </p>
</div>

        </>
      )}

      {status && (
        <div
          style={{
            marginTop: 12,
            background: "#e9f0ff",
            padding: 10,
            borderRadius: 10,
            color: "#0b3d91",
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}
