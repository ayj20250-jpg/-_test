
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter text-yeonji mb-2">YEONJIS</h2>
            <p className="text-gray-400 max-w-xs">전통과 혁신을 잇는 크리에이티브 그룹.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-yeonji transition-colors">인스타그램</a>
            <a href="#" className="hover:text-yeonji transition-colors">비핸스</a>
            <a href="#" className="hover:text-yeonji transition-colors">링크드인</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2024 연지스 크리에이티브 그룹. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
