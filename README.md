# KeySpark - Learn Piano the Modern Way

KeySpark is a web-based piano learning application built with Next.js, Tone.js, and TailwindCSS. It features a responsive virtual piano, interactive lessons, and progress tracking using XP and Levels.

## Features

- **Virtual Piano**: 2-octave keyboard with realistic polyphonic sound.
- **Interactive Lessons**: Step-by-step curriculum with real-time feedback.
- **Song Library**: Learn songs like "Twinkle Twinkle Little Star" with a falling-notes visualizer.
- **MIDI Support**: Connect your real digital piano via USB to play and learn.
- **Gamification**: Earn XP, level up, and unlock ranks as you practice.
- **Free Play Mode**: Experiment freely with mouse, touch, or keyboard support.
- **Metronome**: Built-in timing tool for practice.
- **Premium Design**: Modern, glassmorphic UI with dark mode support.

## Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: TailwindCSS 4
- **Audio**: [Tone.js](https://tonejs.github.io/) + @tonejs/midi
- **Icons**: Lucide React
- **State**: React Hooks + LocalStorage
- **APIs**: Web MIDI API

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/eryukselaskar/keyspark-piano.git
    cd keyspark-piano
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Keyboard Shortcuts

- **White Keys**: A, S, D, F, G, H, J, K, L, ;
- **Black Keys**: W, E, T, Y, U, O, P

## License

MIT
