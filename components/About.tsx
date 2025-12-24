
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-yeonji font-bold tracking-widest uppercase text-sm mb-4 block">연지스 소개</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              전통의 아름다움과<br />현대의 감각을 잇다.
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                '연지(Yeonji)'는 한국 전통의 아름다운 붉은 빛을 상징합니다. 
                우리는 그 깊이 있는 색채와 감성을 현대적인 비즈니스 솔루션과 디자인에 담아내고자 합니다.
              </p>
              <p>
                연지스는 단순한 대행사가 아닌, 고객사의 철학을 함께 고민하는 파트너입니다. 
                기술적 완성도와 정서적 울림이 공존하는 결과물을 통해 브랜드의 진정한 가치를 전달합니다.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-yeonji mb-1">150+</h4>
                <p className="text-sm text-gray-500">완료된 프로젝트</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-yeonji mb-1">98%</h4>
                <p className="text-sm text-gray-500">고객 만족도</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80" 
                alt="Beautiful Snowy Mountains" 
                className="w-full h-auto transform transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl hidden md:block border border-gray-100 max-w-xs">
              <p className="italic text-gray-700 font-medium">
                "우리는 보이지 않는 가치를 눈에 보이는 혁신으로 바꿉니다."
              </p>
              <p className="mt-4 text-sm font-bold text-yeonji">— 연지스 크리에이티브 그룹</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
