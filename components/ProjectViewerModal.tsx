
import React from 'react';
import { GalleryItem } from '../types';

interface ProjectViewerModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

const ProjectViewerModal: React.FC<ProjectViewerModalProps> = ({ item, onClose, onDelete }) => {
  if (!item) return null;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = item.contentSrc || item.image;
    link.download = `${item.title}_Yeonjis`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && item.id) {
      onDelete(item.id);
      onClose();
    }
  };

  const renderContent = () => {
    switch (item.type) {
      case 'video':
        return (
          <div className="w-full aspect-video bg-black rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl">
            <video src={item.contentSrc || item.image} controls autoPlay className="w-full h-full object-contain" />
          </div>
        );
      case 'audio':
        return (
          <div className="w-full py-24 md:py-40 px-6 bg-gray-900 rounded-[2rem] md:rounded-[4rem] flex flex-col items-center justify-center text-center shadow-2xl">
            <div className="w-24 h-24 bg-yeonji rounded-full mb-10 flex items-center justify-center animate-pulse shadow-2xl shadow-yeonji/40">
               <span className="text-4xl">🎵</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">{item.title}</h3>
            <p className="text-gray-500 mb-10 tracking-widest text-xs uppercase font-bold">{item.category}</p>
            <audio src={item.contentSrc || item.image} controls autoPlay className="w-full max-w-md filter invert" />
          </div>
        );
      case 'document':
        return (
          <div className="w-full h-[60vh] md:h-[75vh] bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
            <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Document Viewer</span>
              <button onClick={handleDownload} className="text-yeonji font-black text-xs hover:underline uppercase">Download Original</button>
            </div>
            <iframe 
              src={item.contentSrc || item.image} 
              className="w-full flex-grow"
              title={item.title}
            />
          </div>
        );
      default: // photo
        return (
          <div className="w-full flex items-center justify-center">
            <img 
              src={item.contentSrc || item.image} 
              alt={item.title} 
              className="max-w-full max-h-[80vh] rounded-[2rem] md:rounded-[4rem] shadow-2xl object-contain" 
            />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10 bg-white/95 backdrop-blur-3xl animate-fade-in">
      {/* 액션 버튼 그룹 */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[320] flex flex-row gap-3 items-center">
        {item.timestamp > 0 && onDelete && (
          <button 
            onClick={handleDelete}
            className="w-14 h-14 md:w-20 md:h-20 bg-red-50 text-red-500 rounded-full shadow-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center border-2 border-red-100 group"
            title="아카이브에서 영구 삭제"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
        
        <button 
          onClick={handleDownload}
          className="bg-yeonji text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-xs md:text-sm shadow-2xl shadow-yeonji/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 border-4 border-white"
        >
          <span>DOWNLOAD FILE</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
        </button>
      </div>

      {/* 닫기 버튼 */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 md:top-12 md:right-12 text-gray-900 hover:text-yeonji transition-colors z-[310]"
      >
        <svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div className="w-full max-w-7xl animate-fade-up">
        <div className="mb-8 md:mb-16 text-center">
            <span className="text-yeonji font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Archive Interaction</span>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">{item.title}</h2>
        </div>
        
        {renderContent()}
        
        <div className="mt-8 md:mt-12 text-center">
           <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.5em]">© Yeonjis Creative Group Asset Viewer</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewerModal;
