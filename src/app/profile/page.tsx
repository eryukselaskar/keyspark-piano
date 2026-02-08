"use client";

import { useEffect, useState } from 'react';
import { progressStore, UserProgress } from '@/lib/progress';
import { Trophy, Clock, BookOpen, Star, Crown } from 'lucide-react';

export default function ProfilePage() {
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        setProgress(progressStore.get());
    }, []);

    if (!progress) return null;

    const nextLevelXp = Math.pow(progress.level, 2) * 100;
    const currentLevelBaseXp = Math.pow(progress.level - 1, 2) * 100;
    const levelProgress = ((progress.xp - currentLevelBaseXp) / (nextLevelXp - currentLevelBaseXp)) * 100;

    const getRank = (level: number) => {
        if (level >= 50) return { name: "Virtuoso", color: "text-yellow-400" };
        if (level >= 30) return { name: "Maestro", color: "text-purple-400" };
        if (level >= 15) return { name: "Pianist", color: "text-blue-400" };
        if (level >= 5) return { name: "Apprentice", color: "text-green-400" };
        return { name: "Beginner", color: "text-slate-400" };
    };

    const rank = getRank(progress.level);

    return (
        <div className="container max-w-4xl py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Profile Card */}
                <div className="w-full md:w-1/3 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg border-4 border-slate-900">
                            <span className="text-3xl font-bold text-white">{progress.level}</span>
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-slate-900">
                            LVL
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-1">Guest Player</h2>
                    <div className={`flex items-center gap-2 ${rank.color} font-medium mb-6`}>
                        <Crown className="w-4 h-4" />
                        {rank.name}
                    </div>

                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
                        <div
                            className="bg-gradient-to-r from-primary to-purple-500 h-full transition-all duration-1000"
                            style={{ width: `${Math.min(100, Math.max(0, levelProgress))}%` }}
                        />
                    </div>
                    <div className="w-full flex justify-between text-xs text-muted-foreground">
                        <span>{progress.xp} XP</span>
                        <span>{nextLevelXp} XP</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><BookOpen className="w-5 h-5" /></div>
                            <span className="text-muted-foreground">Lessons Completed</span>
                        </div>
                        <span className="text-3xl font-bold">{progress.completedLessons.length}</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-500/20 rounded-lg text-green-400"><Clock className="w-5 h-5" /></div>
                            <span className="text-muted-foreground">Practice Time</span>
                        </div>
                        <span className="text-3xl font-bold">{progress.totalPracticeTimeMinutes}m</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400"><Star className="w-5 h-5" /></div>
                            <span className="text-muted-foreground">Total XP</span>
                        </div>
                        <span className="text-3xl font-bold">{progress.xp}</span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Trophy className="w-5 h-5" /></div>
                            <span className="text-muted-foreground">Achievements</span>
                        </div>
                        <span className="text-3xl font-bold">Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
