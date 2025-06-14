import FooterView from "@views/LandingPage/sections/Footer";
import { getFooterData } from "@presenters/hooks/useFooterPresenter";

const FooterPresenter = () => {
  const data = getFooterData();
  return <FooterView {...data} />;
};

export default FooterPresenter;
