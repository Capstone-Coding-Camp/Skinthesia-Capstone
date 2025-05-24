import { Search, Menu, X } from 'lucide-react';
import LoginPresenter from '@presenters/LoginPresenter';
import SignupPresenter from '@presenters/SignupPresenter';

export default function Header({
  user,
  isOpen,
  isLoginOpen,
  isSignupOpen,
  navLinkClass,
  openLogin,
  openSignup,
  closeLogin,
  closeSignup,
  toggleMenu,
  closeMenu,
  onLogin,
  onSignup,
  onLogout,
}) {
  return (
    <>
      <header className="flex justify-between items-center h-[100px] sticky top-0 bg-white z-50 w-full">
        <div className="text-skpink text-3xl font-bold font-serif ml-6 md:ml-10 lg:ml-20">
          Skinthesia
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center font-sans mr-4 md:mr-5 lg:mr-10 space-x-2 md:space-x-10 lg:space-x-20 text-xl md:text-base lg:text-xl">
          <a href="#hero" className={navLinkClass('hero')}>Home</a>
          <a href="#products" className={navLinkClass('products')}>Products</a>
          <a href="#testimonials" className={navLinkClass('testimonials')}>Testimonial</a>
          <a href="#contact" className={navLinkClass('contact')}>Contact Us</a>

          {user ? (
            <button
              onClick={onLogout}
              className="text-black text-[15px] font-semibold hover:text-skpink transition px-4 py-2 border border-skpink rounded-md ml-10"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center space-x-4 ml-10">
              <button
                onClick={openLogin}
                className="text-black text-[15px] font-semibold hover:text-skpink transition px-4 py-2 border border-skpink rounded-md"
              >
                Sign In
              </button>
              <button
                onClick={openSignup}
                className="bg-skpink text-[15px] text-white font-semibold hover:bg-pink-600 transition px-4 py-2 rounded-md"
              >
                Sign Up
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50" onClick={toggleMenu}>
          {isOpen ? <X className="w-8 h-8 text-skpink" /> : <Menu className="w-8 h-8 text-skpink" />}
        </button>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="absolute top-[121px] ml-20 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 text-base font-sans md:hidden">
            <a href="#hero" className={navLinkClass('hero')} onClick={closeMenu}>Home</a>
            <a href="#products" className={navLinkClass('products')} onClick={closeMenu}>Products</a>
            <a href="#testimonials" className={navLinkClass('testimonials')} onClick={closeMenu}>Testimonial</a>
            <a href="#contact" className={navLinkClass('contact')} onClick={closeMenu}>Contact Us</a>
            <Search className="w-5 h-5 cursor-pointer hover:text-skpink transition" />

            {user ? (
              <button
                onClick={() => { onLogout(); closeMenu(); }}
                className="w-full text-center text-black font-semibold hover:text-skpink transition border border-skpink rounded-md px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => { openLogin(); closeMenu(); }}
                  className="w-full text-center text-black font-semibold hover:text-skpink transition border border-skpink rounded-md px-4 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { openSignup(); closeMenu(); }}
                  className="w-full text-center bg-skpink text-white font-semibold hover:bg-pink-600 transition rounded-md px-4 py-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Modals */}
      {isLoginOpen && (
        <LoginPresenter
          isOpen={isLoginOpen}
          onClose={closeLogin}
          onLogin={(data) => {
            onLogin(data);
            closeLogin();
          }}
          onOpenSignup={() => {
            closeLogin();
            openSignup();
          }}
        />
      )}

      {isSignupOpen && (
        <SignupPresenter
          isOpen={isSignupOpen}
          onClose={closeSignup}
          onSignup={(data) => {
            onSignup(data);
            closeSignup();
          }}
          onOpenLogin={() => {
            closeSignup();
            openLogin();
          }}
        />
      )}
    </>
  );
}
