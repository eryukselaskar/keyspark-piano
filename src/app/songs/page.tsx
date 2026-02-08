import Link from 'next/link';
import { SAMPLE_SONGS } from '@/data/songs';
import { PlayCircle, Award, Music } from 'lucide-react';

export default function SongsPage() {
    return (
        <div className="container max-w-4xl py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Song Library</h1>
                <p className="text-muted-foreground">Learn to play popular songs with our interactive visualizer.</p>
            </div>

            <div className="grid gap-6">
                {SAMPLE_SONGS.map((song) => (
                    <Link
                        key={song.id}
                        href={`/songs/${song.id}`}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                <Music className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{song.title}</h3>
                                <p className="text-muted-foreground text-sm">{song.artist}</p>
                                <div className="mt-2 flex gap-2">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                                        {song.difficulty}
                                    </span>
                                    <span className="text-xs text-muted-foreground px-2 py-0.5">
                                        {Math.floor(song.totalDuration)}s
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110">
                            <PlayCircle className="w-7 h-7" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
