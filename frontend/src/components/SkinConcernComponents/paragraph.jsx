import React from 'react';

const Paragraph = ({ text }) => {
  // Menggunakan dangerouslySetInnerHTML karena teks Anda memiliki tag <em>
  return (
    <div className="flex w-[75vw] my-2 py-4">
      <p className="text-lg/9 md:text-2xl/11 font-sans text-justify tracking-wide" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default Paragraph;