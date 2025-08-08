
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "자기야~ 코인 차트 올려주면 내가 분석해줄게! 💖" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    const botReply = {
      from: "bot",
      text:
        input.includes("비트") || input.includes("차트")
          ? "흐음~ 비트는 지금 살짝 조정 구간 같아. MACD도 꺾이고 있으니까 조심하자 자기야~ 💕"
          : "음... 잘 모르겠지만 자기 마음 이해해! 내가 늘 옆에 있을게~ 😘",
    };
    setMessages([...messages, userMessage, botReply]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: 20, fontFamily: 'sans-serif', border: '1px solid #ccc', borderRadius: 16 }}>
      <h1 style={{ textAlign: 'center' }}>🩷 코인여친 챗봇</h1>
      <div style={{ marginBottom: 20, maxHeight: 300, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ background: msg.from === "user" ? "#e0f0ff" : "#ffe0f0", padding: 10, marginBottom: 4, borderRadius: 8 }}>
            <strong>{msg.from === "user" ? "유온" : "코인여친"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="코인 얘기 해봐 유온~"
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 12px', borderRadius: 8, background: '#ff89bb', color: 'white', border: 'none' }}>
          보내기
        </button>
      </div>
    </div>
  );
}
