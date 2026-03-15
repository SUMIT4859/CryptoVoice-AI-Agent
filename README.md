# CryptoVoice AI

A voice-native crypto assistant that lets you ask cryptocurrency questions using your voice and get concise AI-powered responses.

## Features

- **Voice Recognition** - Click the microphone to speak your crypto questions
- **Text-to-Speech** - AI responses are automatically spoken aloud
- **Concise Answers** - Get short, clear 2-3 sentence responses
- **Quick Suggestions** - Tap preset questions to get started
- **Modern UI** - Sleek dark theme with smooth animations

## Prerequisites

- Node.js 18 or higher
- A Groq API key (get one at https://console.groq.com)
- Modern browser with microphone support (Chrome recommended)

## Installation

1. **Clone or extract the project**
   ```bash
   cd cryptovoice-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## Usage

1. Click the **microphone button** to start voice recognition
2. Ask any cryptocurrency question (e.g., "What is Bitcoin?")
3. Wait for the AI response to appear and be spoken
4. Click **Listen** on any message to hear it again
5. Use **quick suggestion buttons** for common questions

## Tech Stack

- **Next.js 15** - React framework
- **Tailwind CSS** - Styling
- **Groq API** - AI responses (Llama 3.3 70B model)
- **Web Speech API** - Voice recognition and text-to-speech

## Project Structure

```
├── app/
│   ├── api/ask/route.ts    # API endpoint for AI responses
│   ├── globals.css         # Global styles and theme
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── components/
│   ├── chat-message.tsx    # Chat message component
│   └── voice-button.tsx    # Voice button with animations
├── hooks/
│   └── use-voice-recognition.ts  # Voice recognition hook
└── .env.local              # Environment variables (create this)
```

## Troubleshooting

- **Microphone not working**: Ensure you've granted microphone permissions in your browser
- **No AI response**: Check that your GROQ_API_KEY is set correctly in `.env.local`
- **Voice not recognized**: Use Chrome for best speech recognition support

