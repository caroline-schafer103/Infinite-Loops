import connectDB from "../lib/mongodb.js";
import Product from "../models/Product.js";

const products = [
  {
    id: "flower-coaster",
    name: "Flower Coaster",
    price: 5,
    category: "homeDecor",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761101668/CaroCrochet-007_ko1ubu.jpg",
    ],
    variants: [
      {
        id: "coaster-lightgreen-red",
        name: "Light Green & Red",
        color: ["#90EE90", "#FF0000"], // light green + red
        inventory: 20,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100733/CaroCrochet-104_hnv1al.jpg",
        ],
      },
      {
        id: "coaster-green-white",
        name: "Green & White",
        color: ["#008000", "#FFFFFF"], // green + white
        inventory: 20,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100739/CaroCrochet-096_p0aope.jpg",
        ],
      },
      {
        id: "coaster-purple-white",
        name: "Purple & White",
        color: ["#800080", "#FFFFFF"], // purple + white
        inventory: 20,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100727/CaroCrochet-102_knvneb.jpg",
        ],
      },
      {
        id: "coaster-yellow-red",
        name: "Yellow & Red",
        color: ["#FFFF00", "#FF0000"], // yellow + red
        inventory: 20,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100739/CaroCrochet-094_gdvq0b.jpg",
        ],
      },
    ],
  },
  {
    id: "bucket-hat-mesh",
    name: "Mesh Bucket Hat",
    price: 30,
    category: "wearables",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761101677/CaroCrochet-010_wyqtyt.jpg",
    ],
    variants: [
      {
        id: "mesh-black",
        name: "Black",
        color: ["#000000"],
        inventory: 10,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100705/CaroCrochet-133_zvzkj2.jpg",
        ],
      },
      {
        id: "mesh-white",
        name: "White",
        color: ["#FFFFFF"],
        inventory: 8,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100703/CaroCrochet-137_qkn6fy.jpg",
        ],
      },
    ],
  },
  {
    id: "crochet-beanie",
    name: "Crochet Beanie",
    price: 20,
    category: "wearables",
    images: [
      "https://res.cloudinary.com/djvweczd8/image/upload/v1761100748/CaroCrochet-086_peggyl.jpg",
    ],
    variants: [
      {
        id: "beanie-red",
        name: "Red",
        color: ["#FF0000"],
        inventory: 15,
        images: [
          "https://res.cloudinary.com/djvweczd8/image/upload/v1761100748/CaroCrochet-086_peggyl.jpg",
        ],
      },
    ],
  },
];

async function resetProducts() {
  try {
    await connectDB();

    await Product.deleteMany({});
    console.log("🗑️  All existing products deleted");

    const created = await Product.insertMany(products);
    console.log(`✅ ${created.length} products added successfully`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error resetting products:", err);
    process.exit(1);
  }
}

resetProducts();
