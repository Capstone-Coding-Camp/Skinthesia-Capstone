import { Search } from 'lucide-react';

export default function ProductsSection({ searchQuery, handleSearchChange }) {
  return (
    <div id="products" className="bg-white shadow-lg">
      <div className="bg-pink p-8 text-white text-center shadow-md shadow-skpink">
        <h1 className="text-[48px] font-bold mb-10">Products</h1>
        <div className="max-w-[883px] mx-auto mb-5 relative">
          <input
            type="text"
            placeholder="Looking for a new product today?"
            className="bg-white w-full px-5 py-4 pl-14 rounded-full text-black placeholder-gray-500 border border-transparent focus:border-skpink outline-hidden transition shadow-md"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
