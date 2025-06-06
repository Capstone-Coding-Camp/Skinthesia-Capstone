import { motion } from "framer-motion";
import { useEffect } from "react";

const BestSellers = ({ items }) => {
  // Compute rawData for debugging and validation
  const rawData = items.map(item => ({
    id: item.id
  }));
  useEffect(() => {
    console.log("Raw Data :", rawData);
    if(rawData.length === 0) {
      throw new Error('No data found for your Best Seller Product');
    }
  }, [rawData]);

  // Helper to get the correct link for each item
  const getItemLink = (id) => {
    switch (id) {
      case "best-facial-wash":
        return "/best-facial-wash";
      case "best-toner":
        return "/best-toner";
      case "best-essense":
        return "/best-essense";
      case "best-serum":
        return "/best-serum";
      case "best-moisturizer":
        return "/best-moisturizer";
      case "best-sunscreen":
        return "/best-sunscreen";
      default:
        return "/";
    }
  };

  return (
    <motion.section
      id="best-sellers"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-5 bg-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl flex self-center justify-center py-6  font-bold font-sans text-center"
      >
        Best Sellers
      </motion.h2>

      <div className="flex justify-center self-center py-8 m-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-6 xl:gap-12 w-[90vw] p-2">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={getItemLink(item.id)}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white duration-300 text-center"
              >
                <motion.img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-auto object-contain mb-3"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <p className="font-semibold font-sans text-lg md:text-xl hover:underline hover:text-skpink transition duration-300">
                  {item.label}
                </p>
              </motion.div>
            </a>
          ))}
        </div>
      </div>

      {/* Garis dan bintang */}
      <div className="relative mt-12">
        <div className="h-[2px] bg-skpink w-full" />
        <motion.div
          className="absolute right-20 -top-5 text-skpink text-3xl sm:text-4xl lg:text-4xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ✦
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BestSellers;
