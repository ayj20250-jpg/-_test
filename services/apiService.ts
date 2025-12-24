
/**
 * yeonjis-project/services/apiService.ts
 * 
 * This file simulates the backend interaction as requested.
 * In a real production environment, this would hit your Node/Express endpoint.
 */

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = async (data: ContactData): Promise<{ status: string; message: string }> => {
  console.log('--- Submitting to Backend Simulation ---');
  console.log('Endpoint: /api/contact');
  console.log('Payload:', data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real app:
  /*
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
  */

  return { status: 'success', message: '메시지가 성공적으로 백엔드에 전달되었습니다.' };
};
