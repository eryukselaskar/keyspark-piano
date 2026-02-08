"use client";

import { useEffect, useState } from 'react';
import { progressStore, UserProgress } from '@/lib/progress';
import { Trophy, Clock, CheckCircle } from 'lucide-react';

export function ProgressDashboard() {
    const [stats, setStats] = useState<UserProgress | null>(null);

    useEffect(() => {
        setStats(progressStore.get());
    }, []);

    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mx-auto mb-12">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.completedLessons.length}</div>
                    <div className="text-sm text-muted-foreground">Lessons Completed</div>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.totalPracticeTimeMinutes}m</div>
                    <div className="text-sm text-muted-foreground">Total Practice</div>
                </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                    <Trophy className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.completedLessons.length > 0 ? 'Rookie' : 'Beginner'}</div>
                    <div className="text-sm text-muted-foreground">Current Rank</div>
                </div>
            </div>
        </div>
    );
}
