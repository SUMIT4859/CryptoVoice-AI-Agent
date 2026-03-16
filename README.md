# CryptoVoice AI - dTelecom Stack Demo

A voice-native AI agent demonstrating the dTelecom stack architecture for real-time crypto assistance.

## Voice Pipeline Architecture

```
User Microphone
      |
      v
WebRTC Audio Stream
      |
      v
Whisper / Parakeet STT (Speech-to-Text)
      |
      v
AI Agent (Crypto reasoning)
      |
      v
Kokoro TTS (Text-to-Speech)
      |
      v
Voice Response
```

## Features

- **WebRTC Voice Input** - Real-time microphone capture with visual indicators
- **Whisper STT** - Speech-to-text conversion layer
- **AI Agent** - Crypto-focused reasoning for blockchain, DeFi, NFT, and Web3 questions
- **Kokoro TTS** - Natural text-to-speech output
- **x402 Payments** - Simulated autonomous agent infrastructure payments (USDC, Base, Solana)
- **Architecture Visualization** - Interactive pipeline diagram showing active processing steps
- **Continuous Conversation** - Real-time voice conversation loop
- **Neon UI** - Modern dark theme with glowing effects and animations

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TailwindCSS 4
- WebRTC microphone input
- Groq AI (LLaMA 3.1)
- Browser Speech APIs

## Installation

1. **Clone or download the project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. Click the microphone button to start speaking
2. Ask any crypto-related question
3. The AI will respond with voice output
4. Click "Architecture" to see the voice pipeline visualization
5. Use quick prompt buttons for common questions

## Project Structure

```
/app
  /api/ask        - AI endpoint
  page.tsx        - Main voice assistant UI
  layout.tsx      - App layout
  globals.css     - Styling with neon effects

/components
  voice-button.tsx        - Animated mic button with neon glow
  chat-message.tsx        - Message bubbles
  waveform.tsx            - Audio waveform visualization
  x402-payment.tsx        - Payment simulation component
  architecture-diagram.tsx - Pipeline visualization

/hooks
  use-voice-recognition.ts - WebRTC/Speech APIs
```

## dTelecom Stack Components

| Component | Purpose |
|-----------|---------|
| WebRTC | Real-time audio streaming |
| Whisper/Parakeet | Speech-to-text conversion |
| AI Agent | Crypto domain reasoning |
| Kokoro TTS | Text-to-speech synthesis |
| x402 | Autonomous agent payments |

## Browser Support

- Chrome (Recommended)
- Edge
- Safari (limited)

## Troubleshooting

- **Microphone not working**: Grant microphone permissions in browser settings
- **No AI response**: Verify GROQ_API_KEY in `.env.local`
- **Voice not recognized**: Use Chrome for best speech recognition support

## License

MIT
