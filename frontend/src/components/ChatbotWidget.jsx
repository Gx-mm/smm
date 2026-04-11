import { useState } from 'react';
import api from '../api/client';

const ChatbotWidget = () => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('Ask me about admission, fees, or timings.');

  const ask = async () => {
    const { data } = await api.post('/utils/chatbot', { message });
    setReply(data.data.reply);
  };

  return (
    <div className="chatbot">
      <h4>FAQ Bot</h4>
      <p>{reply}</p>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask anything" />
      <button onClick={ask}>Send</button>
    </div>
  );
};

export default ChatbotWidget;
