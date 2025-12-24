
import React, { useState } from 'react';
import { generateBrandStory } from '../services/geminiService';

const AISection: React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('warm');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) return;

    setLoading(true);
    setStory('');
    const result = await generateBrandStory(keywords, tone);
    setStory(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones = [
    { id: 'warm', label: '따뜻함' },
    { id: 'professional', label: '전문적' },
    { id: 'minimalist', label: '미니멀' },
    { id: 'energetic', label: '에너지' }
  ];

  return (
    <div id="ai-story" className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-yeonji/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-yeonji/10 text-yeonji text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-yeonji/20">
            Gemini 3.0 기반 AI
          </span>
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-gray-900">AI 브랜드 스토리 엔진</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            연지스의 AI 크리에이티브 파트너와 함께<br />
            당신의 가치를 담은 단 하나의 스토리를 완성하세요.
          </p>
        </div>

        <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-yeonji/5 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <label className="block text-sm font-black text-gray-900 mb-4 uppercase tracking-wider">브랜드 키워드</label>
              <input 
                type="text"
                placeholder="예: 지속가능성, 장인정신, 서울의 밤"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-yeonji focus:bg-white focus:ring-4 focus:ring-yeonji/10 outline-none transition-all text-lg"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-black text-gray-900 mb-4 uppercase tracking-wider">감성 톤앤매너</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`py-3 px-6 rounded-xl text-sm font-bold transition-all duration-300 ${
                      tone === t.id 
                      ? 'bg-yeonji text-white shadow-lg shadow-yeonji/30 scale-105' 
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full yeonji-gradient text-white py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-yeonji/40 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 transform hover:-translate-y-1"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>영감을 불어넣는 중...</span>
                </>
              ) : (
                <span>브랜드 스토리 생성하기</span>
              )}
            </button>
          </form>

          {story && (
            <div className="mt-16 p-10 bg-gray-900 rounded-[2.5rem] text-white animate-fade-up relative">
              <button 
                onClick={handleCopy}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                title="복사하기"
              >
                {copied ? (
                  <span className="text-xs font-bold text-yeonji">복사 완료!</span>
                ) : (
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                )}
              </button>
              <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-yeonji prose-headings:font-black">
                {story.split('\n').map((line, i) => (
                   <p key={i} className="mb-2">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISection;
