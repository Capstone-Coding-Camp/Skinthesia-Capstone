import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SkinConcernsView({ skinConcerns, index, visibleCards, onNext, onPrev, isPrevDisabled, isNextDisabled }) {
  const cardWidthPercent = 100 / visibleCards;
  
  // Filter kartu yang akan ditampilkan
  const cardsToDisplay = skinConcerns.slice(index, index + visibleCards);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 my-6 md:my-10"
    >
      <h2 className="text-4xl font-bold font-sans text-center mb-6 lg:mb-8">
        Top Picks for Your Skin Concerns
      </h2>
      <div className="relative py-8">
        {/* Arrow left */}
        <button
          onClick={onPrev}
          disabled={isPrevDisabled}
          className={`absolute z-10 left-0 md:left-4 lg:left-6 text-skpink top-1/2 -translate-y-1/2 bg-white rounded-full shadow-sm p-2 border border-skpink transition ${
            isPrevDisabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200 hover:border-gray-400 cursor-pointer"
          }`}
        >
          <FaChevronLeft />
        </button>

        {/* Carousel container */}
        <div className="overflow-hidden whitespace-nowrap mx-12 md:mx-16 lg:mx-20">
          <div
            className="flex justify-self-center self-center transition-transform gap-4 duration-300"
          >
            {cardsToDisplay.map((item, i) => (
              <motion.div
                key={i}
                className="min-w-[240px] max-w-[280px] min-h-[450px] md:min-h-[450px] border-2 border-pink rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl p-4 relative"
                style={{ width: `${cardWidthPercent}%` }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="bg-white flex min-h-[200px] max-h-[200px] rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-2xl 2xl:rounded-3xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-wrap w-full justify-start items-center">
                  <h3 className="font-bold text-wrap capitalized text-xl lg:text-2xl mt-4 mb-2 text-left">{item.title}</h3>
                  <p className="text-sm w-full md:mb-4 mb-6 text-wrap text-left">{item.desc}</p>
                  <div className="flex self-stretch w-full h-[80px]">
                    <a
                      href={
                        item.id === "dry-skin-concern"
                          ? "/#/dry-skin"
                          : item.id === "acne-prone-skin-concern"
                          ? "/#/acne-prone-skin"
                          : item.id === "oily-skin-concern"
                          ? "/#/oily-skin"
                          : item.id === "dull-skin-concern"
                          ? "/#/dull-skin"
                          : item.id === "blackhead-skin-concern"
                          ? "/#/blackhead-skin"
                          : item.id === "inflamed-skin-concern"
                          ? "/#/inflamed-skin"
                          : "/"
                      }
                      className="bg-pink text-[20px] text-white px-6 cursor-pointer py-2 rounded-full hover:opacity-90 transition inline-block absolute left-0 bottom-0 mb-4 ml-4 text-left"
                    >
                      View More
                    </a>
                  </div>
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow right */}
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`absolute z-10 right-0 md:right-4 lg:right-6 text-skpink top-1/2 -translate-y-1/2 bg-white rounded-full shadow-sm p-2 border border-skpink transition ${
            isNextDisabled
              ? "bg-gray-100 border-gray-300 cursor-not-allowed"
              : "hover:bg-gray-200 hover:border-gray-400 cursor-pointer"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.section>
  );
}