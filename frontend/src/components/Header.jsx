import { Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import LoginView from '@views/LandingPage/sections/Login';
import SignupView from '@views/LandingPage/sections/Signup';

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
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      <header className="flex justify-between items-center h-[100px] fixed top-0 bg-white/30 backdrop-blur-sm z-[500] w-full">
        <div className="text-skpink text-3xl align-top font-bold font-serif ml-6 md:ml-10 lg:ml-14">
          <Link to="/" onClick={closeMenu}>Skinthesia</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center font-sans mr-4 md:mr-5 lg:mr-10 space-x-2 md:space-x-6 lg:space-x-10 xl:space-x-16 text-xl md:text-base lg:text-xl">
          {isLandingPage ? (
            <>
              <a href="#home" className={navLinkClass('home')} onClick={closeMenu}>Home</a>
              <a href="#products" className={navLinkClass('products')} onClick={closeMenu}>Products</a>
              <a href="#testimonials" className={navLinkClass('testimonials')} onClick={closeMenu}>Testimonial</a>
              <a href="#contact" className={navLinkClass('contact')} onClick={closeMenu}>Contact Us</a>
            </>
          ) : (
            <>
              <Link to="/" className={navLinkClass('home')} onClick={closeMenu}>Home</Link>
              <Link to="/products" className={navLinkClass('products')} onClick={closeMenu}>Products</Link>
              <Link to="/testimonials" className={navLinkClass('testimonials')} onClick={closeMenu}>Testimonial</Link>
              <Link to="/contact" className={navLinkClass('contact')} onClick={closeMenu}>Contact Us</Link>
            </>
          )}

          {user ? (
            <button
              onClick={() => {
                onLogout();
                closeMenu();
              }}
              className="text-black text-[15px] font-semibold hover:text-skpink transition px-4 py-2 border border-skpink rounded-md ml-4"
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center space-x-4 md:ml-4 lg:ml-10">
              <button
                onClick={() => {
                  openLogin();
                  closeMenu();
                }}
                className="text-black text-[15px] font-semibold hover:text-skpink transition px-4 py-2 border border-skpink rounded-md"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  openSignup();
                  closeMenu();
                }}
                className="bg-pink text-[15px] text-white font-semibold hover:bg-skpink transition px-4 py-2 rounded-md"
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
            {isLandingPage ? (
              <>
                <a href="#home" className={navLinkClass('home')} onClick={closeMenu}>Home</a>
                <a href="#products" className={navLinkClass('products')} onClick={closeMenu}>Products</a>
                <a href="#testimonials" className={navLinkClass('testimonials')} onClick={closeMenu}>Testimonial</a>
                <a href="#contact" className={navLinkClass('contact')} onClick={closeMenu}>Contact Us</a>
              </>
            ) : (
              <>
                <Link to="/" className={navLinkClass('home')} onClick={closeMenu}>Home</Link>
                <Link to="/products" className={navLinkClass('products')} onClick={closeMenu}>Products</Link>
                <Link to="/testimonials" className={navLinkClass('testimonials')} onClick={closeMenu}>Testimonial</Link>
                <Link to="/contact" className={navLinkClass('contact')} onClick={closeMenu}>Contact Us</Link>
              </>
            )}

            <Search className="w-5 h-5 cursor-pointer hover:text-skpink transition" />

            {user ? (
              <button
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className="w-full text-center text-black font-semibold hover:text-skpink transition border border-skpink rounded-md px-4 py-2"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    openLogin();
                    closeMenu();
                  }}
                  className="w-full text-center text-black font-semibold hover:text-skpink transition border border-skpink rounded-md px-4 py-2"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openSignup();
                    closeMenu();
                  }}
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
        <LoginView
          onClose={closeLogin}
          onLogin={(data) => {
            const success = onLogin(data);
            if (success) closeLogin();
          }}
          onOpenSignup={() => {
            closeLogin();
            openSignup();
          }}
        />
      )}

      {isSignupOpen && (
        <SignupView
          onClose={closeSignup}
          onSignup={(data) => {
            const success = onSignup(data);
            if (success) closeSignup();
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
