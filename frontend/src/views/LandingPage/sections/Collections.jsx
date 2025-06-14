import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CollectionsView({
  collections,
  currentIndex,
  visibleCards,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}) {
  const cardWidthPercent = 100 / visibleCards;
  const totalWidthPercent = (collections.length * 100) / visibleCards;
  const translateXPercent = (currentIndex * 100) / collections.length;

  return (
    <section className="py-8 bg-white">
      <h2 className="text-4xl font-bold py-6 md:py-10 text-center">Collections</h2>

      <div className="relative overflow-hidden mx-6 p-6 lg:mx-12">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-10 mb-12"
          style={{
            width: `${totalWidthPercent}%`,
            transform: `translateX(-${translateXPercent}%)`,
          }}
        >
          {collections.map((item, idx) => (
            <motion.div
              key={idx}
              className="px-4  min-w-[455px] py-4 flex items-center gap-4 bg-white border border-pink rounded-xl shadow-xs"
              style={{ width: `${cardWidthPercent}%` }}
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
              <a
                href={
                  item.id === "morning-routine"
                    ? "/#/morning-routine"
                    : item.id === "night-recovery"
                    ? "/#/night-recovery"
                    : item.id === "acne-defense-kit"
                    ? "/#/acne-defense-kit"
                    : "/"
                }
                className="bg-pink text-[20px] text-white px-6 py-2 rounded-full hover:opacity-90 transition cursor-pointed"
              >
                View
              </a>
            </motion.div>
          ))}
        </div>

        {/* Arrow controls */}
        <div className="flex items-center justify-center gap-10 p-6 md:p-10">
          <button
            onClick={onPrev}
            disabled={isPrevDisabled}
            className={`p-2 border border-pink rounded-full text-pink transition ${
              isPrevDisabled
                ? "bg-gray-100 border-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200 hover:border-gray-400 cursor-pointed border-pink"
            }`}
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {[...Array(Math.ceil(collections.length / visibleCards)).keys()].map((idx) => (
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
            disabled={isNextDisabled}
            className={`p-2 border border-pink rounded-full text-pink transition ${
              isNextDisabled
                ? "bg-gray-100 border-gray-300 cursor-not-allowed"
                : "hover:bg-gray-200 hover:border-gray-400 cursor-pointed border-pink"
            }`}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Garis dan bintang */}
      <div className="relative mt-2">
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
