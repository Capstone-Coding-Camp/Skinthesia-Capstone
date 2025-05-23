import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import BestSellers from './sections/BestSellers';
import SkinConcerns from './sections/SkinConcerns';
import ProductsSections from './sections/ProductsSections';
import Collections from './sections/Collections';
import Testimonials from './sections/Testimonials';
import Footer from './sections/Footer';

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      <HeroSection />
      <BestSellers />
      <SkinConcerns />
      <ProductsSections />
      <Collections />
      <Testimonials />
      <Footer />
    </div>
  );
}
