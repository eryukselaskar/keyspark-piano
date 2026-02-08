import Link from 'next/link';
import { LESSONS } from '@/data/lessons';
import { PlayCircle, Clock, Trophy } from 'lucide-react';
import { ProgressDashboard } from '@/components/progress/ProgressDashboard';

export default function LessonsPage() {
    return (
        <div className="container max-w-4xl py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Interactive Lessons</h1>
                <p className="text-muted-foreground mb-8">Master the piano step-by-step with our curated curriculum.</p>
                <ProgressDashboard />
            </div>

            <div className="grid gap-6">
                {LESSONS.map((lesson) => (
                    <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.id}`}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20">
                                        {lesson.level}
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> 5 min
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{lesson.title}</h3>
                                <p className="text-muted-foreground text-sm">{lesson.description}</p>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                                <PlayCircle className="w-6 h-6" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
