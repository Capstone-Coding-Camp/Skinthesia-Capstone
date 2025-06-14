// src/components/FAQPageView.jsx
import React, { useState } from 'react';

const FAQComponent = ({ faqs }) => {
  const [openFAQId, setOpenFAQId] = useState(null); 

  const handleToggleFAQ = (id) => {
    setOpenFAQId(prevId => (prevId === id ? null : id));
  };

  return (
    <section id="faq-section" className="@container w-full">
      <div className="flex flex-wrap pb-6 pt-2 md:pb-10 md:pt-6 items-center justify-center">
        {/* Header FAQ */}
        <div className="flex w-full mx-auto items-center justify-center">
          <div className="bg-tersier-pink w-[110px] h-[60px] rounded-[12px] lg:w-[175px] lg:rounded-[20px] lg:h-[94px] flex relative justify-center items-center">
            <h3 className="font-serif text-3xl md:text-4xl xl:text-5xl tracking-wider flex text-white font-bold">
              FAQ
            </h3>
          </div>
        </div>
        <div className="flex justify-center items-center max-w-[75vw]">
          <h1 className="flex mt-6 md:mt-8 mb-2 pt-4 text-4xl/14 text-center md:text-5xl/16 lg:text-6xl/18 font-serif align-center font-bold">
            FREQUENTLY ASKED QUESTIONS
          </h1>
        </div>
        <div className="flex justify-center items-center w-[75vw] pt-4 md:pt-12 pb-6 lg:pb-10 2xl:pb-16">
          <p className="flex text-lg/7 md:text-2xl/9 font-sans text-center align-center tracking-wide text-wrap">
            Find answers to common questions about dry skin that many people don't know.
          </p>
        </div>

        {/* Daftar FAQ */}
        <div className="flex flex-wrap w-[75vw] justify-center items-center pt-6 pb-8 mb-6 lg:pt-12 lg:pb-26">
          {faqs.map((faq) => (
            <React.Fragment key={faq.id}>
              <div className="flex w-full">
                <div className="bg-black w-full h-[0.15rem] rounded-full"></div>
              </div>
              <div className="flex w-full justify-between items-center px-6 mb-4 pt-2">
                <p className="text-lg/7 md:text-2xl/9 inline font-sans font-bold text-justify tracking-wide text-wrap pt-2">
                  {faq.question}
                </p>
                <button
                  id={`faq-${faq.id}`}
                  className={`cursor-pointer inline ml-6 mr-2 lg:mr-6 ${openFAQId === faq.id ? 'rotate-180' : ''}`}
                  onClick={() => handleToggleFAQ(faq.id)}
                >
                  <div className="bg-transparent border-black border-r-2 border-b-2 rotate-45 w-[15px] h-[15px]"></div>
                </button>
              </div>
              <div
                id={`faq-answer-${faq.id}`}
                className={`flex justify-center items-center pt-2 mb-4 md:pt-6 px-6 ${openFAQId === faq.id ? '' : 'hidden'}`}
              >
                <p className="text-lg/7 md:text-2xl/9 text-justify font-inter tracking-wide text-wrap">
                  {faq.answer}
                </p>
              </div>
            </React.Fragment>
          ))}
          {/* Garis pemisah terakhir */}
          <div className="flex w-full">
            <div className="bg-black w-full h-[0.15rem] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQComponent;