import Link from "next/link";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

export default async function ProductsPage() {
  const products = await getProducts();

  // Group by category
  const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>

      {/* Category Nav */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {Object.keys(grouped).map((category) => (
          <a
            key={category}
            href={`#${toKebabCase(category)}`}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            {category}
          </a>
        ))}
      </div>

      {/* Render each category */}
      {Object.entries(grouped).map(([category, items]) => (
        <div
          key={category}
          id={toKebabCase(category)}
          className="mb-16 scroll-mt-24"
        >
          <h2 className="text-2xl font-semibold mb-6 capitalize">{category}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((p) => {
              // ✅ Prefer product image, fall back to first variant image
              const productImage =
                p.images?.[0] ||
                p.variants?.[0]?.images?.[0] ||
                "https://via.placeholder.com/400x400?text=No+Image";

              return (
                <Link
                  key={p._id}
                  href={`/products/${p.id}`}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition block"
                >
                  <div className="w-full h-48 bg-gray-200 rounded mb-4 overflow-hidden">
                    <img
                      src={productImage}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg">{p.name}</h3>
                  <p className="text-gray-600 mb-2">${p.price.toFixed(2)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
