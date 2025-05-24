import SignupModal from '@views/LandingPage/sections/Signup';
import { useSignupModalPresenter } from '@presenters/hooks/useSignupModalPresenter';

export default function SignupPresenter(props) {
  const presenter = useSignupModalPresenter(props);
  return <SignupModal {...props} {...presenter} />;
}
