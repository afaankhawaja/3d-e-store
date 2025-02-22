import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "sofa",
    name: "Modern Sofa",
    description:
      "Customize your perfect sofa with a variety of fabrics and leg styles.",
    image: "/images/sofa.png",
  },
  {
    id: "chair",
    name: "Ergonomic Chair",
    description:
      "Personalize your chair with customizable upholstery and design options.",
    image: "/images/chair.png",
  },
  {
    id: "table",
    name: "Coffee Table",
    description:
      "Design your own coffee table with various finishes and shapes.",
    image: "/images/table.png",
  },
  {
    id: "lamp",
    name: "Floor Lamp",
    description: "Light up your space with a customizable floor lamp.",
    image: "/images/lamp.png",
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    description:
      "Create a wardrobe that fits your style with personalized design options.",
    image: "/images/wardrobe.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            3D Customizable Store
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore our collection of customizable 3D products. Click on a
            product to start personalizing!
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <Image
                  src={product.image}
                  alt={product.name}
                  className=" object-cover"
                  height={200}
                  width={400}
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-gray-600">{product.description}</p>
                  <div className="mt-4 text-indigo-600 font-semibold">
                    Customize &rarr;
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
