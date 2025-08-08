
export default async function handler(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ reply: "내용을 입력해줘!" });
  }

  const replies = [
    "지금은 조금 애매한 시기야. 기다려보자!",
    "좋은 기회일지도 몰라. 조금만 더 분석해보자!",
    "위험해 보여. 감정적으로 결정하지 말고 침착하게 판단해!",
    "오, 이건 기회일 수도 있겠는걸? 💡",
    "이 타이밍엔 진입보다는 관망이 좋을 것 같아."
  ];

  const reply = replies[Math.floor(Math.random() * replies.length)];

  res.status(200).json({ reply });
}
