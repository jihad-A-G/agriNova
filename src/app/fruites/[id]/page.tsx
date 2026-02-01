'use client'

import { useState, use } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "@/components/Navigation"
import { X, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react"
import Link from "next/link"

const fruitData: Record<string, { name: string; description: string; imageCount: number; color: string }> = {
  "redgrapes": { name: "Red Grapes", description: "Sweet and juicy red grapes from Australian vineyards", imageCount: 5, color: "from-purple-500 to-red-500" },
  "green-grapes": { name: "Green Grapes", description: "Crisp and refreshing green grapes", imageCount: 5, color: "from-green-500 to-emerald-500" },
  "black-grapes": { name: "Black Grapes", description: "Rich and flavorful black grapes", imageCount: 5, color: "from-purple-700 to-indigo-600" },
  "almonds": { name: "Almonds", description: "Premium quality Australian almonds", imageCount: 6, color: "from-amber-600 to-yellow-700" },
  "lychee": { name: "Lychee", description: "Exotic and sweet lychee", imageCount: 6, color: "from-pink-500 to-rose-500" },
  "nectarine": { name: "Nectarine", description: "Smooth and succulent nectarines", imageCount: 5, color: "from-orange-500 to-red-500" },
  "janarek": { name: "Janarek", description: "Premium quality janarek", imageCount: 3, color: "from-yellow-600 to-orange-600" },
  "peach": { name: "Peach", description: "Juicy and fragrant Australian peaches", imageCount: 5, color: "from-orange-400 to-pink-500" },
  "cherry": { name: "Cherry", description: "Sweet and tart cherries", imageCount: 6, color: "from-red-600 to-rose-700" },
  "water-melon": { name: "Watermelon", description: "Refreshing and sweet watermelon", imageCount: 5, color: "from-green-500 to-red-500" },
  "jujube": { name: "Jujube", description: "Delicious and nutritious jujube", imageCount: 6, color: "from-red-700 to-amber-700" },
}

export default function FruitGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const fruitId = resolvedParams.id
  const fruit = fruitData[fruitId]
  
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  if (!fruit) {
    return <div>Fruit not found</div>
  }

  const imageNames = ["image.png", "image1.png", "image2.png", "image3.png", "image4.png", "image5.png", "image6.png"]
  const images = imageNames.slice(0, fruit.imageCount).map((name) => `/${fruitId}/${name}`)
  const validImages = images.filter((_, index) => !imageErrors.has(index))

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index))
  }

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link href="/fruites">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-green-700 font-semibold mb-6 hover:text-green-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Gallery
            </motion.button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
              {fruit.name}
            </h1>
            <p className="text-xl text-gray-600">{fruit.description}</p>
          </motion.div>

          {/* Airbnb-style Photo Grid */}
          {!showAllPhotos ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <div className="grid grid-cols-4 gap-2 h-[500px] rounded-2xl overflow-hidden">
                {/* Large Image */}
                {!imageErrors.has(0) && (
                  <div className="col-span-4 md:col-span-2 row-span-2 relative cursor-pointer group" onClick={() => openLightbox(0)}>
                    <Image
                      src={images[0]}
                      alt={`${fruit.name} 1`}
                      fill
                      className="object-cover group-hover:brightness-90 transition-all duration-300"
                      onError={() => handleImageError(0)}
                    />
                  </div>
                )}

                {/* Grid Images */}
                {images.slice(1, 5).map((img, index) => (
                  !imageErrors.has(index + 1) && (
                    <div
                      key={index}
                      className="relative cursor-pointer group hidden md:block"
                      onClick={() => openLightbox(index + 1)}
                    >
                      <Image
                        src={img}
                        alt={`${fruit.name} ${index + 2}`}
                        fill
                        className="object-cover group-hover:brightness-90 transition-all duration-300"
                        onError={() => handleImageError(index + 1)}
                      />
                    </div>
                  )
                ))}
              </div>

              {/* Show All Photos Button */}
              <button
                onClick={() => setShowAllPhotos(true)}
                className="absolute bottom-6 right-6 bg-white border border-gray-300 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg"
              >
                <Grid3x3 className="w-4 h-4" />
                Show all photos
              </button>
            </motion.div>
          ) : (
            /* All Photos Grid View */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">All Photos</h2>
                <button
                  onClick={() => setShowAllPhotos(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                  Close
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  !imageErrors.has(index) && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative h-72 cursor-pointer group rounded-lg overflow-hidden"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={img}
                        alt={`${fruit.name} ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(index)}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </motion.div>
                  )
                ))}
              </div>
            </motion.div>
          )}

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">About This Product</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our {fruit.name.toLowerCase()} are carefully selected from the finest Australian farms. 
                Each piece is handpicked to ensure maximum freshness and quality for our customers in Lebanon.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                    <p className="text-gray-600">Handpicked and carefully inspected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fresh Delivery</h3>
                    <p className="text-gray-600">Temperature-controlled shipping from Australia</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Certified Excellence</h3>
                    <p className="text-gray-600">Meets international quality standards</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Interested in Ordering?</h3>
              <p className="text-gray-700 mb-6">
                Contact us for pricing, availability, and shipping information. We offer competitive rates for bulk orders.
              </p>
              <Link href="/contactUs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-3 rounded-full"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-3 rounded-full"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {!imageErrors.has(selectedImage) && (
              <motion.div
                key={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[selectedImage]}
                  alt={`${fruit.name} ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(selectedImage)}
                />
              </motion.div>
            )}

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-full">
              {selectedImage + 1} / {validImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
