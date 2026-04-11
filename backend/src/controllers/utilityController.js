import { ok } from '../utils/response.js';
import { getFaqReply } from '../services/chatbotService.js';

const dictionaries = {
  en: { welcome: 'Welcome', announcements: 'Announcements' },
  hi: { welcome: 'स्वागत है', announcements: 'घोषणाएं' }
};

export const chatbot = async (req, res) => ok(res, { reply: getFaqReply(req.body.message || '') });

export const dictionary = async (req, res) => {
  const lang = req.params.lang === 'hi' ? 'hi' : 'en';
  return ok(res, dictionaries[lang]);
};
