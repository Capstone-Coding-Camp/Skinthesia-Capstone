// src/components/common/FooterView.jsx
import React from 'react';

const FooterView = () => {
  return (
    <footer className="bg-tersier-pink flex h-[10vh] left-0 bottom-0 flex-nowrap justify-between items-center px-8 md:px-16">
      <div className="flex justify-between h-[40%] max-h-[40px] md:max-h-[30px] items-center gap-4 lg:gap-6">
        <p className="font-inter text-center text-sm md:text-base text-white">
          Copyright &copy; 2024
        </p>
        <span className="bg-white w-[0.2rem] h-full rounded-full"></span>
        <p className="font-inter text-center text-base text-white">
          All rights reserved
        </p>
      </div>
      <div className="flex justify-between h-[40%] max-h-[40px] sm:max-h-[30px] items-center gap-4 lg:gap-6">
        <p className="font-inter text-center text-sm md:text-base text-white">
          Privacy Police
        </p>
        <span className="bg-white w-[0.2rem] h-full rounded-full"></span>
        <p className="font-inter text-center text-base text-white">Terms of Use.</p>
      </div>
    </footer>
  );
};

export default FooterView;