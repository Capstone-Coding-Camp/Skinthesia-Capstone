import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative bg-white lg:px-0 py-10 lg:py-11 overflow-hidden" id="hero">
      {/* Bintang twinkle */}
      <div className="absolute top-4 sm:top-0 ml-32 sm:ml-24; text-skpink text-3xl sm:text-4xl lg:text-6xl animate-twinkle">✦</div>
      <div className="absolute bottom-[300px] sm:bottom-[300px] left-1/2 transform -translate-x-1/2 text-skpink text-2xl sm:text-4xl lg:text-5xl animate-twinkle delay-200">✦</div>
      <div className="absolute bottom-[400px] sm:bottom-[400px] left-[55%] transform -translate-x-1/2 text-skpink text-xl sm:text-3xl lg:text-4xl animate-twinkle delay-[400ms]">✦</div>

      <div className="max-w-8xl mb-[120px] px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center gap-20 md:gap-32 lg:gap-40">
        {/* Kiri: Teks */}
        <motion.div
          className="w-full ml-0 sm:ml-8 md:ml-16 lg:ml-[200px] xl:ml-[250px] md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="font-serif text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold text-black leading-tight mb-6 md:mb-10">
            FIND YOUR <br />
            <span className="whitespace-nowrap">SKINCARE MATCH</span>
          </h1>

          <div className="w-full h-[2px] bg-black mb-5 max-w-xl" />

          <h2 className="flex items-baseline gap-2 mb-3 sm:mb-4">
            <span className="text-skpink text-3xl sm:text-[36px] md:text-[40px] font-['Corinthia']">Our</span>
            <span className="text-black text-2xl sm:text-[32px] md:text-[40px] font-serif font-bold">Approach</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-black font-sans max-w-xl mb-6 md:mb-10">
            Skinthesia uses AI-powered analysis to recommend skincare products based on your skin type and concerns.
          </p>

          <div className="w-full h-[2px] bg-black mb-10 md:mb-20 max-w-xl" />

          <div className="flex gap-6 md:gap-10 flex-wrap">
            <button className="bg-pink text-white font-serif text-lg sm:text-xl md:text-2xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:opacity-90 transition flex items-center gap-2">
              Skin Analysis <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <a
              href="#products"
              className="text-black font-sans text-base sm:text-lg md:text-xl underline font-bold hover:text-skpink transition inline-flex items-center"
            >
              Explore Products
            </a>
          </div>
        </motion.div>

        {/* Kanan: Gambar */}
        <motion.div
          className="w-full mr-0 sm:mr-5 md:mr-5 lg:mr-[200px] xl:mr-[250px] md:w-1/2 flex justify-center md:justify-end"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg rounded-t-full ml-auto">
            <div
              className="border-4 border-pink rounded-t-full absolute pointer-events-none"
              style={{
                top: '15px',
                left: '15px',
                right: '-25px',
                height: 'calc(100% + 10px)',
                borderRadius: '9999px 9999px 0 0',
                boxSizing: 'border-box',
              }}
            />
            <img
              src="/images/image-hero-section-full.png"
              alt="Hero Illustration"
              className="w-full h-[400px] sm:h-[480px] md:h-[550px] rounded-t-full object-cover scale-100 hover:scale-105 transition-transform duration-700 relative"
            />
          </div>
        </motion.div>
      </div>

      {/* Scrolling Banner */}
      <div className="w-full bg-pink text-white sm:py-7 overflow-hidden mt-24 md:mt-24">
        <div className="whitespace-nowrap flex animate-marquee">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="font-serif mx-3 text-base sm:text-lg md:text-xl flex items-center gap-4">
              AI-Powered Recommendations <span className="text-base">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
