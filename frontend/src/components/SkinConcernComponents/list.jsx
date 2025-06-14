import React from 'react';

const List = ({ items, heading }) => {
  return (
    <div className="flex flex-wrap w-[75vw] my-2 py-4">
      {heading && (
        <p className="flex w-full text-lg/9 md:text-2xl/11 text-justify font-sans tracking-wide">
          {heading}
        </p>
      )}
      <ul className="list-inside mt-2 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="w-[15px] justify-self-center self-center h-[15px] min-w-[15px] min-h-[15px] mr-6 bg-tersier-pink rounded-full" />
            <span className="text-lg/9 md:text-2xl/11 text-justify font-sans tracking-wide" dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;