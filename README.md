# CryptoVoice AI - Backend Voice Pipeline (dTelecom Stack)

A real voice-native AI assistant with a complete backend voice pipeline aligned with dTelecom infrastructure. Not browser-only APIs - actual backend implementation.

## 🏗️ Real Backend Voice Pipeline

```
┌──────────────────────────────────────────────┐
│  1. USER SPEAKS → Microphone                 │
└──────────────┬───────────────────────────────┘
               │
┌──────────────▼───────────────────────────────┐
│  2. MEDIA RECORDER → Capture Audio (WebRTC)  │
│     Converts speech to webm blob             │
└──────────────┬───────────────────────────────┘
               │
┌──────────────▼───────────────────────────────┐
│  3. /api/stt → Whisper STT                   │
│     Backend processes audio blob             │
│     Returns: speech → text                   │
└──────────────┬───────────────────────────────┘
               │
┌──────────────▼───────────────────────────────┐
│  4. /api/ask → Groq AI Agent                 │
│     Backend processes text                   │
│     Returns: AI response (2-3 sentences)     │
└──────────────┬───────────────────────────────┘
               │
┌──────────────▼───────────────────────────────┐
│  5. /api/tts → Text-to-Speech                │
│     Backend prepares audio output            │
└──────────────┬───────────────────────────────┘
               │
┌──────────────▼───────────────────────────────┐
│  6. AUDIO PLAYBACK → Speaker Output          │
│     Browser speaks the response              │
└──────────────────────────────────────────────┘
```

## ✨ Features

- **Real Backend STT**: MediaRecorder + Groq Whisper API (NOT browser speech recognition)
- **Backend AI Processing**: Groq LLaMA for crypto reasoning
- **Backend TTS Ready**: Prepared for Kokoro/ElevenLabs integration
- **Voice Pipeline Visualization**: See each step: WebRTC → STT → AI → TTS → Speaker
- **Short Responses**: Max 2-3 sentences for voice output
- **x402 Payment Simulation**: Autonomous agent infrastructure payments
- **Modern UI**: Dark theme with neon accents and animations

## 📦 Installation

### Prerequisites
- **Node.js** 18+ ([nodejs.org](https://nodejs.org))
- **npm** or **pnpm** (comes with Node.js)
- **Groq API Key** (free: [console.groq.com](https://console.groq.com))
- **Modern Browser** (Chrome/Edge recommended)

### Step-by-Step Setup

**1. Download the Project**
```bash
# From v0: Click three dots (...) → "Download ZIP"
# Extract the ZIP to a folder
cd cryptovoice-ai
```

**2. Open in VS Code**
- File → Open Folder
- Select the extracted folder

**3. Open Terminal**
- Ctrl + ` (backtick) or View → Terminal

**4. Install Dependencies**
```bash
npm install
# or
pnpm install
```

**5. Create `.env.local`**
```bash
# In root folder, create .env.local file
GROQ_API_KEY=gsk_your_key_here
```
Get your key: [console.groq.com](https://console.groq.com)

**6. Run Development Server**
```bash
npm run dev
```

**7. Open Browser**
```
http://localhost:3000
```

## 🎤 How to Use

1. **Allow Microphone**: Grant permission when browser prompts
2. **Click Mic Button**: Red pulse = listening mode
3. **Speak Clearly**: "What is Bitcoin?" (within 5 seconds)
4. **Wait for Response**: Audio is processed through backend pipeline
5. **Hear Answer**: Response is spoken automatically
6. **View Pipeline**: Click "Architecture" to see each step in real-time

## 🔧 API Routes (Backend Pipeline)

### `/api/stt` - Speech to Text
```typescript
// Frontend sends audio
const formData = new FormData();
formData.append("audio", audioBlob);
const response = await fetch("/api/stt", {
  method: "POST",
  body: formData
});
const data = await response.json(); // { text: "spoken question" }
```

**What happens**: Audio blob → Groq Whisper API → Returns text

### `/api/ask` - AI Response
```typescript
// Frontend sends question (from STT)
const response = await fetch("/api/ask", {
  method: "POST",
  body: JSON.stringify({ question: "What is Bitcoin?" })
});
const data = await response.json(); // { answer: "AI response..." }
```

**What happens**: Text → Groq LLaMA AI → Returns 2-3 sentence response

### `/api/tts` - Text to Speech
```typescript
// Frontend sends AI response
const response = await fetch("/api/tts", {
  method: "POST",
  body: JSON.stringify({ text: "Bitcoin is..." })
});
const data = await response.json(); // { success: true }
```

**What happens**: Text → TTS processor → Ready for speaker output

## 📁 Project Structure

```
cryptovoice-ai/
├── app/
│   ├── api/
│   │   ├── stt/
│   │   │   └── route.ts          ← Whisper STT endpoint
│   │   ├── ask/
│   │   │   └── route.ts          ← Groq AI endpoint
│   │   └── tts/
│   │       └── route.ts          ← TTS endpoint
│   ├── page.tsx                  ← Main UI (voice chat)
│   ├── layout.tsx                ← App layout
│   └── globals.css               ← Styling
│
├── components/
│   ├── voice-button.tsx          ← Mic button
│   ├── chat-message.tsx          ← Message display
│   ├── waveform.tsx              ← Audio visualization
│   ├── x402-payment.tsx          ← Payment UI
│   └── architecture-diagram.tsx  ← Pipeline visualization
│
├── hooks/
│   └── use-voice-recognition.ts  ← MediaRecorder + STT logic
│
├── .env.local                    ← Your API keys (create this)
├── package.json
├── README.md
└── tsconfig.json
```

## 🌐 Browser Support

| Browser | Mic Access | Audio Playback | Status |
|---------|-----------|----------------|--------|
| Chrome  | ✅ Full    | ✅ Full        | **Recommended** |
| Edge    | ✅ Full    | ✅ Full        | ✅ Supported |
| Firefox | ✅ Full    | ✅ Full        | ⚠️ Partial |
| Safari  | ⚠️ Limited | ✅ Full        | ⚠️ Limited |

## ⚙️ Environment Variables

```env
GROQ_API_KEY=gsk_your_groq_api_key
```

Get key: [console.groq.com](https://console.groq.com)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Microphone denied** | Click 🔒 in address bar → Allow microphone → Refresh |
| **"No speech" error** | Speak clearly within 5 seconds of clicking mic |
| **AI not responding** | Check `.env.local` has `GROQ_API_KEY` set correctly |
| **Audio not playing** | Check browser volume, ensure speaker connected |
| **Build error** | Delete `node_modules` → `npm install` → `npm run dev` |
| **Chrome says "Not secure"** | This is normal for localhost, continue |

## 🎯 Quick Test Prompts

- "What is Bitcoin?"
- "Explain Ethereum"
- "What is DeFi?"
- "What is an NFT?"

## 💡 Key Implementation Details

### Why This Is Real Backend Pipeline

✅ **MediaRecorder** - Captures actual audio from microphone (WebRTC)
✅ **Backend STT** - Audio sent to Groq Whisper API, not browser speech recognition
✅ **Backend AI** - Groq LLaMA processes text on backend
✅ **Backend TTS** - Prepared for real TTS integration
✅ **NOT browser APIs** - No speechRecognition or speechSynthesis (except final playback)

### Audio Flow

```
Mic → MediaRecorder → Blob → /api/stt → Text → /api/ask → Response → Audio Output
```

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add environment variable in Vercel Dashboard:
- Settings → Environment Variables
- `GROQ_API_KEY=your_key`

### Deploy to Other Platforms

```bash
npm run build
npm run start
```

Set `GROQ_API_KEY` environment variable on your platform.

## 📚 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework |
| React 19 | UI components |
| TailwindCSS 4 | Styling |
| TypeScript | Type safety |
| Groq API | LLaMA AI + Whisper STT |
| MediaRecorder | WebRTC audio capture |
| SpeechSynthesis | Browser audio playback |

## 📄 License

MIT - Free to use and modify

---

**Built with dTelecom Stack Architecture** 🚀
Ready for the dTelecom hackathon showcase!
