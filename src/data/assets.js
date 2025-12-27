
import a1photo1 from "../assets/nfts/asset0001/a1photo1.png";
import a2photo1 from "../assets/nfts/asset0002/a2photo1.jpg";
import a3photo1 from "../assets/nfts/asset0003/a3photo1.jpg";

import a1photo2 from "../assets/nfts/asset0001/a1photo2.jpg";
import a1photo3 from "../assets/nfts/asset0001/a1photo3.jpg";
import a2photo2 from "../assets/nfts/asset0002/a2photo2.jpg";
import a2photo3 from "../assets/nfts/asset0002/a2photo3.jpg";


export const ASSETS = [
    {
        code: "0001",
        name: "GLS Alpha Item 0001",
        valueUsd: 2850,
        hiddenValue: false,
        totalNfts: 15,
        cappedSupply: 11,
        status: "SOLD",
    
        // Marketplace / sales page fields
        forSale: true,
        pairable: false,
        location: "Ampang, Kuala Lumpur, MY",
        condition: "Used - Very Good and Clean Condition, regularly Serviced",
        images: [a1photo1, a1photo2, a1photo3],
        shortDesc:
          "This item is available for outright purchase via GLSDefi. Settlement is handled in a single transaction.",
      },
    
      {
        code: "0002",
        name: "GLS Alpha Item 0002",
        valueUsd: 4320,
        hiddenValue: false,
        totalNfts: 23,
        cappedSupply: 16,
        status: "active",
    
        // Marketplace / sales page fields
        forSale: true,
        pairable: true,
        location: "Mount Morgan, QLD",
        condition: "Used - 1993 Millard Caravan, tows well, reg'd",
        images: [a2photo1, a2photo2, a2photo3],
        shortDesc: 
          "This item is available for outright purchase via GLSDefi. Settlement is handled in a single transaction.",
      },
    
      {
        code: "0003",
        name: "GLS Alpha Item 0003",
        valueUsd: 10000,
        hiddenValue: true,
        totalNfts: 50,
        cappedSupply: 35,
        status: "active",
    
        // Marketplace / sales page fields
        forSale: true,
        pairable: true,
        location: "Perth, WA",
        condition: "19th Century Art - Joseph Charles Nigote [pair]",
        images: [a3photo1],
        shortDesc: 
          "This item is available for outright purchase via GLSDefi. Settlement is handled in a single transaction.",
      },

  ];