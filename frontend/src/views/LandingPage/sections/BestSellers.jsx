import { motion } from "framer-motion";

const BestSellers = ({ items }) => {
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
        className="text-4xl md:px-16 lg:px-32 font-bold font-sans text-center mb-[40px]"
      >
        Best Sellers
      </motion.h2>

      <div className="grid grid-cols-2 md:px-16 lg:px-32 md:grid-cols-3 lg:grid-cols-6 gap-12">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white duration-300 text-center"
          >
            <motion.img
              src={item.image}
              alt={item.label}
              className="w-full h-64 object-contain mb-3"
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <p className="font-semibold font-sans text-lg md:text-xl hover:underline hover:text-skpink transition duration-300">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Garis dan bintang */}
      <div className="relative mt-24">
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
