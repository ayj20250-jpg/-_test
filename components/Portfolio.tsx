
import React, { useState } from 'react';
import { GalleryItem } from '../types.ts';
import ProjectViewerModal from './ProjectViewerModal.tsx';

interface PortfolioProps {
  userProjects?: GalleryItem[];
  onDelete?: (id: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ userProjects = [], onDelete }) => {
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return '🎬';
      case 'audio': return '🎵';
      case 'document': return '📑';
      default: return '📸';
    }
  };

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 flex justify-between items-end">
          <div>
            <span className="text-yeonji font-black tracking-[0.4em] uppercase text-[9px] mb-3 block">Cloud Gallery</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900">ARCHIVE</h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Assets: {userProjects.length}</p>
          </div>
        </div>

        {userProjects.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
            <p className="text-gray-400 font-bold">보관된 자산이 없습니다. 위에서 업로드 해보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {userProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-gray-50 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-slide-up"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                      {getTypeIcon(project.type)} {project.type}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-white text-2xl font-black tracking-tighter mb-1 truncate">{project.title}</h3>
                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
