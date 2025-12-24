
import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
  };

  return (
    <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#f0f4f7]">
      {/* Interactive Background Image (Parallax) */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-out scale-110"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px) scale(1.1)`
        }}
      />
      
      {/* Soft Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/10 to-transparent z-1" />
      
      {/* Subtle Snow Interaction */}
      <div className="absolute inset-0 z-2 pointer-events-none opacity-30">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              filter: 'blur(1px)',
              animation: `snowfall ${Math.random() * 12 + 8}s linear infinite`,
              opacity: Math.random() * 0.4 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-block mb-12 px-6 py-2 border border-black/5 rounded-full bg-white/20 backdrop-blur-2xl animate-fade-in shadow-sm">
          <span className="text-gray-400 text-[9px] font-bold tracking-[0.6em] uppercase">Premium Studio Experience</span>
        </div>
        
        <h1 className="mb-12 animate-fade-up tracking-tighter leading-[0.9]">
          <span className="block text-4xl md:text-6xl font-extralight text-gray-400 mb-2 lowercase tracking-normal">Lightly,</span>
          <span className="block text-7xl md:text-[10rem] font-black text-gray-900 -mt-2 md:-mt-6 uppercase">but heavy.</span>
          <span className="block text-yeonji text-xl md:text-3xl font-light tracking-[0.4em] mt-8 uppercase opacity-90">Yeonji's studio</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-16 font-light max-w-xl mx-auto leading-relaxed tracking-tight">
          깃털처럼 유연한 생각으로 시작하여, <br className="hidden md:block" />
          바위처럼 묵직한 가치를 완성하는 곳. 연지스 스튜디오입니다.
        </p>
        
        <div className="flex justify-center items-center">
          <button 
            onClick={() => scrollToSection('upload-section')}
            className="group relative bg-gray-900 hover:bg-yeonji text-white px-14 py-5 rounded-2xl font-black text-sm transition-all shadow-2xl flex items-center gap-4 overflow-hidden"
          >
            <span className="relative z-10 uppercase tracking-widest">Enter Archive</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 group cursor-pointer" onClick={() => scrollToSection('upload-section')}>
        <div className="w-px h-24 bg-gradient-to-b from-gray-900 via-gray-300 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-yeonji animate-scroll-indicator" />
        </div>
        <span className="text-gray-900 text-[8px] uppercase tracking-[1em] font-black group-hover:text-yeonji transition-colors">Scroll</span>
      </div>

      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
          100% { transform: translateY(110vh) translateX(120px) rotate(360deg); }
        }
        @keyframes scroll-indicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
