import React from 'react';

const ImageBlock = ({ src, alt, className = "", innerDivClass = "", caption = "" }) => {
  return (
    <div className={`${className} items-center justify-center flex w-full 2xl:px-52 py-4 md:py-8 md:my-6`}>
      <div className={`${innerDivClass} w-[75vw] items-center justify-center relative`}>
        <img src={src} alt={alt} className="static z-20 w-[95%] object-cover" />
        <div className="-z-10 w-[95%] h-full absolute top-0 left-0 rounded-[30px] lg:rounded-[58px] 3xl:rounded-[75px] bg-transparent border-tersier-pink border-4 translate-x-[3%] translate-y-[5%]" />
      </div>
      {caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </div>
  );
};

export default ImageBlock;