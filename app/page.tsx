"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useAnimation } from "framer-motion"
import { Instagram, Phone, MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Gallery data with images - Updated order and new images
const galleries = {
  "cakes-orders": {
    title: "עוגות להזמנות",
    images: [
      "/images/cake1.jpg",
      "/images/cake2.jpg",
      "/images/cake3.jpg",
      "/images/cake4.jpg",
      "/images/cake5.jpg",
      "/images/cake6.jpg",
      "/images/cake7.jpg",
      "/images/cake8.jpg",
      "/images/cake9.jpg",
      "/images/cake10.jpg",
      "/images/cake11.jpg",
      "/images/cake12.jpg",
      "/images/cake13.jpg",
      "/images/cake14.jpg",
      "/images/cake15.jpg",
      "/images/cake16.jpg",
      "/images/cake17.jpg",
      "/images/cake18.jpg",
      "/images/cake19.jpg",
      "/images/cake20.jpg",
      "/images/cake21.jpg",
      "/images/cake22.jpg",
      "/images/cake23.jpg",
    ],
  },
  "chocolate-eggs": {
    title: "שוקולד הפתעה להזמנות",
    images: [
      "/images/chocolate1.jpg",
      "/images/chocolate2.jpg",
      "/images/chocolate3.jpg",
      "/images/chocolate4.jpg",
      "/images/chocolate5.jpg",
      "/images/chocolate6.jpg",
      "/images/chocolate7.jpg",
    ],
  },
  "number-cakes": {
    title: "עוגות מספרים להזמנות",
    images: ["/images/number-new1.jpg", "/images/number-new2.jpg", "/images/number-new3.jpg"],
  },
  workshops: {
    title: "סדנאות",
    images: [
      "/images/workshop1.jpg",
      "/images/workshop2.jpg",
      "/images/workshop3.jpg",
      "/images/workshop4.jpg",
      "/images/workshop5.jpg",
      "/images/workshop6.jpg",
      "/images/workshop7.jpg",
    ],
  },
}

// Gallery Page Component
function GalleryPage({
  selectedGallery,
  onBack,
}: {
  selectedGallery: string
  onBack: () => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const x = useMotionValue(0)
  const controls = useAnimation()

  const gallery = galleries[selectedGallery as keyof typeof galleries]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length)
  }

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 100) {
      if (offset > 0) {
        prevImage()
      } else {
        nextImage()
      }
    }

    controls.start({ x: 0 })
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-amber-100 via-stone-50 to-amber-200 relative overflow-hidden"
      dir="rtl"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with back button */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2 text-stone-800 hover:bg-stone-200/50 px-4 py-2 rounded-full"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="font-medium">חזרה לעמוד הראשי</span>
          </Button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-800 font-serif">{gallery.title}</h1>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="px-4 sm:px-6 mb-8">
        <motion.div
          className="relative aspect-square md:aspect-video max-w-4xl mx-auto mb-6 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-amber-100 via-stone-50 to-amber-200"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
        >
          <Image
            src={gallery.images[currentImageIndex] || "/placeholder.svg"}
            alt={`${gallery.title} - תמונה ${currentImageIndex + 1}`}
            fill
            className="object-contain"
          />

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full z-10"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full z-10"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm">
            {currentImageIndex + 1} / {gallery.images.length}
          </div>

          {/* Swipe indicator for mobile */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm md:hidden bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
            החלק לשינוי תמונה
          </div>
        </motion.div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 max-w-6xl mx-auto">
          {gallery.images.map((image, index) => (
            <motion.button
              key={index}
              className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentImageIndex
                  ? "ring-4 ring-amber-400 scale-105"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              whileHover={{ scale: index === currentImageIndex ? 1.05 : 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image src={image || "/placeholder.svg"} alt={`תמונה ${index + 1}`} fill className="object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        className="bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 text-white py-12 mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 font-serif">מעוניינים להזמין?</h3>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <a href="https://wa.me/972507929011" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-3 h-6 w-6" />
                WhatsApp
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <a href="tel:0507929011">
                <Phone className="mr-3 h-6 w-6" />
                התקשר עכשיו
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Main Website Component
export default function SweetByRoniWebsite() {
  const [currentPage, setCurrentPage] = useState<"home" | "gallery">("home")
  const [selectedGallery, setSelectedGallery] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 800], [0, -200])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const openGallery = (galleryKey: string) => {
    setSelectedGallery(galleryKey)
    setCurrentPage("gallery")
  }

  const backToHome = () => {
    setCurrentPage("home")
    setSelectedGallery(null)
  }

  if (currentPage === "gallery" && selectedGallery) {
    return <GalleryPage selectedGallery={selectedGallery} onBack={backToHome} />
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-amber-100 via-stone-50 to-amber-200 relative overflow-hidden"
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-300/20 rounded-full"
            animate={{
              y: [-20, -100],
              x: [Math.random() * 100, Math.random() * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <motion.header
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          {/* Logo */}
          <motion.div
            className="mb-8 relative"
            initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.3, duration: 1.5, type: "spring", bounce: 0.3 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/images/logo-hd.jpg"
              alt="Sweet by Roni Logo"
              width={400}
              height={400}
              className="mx-auto rounded-full shadow-2xl max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[450px] relative z-10"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-20 blur-xl scale-110 animate-pulse"></div>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            className="text-stone-800 mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
            >
              עוגות מעוצבות בהתאמה אישית
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl font-light leading-relaxed text-stone-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
            >
              וסדנאות חווייתיות – הטעם שזוכרים, היופי שנשאר
            </motion.p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 sm:px-12 sm:py-6 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
            >
              <a href="https://wa.me/972507929011" target="_blank" rel="noopener noreferrer">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <MessageCircle className="mr-3 h-6 w-6 relative z-10" />
                <span className="relative z-10">הזמינו עכשיו</span>
              </a>
            </Button>
          </motion.div>

          {/* Scroll Indicator Arrow */}
          <motion.div
            className="mt-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              className="text-stone-600 text-sm font-medium mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              גלה עוד למטה
            </motion.div>
            <motion.div
              className="w-6 h-6 border-2 border-stone-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-stone-200/50 transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              onClick={() => {
                const categoriesSection = document.querySelector("[data-categories-section]")
                categoriesSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <motion.div
                className="w-2 h-2 border-b-2 border-r-2 border-stone-600 transform rotate-45"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Categories Section - Reordered as requested */}
      <motion.section
        data-categories-section
        className="py-12 px-4 md:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-16 text-stone-800 font-serif relative"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          הקטגוריות שלנו
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Top Row */}
          {/* Right Top - עוגות להזמנות */}
          <motion.div
            className="group cursor-pointer relative order-1 md:order-1"
            initial={{ y: 80, opacity: 0, rotateX: 45 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 0, duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
              y: -15,
              scale: 1.03,
              rotateY: 2,
              transition: { duration: 0.3 },
            }}
            onClick={() => openGallery("cakes-orders")}
          >
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src={galleries["cakes-orders"].images[0] || "/placeholder.svg"}
                alt={galleries["cakes-orders"].title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-800/20 to-transparent group-hover:from-stone-900/60 transition-all duration-500" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 font-serif drop-shadow-lg">
                  {galleries["cakes-orders"].title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-stone-200 text-lg font-medium">לחץ לצפייה בגלריה</p>
                  <motion.div
                    className="bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {galleries["cakes-orders"].images.length} תמונות
                  </motion.div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/5 group-hover:to-amber-400/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Left Top - שוקולד הפתעה להזמנות */}
          <motion.div
            className="group cursor-pointer relative order-2 md:order-2"
            initial={{ y: 80, opacity: 0, rotateX: 45 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.15, duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
              y: -15,
              scale: 1.03,
              rotateY: 2,
              transition: { duration: 0.3 },
            }}
            onClick={() => openGallery("chocolate-eggs")}
          >
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src={galleries["chocolate-eggs"].images[0] || "/placeholder.svg"}
                alt={galleries["chocolate-eggs"].title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-800/20 to-transparent group-hover:from-stone-900/60 transition-all duration-500" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 font-serif drop-shadow-lg">
                  {galleries["chocolate-eggs"].title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-stone-200 text-lg font-medium">לחץ לצפייה בגלריה</p>
                  <motion.div
                    className="bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {galleries["chocolate-eggs"].images.length} תמונות
                  </motion.div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/5 group-hover:to-amber-400/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Bottom Row */}
          {/* Right Bottom - עוגות מספרים להזמנות */}
          <motion.div
            className="group cursor-pointer relative order-3 md:order-3"
            initial={{ y: 80, opacity: 0, rotateX: 45 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
              y: -15,
              scale: 1.03,
              rotateY: 2,
              transition: { duration: 0.3 },
            }}
            onClick={() => openGallery("number-cakes")}
          >
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src={galleries["number-cakes"].images[0] || "/placeholder.svg"}
                alt={galleries["number-cakes"].title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-800/20 to-transparent group-hover:from-stone-900/60 transition-all duration-500" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 font-serif drop-shadow-lg">
                  {galleries["number-cakes"].title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-stone-200 text-lg font-medium">לחץ לצפייה בגלריה</p>
                  <motion.div
                    className="bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {galleries["number-cakes"].images.length} תמונות
                  </motion.div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/5 group-hover:to-amber-400/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Left Bottom - סדנאות */}
          <motion.div
            className="group cursor-pointer relative order-4 md:order-4"
            initial={{ y: 80, opacity: 0, rotateX: 45 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ delay: 0.45, duration: 0.8, type: "spring", bounce: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
              y: -15,
              scale: 1.03,
              rotateY: 2,
              transition: { duration: 0.3 },
            }}
            onClick={() => openGallery("workshops")}
          >
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              <Image
                src={galleries["workshops"].images[0] || "/placeholder.svg"}
                alt={galleries["workshops"].title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-800/20 to-transparent group-hover:from-stone-900/60 transition-all duration-500" />

              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 font-serif drop-shadow-lg">
                  {galleries["workshops"].title}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-stone-200 text-lg font-medium">לחץ לצפייה בגלריה</p>
                  <motion.div
                    className="bg-amber-500/90 text-white px-4 py-2 rounded-full text-sm font-bold"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {galleries["workshops"].images.length} תמונות
                  </motion.div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-orange-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/5 group-hover:to-amber-400/10 transition-all duration-300" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 text-white py-12 md:py-16 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-400/10"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.h3
            className="text-3xl md:text-4xl font-bold mb-12 font-serif"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            בואו נישאר בקשר
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
              >
                <a
                  href="https://www.instagram.com/sweet_by_roni_?igsh=eWZrYW93ZjVxeGto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Instagram className="mr-3 h-6 w-6 relative z-10" />
                  <span className="relative z-10">אינסטגרם</span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="bg-black hover:bg-gray-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
              >
                <a
                  href="https://www.tiktok.com/@sweet.by.roni?_t=ZS-8yjeYY0fESQ&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <div className="mr-3 h-6 w-6 bg-white rounded-full flex items-center justify-center relative z-10">
                    <span className="text-black text-sm font-bold">T</span>
                  </div>
                  <span className="relative z-10">טיקטוק</span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <a href="tel:0507929011">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Phone className="mr-3 h-6 w-6 relative z-10" />
                  <span className="relative z-10">התקשר עכשיו</span>
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <a href="https://wa.me/972507929011" target="_blank" rel="noopener noreferrer">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <MessageCircle className="mr-3 h-6 w-6 relative z-10" />
                  <span className="relative z-10">WhatsApp</span>
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="mt-12 pt-8 border-t border-stone-600 text-stone-400 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>© 2025 Sweet by Roni. כל הזכויות שמורות.</p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  )
}
