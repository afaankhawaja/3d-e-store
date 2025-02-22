"use client"

import Link from "next/link"
const categories = ["All", "Electronics", "Furniture", "Clothing", "Accessories"]

export default function Navbar() {

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          3D Store
        </Link>
        <div className="hidden md:flex space-x-4">
          {categories.map((category) => (
            <Link key={category} href={`/category/${category}`} className="hover:text-secondary-foreground">
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

