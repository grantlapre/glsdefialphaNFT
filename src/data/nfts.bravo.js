// src/data/nfts.bravo.js
// BRAVO NFTs ONLY

import bnft00 from "../assets/nfts/bravo/basset0001/bnft00.png";
import bnft01 from "../assets/nfts/bravo/basset0001/bnft01.png";
import bnft02 from "../assets/nfts/bravo/basset0001/bnft02.jpg";

export const NFTS_BRAVO = [
  { tokenId: "GLSDefiBravo #0", tokenNo: 1, previewImage: bnft00 },
  { tokenId: "GLSDefiBravo #1", tokenNo: 2, previewImage: bnft01 },
  { tokenId: "GLSDefiBravo #2", tokenNo: 3, previewImage: bnft02 },
];

// tokenId → assetCode mapping (mutable over time)
export const INITIAL_ASSIGNMENT_BRAVO = {
  "GLSDefiBravo #0": "0001",
  "GLSDefiBravo #1": "0001",
  "GLSDefiBravo #2": "0001",
};
