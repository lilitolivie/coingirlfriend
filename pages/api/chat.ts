import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'OpenAI API key missing' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: '너는 다정한 코인 감성 분석 여친 챗봇이야. 감정을 공감하고, 전문적인 차트 의견도 귀엽게 말해줘. 투자 책임은 사용자에게 있다는 걸 돌려 말해줘.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8
      })
    });

    const json = await response.json();
    const reply = json.choices?.[0]?.message?.content || '응답을 못 받았어 ㅠㅠ';
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'GPT 호출 실패' });
  }
}