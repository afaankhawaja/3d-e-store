"use client";

import Link from "next/link";
const categories = [
  "All",
  "Electronics",
  "Furniture",
  "Clothing",
  "Accessories",
];

export default function Navbar() {
  return (
    <nav className="bg-black text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <div className="font-bold text-[#beabaa]">3D Store</div>
        </Link>
        <div className="hidden md:flex space-x-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={category==="All"? '/':`/category/${category}`}
              className="hover:text-secondary-foreground"
            >
              <div className="text-gray-100 font-semibold hover:text-gray-400">
                {category}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
