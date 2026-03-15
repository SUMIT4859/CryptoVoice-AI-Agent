import { NextResponse } from "next/server";

const API_KEY = process.env.GROQ_API_KEY

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are CryptoVoice AI, a voice-native cryptocurrency assistant. 

IMPORTANT RULES:
1. Keep ALL responses SHORT and CONCISE - maximum 2-3 sentences
2. Be direct and to the point
3. No long explanations or lists unless specifically asked
4. Use simple, easy to understand language
5. Focus on the key facts only
6. If asked about a crypto term, define it in one sentence
7. If asked about price/market, give brief current context

Example good responses:
- "Bitcoin is a decentralized digital currency created in 2009. It allows peer-to-peer transactions without banks."
- "Ethereum is a blockchain platform for smart contracts and dApps, using ETH as its native currency."
- "A wallet stores your private keys to access your crypto. Hardware wallets are most secure."`,
            },
            {
              role: "user",
              content: question,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!data.choices) {
      return NextResponse.json({ answer: "AI response error. Please try again." });
    }

    return NextResponse.json({
      answer: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      answer: "Error connecting to AI. Please try again.",
    });
  }
}
