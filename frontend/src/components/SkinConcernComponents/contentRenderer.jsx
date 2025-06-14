// src/components/ContentRenderer.jsx
import React from 'react';
import Paragraph from './paragraph';
import ImageBlock from './imageBlock'; 
import List from './list';
import Heading from './heading';

const ContentRenderer = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return null; 
  }

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`; 

        switch (block.type) {
          case 'paragraph':
            return <Paragraph key={key} text={block.text} />;
          case 'image':
            return <ImageBlock key={key} src={block.src} alt={block.alt} caption={block.caption} />;
          case 'list':
            return <List key={key} items={block.items} heading={block.heading} />;
          case 'heading':
            return <Heading key={key} level={block.level} text={block.text} />;
          default:
            console.warn(`Unknown content block type: ${block.type}`);
            return null; 
        }
      })}
    </>
  );
};

export default ContentRenderer;