import { useEffect } from "react";
import anime from 'animejs';

export default function StarBackground() {
  useEffect(() => {
    const STAR_COUNT = 50;
    const sky = document.getElementById("home");

    const starPath = `
      <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg" id="star" class="z-[-9999] absolute pointer-events-none">
        <path d="M17 0L20.7265 16.2184L34 20.7716L20.7265 25.3248L17 41.5432L13.2735 25.3248L0 20.7716L13.2735 16.2184L17 0Z" fill="#E16463"/>
      </svg>
    `;

    for (let i = 0; i < STAR_COUNT; i++) {
      const div = document.createElement("div");
      div.innerHTML = starPath;
      const star = div.firstElementChild;

      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const depth = Math.random();
      const scale = 0.5 + Math.random() * 0.8;

      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.dataset.depth = depth.toFixed(2);
      star.dataset.scale = scale.toFixed(2);

      sky?.appendChild(star);

      const delay = Math.random() * 20000;

      anime({
        targets: star,
        scale: [{ value: 0 }, { value: 1 }, { value: 0 }],
        duration: 1000,
        easing: "easeInOutSine",
        loop: true,
        delay: delay,
      });
    }

    const onMouseMove = (e) => {
      const stars = document.querySelectorAll("#star");
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;

      stars.forEach((star) => {
        const depth = star.dataset.depth;
        const movementX = offsetX * 20 * depth;
        const movementY = offsetY * 20 * depth;

        star.style.transform = `translate(${movementX}px, ${movementY}px) scale(${star.dataset.scale})`;
      });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll("#star").forEach((el) => el.remove());
    };
  }, []);

  return null;
}
