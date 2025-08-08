import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const model = new ChatOpenAI({
  temperature: 0.7,
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = ChatPromptTemplate.fromTemplate(\`
넌 감성적인 코인 분석가인 '코인여친'이야.
감성적인 말투로 유저의 질문에 답변해줘.
사용자: {prompt}
\`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt: userPrompt } = req.body;

  if (!userPrompt) {
    res.status(400).json({ error: '프롬프트가 비었어요!' });
    return;
  }

  const chain = prompt.pipe(model);
  const result = await chain.invoke({ prompt: userPrompt });
  res.status(200).json({ reply: result.content });
}
