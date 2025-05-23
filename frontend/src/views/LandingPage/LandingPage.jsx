import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import BestSellers from './sections/BestSellers';
import SkinCarousel from './sections/SkinConcerns';

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <HeroSection />
      <BestSellers />
      <SkinCarousel />
    </div>
  );
}
