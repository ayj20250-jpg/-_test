
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import UploadSection from './components/UploadSection';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PortfolioUploadModal from './components/PortfolioUploadModal';
import { GalleryItem } from './types';
import { getAllProjects, saveProject, deleteProject } from './services/storageService';

const App: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [userProjects, setUserProjects] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 앱 시작 시 데이터 복원 (IndexedDB)
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedProjects = await getAllProjects();
        const rehydratedProjects = savedProjects.map(proj => {
          if (proj.fileData) {
            const newUrl = URL.createObjectURL(proj.fileData);
            return {
              ...proj,
              contentSrc: newUrl,
              image: proj.type === 'photo' ? newUrl : proj.image
            };
          }
          return proj;
        });
        setUserProjects(rehydratedProjects.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error("Failed to restore gallery:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSavedData();
  }, []);

  const handleAddToGallery = async (item: GalleryItem) => {
    setUserProjects(prev => [item, ...prev]);
    try {
      await saveProject(item);
    } catch (error) {
      console.error("Storage error:", error);
      alert("파일 저장 용량이 부족하거나 브라우저 설정에 의해 제한되었습니다.");
    }
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("이 프로젝트를 아카이브에서 영구적으로 삭제하시겠습니까?")) return;

    try {
      await deleteProject(id);
      
      const projectToDelete = userProjects.find(p => p.id === id);
      if (projectToDelete?.contentSrc?.startsWith('blob:')) {
        URL.revokeObjectURL(projectToDelete.contentSrc);
      }
      
      setUserProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onUploadClick={() => setIsUploadModalOpen(true)} />
      <main className="flex-grow">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="upload-section"><UploadSection onPublish={handleAddToGallery} /></section>
        <section id="portfolio">
          {isLoading ? (
            <div className="py-32 text-center bg-white flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-yeonji border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Restoring Archive...</p>
            </div>
          ) : (
            <Portfolio 
              userProjects={userProjects} 
              onDelete={handleDeleteProject}
            />
          )}
        </section>
        <section id="contact"><Contact /></section>
      </main>
      <Footer />
      <PortfolioUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadSuccess={(item) => handleAddToGallery(item as any)}
      />
    </div>
  );
};

export default App;
