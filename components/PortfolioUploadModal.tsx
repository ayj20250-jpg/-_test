
import React, { useState, useRef } from 'react';
import { GalleryItem } from '../types.ts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (item: GalleryItem) => void;
}

const PortfolioUploadModal: React.FC<Props> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('개인 자산');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

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
    setTitle('');
    setFile(null);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up">
        <div className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">영구 보관소 게시</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${file ? 'border-yeonji bg-yeonji/5' : 'border-gray-200 hover:border-yeonji'}`}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              {file ? (
                <div>
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-yeonji font-bold truncate text-sm">{file.name}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm font-medium">클릭하여 파일 선택<br/><span className="text-[10px] opacity-60">(사진, 영상, 음악, 문서)</span></p>
              )}
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji outline-none transition-all font-bold"
                placeholder="자산 이름"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              
              <select 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji outline-none transition-all font-bold appearance-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="개인 자산">개인 자산</option>
                <option value="브랜딩">브랜딩</option>
                <option value="미디어">미디어</option>
                <option value="기획서">기획서</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-yeonji transition-all shadow-xl"
            >
              게시하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PortfolioUploadModal;
