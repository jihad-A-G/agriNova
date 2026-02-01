'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Navigation from "@/components/Navigation"
import { ArrowRight } from "lucide-react"

const fruits = [
  { 
    id: "redgrapes", 
    name: "Red Grapes", 
    description: "Sweet and juicy red grapes",
    image: "/redgrapes/image1.png",
    color: "from-purple-500 to-red-500"
  },
  { 
    id: "green-grapes", 
    name: "Green Grapes", 
    description: "Crisp and refreshing green grapes",
    image: "/green-grapes/image.png",
    color: "from-green-500 to-emerald-500"
  },
  { 
    id: "black-grapes", 
    name: "Black Grapes", 
    description: "Rich and flavorful black grapes",
    image: "/black-grapes/image4.png",
    color: "from-purple-700 to-indigo-600"
  },
  { 
    id: "almonds", 
    name: "Almonds", 
    description: "Premium Australian almonds",
    image: "/almonds/image4.png",
    color: "from-amber-600 to-yellow-700"
  },
  { 
    id: "lychee", 
    name: "Lychee", 
    description: "Exotic and sweet lychee",
    image: "/lychee/image.png",
    color: "from-pink-500 to-rose-500"
  },
  { 
    id: "nectarine", 
    name: "Nectarine", 
    description: "Smooth and succulent nectarines",
    image: "/nectarine/image.png",
    color: "from-orange-500 to-red-500"
  },
  { 
    id: "janarek", 
    name: "Janarek", 
    description: "Premium quality janarek",
    image: "/janarek/image.png",
    color: "from-yellow-600 to-orange-600"
  },
  { 
    id: "peach", 
    name: "Peach", 
    description: "Juicy and fragrant peaches",
    image: "/peach/image4.png",
    color: "from-orange-400 to-pink-500"
  },
  { 
    id: "cherry", 
    name: "Cherry", 
    description: "Sweet and tart cherries",
    image: "/cherry/image.png",
    color: "from-red-600 to-rose-700"
  },
  { 
    id: "water-melon", 
    name: "Watermelon", 
    description: "Refreshing and sweet watermelon",
    image: "/water-melon/image.png",
    color: "from-green-500 to-red-500"
  },
  { 
    id: "jujube", 
    name: "Jujube", 
    description: "Delicious and nutritious jujube",
    image: "/jujube/image.png",
    color: "from-red-700 to-amber-700"
  },
]

export default function FruitesGallery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Our Fruit <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of fresh Australian fruits. Click on any fruit to view the complete gallery.
            </p>
          </motion.div>

          {/* Fruit Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {fruits.map((fruit, index) => (
              <motion.div
                key={fruit.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/fruites/${fruit.id}`}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer">
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={fruit.image}
                        alt={fruit.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Hover Arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-white rounded-full p-2 shadow-lg">
                          <ArrowRight className="w-5 h-5 text-green-700" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className={`inline-block bg-gradient-to-r ${fruit.color} px-3 py-1 rounded-full text-xs font-semibold text-white mb-3`}>
                        Premium Quality
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                        {fruit.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {fruit.description}
                      </p>
                      <div className="flex items-center text-green-700 font-semibold group-hover:gap-2 transition-all">
                        <span>View Gallery</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Decorative Border on Hover */}
                    <div className="absolute inset-0 border-2 border-green-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Interested in Our Products?
            </h2>
            <p className="text-lg mb-8 text-green-50">
              Contact us for wholesale inquiries and shipping information
            </p>
            <Link href="/contactUs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
