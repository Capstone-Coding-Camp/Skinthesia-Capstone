import { useNavigate } from 'react-router-dom';

export default function useHeroPresenter(user) {
  const navigate = useNavigate();

  const handleSkinAnalysisClick = () => {
    if (!user) {
      alert('Harus login dulu untuk mengakses Skin Analysis!');
      return;
    }
    navigate('/skinform');
  };

  return {
    handleSkinAnalysisClick,
  };
}
