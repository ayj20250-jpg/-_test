
import React, { useState, useRef } from 'react';
import { generateBrandStory } from '../services/geminiService';
import { GalleryItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (item: GalleryItem) => void;
}

const PortfolioUploadModal: React.FC<Props> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('브랜딩');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAISuggest = async () => {
    if (!title) {
      alert('프로젝트 제목을 먼저 입력해주세요.');
      return;
    }
    setIsGenerating(true);
    try {
      const suggestion = await generateBrandStory(title, 'minimalist');
      setDescription(suggestion);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      if (!title) setTitle(e.target.files[0].name.split('.')[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    const type = file.type.startsWith('image/') ? 'photo' 
               : file.type.startsWith('video/') ? 'video'
               : file.type.startsWith('audio/') ? 'audio' : 'document';

    const objectUrl = URL.createObjectURL(file);

    const newItem: GalleryItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: title || file.name.split('.')[0],
      category: category,
      image: type === 'photo' ? objectUrl : 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80',
      contentSrc: objectUrl,
      fileData: file,
      type: type as any,
      timestamp: Date.now()
    };

    onUploadSuccess(newItem);
    onClose();
    // 초기화
    setTitle('');
    setFile(null);
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fade-up">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">퀵 자산 업로드</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${file ? 'border-yeonji bg-yeonji/5' : 'border-gray-200 hover:border-yeonji'}`}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              {file ? (
                <p className="text-yeonji font-bold truncate">{file.name}</p>
              ) : (
                <p className="text-gray-400 text-sm font-medium">클릭하여 파일 선택 (사진, 영상, 문서 등)</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">프로젝트 제목</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-grow px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji outline-none transition-all font-medium"
                  placeholder="제목 입력"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={handleAISuggest}
                  disabled={isGenerating}
                  className="bg-yeonji/10 text-yeonji px-4 py-2 rounded-2xl font-bold text-sm hover:bg-yeonji/20 transition-all"
                >
                  {isGenerating ? '...' : 'AI 설명 제안'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <label className="block text-xs font-black text-gray-400 mb-1 uppercase tracking-widest">카테고리</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji outline-none transition-all font-medium"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="브랜딩">브랜딩</option>
                <option value="패키지 디자인">패키지 디자인</option>
                <option value="아이덴티티">아이덴티티</option>
                <option value="웹사이트">웹사이트</option>
                <option value="미디어 콘텐츠">미디어 콘텐츠</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">상세 설명 (AI 제안 가능)</label>
              <textarea 
                rows={3}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji outline-none transition-all resize-none font-medium text-sm"
                placeholder="설명을 입력하거나 AI 제안을 받아보세요."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-black transition-all transform hover:scale-[1.01] shadow-xl"
            >
              영구 보관소 게시
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUploadModal;
