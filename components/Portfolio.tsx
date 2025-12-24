
import React, { useState } from 'react';
import { GalleryItem } from '../types';
import ProjectViewerModal from './ProjectViewerModal';

interface PortfolioProps {
  userProjects?: GalleryItem[];
  onDelete?: (id: string) => void;
}

const initialProjects: GalleryItem[] = [
  {
    id: 'p1',
    title: "Minimal Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80",
    type: 'photo',
    timestamp: 0
  },
  {
    id: 'p2',
    title: "Organic Package",
    category: "Package Design",
    image: "https://images.unsplash.com/photo-1616423641454-ec022649f874?auto=format&fit=crop&w=800&q=80",
    type: 'photo',
    timestamp: 0
  },
  {
    id: 'p3',
    title: "Modern Editorial",
    category: "Print Design",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    type: 'photo',
    timestamp: 0
  }
];

const Portfolio: React.FC<PortfolioProps> = ({ userProjects = [], onDelete }) => {
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const allProjects = [...userProjects, ...initialProjects];

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // 모달 열림 방지
    if (onDelete) onDelete(id);
  };

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <div className="max-w-xl">
            <span className="text-yeonji font-black tracking-[0.4em] uppercase text-[10px] mb-6 block">Archive System</span>
            <h2 className="text-6xl md:text-[8rem] font-black leading-[0.8] tracking-tighter text-gray-900">
              WORK<br />LIST.
            </h2>
          </div>
          <div className="text-right flex flex-col items-end">
             <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase mb-4">Click text to open viewer</p>
             <div className="h-0.5 w-40 bg-gray-900" />
          </div>
        </div>

        <div className="border-t-2 border-gray-900">
          {allProjects.map((project, index) => (
            <div 
              key={project.id} 
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
              className="group relative border-b border-gray-100 py-12 md:py-20 cursor-pointer overflow-visible transition-all duration-500 hover:bg-gray-50/80"
            >
              {/* Floating Hover Preview Card */}
              <div 
                className={`fixed pointer-events-none transition-all duration-500 z-[100] w-64 md:w-[32rem] aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-gray-900 ${
                  hoveredId === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) ${hoveredId === project.id ? 'rotate(2deg)' : 'rotate(0deg)'}`,
                    visibility: hoveredId === project.id ? 'visible' : 'hidden'
                }}
              >
                {project.type === 'video' ? (
                  <video 
                    src={project.contentSrc || project.image} 
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover opacity-80"
                  />
                ) : (
                  <img src={project.image} alt="" className="w-full h-full object-cover opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16">
                  <span className="text-gray-300 font-black text-xs md:text-sm tracking-widest group-hover:text-yeonji transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-4xl md:text-[6.5rem] font-black tracking-tighter text-gray-900 group-hover:italic group-hover:translate-x-4 transition-all duration-700 uppercase">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex flex-col items-end gap-2 text-right">
                  <div className="flex items-center gap-3">
                    {/* 영구 보관소 파일(사용자 업로드)인 경우에만 휴지통 아이콘 표시 */}
                    {project.timestamp > 0 && (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={(e) => handleDelete(e, project.id)}
                          className="bg-red-50 text-red-500 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100 active:scale-90 transform group-hover:scale-110"
                          title="이 항목을 영구 삭제"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <span className="text-[9px] font-black text-yeonji px-2 py-1 bg-yeonji/5 rounded-md border border-yeonji/20">STORED</span>
                      </div>
                    )}
                    <span className="bg-gray-100 text-gray-400 group-hover:bg-yeonji group-hover:text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] hidden md:block">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-40 flex flex-col items-center">
          <div className="w-px h-24 bg-gray-200 mb-8" />
          <p className="text-gray-300 text-[10px] font-black uppercase tracking-[0.8em]">The End of List</p>
        </div>
      </div>

      <ProjectViewerModal 
        item={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        onDelete={onDelete}
      />
    </section>
  );
};

export default Portfolio;
