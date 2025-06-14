import ProductsSection from '@views/LandingPage/sections/ProductsSections';
import { useProductsPresenter } from '@presenters/hooks/useProductsPresenter';

export default function ProductsPresenter() {
  const presenter = useProductsPresenter();

  return <ProductsSection {...presenter} />;
}
