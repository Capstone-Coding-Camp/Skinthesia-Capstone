import TopBrandHeroView from '@components/BestSellerDetail/hero';
import ProductListView from '@components/BestSellerDetail/productList';
import ModalView from '@components/BestSellerDetail/modalDetail';
import BackToHomeButtonPresenter from '@presenters/BackToHomePresenter'
import FooterView from '@components/side-footer';

const TopBrandPageView = ({ loading, error, heroData, products, isModalOpen, selectedProduct, handleOpenModal, handleCloseModal }) => {
  if (loading) {
    return <div className="p-4 text-center">Loading top brands...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!heroData || !products) {
    return <div className="p-4 text-center">Content not found.</div>;
  }

  return (
    <>
      <BackToHomeButtonPresenter />
      <TopBrandHeroView
        titlePrefix={heroData.titlePrefix}
        titleHighlight={heroData.titleHighlight}
        titleSuffix={heroData.titleSuffix}
        imageSrc={heroData.imageSrc}
        imageAlt={heroData.imageAlt}
      />
      <ProductListView products={products} onOpenModal={handleOpenModal} />
      <ModalView isOpen={isModalOpen} product={selectedProduct} onCloseModal={handleCloseModal} />
      <FooterView />
    </>
  );
};

export default TopBrandPageView;