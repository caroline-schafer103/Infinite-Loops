// scripts/bulkCreateProducts.js
import connectDB from "../lib/mongodb.js";
import Product from "../models/Product.js";

// Example: array of products
// You can copy/paste this structure and add as many products as you like
const products = [
  {
    id: "flower-coaster",
    name: "Flower Coaster",
    price: 5,
    category: "homeDecor",
    description: "Handmade crochet coaster",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761101666/CaroCrochet-006_yxto4h.jpg",
    ],
    variants: [
      {
        id: "coaster-apple",
        name: "Apple",
        color: ["#90EE90", "#FF0000"],
        inventory: 4,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100726/CaroCrochet-105_ol9vpp.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101766/CaroCrochet-039_xu3nwf.jpg",
        ],
      },
      {
        id: "coaster-green-white-gradient",
        name: "Green & White Gradient",
        color: ["#008000", "#FFFFFF"],
        inventory: 4,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100739/CaroCrochet-096_p0aope.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100740/CaroCrochet-095_mv3esr.jpg",
        ],
      },
      {
        id: "coaster-purple-white",
        name: "Purple & White",
        color: ["#ab9dd8", "#FFFFFF"],
        inventory: 3,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100727/CaroCrochet-102_knvneb.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100787/CaroCrochet-041_gewxkl.jpg",
        ],
      },
      {
        id: "coaster-red-yellow",
        name: "Red & Yellow",
        color: ["#ed9525", "#3c0813"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100739/CaroCrochet-094_gdvq0b.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100790/CaroCrochet-046_zytrkc.jpg",
        ],
      },
      {
        id: "coaster-pink-yellow",
        name: "Pink & Yellow",
        color: ["#f5a09f5", "#ffe6b5"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100741/CaroCrochet-092_fcwnx2.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100797/CaroCrochet-044_mozcmx.jpg",
        ],
      },
      {
        id: "coaster-green-white",
        name: "Green & White",
        color: ["#8c9a77", "#f5f5f6"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100741/CaroCrochet-091_bpsjkb.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100797/CaroCrochet-044_mozcmx.jpg",
        ],
      },
    ],
  },

  {
    id: "pumpkin-coaster",
    name: "Pumpkin Coaster",
    price: 5,
    category: "homeDecor",
    description: "Handmade crochet coaster",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100724/CaroCrochet-106_cdaidj.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100732/CaroCrochet-103_fged19.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100788/CaroCrochet-047_xlrl1m.jpg",
    ],
    variants: [
      {
        id: "coaster-pumpkin",
        name: "Pumpkin",
        color: ["#c13811"],
        inventory: 4,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100788/CaroCrochet-047_xlrl1m.jpg",
        ],
      },
    ],
  },

  {
    id: "sunflower-coaster",
    name: "Sunflower Coaster",
    price: 5,
    category: "homeDecor",
    description: "Handmade crochet coaster",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100734/CaroCrochet-100_rlcup8.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100733/CaroCrochet-099_l36adv.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100787/CaroCrochet-048_y40p9v.jpg",
    ],
    variants: [
      {
        id: "coaster-pumpkin",
        name: "Pumpkin",
        color: ["#ffd794", "#7f4932"],
        inventory: 3,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100787/CaroCrochet-048_y40p9v.jpg",
        ],
      },
    ],
  },

  {
    id: "record-coaster",
    name: "Record Coaster",
    price: 5,
    category: "homeDecor",
    description: "Handmade crochet coaster",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100725/CaroCrochet-110_u9mjwd.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100787/CaroCrochet-052_isc8wp.jpg",
    ],
    variants: [
      {
        id: "coaster-record-orange",
        name: "Orange",
        color: ["#ff7d40", "#1d1d21"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100724/CaroCrochet-108_hpntkg.jpg",
        ],
      },
      {
        id: "coaster-record-green",
        name: "Green",
        color: ["#84a867", "#1d1d21"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100725/CaroCrochet-107_xo1fkt.jpg",
        ],
      },
      {
        id: "coaster-record-purple",
        name: "Purple",
        color: ["#b743b4", "#1d1d21"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100720/CaroCrochet-109_wu9mqk.jpg",
        ],
      },
    ],
  },

  {
    id: "texas-coaster",
    name: "Texas Coaster",
    price: 5,
    category: "homeDecor",
    description: "Handmade crochet coaster",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100735/CaroCrochet-098_xlni8g.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100739/CaroCrochet-097_lzvyft.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100798/CaroCrochet-042_fk6g16.jpg",
    ],
    variants: [
      {
        id: "coaster-texas-red",
        name: "Red",
        color: ["#b90012"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100739/CaroCrochet-097_lzvyft.jpg",
        ],
      },
      {
        id: "coaster-texas-white",
        name: "White",
        color: ["#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100735/CaroCrochet-098_xlni8g.jpg",
        ],
      },
    ],
  },

  {
    id: "fingerless-gloves",
    name: "Fingerless Gloves",
    price: 15,
    category: "wearables",
    description: "Handmade crochet fingerless gloves",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100725/CaroCrochet-112_qasnlf.jpg",
    ],
    variants: [
      {
        id: "gloves-light-purple",
        name: "Light Purple",
        color: ["#bf9cda"],
        inventory: 0,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100725/CaroCrochet-112_qasnlf.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100786/CaroCrochet-054_kteihg.jpg",
        ],
      },
      {
        id: "gloves-dark-purple",
        name: "Dark Purple",
        color: ["#732173"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100724/CaroCrochet-111_dsjjgk.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100785/CaroCrochet-055_t5hzgh.jpg",
        ],
      },
      {
        id: "gloves-orange",
        name: "Orange",
        color: ["#db5a33"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100720/CaroCrochet-113_mumje5.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100780/CaroCrochet-053_xubixx.jpg",
        ],
      },
    ],
  },

  {
    id: "cherry-keychain",
    name: "Cherry Keychain",
    price: 5,
    category: "accessories",
    description: "Handmade crochet keychain",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100757/CaroCrochet-078_yj5izi.jpg",
    ],
    variants: [
      {
        id: "cherries",
        name: "Cherries",
        color: ["#6c0923"],
        inventory: 7,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100757/CaroCrochet-078_yj5izi.jpg",
        ],
      },
    ],
  },

  {
    id: "heart-keychain",
    name: "Heart Keychain",
    price: 5,
    category: "accessories",
    description: "Handmade crochet keychain",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100757/CaroCrochet-077_rrd6zt.jpg",
    ],
    variants: [
      {
        id: "pink",
        name: "Pink",
        color: ["#ebcdd5"],
        inventory: 2,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100757/CaroCrochet-077_rrd6zt.jpg",
        ],
      },
      {
        id: "red",
        name: "Red",
        color: ["#892941"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100761/CaroCrochet-072_bxvhps.jpg",
        ],
      },
      {
        id: "yellow",
        name: "Yellow",
        color: ["#ffe48e"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100759/CaroCrochet-073_jblimn.jpg",
        ],
      },
      {
        id: "purple",
        name: "Purple",
        color: ["#641c67"],
        inventory: 2,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100757/CaroCrochet-074_yyeg1n.jpg",
        ],
      },
    ],
  },

  {
    id: "bow-keychain",
    name: "Bow Keychain",
    price: 5,
    category: "accessories",
    description: "Handmade crochet keychain",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100758/CaroCrochet-075_aqzuaw.jpg",
    ],
    variants: [
      {
        id: "light-pink",
        name: "Light Pink",
        color: ["#ebcdd5"],
        inventory: 2,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100764/CaroCrochet-071_bo82r4.jpg",
        ],
      },
      {
        id: "dark-pink",
        name: "Dark Pink",
        color: ["#ff6a65"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100768/CaroCrochet-070_hcyhej.jpg",
        ],
      },
      {
        id: "red",
        name: "Red",
        color: ["#880a2f"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100758/CaroCrochet-075_aqzuaw.jpg",
        ],
      },
      {
        id: "purple",
        name: "Purple",
        color: ["#641c67"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100757/CaroCrochet-076_mg2lii.jpg",
        ],
      },
    ],
  },

  {
    id: "solid-bucket-hat",
    name: "Solid Bucket Hat",
    price: 30,
    category: "wearables",
    description: "Handmade crochet hat",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100704/CaroCrochet-131_yd7k7g.jpg",
    ],
    variants: [
      {
        id: "purple-white",
        name: "Purple & White",
        color: ["#9e93d5", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100704/CaroCrochet-131_yd7k7g.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101729/CaroCrochet-027_jih6xq.jpg"
        ],
      },
      {
        id: "green-white",
        name: "Green & White",
        color: ["#bfc97b", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100703/CaroCrochet-136_hg9pmw.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101722/CaroCrochet-025_iwilsj.jpg"
        ],
      },
      {
        id: "apple",
        name: "Apple",
        color: ["#a52642", "#ddae32"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100703/CaroCrochet-135_nhzgfj.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101726/CaroCrochet-026_jhawkw.jpg"
        ],
      },
    ],
  },

  {
    id: "mesh-bucket-hat",
    name: "Mesh Bucket Hat",
    price: 30,
    category: "wearables",
    description: "Handmade crochet hat",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100705/CaroCrochet-133_zvzkj2.jpg",
    ],
    variants: [
      {
        id: "purple-white",
        name: "Purple & White",
        color: ["#9e93d5", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100705/CaroCrochet-132_b8zdu7.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101709/CaroCrochet-021_gmcsoi.jpg"
        ],
      },
      {
        id: "blue-blue-1",
        name: "Light Blue & Dark Blue",
        color: ["#2c7ed2", "#d4e1f3"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100705/CaroCrochet-133_zvzkj2.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101713/CaroCrochet-022_o4fst9.jpg"
        ],
      },
      {
        id: "blue-blue-2",
        name: "Medium Blue & Dark Blue",
        color: ["#afc3f1", "#1b6fc1"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100703/CaroCrochet-137_qkn6fy.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101720/CaroCrochet-024_hdpg3d.jpg"
        ],
      },
      {
        id: "pink-black",
        name: "Pink & Black",
        color: ["#f2a2a4", "#14131c"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100703/CaroCrochet-134_pcxkpk.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101715/CaroCrochet-023_n768fw.jpg"
        ],
      },
    ],
  },


  {
    id: "beanie",
    name: "Beanie",
    price: 20,
    category: "wearables",
    description: "Handmade crochet hat",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100748/CaroCrochet-086_peggyl.jpg",
    ],
    variants: [
      {
        id: "mint",
        name: "Mint",
        color: ["#b2ecd5"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100748/CaroCrochet-086_peggyl.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100770/CaroCrochet-065_wttamy.jpg"
        ],
      },
      {
        id: "rainbow",
        name: "Rainbow",
        color: ["#cc4b7e", "#afd3d3"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100749/CaroCrochet-085_ddridi.jpg",
        ],
      },
      {
        id: "maroon-black",
        name: "Maroon and Black",
        color: ["#891334", "#161e1f"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100748/CaroCrochet-087_xajopm.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100742/CaroCrochet-089_ih9fmv.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100776/CaroCrochet-066_hhjr1l.jpg"
        ],
      },
      {
        id: "teal-blue",
        name: "Teal & Blue",
        color: ["#7c5ea7", "#0073b6"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100743/CaroCrochet-088_pf7cn9.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100732/CaroCrochet-090_ptwv2v.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100768/CaroCrochet-067_fafy1g.jpg"
        ],
      },
    ],
  },


  {
    id: "ear-warmer",
    name: "Ear Warmers",
    price: 15,
    category: "wearables",
    description: "Handmade crochet bandana",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100749/CaroCrochet-083_snds9q.jpg",
    ],
    variants: [
      {
        id: "sherbert",
        name: "Sherbert",
        color: ["#d97b5c", "#fcc142"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100749/CaroCrochet-083_snds9q.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100771/CaroCrochet-064_mr6bkk.jpg"
        ],
      },
      {
        id: "green",
        name: "Green",
        color: ["#1c3a34", "#b7b99e"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100749/CaroCrochet-084_xby4yc.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100769/CaroCrochet-063_nicu0m.jpg"
        ],
      },
    ],
  },


  {
    id: "bandana",
    name: "Bandana",
    price: 15,
    category: "wearables",
    description: "Handmade crochet bandana",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761101661/CaroCrochet-005_wpexze.jpg",
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761101657/CaroCrochet-004_kfednw.jpg"
    ],
    variants: [
      {
        id: "pink",
        name: "Pink",
        color: ["#f8c0d5"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100712/CaroCrochet-126_mkmlny.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100776/CaroCrochet-061_eseeyf.jpg"
        ],
      },
      {
        id: "dark-blue",
        name: "Dark Blue",
        color: ["#0d204c"],
        inventory: 2,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100708/CaroCrochet-128_lakalh.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100703/CaroCrochet-130_hmd3no.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100777/CaroCrochet-058_zdbnao.jpg"
        ],
      },
      {
        id: "med-blue",
        name: "Medium Blue",
        color: ["#3781dc"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100705/CaroCrochet-129_l0tek6.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100776/CaroCrochet-059_rtiw8j.jpg",
        ],
      },
      {
        id: "light-blue",
        name: "Light Blue",
        color: ["#a7d1e0"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100709/CaroCrochet-127_pfn54q.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100778/CaroCrochet-056_ow8n0o.jpg",
        ],
      },
      {
        id: "light-purple",
        name: "Light Purple",
        color: ["#b5a8c5"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100710/CaroCrochet-125_c6u5fr.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100769/CaroCrochet-062_xz3gc6.jpg",
        ],
      },
    ],
  },


  {
    id: "bag",
    name: "Bag",
    price: 30,
    category: "accessories",
    description: "Handmade crochet bag",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100750/CaroCrochet-082_miwpmj.jpg",
    ],
    variants: [
      {
        id: "rainbow",
        name: "rainbow",
        color: ["#d36868", "#e6c47e"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100750/CaroCrochet-082_miwpmj.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100767/CaroCrochet-068_x9t9lz.jpg"
        ],
      },
      {
        id: "blue-market",
        name: "Blue Market Bag",
        color: ["#d3ce63", "#79b0d3"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100750/CaroCrochet-081_dihfnn.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100766/CaroCrochet-069_x5nhhf.jpg"
        ],
      },
    ],
  },


  {
    id: "strawberries-tapestry",
    name: "Strawberries Tapestry",
    price: 10,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100713/CaroCrochet-122_sqhobv.jpg",
    ],
    variants: [
      {
        id: "strawberries",
        name: "Strawberries",
        color: ["#aa2145", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100713/CaroCrochet-122_sqhobv.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101733/CaroCrochet-028_alkrqk.jpg"
        ],
      },
    ],
  },


  {
    id: "dino-tapestry",
    name: "Dinosaur Tapestry",
    price: 10,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100712/CaroCrochet-124_t9adr6.jpg",
    ],
    variants: [
      {
        id: "dinos",
        name: "Dinos",
        color: ["#1d1d21", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100712/CaroCrochet-124_t9adr6.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100790/CaroCrochet-036_on3hyv.jpg"
        ],
      },
    ],
  },


  {
    id: "body-tapestry",
    name: "Body Tapestry",
    price: 20,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100711/CaroCrochet-123_t9l30h.jpg",
    ],
    variants: [
      {
        id: "body",
        name: "Body",
        color: ["#1d1d21", "#d1e9ff"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100711/CaroCrochet-123_t9l30h.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101754/CaroCrochet-035_tohlbj.jpg"
        ],
      },
    ],
  },


  {
    id: "howdy-tapestry",
    name: "Howdy Tapestry",
    price: 25,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100718/CaroCrochet-118_qmvqnx.jpg",
    ],
    variants: [
      {
        id: "howdy",
        name: "Howdy",
        color: ["#600e67", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100718/CaroCrochet-118_qmvqnx.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101744/CaroCrochet-031_padq54.jpg"
        ],
      },
    ],
  },


  {
    id: "spooky-ghost-tapestry",
    name: "Spooky Ghost Tapestry",
    price: 25,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100719/CaroCrochet-115_rq6d2f.jpg",
    ],
    variants: [
      {
        id: "spooky-ghost",
        name: "Spooky Ghost",
        color: ["#e76438", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100719/CaroCrochet-115_rq6d2f.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101760/CaroCrochet-037_cmpri8.jpg"
        ],
      },
    ],
  },


  {
    id: "moon-sun-tapestry",
    name: "Moon Sun Tapestry",
    price: 30,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100715/CaroCrochet-119_vytzel.jpg",
    ],
    variants: [
      {
        id: "moon-sun",
        name: "Moon Sun",
        color: ["#0d0c0f", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100715/CaroCrochet-119_vytzel.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101746/CaroCrochet-032_sphywr.jpg"
        ],
      },
    ],
  },


  {
    id: "white-ghost-tapestry",
    name: "White Ghost Tapestry",
    price: 30,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100713/CaroCrochet-121_pkjlxp.jpg",
    ],
    variants: [
      {
        id: "white-ghost",
        name: "White Ghost",
        color: ["#0d0c0f", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100713/CaroCrochet-121_pkjlxp.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101750/CaroCrochet-034_kfynof.jpg"
        ],
      },
    ],
  },


  {
    id: "texas-tapestry",
    name: "Texas Tapestry",
    price: 30,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100718/CaroCrochet-117_iwrx4d.jpg",
    ],
    variants: [
      {
        id: "texas",
        name: "Texas",
        color: ["#003963", "#dd1029"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100718/CaroCrochet-117_iwrx4d.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101740/CaroCrochet-030_wuaioq.jpg"
        ],
      },
    ],
  },


  {
    id: "rowley-tapestry",
    name: "Rowley Tapestry",
    price: 30,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100719/CaroCrochet-114_seegan.jpg",
    ],
    variants: [
      {
        id: "rowley",
        name: "Rowley",
        color: ["#0d0c0f", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100719/CaroCrochet-114_seegan.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101762/CaroCrochet-038_kdzzia.jpg"
        ],
      },
    ],
  },


  {
    id: "heart-ribs-tapestry",
    name: "Heart Ribs Tapestry",
    price: 40,
    category: "homeDecor",
    description: "Handmade crochet tapestry",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100718/CaroCrochet-116_hnhfqk.jpg",
    ],
    variants: [
      {
        id: "heart-ribs",
        name: "Heart Ribs",
        color: ["#0d0c0f", "#FFFFFF"],
        inventory: 1,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100718/CaroCrochet-116_hnhfqk.jpg",
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761101738/CaroCrochet-029_rhsy8p.jpg"
        ],
      },
    ],
  },


];

async function bulkCreateProducts() {
  try {
    await connectDB();

    // Optional: delete all products before inserting
    await Product.deleteMany({});
    console.log("🗑️ All existing products deleted");

    // Insert all products
    const created = await Product.insertMany(products);
    console.log(`✅ ${created.length} products added successfully`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating products:", err);
    process.exit(1);
  }
}

bulkCreateProducts();
