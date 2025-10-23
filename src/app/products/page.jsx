import Link from "next/link";

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

async function getProducts() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  const grouped = products.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-[#2F855A]">
        Products
      </h1>

      {/* Category Nav */}
      <div className="flex justify-center gap-3 mb-12 flex-wrap">
        {Object.keys(grouped).map((category) => (
          <a
            key={category}
            href={`#${toKebabCase(category)}`}
            className="px-4 py-2 border border-[#2F855A] text-[#2F855A] rounded-full hover:bg-[#2F855A] hover:text-white transition-colors duration-300"
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
          <h2 className="text-2xl font-semibold mb-6 capitalize text-[#2F855A]">
            {category}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((p) => {
              const productImage =
                p.images?.[0] ||
                p.variants?.[0]?.images?.[0] ||
                "https://via.placeholder.com/400x400?text=No+Image";

              return (
                <Link
                  key={p._id}
                  href={`/products/${p.id}`}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300 block group"
                >
                  <div className="w-full h-48 bg-gray-200 rounded mb-4 overflow-hidden">
                    <img
                      src={productImage}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800 group-hover:text-[#2F855A] transition-colors">
                    {p.name}
                  </h3>
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
