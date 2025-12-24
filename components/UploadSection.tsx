
import React, { useState, useRef } from 'react';
import { GalleryItem } from '../types';

interface UploadSectionProps {
  onPublish: (item: GalleryItem) => void;
}

const categories = [
  { id: 'photo', title: '사진', desc: '4K+, Raw 지원', icon: '📸', color: 'blue' },
  { id: 'video', title: '영상', desc: '고화질 MP4/MOV', icon: '🎬', color: 'purple' },
  { id: 'audio', title: '음악', desc: 'MP3/WAV 사운드', icon: '🎵', color: 'pink' },
  { id: 'document', title: '문서', desc: 'PDF, 기획서', icon: '📑', color: 'orange' }
];

const UploadSection: React.FC<UploadSectionProps> = ({ onPublish }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploading(true);
      setFileObject(file);
      
      const objectUrl = URL.createObjectURL(file);
      
      // 실제 파일 로딩 시뮬레이션 (사용자 경험을 위한 짧은 딜레이)
      setTimeout(() => {
        setPreview(objectUrl);
        setUploading(false);
      }, 500);
    }
  };

  const handlePublish = () => {
    if (!activeTab || !fileName || !fileObject) {
      alert("파일을 먼저 선택해주세요.");
      return;
    }

    const contentUrl = URL.createObjectURL(fileObject);

    const newItem: GalleryItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: fileName.split('.')[0] || 'Untitled Project',
      category: categories.find(c => c.id === activeTab)?.title || '기타',
      // 사진인 경우 실제 이미지를 썸네일로, 나머지는 대표 아이콘 배경 사용
      image: activeTab === 'photo' ? contentUrl : 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80',
      contentSrc: contentUrl,
      fileData: fileObject,
      type: activeTab as any,
      timestamp: Date.now()
    };

    onPublish(newItem);
    
    // 상태 초기화
    setActiveTab(null);
    setPreview(null);
    setFileObject(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">UPLOAD CENTER</h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-[10px] md:text-xs">
            Persistent Asset Storage (IndexedDB Enabled)
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setFileObject(null);
                setFileName('');
                setPreview(null);
              }}
              className={`p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center text-center group ${
                activeTab === cat.id ? 'border-yeonji bg-white shadow-xl md:shadow-2xl scale-105' : 'border-transparent bg-white/50 hover:bg-white'
              }`}
            >
              <span className="text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="text-sm md:text-lg font-black mb-1 md:mb-2">{cat.title}</h3>
              <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.desc}</p>
            </button>
          ))}
        </div>

        {activeTab && (
          <div className="max-w-3xl mx-auto bg-white rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl animate-fade-up border border-gray-100">
            {!fileObject && !uploading ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-4 border-dashed border-gray-100 rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 text-center cursor-pointer hover:border-yeonji transition-all bg-gray-50/30"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept={
                    activeTab === 'photo' ? 'image/*' : 
                    activeTab === 'video' ? 'video/*' : 
                    activeTab === 'audio' ? 'audio/*' : '*'
                  }
                />
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <span className="text-2xl md:text-3xl">📥</span>
                </div>
                <h4 className="text-xl md:text-2xl font-black mb-2">파일 선택하기</h4>
                <p className="text-gray-400 text-xs md:text-sm px-4">클릭하여 {categories.find(c => c.id === activeTab)?.title} 파일을 업로드하세요.</p>
              </div>
            ) : uploading ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-yeonji border-t-transparent rounded-full animate-spin mx-auto mb-8" />
                <p className="font-black text-gray-900 uppercase tracking-widest text-sm">준비 중...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-yeonji/10 rounded-xl flex items-center justify-center text-xl">
                      {categories.find(c => c.id === activeTab)?.icon}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Selected Asset</p>
                      <h5 className="text-lg md:text-xl font-black truncate">{fileName}</h5>
                    </div>
                  </div>
                  
                  {activeTab === 'photo' && preview && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-200">
                      <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    <span>Size: {(fileObject!.size / (1024 * 1024)).toFixed(2)} MB</span>
                    <span>Format: {fileObject!.type.split('/')[1] || 'unknown'}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => { setFileObject(null); setPreview(null); }}
                    className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                  >
                    취소
                  </button>
                  <button 
                    onClick={handlePublish}
                    className="flex-[2] bg-gray-900 text-white py-5 rounded-2xl font-black text-sm md:text-xl hover:bg-yeonji transition-all shadow-xl transform active:scale-95"
                  >
                    영구 보관소 게시
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
