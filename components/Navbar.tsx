
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

  // 제공 서비스와 AI 섹션이 제거됨에 따라 메뉴 수정
  const navItems = [
    { name: '홈', href: 'home' },
    { name: '업로드', href: 'upload-section' },
    { name: '아카이브', href: 'portfolio' },
    { name: '문의', href: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
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

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            onClick={() => scrollToSection('home')}
            className={`text-2xl font-black tracking-tighter cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-yeonji' : 'text-gray-900 md:text-white'}`}
          >
            YEONJIS
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-[13px] tracking-tight font-bold transition-all duration-300 hover:scale-105 ${isScrolled ? 'text-gray-600 hover:text-yeonji' : 'text-gray-100 hover:text-yeonji'}`}
              >
                {item.name}
              </button>
            ))}
            
            <button 
              onClick={onUploadClick}
              className={`px-6 py-2.5 rounded-full text-[13px] font-black transition-all transform hover:scale-105 shadow-xl ${
                isScrolled 
                ? 'bg-yeonji text-white shadow-yeonji/20' 
                : 'bg-white text-yeonji'
              }`}
            >
              퀵 업로드
            </button>
          </div>

          <div className="md:hidden">
             <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-900' : 'text-gray-900 md:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] bg-white transition-transform duration-500 ease-in-out transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex flex-col h-full justify-center items-center space-y-10 px-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-4xl font-black text-gray-900 hover:text-yeonji transition-colors tracking-tighter"
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => { onUploadClick(); setIsMobileMenuOpen(false); }}
            className="text-2xl font-black bg-yeonji text-white px-10 py-4 rounded-full"
          >
            자산 업로드
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
