// These are your NFTs (could be 60 total, 120 total, etc.)
import nft00 from "../assets/nfts/asset0001/nft00.png";
import nft01 from "../assets/nfts/asset0001/nft01.png";
import nft02 from "../assets/nfts/asset0001/nft02.png";
import nft03 from "../assets/nfts/asset0001/nft03.png";

export const NFTS = [
    { tokenId: "GLSDefiAlpha #0", tokenNo: 1, previewImage: nft00 },
    { tokenId: "GLSDefiAlpha #1", tokenNo: 2, previewImage: nft01 },
    { tokenId: "GLSDefiAlpha #2", tokenNo: 3, previewImage: nft02 },
    { tokenId: "GLSDefiAlpha #3", tokenNo: 4, previewImage: nft03 },
  ];
  
  // This is the key: tokenId -> assetCode (can change over time)
  export const INITIAL_ASSIGNMENT = {
    "GLSDefiAlpha #0": "0001",
    "GLSDefiAlpha #1": "0001",
    "GLSDefiAlpha #2": "0001",
    "GLSDefiAlpha #3": "0001",
  };
  