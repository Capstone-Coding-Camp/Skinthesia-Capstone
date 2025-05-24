import LoginModal from '@views/LandingPage/sections/Login';
import { useLoginPresenter } from '@presenters/hooks/useLoginPresenter';

export default function LoginPresenter({ isOpen, onClose, onLogin, onOpenSignup }) {
  const presenter = useLoginPresenter(onLogin);

  return (
    <LoginModal
      isOpen={isOpen}
      onClose={onClose}
      onOpenSignup={onOpenSignup}
      presenter={presenter}
    />
  );
}
