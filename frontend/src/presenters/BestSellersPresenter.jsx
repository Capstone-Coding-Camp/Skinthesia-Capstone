import BestSellers from "@views/LandingPage/sections/BestSellers";
import { bestSellers } from "@models/bestSellersModel";

const BestSellersPresenter = () => {
  return <BestSellers items={bestSellers} />;
};

export default BestSellersPresenter;
