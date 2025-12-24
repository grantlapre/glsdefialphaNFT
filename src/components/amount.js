import React from "react";

export default function Amount({ value = 1, onChange }) {
  const safeValue = Math.max(1, Number(value || 1));

  const handleChange = (e) => {
    const qty = Math.max(1, Number(e.target.value || 1));
    if (typeof onChange === "function") onChange(qty);
  };

  return (
    <div>
      <p>Choose quantity to mint</p>

      <select value={safeValue} onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <p style={{ marginTop: 8 }}>{`You selected: ${safeValue} NFT(s)`}</p>
    </div>
  );
}
