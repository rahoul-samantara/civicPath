/**
 * Google Civic Information API Service
 * Fetches real-world election data based on address/state.
 * (Spec §4.3 / §15)
 */

const CIVIC_API_KEY = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;
const BASE_URL = 'https://www.googleapis.com/civicinfo/v2';

export interface PollingLocation {
  address: {
    locationName: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
  };
  pollingHours: string;
  startDate: string;
  endDate: string;
  sources: { name: string; official: boolean }[];
}

export interface CivicVoterInfo {
  election: { name: string; electionDay: string };
  pollingLocations?: PollingLocation[];
  contests?: unknown[];
  state?: unknown[];
}

export const fetchVoterInfo = async (address: string): Promise<CivicVoterInfo | null> => {
  if (!CIVIC_API_KEY || CIVIC_API_KEY === 'YOUR_CIVIC_API_KEY') {
    console.warn('Civic API Key missing.');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/voterinfo?key=${CIVIC_API_KEY}&address=${encodeURIComponent(address)}&productionDataOnly=true`
    );
    
    if (response.status === 400) {
      console.warn('Address not found by Google Civic API');
      return null;
    }

    if (!response.ok) throw new Error(`Civic API error: ${response.status}`);
    
    return await response.json();
  } catch (error) {
    console.error('Civic API Fetch Failure:', error);
    return null;
  }
};
