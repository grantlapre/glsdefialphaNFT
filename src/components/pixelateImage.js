import React, { useState, useEffect, useMemo } from "react";
import "./PixelateImage.css";
import { MINT_IMAGES_ALPHA } from "../data/mintImages.alpha";
import { MINT_IMAGES_BRAVO } from "../data/mintImages.bravo";

export default function PixelateImage({ project = "alpha" }) {
  const images = useMemo(() => {
    return project === "bravo" ? MINT_IMAGES_BRAVO : MINT_IMAGES_ALPHA;
  }, [project]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPixelated, setIsPixelated] = useState(false);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsPixelated((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="image-container">
        <div style={{ padding: 16, opacity: 0.8 }}>
          No mint preview images found for: <strong>{project}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className={`image-container ${isPixelated ? "pixelated" : ""}`}>
      <img
        src={images[currentImageIndex]}
        alt={`Mint preview ${currentImageIndex + 1}`}
        className="image"
        width="280px"
      />
    </div>
  );
}
