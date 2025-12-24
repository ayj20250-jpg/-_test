
import React, { useState, useRef } from 'react';
import { GalleryItem } from '../types';

interface UploadSectionProps {
  onPublish: (item: GalleryItem) => void;
}

const categories = [
  { id: 'photo', title: '사진 및 이미지', desc: '4K+, Raw 지원', icon: '📸', color: 'blue' },
  { id: 'video', title: '동영상 및 모션', desc: '10GB+ 대용량 지원', icon: '🎬', color: 'purple' },
  { id: 'audio', title: '음악 및 오디오', desc: 'Lossless 사운드', icon: '🎵', color: 'pink' },
  { id: 'document', title: '문서 및 기획', desc: 'Project Guides', icon: '📑', color: 'orange' }
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
      
      setTimeout(() => {
        if (activeTab === 'photo') {
          setPreview(objectUrl);
        } else if (activeTab === 'video') {
          setPreview('https://images.unsplash.com/photo-1536240478700-b8673fa92d96?auto=format&fit=crop&w=400&q=80');
        } else if (activeTab === 'audio') {
          setPreview('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80');
        } else {
          setPreview('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80');
        }
        setUploading(false);
      }, 800);
    }
  };

  const handlePublish = () => {
    if (!activeTab || !fileName || !fileObject) return;

    const contentUrl = URL.createObjectURL(fileObject);

    const newItem: GalleryItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: fileName.split('.')[0] || 'Untitled',
      category: categories.find(c => c.id === activeTab)?.title || 'Etc',
      image: activeTab === 'photo' ? contentUrl : (preview || ''),
      contentSrc: contentUrl,
      fileData: fileObject, // IndexedDB 저장을 위한 원본 파일 객체
      type: activeTab as any,
      timestamp: Date.now()
    };

    onPublish(newItem);
    setActiveTab(null);
    setPreview(null);
    setFileObject(null);
    setFileName('');
  };

  return (
    <div className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">UPLOAD CENTER</h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Persistent Asset Storage (IndexedDB Enabled)</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setFileObject(null);
                setFileName('');
              }}
              className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center text-center group ${
                activeTab === cat.id ? 'border-yeonji bg-white shadow-2xl scale-105' : 'border-transparent bg-white/50 hover:bg-white'
              }`}
            >
              <span className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{cat.icon}</span>
              <h3 className="text-lg font-black mb-2">{cat.title}</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cat.desc}</p>
            </button>
          ))}
        </div>

        {activeTab && (
          <div className="max-w-3xl mx-auto bg-white rounded-[4rem] p-12 shadow-2xl animate-fade-up border border-gray-100">
            {!fileObject && !uploading ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-4 border-dashed border-gray-100 rounded-[3rem] p-20 text-center cursor-pointer hover:border-yeonji transition-all"
              >
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📥</span>
                </div>
                <h4 className="text-2xl font-black mb-2">파일을 선택해주세요</h4>
                <p className="text-gray-400 text-sm">브라우저를 닫아도 데이터가 유지됩니다.</p>
              </div>
            ) : uploading ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 border-4 border-yeonji border-t-transparent rounded-full animate-spin mx-auto mb-8" />
                <p className="font-black text-gray-900 uppercase tracking-widest">Indexing Asset...</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Ready to Secure</p>
                  <h5 className="text-2xl font-black truncate">{fileName}</h5>
                  <p className="text-xs text-gray-400 mt-2">Size: {(fileObject.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button 
                  onClick={handlePublish}
                  className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-xl hover:bg-yeonji transition-all shadow-xl"
                >
                  영구 보관소에 게시하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
