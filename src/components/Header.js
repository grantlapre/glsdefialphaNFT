import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";


export default function Header() {
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState("");
  const [error, setError] = useState("");

  const hasEthereum =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  const shortAddr = useMemo(() => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, [address]);

  async function connect() {
    setError("");
    if (!hasEthereum) {
      setError("No wallet detected. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const acct = accounts?.[0] || "";
      setAddress(acct);

      const cid = await window.ethereum.request({ method: "eth_chainId" });
      setChainId(cid || "");
    } catch (e) {
      setError(e?.message || "Failed to connect wallet.");
    }
  }

  function disconnect() {
    setAddress("");
    setChainId("");
    setError("");
  }

  useEffect(() => {
    if (!hasEthereum) return;

    const onAccountsChanged = (accounts) => {
      const acct = accounts?.[0] || "";
      setAddress(acct);
      if (!acct) setChainId("");
    };

    const onChainChanged = (cid) => setChainId(cid || "");

    window.ethereum.on("accountsChanged", onAccountsChanged);
    window.ethereum.on("chainChanged", onChainChanged);

    (async () => {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const acct = accounts?.[0] || "";
        setAddress(acct);
        if (acct) {
          const cid = await window.ethereum.request({ method: "eth_chainId" });
          setChainId(cid || "");
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      if (!window.ethereum?.removeListener) return;
      window.ethereum.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum.removeListener("chainChanged", onChainChanged);
    };
  }, [hasEthereum]);

  return (
    <div>
      <nav className="navbar">
        <h1 className="navbar-title">GLSDefi</h1>

        <div className="navbar-right">
          {!hasEthereum ? (
            <span className="wallet-note">Install MetaMask to connect</span>
          ) : address ? (
            <>
              <span className="wallet-pill">
                {shortAddr}{" "}
                {chainId ? <small style={{ opacity: 0.7 }}>({chainId})</small> : null}
              </span>
              <button className="wallet-btn secondary" onClick={disconnect} type="button">
                Disconnect
              </button>
            </>
          ) : (
            <div style={{ display: "flex", gap: 12 }}>
            <button className="wallet-btn" onClick={connect} type="button">
              Connect Wallet
            </button>
            <Link to="/marketplace" className="App-link">
              Market
            </Link>
          </div>
          )}
        </div>
      </nav>

      {error ? <div className="wallet-error">{error}</div> : null}
    </div>
  );
}
