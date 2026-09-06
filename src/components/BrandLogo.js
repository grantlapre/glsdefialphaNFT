import React from "react";
import logo from "../logo.svg";

export default function BrandLogo() {
  return (
    <div className="brand-logo-wrap">
      <img
        src={logo}
        className="brand-logo"
        alt="GLSDefi"
      />
    </div>
  );
}