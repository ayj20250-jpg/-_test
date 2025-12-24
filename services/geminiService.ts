
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateBrandStory = async (keywords: string, tone: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `당신은 '연지스(Yeonjis)'의 전문 브랜드 카피라이터입니다. 
  사용자가 제공한 키워드: "${keywords}"와 톤: "${tone}"을 바탕으로, 
  브랜드의 가치를 높여주는 짧고 세련된 브랜드 스토리 또는 슬로건을 한국어로 작성해주세요. 
  응답은 마크다운 형식을 사용하여 소제목과 함께 매력적으로 구성해주세요.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 1000,
      }
    });

    return response.text || "스토리를 생성하지 못했습니다. 다시 시도해 주세요.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 엔진과의 연결에 문제가 발생했습니다.";
  }
};
