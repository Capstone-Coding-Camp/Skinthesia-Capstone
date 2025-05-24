import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CollectionsView({ collections, currentIndex, onPrev, onNext }) {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-4xl font-bold mb-[60px] text-center">Collections</h2>

      <div className="relative overflow-hidden">
        <div
          className="flex px-8 sm:px-8 transition-transform duration-500 ease-in-out gap-10 mb-20"
          style={{
            transform: `translateX(-${currentIndex * 50}%)`,
            width: `${collections.length * 50}%`,
          }}
        >
          {collections.map((item, idx) => (
            <motion.div
              key={idx}
              className="w-1/2 px-8 py-8 flex items-center gap-4 bg-white border border-pink rounded-xl shadow-sm"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-18 h-18 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-5">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              </div>
              <button className="bg-pink text-[20px] text-white text-sm px-8 py-4 rounded-full hover:opacity-90 transition">
                View
              </button>
            </motion.div>
          ))}
        </div>

        {/* Arrows and dots */}
        <div className="flex items-center justify-center gap-10 mt-12 px-10">
          <button
            onClick={onPrev}
            className="p-2 border border-pink rounded-full hover:bg-pink hover:text-white transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-3">
            {collections.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === idx ? "bg-pink" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            className="p-2 border border-pink rounded-full hover:bg-pink hover:text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Garis dan bintang */}
      <div className="relative mt-20">
        <div className="h-[2px] bg-skpink w-full" />
        <motion.div
          className="absolute left-20 -top-5 text-skpink text-3xl sm:text-4xl lg:text-4xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 20, -20, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ✦
        </motion.div>
      </div>
    </section>
  );
}
