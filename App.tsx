
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import About from './components/About.tsx';
import UploadSection from './components/UploadSection.tsx';
import Portfolio from './components/Portfolio.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import PortfolioUploadModal from './components/PortfolioUploadModal.tsx';
import { GalleryItem } from './types.ts';
import { getAllProjects, saveProject, deleteProject } from './services/storageService.ts';

const App: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'done'>('idle');

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        setSyncStatus('syncing');
        const savedProjects = await getAllProjects();
        if (savedProjects && savedProjects.length > 0) {
          const rehydrated = savedProjects.map(proj => {
            if (proj.fileData instanceof Blob) {
              const url = URL.createObjectURL(proj.fileData);
              return { ...proj, contentSrc: url, image: proj.type === 'photo' ? url : proj.image };
            }
            return proj;
          });
          setUserProjects(rehydrated.sort((a, b) => b.timestamp - a.timestamp));
        }
        setTimeout(() => setSyncStatus('done'), 1000);
      } catch (error) {
        console.error("Storage load error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSavedData();
  }, []);

  const handleAddToGallery = async (item: GalleryItem) => {
    setUserProjects(prev => [item, ...prev]);
    setSyncStatus('syncing');
    try {
      await saveProject(item);
      setTimeout(() => setSyncStatus('done'), 800);
    } catch (e) {
      console.error(e);
      setSyncStatus('idle');
    }
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 자산을 보관소에서 영구 삭제하시겠습니까?")) return;
    try {
      await deleteProject(id);
      setUserProjects(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onUploadClick={() => setIsUploadModalOpen(true)} />
      
      {/* 동기화 상태 바 */}
      <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 ${syncStatus === 'syncing' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-gray-900 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-3 shadow-2xl">
          <div className="w-2 h-2 bg-yeonji rounded-full animate-ping" />
          SYNCING WITH CLOUD ARCHIVE...
        </div>
      </div>

      <main className="flex-grow">
        <Hero />
        <About />
        {/* '제공 서비스' 및 'AI 브랜드 스토리 엔진' 섹션이 제거되었습니다 */}
        <UploadSection onPublish={handleAddToGallery} />
        
        <section id="portfolio" className="relative">
          {isLoading ? (
            <div className="py-40 text-center flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-yeonji border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Secure Vault</p>
            </div>
          ) : (
            <Portfolio userProjects={userProjects} onDelete={handleDelete} />
          )}
        </section>
        
        <Contact />
      </main>
      
      <Footer />
      
      <PortfolioUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadSuccess={handleAddToGallery} 
      />
    </div>
  );
};

export default App;
