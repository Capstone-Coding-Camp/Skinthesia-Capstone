import { useState } from 'react';

export function useProductsPresenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    handleSearchChange,
  };
}
