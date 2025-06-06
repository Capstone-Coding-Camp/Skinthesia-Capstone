// src/components/top-brand/ProductListView.jsx
import React from 'react';
import ProductCardView from './productCard';

const ProductListView = ({ products, onOpenModal }) => {
  return (
    <main>
      <section id="product" className="@container flex flex-wrap justify-center items-center pt-8 xl:pt-10 2xl:pt-12 pb-10">
        <div className="flex w-[92vw] gap-2 flex-wrap justify-evenly items-center pt-6">
          {products.map((product) => (
            <ProductCardView
              key={product.id}
              product={product}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductListView;