// src/pages/DrySkinPageView.jsx
import React from 'react';
import ContentRenderer from '@components/SkinConcernComponents/contentRenderer';
import ImageBlock from '@components/SkinConcernComponents/imageBlock';
import Marquee from '@components/marquee';
import FAQComponent from '@components/SkinConcernComponents/faq';
import BackToHomeButtonPresenter from '@presenters/BackToHomePresenter'
import FooterView from '@components/side-footer';

const SkinConcernEduPageView = ({ pageData, loading, error }) => {
  if (loading) {
    return <div className="p-4 text-center">Loading content...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!pageData) {
    return <div className="p-4 text-center">Content not found.</div>;
  }

  return (
    <>
      <BackToHomeButtonPresenter />
      <section className="w-full">
        <div className="flex flex-wrap mt-18 lg:mb-8 py-6 md:py-12 items-center w-full">
          {/* Judul Utama */}
          <div className="items-center justify-center flex w-full pt-6 pb-2 md:pt-12 md:pb-8 lg:mx-auto lg:py-16">
            <h1 className="text-4xl text-center md:text-5xl lg:text-6xl font-bold font-serif text-primary-pink">
              {pageData.title}
            </h1>
          </div>

          {/* Gambar Utama */}
          <ImageBlock
            src={pageData.imageUrl}
            alt={pageData.imageAlt}
            className="w-full"
            innerDivClass="w-[75vw]"
          />

          {/* Konten Artikel */}
          <article className="items-center justify-center flex flex-wrap w-full 2xl:px-52 py-4 md:py-8 md:my-6">
            <ContentRenderer blocks={pageData.sections} />
          </article>

          {/* Marquee */}
          <div className="w-full bg-pink text-white py-4 my-4 overflow-hidden ">
            <Marquee text="AI-Powered Recommendations" />
          </div>
        </div>

        {/* FAQ Section */}
        <FAQComponent faqs={pageData.faqSection}/>
      </section>
      <FooterView />
    </>
  );
};

export default SkinConcernEduPageView;