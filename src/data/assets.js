
import item0001 from "../assets/nfts/asset0001/item0001.png";
import item0002 from "../assets/nfts/asset0002/item0002.jpg";
export const ASSETS = [
    {
        code: "0001",
        name: "GLS Alpha Item 0001",
        valueUsd: 2850,
        totalNfts: 15,
        status: "active",
    
        // Marketplace / sales page fields
        forSale: true,
        location: "Ampang, Kuala Lumpur, MY",
        condition: "Used - Very Good and Clean Condition, regularly Serviced",
        itemImage: item0001, // OR import if you keep in src/assets
        shortDesc:
          "This item is available for outright purchase via GLSDefi. Settlement is handled in a single transaction.",
      },
    
      {
        code: "0002",
        name: "GLS Alpha Item 0002",
        valueUsd: 4320,
        totalNfts: 23,
        status: "active",
    
        // Marketplace / sales page fields
        forSale: true,
        location: "Mount Morgan, QLD",
        condition: "Used - 1993 Millard Caravan, tows well, reg'd",
        itemImage: item0002,
        shortDesc: 
          "This item is available for outright purchase via GLSDefi. Settlement is handled in a single transaction.",
      },
    

  ];