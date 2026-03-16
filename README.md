# CryptoVoice AI - dTelecom Stack 

A voice-native AI agent demonstrating the dTelecom stack architecture for real-time crypto assistance.

---

## Voice Pipeline Architecture

```
+------------------+
|  User Microphone |
+--------+---------+
         |
         v
+------------------+
| WebRTC Audio     |
| Stream Capture   |
+--------+---------+
         |
         v
+------------------+
| Whisper STT      |
| Speech-to-Text   |
+--------+---------+
         |
         v
+------------------+
| AI Agent         |
| (Groq LLaMA 3.1) |
+--------+---------+
         |
         v
+------------------+
| Kokoro TTS       |
| Text-to-Speech   |
+--------+---------+
         |
         v
+------------------+
| Voice Response   |
+------------------+
```

---

## Features

- **WebRTC Voice Input** - Real-time microphone capture with animated waveform
- **Whisper STT** - Speech-to-text conversion layer
- **AI Agent** - Crypto-focused reasoning for blockchain, DeFi, NFT, and Web3 questions
- **Kokoro TTS** - Natural text-to-speech output with listen button
- **x402 Payments** - Simulated autonomous agent infrastructure payments (USDC, Base, Solana)
- **Architecture Visualization** - Interactive pipeline diagram showing active processing steps
- **Short Responses** - AI gives concise 2-3 sentence answers
- **Neon UI** - Modern dark theme with glowing effects and animations

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| React 19 | UI library |
| TailwindCSS 4 | Styling |
| Groq AI | LLaMA 3.1 70B model for crypto reasoning |
| Web Speech API | Browser-native speech recognition |
| SpeechSynthesis | Browser-native text-to-speech |

---

## Prerequisites

Before installation, make sure you have:

- **Node.js** version 18.0 or higher
- **npm** or **pnpm** package manager
- **Groq API Key** - Get one free at [console.groq.com](https://console.groq.com)
- **Modern Browser** - Chrome recommended for best speech recognition

---

## Installation Guide

### Step 1: Download the Project

**Option A - From v0:**
1. Click the three dots (...) in the top right of the code view
2. Select "Download ZIP"
3. Extract the ZIP to a folder on your computer

**Option B - Using Git:**
```bash
git clone <your-repo-url>
cd cryptovoice-ai
```

### Step 2: Open in VS Code

1. Open VS Code
2. Go to **File > Open Folder**
3. Select the extracted/cloned project folder

### Step 3: Install Dependencies

Open the terminal in VS Code (`Ctrl + ~` or `Cmd + ~`) and run:

```bash
npm install
```

Or if you prefer pnpm:

```bash
pnpm install
```

### Step 4: Set Up Environment Variables

1. Create a new file called `.env.local` in the root folder
2. Add your Groq API key:

```env
GROQ_API_KEY=gsk_your_api_key_here
```

**Important:** Never commit this file to git. It's already in `.gitignore`.

### Step 5: Run the Development Server

```bash
npm run dev
```

Or with pnpm:

```bash
pnpm dev
```

### Step 6: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

---

## How to Use

1. **Click the microphone button** - The neon ring will pulse indicating it's listening
2. **Speak your question** - Ask anything about crypto, blockchain, DeFi, NFTs
3. **Wait for response** - The AI will process and respond with voice
4. **Use quick prompts** - Click preset buttons for common questions
5. **Toggle Architecture** - Click "Architecture" to see the pipeline visualization
6. **Replay responses** - Click "Listen" on any AI message to hear it again

---

## Project Structure

```
cryptovoice-ai/
|
|-- app/
|   |-- api/
|   |   |-- ask/
|   |       |-- route.ts        # AI endpoint (Groq API)
|   |
|   |-- page.tsx                # Main voice assistant UI
|   |-- layout.tsx              # App layout with fonts
|   |-- globals.css             # Styling with neon effects
|
|-- components/
|   |-- voice-button.tsx        # Animated mic button with neon glow
|   |-- chat-message.tsx        # Message bubbles with listen button
|   |-- waveform.tsx            # Audio waveform visualization
|   |-- x402-payment.tsx        # Payment simulation component
|   |-- architecture-diagram.tsx # Pipeline visualization
|
|-- hooks/
|   |-- use-voice-recognition.ts # WebRTC/Speech recognition hook
|
|-- public/                     # Static assets
|
|-- .env.local                  # Environment variables (create this)
|-- package.json                # Dependencies
|-- tailwind.config.ts          # Tailwind configuration
|-- tsconfig.json               # TypeScript configuration
|-- README.md                   # This file
```

---

## dTelecom Stack Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| WebRTC | Web Speech API | Real-time audio capture |
| STT | Whisper/Parakeet | Convert speech to text |
| AI Agent | Groq LLaMA 3.1 | Crypto domain reasoning |
| TTS | Kokoro/SpeechSynthesis | Convert text to speech |
| x402 | USDC/Base/Solana | Autonomous agent payments |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key for AI responses |

---

## Browser Support

| Browser | Speech Recognition | TTS | Status |
|---------|-------------------|-----|--------|
| Chrome | Full | Full | Recommended |
| Edge | Full | Full | Supported |
| Firefox | Limited | Full | Partial |
| Safari | Limited | Full | Partial |

---

## Troubleshooting

### Microphone not working
- Click the lock icon in the browser address bar
- Allow microphone permissions
- Refresh the page

### No AI response
- Check that `GROQ_API_KEY` is set in `.env.local`
- Verify the API key is valid at [console.groq.com](https://console.groq.com)
- Check the terminal for error messages

### Voice not recognized
- Use Chrome for best speech recognition support
- Speak clearly and at normal volume
- Ensure no other app is using the microphone

### "no-speech" error in console
- This is normal - it means no speech was detected
- The app continues to work correctly
- Try speaking within 3-4 seconds of clicking the mic

### Build errors
- Delete `node_modules` folder and `.next` folder
- Run `npm install` again
- Run `npm run dev`

---

## API Endpoints

### POST /api/ask

Sends a question to the AI agent.

**Request:**
```json
{
  "question": "What is Bitcoin?"
}
```

**Response:**
```json
{
  "answer": "Bitcoin is a decentralized digital currency..."
}
```

---

## Customization

### Change AI Model
Edit `app/api/ask/route.ts`:
```typescript
model: "llama-3.1-70b-versatile" // Change to another Groq model
```

### Adjust Response Length
Edit the system prompt in `app/api/ask/route.ts`:
```typescript
content: "...Answer in 2-3 sentences maximum..."
```

### Change Theme Colors
Edit `app/globals.css` to modify the neon accent colors and theme.

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add `GROQ_API_KEY` in Environment Variables
5. Click Deploy

Or click "Publish" in v0 to deploy directly.

---

## License

MIT License - Free to use and modify.

---

## Credits

Built with the dTelecom AI Stack architecture for the dTelecom hackathon showcase.
