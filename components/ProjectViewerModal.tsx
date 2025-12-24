
import React from 'react';
import { GalleryItem } from '../types.ts';

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
    link.download = `${item.title}_Archive`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    const src = item.contentSrc || item.image;
    switch (item.type) {
      case 'video':
        return <video src={src} controls autoPlay className="w-full rounded-3xl shadow-2xl bg-black" />;
      case 'audio':
        return (
          <div className="w-full py-16 px-8 bg-gray-900 rounded-3xl text-center">
            <div className="text-5xl mb-6">🎵</div>
            <audio src={src} controls className="w-full filter invert" />
          </div>
        );
      case 'document':
        return <iframe src={src} className="w-full h-[60vh] rounded-3xl bg-white border" />;
      default:
        return <img src={src} className="max-w-full max-h-[70vh] rounded-3xl shadow-2xl object-contain" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-white/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="absolute top-6 right-6 flex items-center gap-4">
        {onDelete && (
          <button onClick={() => {onDelete(item.id); onClose();}} className="p-3 text-red-500 bg-red-50 rounded-full hover:bg-red-500 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        )}
        <button onClick={onClose} className="p-3 text-gray-900 hover:text-yeonji transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="w-full max-w-4xl py-20 px-4 md:px-0">
        <div className="mb-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">{item.title}</h2>
          <p className="text-yeonji font-bold text-xs tracking-widest mt-2">{item.category} / {item.type}</p>
        </div>
        
        <div className="flex justify-center">{renderContent()}</div>
        
        <div className="mt-10 flex justify-center">
          <button onClick={handleDownload} className="bg-gray-900 text-white px-10 py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-yeonji transition-all shadow-xl">
            DOWNLOAD ORIGINAL ASSET
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectViewerModal;
