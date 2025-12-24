
import React from 'react';

const services = [
  {
    title: "브랜드 전략",
    description: "브랜드의 정체성을 정의하고 차별화된 시장 포지셔닝을 설계합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "크리에이티브 디자인",
    description: "UI/UX, 로고, 패키지 등 브랜드의 모든 시각적 접점을 예술적으로 디자인합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "디지털 솔루션",
    description: "최신 기술 스택을 활용하여 최적의 웹/앱 개발 환경을 구축합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: "콘텐츠 마케팅",
    description: "타겟 오디언스에게 감동을 주는 스토리텔링 기반의 마케팅을 전개합니다.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.167a2.405 2.405 0 01-.122-.382L3 11a1 1 0 011-1h6.2l3.4-3.4a1 1 0 011.4 0l3.4 3.4h2a1 1 0 011 1v2a1 1 0 01-1 1h-2l-3.4 3.4a1 1 0 01-1.4 0l-3.4-3.4z" />
      </svg>
    )
  }
];

const Services: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-yeonji font-bold tracking-widest uppercase text-sm mb-4 block">제공 서비스</span>
        <h2 className="text-4xl font-bold mb-16">우리가 제공하는 가치</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-10 bg-gray-50 rounded-3xl border border-transparent hover:border-yeonji/20 hover:bg-white hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center text-yeonji mb-8 shadow-sm group-hover:bg-yeonji group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
