import HeroSection from './sections/HeroSection';
import BestSellersPresenter from '@presenters/BestSellersPresenter';
import SkinConcernsPresenter from '@presenters/SkinConcernsPresenter';
import CollectionsPresenter from '@presenters/CollectionsPresenter';
import ProductsSections from './sections/ProductsSections';
import Testimonials from './sections/Testimonials';
import FooterPresenter from '../../presenters/FooterPresenter';

export default function LandingPage({ user }) {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection user={user}/>
      <BestSellersPresenter />
      <SkinConcernsPresenter />
      <ProductsSections />
      <CollectionsPresenter />
      <Testimonials />
      <FooterPresenter />
    </div>
  );
}
