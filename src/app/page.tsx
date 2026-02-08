import Link from 'next/link';
import { ArrowRight, Play, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6 relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-purple-600 opacity-75 blur-lg animate-pulse" />
        <span className="relative inline-flex items-center px-4 py-1.5 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm text-sm font-medium text-primary shadow-sm hover:bg-background/80 transition-colors">
          ✨ Learn Piano the Modern Way
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-white/90 to-white/50">
        Master the Keys, <br />
        <span className="text-primary">One Note at a Time</span>
      </h1>

      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        KeySpark facilitates your musical journey with interactive lessons, instant feedback, and a beautiful virtual piano experience directly in your browser.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link
          href="/lessons"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          <BookOpen className="mr-2 w-5 h-5" />
          Start Lessons
        </Link>
        <Link
          href="/freeplay"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/80 border border-white/5 transition-all hover:scale-105"
        >
          <Play className="mr-2 w-5 h-5" />
          Free Play
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
        {[
          { icon: "🎹", title: "Virtual Piano", desc: "Responsive 2-octave keyboard with realistic sound mapping." },
          { icon: "🎯", title: "Real-time Feedback", desc: "Instant visual cues as you play to help you improve faster." },
          { icon: "📈", title: "Progress Tracking", desc: "Monitor your accuracy and streaks to stay motivated." }
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
