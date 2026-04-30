/**
 * Google Civic Information API Service
 * Fetches real-world election data based on address/state.
 * (Spec §4.3 / §15)
 */

const CIVIC_API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;
const BASE_URL = 'https://www.googleapis.com/civicinfo/v2';

export const fetchElectionData = async (address: string) => {
  if (!CIVIC_API_KEY || CIVIC_API_KEY === 'YOUR_CIVIC_API_KEY') {
    console.warn('Civic API Key missing. Using mock data.');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/voterinfo?key=${CIVIC_API_KEY}&address=${encodeURIComponent(address)}`);
    if (!response.ok) throw new Error('Civic API request failed');
    return await response.json();
  } catch (error) {
    console.error('Error fetching civic data:', error);
    return null;
  }
};

export const getElections = async () => {
   const response = await fetch(`${BASE_URL}/elections?key=${CIVIC_API_KEY}`);
   return await response.json();
}
