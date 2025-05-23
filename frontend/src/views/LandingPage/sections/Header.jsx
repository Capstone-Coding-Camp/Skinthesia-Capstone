import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 md:px-10 lg:px-16 h-[100px] sticky top-0 bg-white z-50 w-full">
      <div className="text-skpink text-3xl font-bold font-serif ml-6 md:ml-10 lg:ml-20">
        Skinthesia
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center font-sans mr-6 md:mr-10 lg:mr-20 space-x-6 md:space-x-10 lg:space-x-20 text-xl md:text-base lg:text-xl">
        <a href="#hero" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition">
          Home
        </a>
        <a href="#products" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition">
          Products
        </a>
        <a href="#testimonials" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition">
          Testimonial
        </a>
        <a href="#contact" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition">
          Contact Us
        </a>
        <Search className="w-5 h-5 hover:text-skpink cursor-pointer transition" />
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <X className="w-8 h-8 text-skpink" />
        ) : (
          <Menu className="w-8 h-8 text-skpink" />
        )}
      </button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-[121px] ml-20 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 space-y-4 text-base font-sans md:hidden">
          <a href="#hero" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition" onClick={() => setIsOpen(false)}>
            Home
          </a>
          <a href="#products" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition" onClick={() => setIsOpen(false)}>
            Products
          </a>
          <a href="#testimonials" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition" onClick={() => setIsOpen(false)}>
            Testimonial
          </a>
          <a href="#contact" className="text-black font-normal hover:font-semibold hover:text-skpink hover:underline transition" onClick={() => setIsOpen(false)}>
            Contact Us
          </a>
          <Search className="w-5 h-5 cursor-pointer hover:text-skpink transition" />
        </div>
      )}
    </header>
  );
}
