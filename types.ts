
export interface BrandStoryRequest {
  keywords: string;
  tone: 'professional' | 'warm' | 'minimalist' | 'energetic';
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string; // 썸네일 이미지 (Base64 또는 URL)
  contentSrc?: string; // 런타임에서 생성된 Blob URL (휘발성)
  fileData?: Blob | File; // IndexedDB에 저장되는 실제 데이터 (영구적)
  type: 'photo' | 'video' | 'audio' | 'document';
  timestamp: number;
}
