import Link from 'next/link';
import { Music } from 'lucide-react';

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Music className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                        KeySpark
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="/lessons" className="text-sm font-medium hover:text-primary transition-colors">
                        Lessons
                    </Link>
                    <Link href="/freeplay" className="text-sm font-medium hover:text-primary transition-colors">
                        Free Play
                    </Link>
                </nav>
            </div>
        </header>
    );
}
