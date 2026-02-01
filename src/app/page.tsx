'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Globe, Ship, Leaf, Award, CheckCircle } from "lucide-react"
import Navigation from "@/components/Navigation"

export default function Home() {
  const features = [
    { icon: Leaf, title: "Premium Quality", description: "Handpicked fresh fruits from Australian farms" },
    { icon: Ship, title: "Global Shipping", description: "Direct shipping from Australia to Lebanon" },
    { icon: Award, title: "Certified Excellence", description: "Meeting international quality standards" },
  ]

  const fruits = [
    { name: "Grapes", image: "/redgrapes/image.png" },
    { name: "Almonds", image: "/almonds/image4.png" },
    { name: "Peaches", image: "/peach/image4.png" },
    { name: "Cherries", image: "/cherry/image.png" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/green-grapes/image4.png')] opacity-90 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f2]/10 via-[#f8f7f2]/30 to-[#f8f7f2]/50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="bg-green-100 text-green-700 px-6 py-2 rounded-full font-medium">
                🇦🇺 From Australia to Lebanon 🇱🇧
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Premium Australian Fruits
              <br />
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Delivered Fresh
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Experience the finest selection of Australian fruits, carefully exported 
              and delivered to Lebanon with excellence and care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/fruites">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  Explore Our Gallery
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href="/contactUs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-2 border-green-600 text-green-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-50 transition-colors shadow-md"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
          >
            Why Choose AgriNova?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-green-100"
              >
                <div className="bg-gradient-to-br from-green-500 to-green-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Story
              </h2>
              <p className="text-lg mb-6 text-green-50 leading-relaxed">
                AgriNova bridges the distance between Australia's fertile farms and Lebanon's 
                vibrant markets. We specialize in exporting premium quality fruits, ensuring 
                they arrive fresh and delicious.
              </p>
              <p className="text-lg text-green-50 leading-relaxed mb-8">
                With years of experience in international fruit trade, we've built a reputation 
                for reliability, quality, and exceptional customer service.
              </p>
              <div className="space-y-3">
                {["Expert Handling", "Temperature Controlled Shipping", "Quality Guaranteed"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/cherry/image.png"
                alt="Fresh fruits"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Our Premium Selection
            </h2>
            <p className="text-xl text-gray-600">
              Explore our diverse range of fresh Australian fruits
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {fruits.map((fruit, index) => (
              <motion.div
                key={fruit.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
              >
                <Image
                  src={fruit.image}
                  alt={fruit.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-white text-xl font-bold">{fruit.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/fruites">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                View Full Gallery
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold">AgriNova</span>
          </div>
          <p className="text-gray-400 mb-2">
            Premium Australian Fruits Export
          </p>
          <p className="text-gray-500">
            © 2026 AgriNova. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
