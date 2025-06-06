import HeroSection from './sections/HeroSection';
import BestSellersPresenter from '@presenters/BestSellersPresenter';
import SkinConcernsPresenter from '@presenters/SkinConcernsPresenter';
import CollectionsPresenter from '@presenters/CollectionsPresenter';
import ProductsPresenter from '@presenters/ProductsPresenter';
import Testimonials from './sections/Testimonials';
import FooterPresenter from '@presenters/FooterPresenter';
import BackToHomeButtonPresenter from '@presenters/BackToHomePresenter'

export default function LandingPage({ user }) {
  return (
    <div className="bg-transparent text-gray-800">
      <HeroSection user={user}/>
      <BestSellersPresenter />
      <SkinConcernsPresenter />
      <ProductsPresenter />
      <CollectionsPresenter />
      <Testimonials />
      <FooterPresenter />
      <BackToHomeButtonPresenter />
    </div>
  );
}
