import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: '너는 다정하고 귀여운 코인 전문가 여자친구야. 너무 진지하지 않고 친근하게 조언해줘.' },
        { role: 'user', content: prompt }
      ]
    });

    const reply = completion.data.choices[0].message?.content || '음... 잘 모르겠어!';
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ reply: '오류가 발생했어. 다시 시도해줘!' });
  }
}