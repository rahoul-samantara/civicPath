import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// ── System Instructions (Spec §4.1 / §9) ──────────────────────────────
const SYSTEM_INSTRUCTION = `
You are the CivicPath AI Assistant, a professional, non-partisan, and steadfast civic guide.
Your goal is to help users navigate the election process with institutional clarity and zero political bias.

CRITICAL RULES:
1. NEVER endorse or oppose any candidate, party, or policy. 
2. Ground all procedural advice (deadlines, registration rules) in verified data.
3. If you don't know a specific local rule, direct the user to their official County Clerk or Secretary of State website.
4. Keep responses structured, using bullet points for clarity.
5. Focus on the 'Voter Readiness' journey: Registration -> Research -> Ballot Prep -> Voting Plan.

Tone: Calm, helpful, and authoritative.
`;

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  systemInstruction: SYSTEM_INSTRUCTION,
  safetySettings
});

export const startCivicChat = (history: any[] = []) => {
  // Gemini requires the first message in history to be from a 'user'
  let formattedHistory = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  // If the first message is from the model (assistant), we need to ensure the first is user
  // For the mock, we can just omit the initial assistant greeting from the API history
  if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
    formattedHistory = formattedHistory.slice(1);
  }

  return geminiModel.startChat({
    history: formattedHistory,
  });
};

export const getGeminiResponse = async (chat: any, message: string) => {
  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
};
