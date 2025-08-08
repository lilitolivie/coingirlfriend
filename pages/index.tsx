
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function CoinGirlfriend() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageResult, setImageResult] = useState(null);

  const analyzeEmotion = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: text })
    });
    const data = await res.json();
    setResult(data.reply);
    setLoading(false);
  };

  const analyzeImage = () => {
    if (!image) return;
    setLoading(true);
    setTimeout(() => {
      setImageResult("🔍 이미지 차트를 분석했어! 조정 구간일 수도 있어~ 신중하게 보자 💖");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-4 flex flex-col items-center justify-center font-sans">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-pink-400 mb-6"
      >
        ❤️ 코인여친 CoinGirlfriend ❤️
      </motion.h1>

      <Card className="w-full max-w-md bg-zinc-800 border-zinc-700 mb-6">
        <CardContent className="p-6 space-y-4">
          <p className="text-lg">코인 질문이나 고민을 입력해줘!</p>
          <Input 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="예: 비트코인 지금 사도 될까?"
            className="bg-zinc-700 border-none text-white"
          />
          <Button onClick={analyzeEmotion} className="bg-pink-500 hover:bg-pink-600">
            코인여친한테 물어보기
          </Button>
          {loading && <p>분석 중...</p>}
          {result && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xl mt-4"
            >
              💬 <span className="font-bold">{result}</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card className="w-full max-w-md bg-zinc-800 border-zinc-700">
        <CardContent className="p-6 space-y-4">
          <p className="text-lg">차트 이미지를 업로드하면 내가 분석해줄게!</p>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="bg-zinc-700 border-none text-white"
          />
          <Button onClick={analyzeImage} className="bg-pink-500 hover:bg-pink-600">
            차트 분석하기
          </Button>
          {loading && <p>이미지 분석 중...</p>}
          {imageResult && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xl mt-4"
            >
              분석 결과: <span className="font-bold">{imageResult}</span>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
