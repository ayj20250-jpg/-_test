
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

  // 데이터 로드 및 복원 (IndexedDB 기반 영구 보관)
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        setSyncStatus('syncing');
        const savedProjects = await getAllProjects();
        if (savedProjects && savedProjects.length > 0) {
          const rehydrated = savedProjects.map(proj => {
            // Blob 데이터가 있으면 URL 재생성 (브라우저 세션마다 필요)
            if (proj.fileData instanceof Blob) {
              const url = URL.createObjectURL(proj.fileData);
              return { 
                ...proj, 
                contentSrc: url, 
                image: proj.type === 'photo' ? url : proj.image 
              };
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
      console.error("Save error:", e);
      setSyncStatus('idle');
    }
    // 업로드 후 갤러리 섹션으로 스크롤
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("이 자산을 보관소에서 영구 삭제하시겠습니까?")) return;
    try {
      await deleteProject(id);
      setUserProjects(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onUploadClick={() => setIsUploadModalOpen(true)} />
      
      {/* 동기화 상태 바 (PC/모바일 공통 동기화 느낌 부여) */}
      <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 ${syncStatus === 'syncing' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-gray-900/90 backdrop-blur-xl text-white px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-3 shadow-2xl border border-white/10">
          <div className="w-2 h-2 bg-yeonji rounded-full animate-ping" />
          SYNCING ASSETS...
        </div>
      </div>

      <main className="flex-grow">
        <Hero />
        <About />
        
        {/* 업로드 센터 (PC/모바일 통합 인터페이스) */}
        <UploadSection onPublish={handleAddToGallery} />
        
        {/* 갤러리/아카이브 섹션 */}
        <section id="portfolio" className="relative min-h-[400px]">
          {isLoading ? (
            <div className="py-40 text-center flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-yeonji border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Vault</p>
            </div>
          ) : (
            <Portfolio userProjects={userProjects} onDelete={handleDelete} />
          )}
        </section>
        
        <Contact />
      </main>
      
      <Footer />
      
      {/* 퀵 업로드 모달 */}
      <PortfolioUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadSuccess={handleAddToGallery} 
      />
    </div>
  );
};

export default App;
