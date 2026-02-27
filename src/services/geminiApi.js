// src/services/geminiApi.js
// ─────────────────────────────────────────────────────────────────────────────
// NYAYA — 100% Offline Legal Literacy Engine
// No internet, no API keys, no external calls.
// Pure keyword-matched Indian legal knowledge base.
// ─────────────────────────────────────────────────────────────────────────────
import { findLegalResponse } from '../data/legalKnowledgeBase';

/**
 * Main function — replaces old Gemini API call.
 * Instantly returns rich legal information from the offline knowledge base.
 */
export async function callGeminiAPI(userMessage) {
  // Small artificial delay so UI typing animation shows properly
  await new Promise(r => setTimeout(r, 600));
  return findLegalResponse(userMessage);
}

/**
 * Typing suggestions for the chat input box.
 * Shows suggestions as user types based on common legal queries.
 */
const QUICK_QUERIES = [
  { text: '💼 Salary not paid', q: 'My employer has not paid my salary for 2 months' },
  { text: '👮 Police arrested me', q: 'What are my rights when police arrest me' },
  { text: '🏠 Landlord evicting me', q: 'My landlord is forcing me to vacate without notice' },
  { text: '👩 Domestic violence', q: 'My husband is beating me, what can I do' },
  { text: '📝 File RTI', q: 'How to file RTI application against government' },
  { text: '🛒 Consumer fraud', q: 'I was cheated by an online shopping company' },
  { text: '📜 Article 21', q: 'What is right to life under Article 21' },
  { text: '⚖️ Article 14', q: 'What is right to equality Article 14' },
  { text: '🏭 Bonded labour', q: 'I am being forced to work as bonded labour' },
  { text: '🌿 Factory pollution', q: 'Factory near my house is causing air pollution' },
  { text: '💻 Cyber fraud', q: 'I lost money in online cyber fraud UPI scam' },
  { text: '👶 Child labour', q: 'Child labour is happening in my area' },
  { text: '📱 IT Act hacking', q: 'Someone hacked my account what IT act applies' },
  { text: '♿ Disability rights', q: 'What are my rights as a disabled person' },
  { text: '🏛️ POCSO', q: 'A child is being sexually abused what is POCSO' },
  { text: '👴 Senior citizen rights', q: 'My children are not taking care of me as a senior citizen' },
  { text: '💰 Dowry harassment', q: 'My in-laws are demanding dowry and harassing me' },
  { text: '🏗️ Land acquired', q: 'Government is acquiring my land what compensation do I get' },
  { text: '🏥 Medical negligence', q: 'Doctor was negligent and harmed my family member' },
  { text: '🔇 POSH harassment', q: 'My boss is sexually harassing me at workplace POSH' },
  { text: '📰 Defamation', q: 'Someone is defaming me online spreading false news' },
  { text: '🏛️ Writ petition', q: 'How do I file a writ petition in high court' },
  { text: '⚡ Retrenchment', q: 'My company terminated me unfairly what are my rights' },
  { text: '📋 PF not deposited', q: 'My employer is not depositing my provident fund PF' },
  { text: '🧒 RTE admission', q: 'School is refusing admission under RTE 25 percent quota' },
  { text: '🎯 SC/ST rights', q: 'I faced caste discrimination under SC ST atrocities act' },
  { text: '🔒 Data privacy', q: 'My personal data was leaked by company DPDP Act' },
  { text: '🏛️ Article 22', q: 'Rights on arrest Article 22 24 hours magistrate' },
  { text: '⚖️ Free legal aid', q: 'How to get free legal aid in India' },
];

export function getTypingSuggestions(input) {
  if (!input || input.length < 2) return [];
  const lower = input.toLowerCase();
  return QUICK_QUERIES
    .filter(s =>
      s.text.toLowerCase().includes(lower) ||
      s.q.toLowerCase().includes(lower)
    )
    .slice(0, 4);
}
