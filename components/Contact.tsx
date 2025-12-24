
import React, { useState } from 'react';
import { submitContactForm } from '../services/apiService';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await submitContactForm(formState);
      if (response.status === 'success') {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/5">
            <span className="text-yeonji font-bold tracking-widest uppercase text-sm mb-4 block">문의하기</span>
            <h2 className="text-5xl font-black mb-10 tracking-tight leading-tight">연지스와 함께<br />성장할 시간</h2>
            <p className="text-gray-500 mb-12 text-lg leading-relaxed">
              우리는 당신의 비전이 현실이 되는 순간을 함께합니다. 
              브랜딩부터 개발까지, 필요한 모든 솔루션을 논의하세요.
            </p>
            
            <div className="space-y-8">
              <div className="group flex items-start space-x-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-yeonji group-hover:bg-yeonji group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">이메일 문의</p>
                  <p className="text-lg font-bold">ayj20240@gmail.com</p>
                </div>
              </div>
              <div className="group flex items-start space-x-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-yeonji group-hover:bg-yeonji group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">크리에이티브 랩</p>
                  <p className="text-lg font-bold italic">전북특별자치도 진안</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5">
            <form onSubmit={handleSubmit} className="glass-effect p-10 md:p-14 rounded-[3.5rem] space-y-8 border border-gray-100 shadow-2xl shadow-gray-200/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">성함</label>
                  <input 
                    type="text" 
                    required
                    placeholder="홍길동"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji focus:bg-white outline-none transition-all font-medium"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">이메일 주소</label>
                  <input 
                    type="email" 
                    required
                    placeholder="contact@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji focus:bg-white outline-none transition-all font-medium"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">프로젝트 비전</label>
                <textarea 
                  required
                  rows={6}
                  placeholder="당신의 아이디어를 들려주세요..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:border-yeonji focus:bg-white outline-none transition-all resize-none font-medium"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-lg hover:bg-black transition-all transform hover:scale-[1.01] shadow-xl disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <span>데이터 전송 중...</span>
                  </span>
                ) : '지금 바로 문의하기'}
              </button>

              {status === 'success' && (
                <div className="bg-green-50 text-green-700 p-6 rounded-2xl text-center font-bold animate-fade-up">
                  감사합니다! 메시지가 안전하게 전송되었습니다.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-center font-bold">
                  전송 중 오류가 발생했습니다. 다시 시도해 주세요.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
