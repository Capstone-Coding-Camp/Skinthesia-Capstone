import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SkinConcernsView({ skinConcerns, index, visibleCards, onNext, onPrev }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 mb-12 md:px-16 lg:px-64"
    >
      <h2 className="text-4xl font-bold font-sans text-center mb-12">
        Top Picks for Your Skin Concerns
      </h2>
      <div className="relative">
        {/* Arrow left */}
        <button
          onClick={onPrev}
          className="absolute z-10 left-0 md:left-4 lg:left-2 text-skpink top-1/2 -translate-y-1/2 bg-white rounded-full shadow-sm p-2 border border-skpink"
        >
          <FaChevronLeft />
        </button>

        {/* Carousel container */}
        <div className="overflow-hidden mx-12 md:mx-16 lg:mx-24">
          <div
            className="flex transition-transform duration-300"
            style={{
              width: `${(skinConcerns.length / visibleCards) * 100}%`,
              transform: `translateX(-${(index * 100) / skinConcerns.length}%)`,
            }}
          >
            {skinConcerns.map((item, i) => (
              <motion.div
                key={i}
                className="w-1/4 px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="bg-white rounded-xl p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="rounded-lg w-full h-[263px] object-cover mb-5"
                  />
                  <h3 className="font-semibold text-left">Complaint: {item.title}</h3>
                  <p className="text-sm mb-5 text-left">{item.desc}</p>
                  <a
                    href="#"
                    className="text-sky-600 text-sm mt-1 inline-block text-left w-full hover:font-bold"
                  >
                    Next…
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow right */}
        <button
          onClick={onNext}
          className="absolute z-10 right-0 md:right-4 lg:right-2 text-skpink top-1/2 -translate-y-1/2 bg-white rounded-full shadow-sm p-2 border border-skpink"
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.section>
  );
}
