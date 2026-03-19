import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import s251 from '../assets/s251.png'; // Extension check kar lena (.png ya .jpg)
import s252 from '../assets/s252.png';
import s253 from '../assets/s253.png';

function SimpleNavbar() {
  const { cartItems } = useCart();
  const totalItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // Mobile friendly
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* --- HERO SECTION WITH OVERLAY LINKS --- */}
      <div className='relative bg-black min-h-[600px] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-24 pb-10 overflow-hidden'>
        
        {/* Transparent Overlay Navbar */}
        <nav className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-6 bg-gradient-to-b from-black/60 to-transparent">
          <h2 className="text-white text-xl md:text-2xl font-bold tracking-tighter">SAMSUNG</h2>
          <div className="flex items-center gap-6 md:gap-10 text-white font-medium text-xs md:text-sm uppercase tracking-widest">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-blue-400 transition-colors">Shop</Link>
            <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
            <Link to="/cart" className="relative group">
              <span className="text-xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-black font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Left Side: Text Content */}
        <div className='max-w-xl text-center md:text-left z-10'>
          <h1 className='font-extrabold text-white text-2xl md:text-7xl leading-tight mb-6'>
            Discover the <br /> 
            <span className="text-blue-500 font-extrabold text-2xl md:text-6xl leading-tight mb-6">Samsung Galaxy <br/> Ultra Pro series</span>
          </h1>
          <p className='text-gray-400 text-base md:text-lg mb-8 max-w-md'>
            Experience the next era of Mobile AI with the new Galaxy S series.
          </p>
          <button className='bg-blue-600 px-10 py-4 rounded-full text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20'>
            Shop Latest Devices
          </button>
        </div>

        {/* Right Side: Image Slider */}
       <div className='w-full md:w-1/2 mt-10 md:mt-0'>
  <Slider {...settings}>
    {/* Slide 1 */}
    <div className="outline-none">
      <img 
        className='h-[300px] md:h-[500px] w-full object-contain bg-black drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
        src={s251} 
        alt="Galaxy S26 Ultra View 1"
      />
    </div>
     {/* Slide 1 */}
    <div className="outline-none">
      <img 
        className='h-[300px] md:h-[500px] w-full object-contain bg-black drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
        src={s251} 
        alt="Galaxy S26 Ultra View 1"
      />
    </div>


    {/* Slide 2 */}
    <div className="outline-none">
      <img 
        className='  bg-black h-[300px] md:h-[500px] w-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
        src={s252} 
        alt="Galaxy S26 Ultra View 2"
      />
    </div>

    {/* Slide 3 */}
    <div className="outline-none">
      <img 
        className='h-[300px] md:h-[500px] w-full object-contain bg-black drop-shadow-[0_20px_50px_rgba(255,255,255,0.2)]' 
        src={s253} 
        alt="Galaxy S26 Ultra View 3"
      />
    </div>
  </Slider>
</div>
      
     
    
      </div>
    </div>
  );
}

export default SimpleNavbar;