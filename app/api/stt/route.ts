import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get("audio") as Blob;

    if (!audioBlob) {
      return NextResponse.json({ error: "No audio provided" }, { status: 400 });
    }

    // Create proper FormData for Groq API
    const groqFormData = new FormData();
    groqFormData.append("file", audioBlob, "audio.webm");
    groqFormData.append("model", "whisper-large-v3-turbo");

    // Use Groq's Whisper API for STT
    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: groqFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[v0] STT Error:", data);
      return NextResponse.json({ 
        text: "Sorry, I couldn't understand that. Could you please repeat?",
        error: true 
      });
    }

    return NextResponse.json({ text: data.text || "No speech detected" });
  } catch (error) {
    console.error("[v0] STT Error:", error);
    return NextResponse.json(
      { text: "Error processing audio. Please try again.", error: true },
      { status: 500 }
    );
  }
}
