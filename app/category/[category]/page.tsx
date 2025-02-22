"use client";
import React from "react";
import { products } from "@/constants/products";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ category: string }>();
  console.log("params", params);

  return (
    <main id="main" className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            3D Customizable Store
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Explore our collection of customizable 3D products. Click on a
            product to start personalizing!
          </p>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products
            .filter((prod) => prod.category === params.category)
            .map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white/40 hover:bg-white/70 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
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
                    <p className="mt-1 text-blue-500 font-medium text-sm">
                      #{product.category}
                    </p>

                    <div className="mt-2 text-green-800 font-semibold flex justify-between">
                      <div>Customize &rarr;</div>
                      <div className="text-black font-bold">
                        {product.price}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
