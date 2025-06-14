import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import anime from 'animejs';
import useHeroPresenter from '@presenters/hooks/useHeroPresenter';
import Marquee from '@components/marquee';

export default function HeroSection({ user }) {
  const { handleSkinAnalysisClick } = useHeroPresenter(user);

  useEffect(() => {
    const STAR_COUNT = 50;
    const sky = document.getElementById('hero');

    if (!sky) return; // Ensure sky element exists

    // Add mousemove event listener
    const handleMouseMove = (e) => {
      const stars = document.querySelectorAll('#star');
      const skyRect = sky.getBoundingClientRect();
      const centerX = skyRect.left + skyRect.width / 2;
      const centerY = skyRect.top + skyRect.height / 2;

      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      stars.forEach(star => {
        const depth = star.dataset.depth;
        const movementX = offsetX * 20 * depth;
        const movementY = offsetY * 20 * depth;

        star.style.transform = `translate(${movementX}px, ${movementY}px) scale(${star.dataset.scale})`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // SVG path for the star
    const starPath = `
      <svg width="34" height="42" viewBox="0 0 34 42" fill="#E16463" xmlns="http://www.w3.org/2000/svg" id="star" class="-z-10 absolute">
        <path d="M17 0L20.7265 16.2184L34 20.7716L20.7265 25.3248L17 41.5432L13.2735 25.3248L0 20.7716L13.2735 16.2184L17 0Z" fill="#E16463"/>
      </svg>
    `;

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      const div = document.createElement('div');
      div.innerHTML = starPath;
      const star = div.firstElementChild;

      // Get dimensions of the hero section
      const heroWidth = sky.offsetWidth;
      const heroHeight = sky.offsetHeight;

      // Random position within the hero section
      const x = Math.random() * heroWidth;
      const y = Math.random() * heroHeight;
      const depth = Math.random(); // 0.0 - 1.0
      const sizer = Math.random() + Math.random() - 0.3; // 0.0 - 1.0
      const scale = 0.5 + Math.random() * 0.8;

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.dataset.depth = depth.toFixed(2);
      star.dataset.scale = scale.toFixed(2);

      sky.appendChild(star);


      // Random delay so stars don't all twinkle at the same time
      const delay = Math.random() * 20000;

      anime({
        targets: star,
        scale: [
          { value: 0, duration: 0 },
          { value: sizer, duration: 1600 },
          { value: 0, duration: 800 }
        ],
        easing: 'easeInOutSine',
        loop: true,
        delay: delay
      });
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      const stars = document.querySelectorAll('#star');
      stars.forEach(star => star.remove());
    };
  }, []);

  return (
  <section className="@container max-w-[100vw] flex flex-col items-center justify-center min-h-screen">
    <div className="mt-22 pt-2 md:pt-8 flex flex-wrap justify-center items-center relative overflow-hidden w-full" id="hero">
      <div className="flex flex-wrap justify-center items-center relative overflow-hidden w-full bg-slate-100/55 px-4 py-8 backdrop-blur-xs max-w-[95vw] md:w-[95vw] lg:w-[90vw] rounded-3xl">
        <div className="max-w-[85vw] w-[90vw] lg:w-[85vw] z-50 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center">
          {/* Kiri: Teks */}
          <motion.div
            className="w-full md:ml-4 md:w-[50%] py-4 pr-4 flex flex-col justify-start items-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="font-serif md:flex w-full text-4xl justify-self-center text-center md:text-left lg:text-5xl xl:text-6xl whitespace-nowrap font-bold text-black leading-tight md:ml-4 mb-4 md:mb-6">
              FIND YOUR <br />
              SKINCARE MATCH
            </h1>

            <div id="line1" className="w-full self-start h-[2px] bg-black mb-4 md:mb-6 max-w-2xl" />

            <h2 className="flex items-baseline w-full gap-2 md:ml-4 mb-1 md:mb-2 justify-center md:justify-start">
              <span className="text-skpink text-3xl md:text-4xl xl:text-6xl text-wrap font-['Corinthia']">Our</span>
              <span className="text-black text-2xl md:text-3xl xl:text-4xl text-wrap font-serif font-bold">Approach</span>
            </h2>

            <p className="text-base w-full self-start items-baseline sm:text-lg flex md:text-xl text-center md:text-left text-black font-sans max-w-xl md:ml-4 mb-4 md:mb-6 justify-center md:justify-start">
              Skinthesia uses AI-powered analysis to recommend skincare products based on your skin type and concerns.
            </p>

            <div id="line2" className="w-full self-start h-[2px] bg-black mb-4 md:mb-6 max-w-2xl" />

            <div className="flex gap-2 w-full md:gap-4 mt-2 md:mx-4 flex-wrap justify-center md:justify-start">
              <button
                onClick={handleSkinAnalysisClick}
                className="bg-pink text-white font-serif text-lg sm:text-xl md:text-2xl font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:opacity-90 transition flex items-center gap-2"
              >
                Skin Analysis <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <a
                href="#best-sellers"
                className="text-black font-sans text-base sm:text-lg md:text-xl ml-4 xl:ml-0 underline font-bold hover:text-skpink transition inline-flex items-center"
              >
                Explore Products
              </a>
            </div>
          </motion.div>

          {/* Kanan: Gambar */}
          <motion.div
            id="picture"
            className="w-full mt-8 mb-6 md:mt-0 md:w-[35%] flex items-center justify-center min-w-[250px] lg:min-w-[350px] h-[350px] md:h-[420px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-[280px] min-w-[250px] lg:min-w-[320px] lg:max-w-[330px] h-[350px] md:h-[420px] shadow-lg rounded-t-full">
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
                src="/image-hero-section-full.png"
                alt="Hero Illustration"
                className="w-full max-w-[280px] min-w-[250px] lg:min-w-[320px] lg:max-w-[330px] h-[350px] md:h-[420px] rounded-t-full object-cover scale-100 hover:scale-105 transition-transform duration-700 relative"
              />
            </div>
          </motion.div>
        </div>
      </div>
      {/* Marquee */}
      <div className="w-full bg-pink text-white py-4 mt-12 overflow-hidden">
        <Marquee text="AI-Powered Recommendations" />
      </div>

    </div>
  </section>
);
}