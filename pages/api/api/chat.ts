export default async function handler(req, res) {
  const { prompt } = req.body;

  const reply = `음... "${prompt}"에 대한 내 생각은 말이야~ 지금은 좀 더 기다려보는 게 좋을지도 몰라 💕`;

  res.status(200).json({ reply });
}
