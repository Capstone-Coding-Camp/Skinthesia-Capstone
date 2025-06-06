// src/components/BackToHomeButtonPresenter.jsx
import React from 'react';
import useBackToHomeVisibility from './hooks/useBackToHome'; // Import custom hook
import BackToHomeButtonView from '@components/backToHomeButton';

const BackToHomeButtonPresenter = () => {
  const isVisible = useBackToHomeVisibility();

  // Anda bisa menambahkan logic tambahan di sini jika diperlukan,
  // misalnya, menentukan URL tujuan 'homeUrl' secara dinamis.
  const homeUrl = "/"; // Contoh URL untuk kembali ke home

  return (
    <BackToHomeButtonView
      isVisible={isVisible}
      homeUrl={homeUrl}
    />
  );
};

export default BackToHomeButtonPresenter;