
import React, { useState, useEffect } from 'react';

interface Props {
  onUploadClick: () => void;
}

const Navbar: React.FC<Props> = ({ onUploadClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '홈', href: 'home' },
    { name: '업로드 센터', href: 'upload-section' },
    { name: '포트폴리오', href: 'portfolio' },
    { name: '문의하기', href: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 내비게이션 바 높이만큼 오프셋 적용
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            onClick={() => scrollToSection('home')}
            className={`text-2xl font-black tracking-tighter cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-yeonji' : 'text-white'}`}
          >
            YEONJIS
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-[14px] tracking-tight font-bold transition-all duration-300 hover:scale-105 ${isScrolled ? 'text-gray-600 hover:text-yeonji' : 'text-gray-100 hover:text-yeonji'}`}
              >
                {item.name}
              </button>
            ))}
            
            <button 
              onClick={onUploadClick}
              className={`px-5 py-2.5 rounded-full text-[14px] font-black transition-all transform hover:scale-105 ${
                isScrolled 
                ? 'bg-yeonji text-white shadow-lg shadow-yeonji/20' 
                : 'bg-white text-yeonji shadow-lg'
              }`}
            >
              퀵 업로드
            </button>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
             <button 
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-white transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full justify-center items-center space-y-8 px-6 pt-20">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-3xl font-bold text-gray-900 hover:text-yeonji transition-colors"
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => { onUploadClick(); setIsMobileMenuOpen(false); }}
            className="text-3xl font-bold text-yeonji"
          >
            퀵 업로드
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
