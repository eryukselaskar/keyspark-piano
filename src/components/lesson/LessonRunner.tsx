"use client";

import { useState, useEffect, useCallback } from 'react';
import { Lesson, Exercise } from '@/data/lessons';
import { Keyboard } from '@/components/piano/Keyboard';
import { CheckCircle2, XCircle, RefreshCw, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Metronome } from '@/components/common/Metronome';
import { progressStore } from '@/lib/progress';

interface LessonRunnerProps {
    lesson: Lesson;
}

export function LessonRunner({ lesson }: LessonRunnerProps) {
    const router = useRouter();
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
    const [status, setStatus] = useState<'idle' | 'success' | 'mistake'>('idle');
    const [progress, setProgress] = useState(0);

    const currentExercise = lesson.exercises[currentExerciseIndex];

    const handlePlayNote = useCallback((note: string) => {
        setActiveNotes(prev => {
            const next = new Set(prev);
            next.add(note);
            return next;
        });
    }, []);

    const handleStopNote = useCallback((note: string) => {
        setActiveNotes(prev => {
            const next = new Set(prev);
            next.delete(note);
            return next;
        });
    }, []);

    // Validation Logic
    useEffect(() => {
        if (status === 'success') return; // Already succeeded

        const targetNotes = currentExercise.notes.flat(); // Flatten for checking distinct notes in 'pattern' (simplified)
        // Actually for 'single' and 'chord', we check current active notes against the target group.
        // For 'pattern', we need to track sequence. MVP Simplification:
        // Let's treat 'single' and 'chord' as state snapshots.
        // 'pattern' requires history.

        // MVP: Only support 'single' and 'chord' styled validation (at least one valid target group must be fully active)
        // For pattern exercises in MVP, let's treat them as "Hit these notes in order" - but that needs sequence tracking.
        // To keep MVP simple, let's assume 'pattern' is broken down into single steps in the data if we wanted strict step-by-step.
        // But data shows [['C4'], ['D4']].
        // Let's implement a "Step" state for patterns.

        // However, to keep it VERY simple for now:
        // We will just check if the USER is currently holding the correct notes for the CURRENT step of the pattern.
        // Wait, patterns are sequences. The user plays C4, releases, plays D4.

        // Let's implement a sub-step tracker.
    }, [activeNotes, currentExercise, status]);

    // Refined Validation Logic
    const [patternStep, setPatternStep] = useState(0);

    useEffect(() => {
        if (status === 'success') return;

        // Current target group of notes to play
        const currentTargetGroup = currentExercise.notes[patternStep];
        if (!currentTargetGroup) return;

        const activeArr = Array.from(activeNotes);
        const isTargetHeld = currentTargetGroup.every(note => activeNotes.has(note));
        const isOnlyTargetHeld = activeArr.length === currentTargetGroup.length && isTargetHeld;

        if (isOnlyTargetHeld) {
            // User hit the current step
            if (patternStep === currentExercise.notes.length - 1) {
                // Finished all steps
                setStatus('success');
                // Play success sound logic could go here
            } else {
                // Advance to next step (debounce/wait for release could be added but let's be snappy)
                // Ideally we wait for release before accepting next note to avoid mashing? 
                // For MVP, instant advance is fine, but for repeated notes it might be tricky.
                // Let's rely on the user releasing to play the next note usually.
                setPatternStep(prev => prev + 1);
            }
        } else if (activeArr.length > 0 && !currentExercise.notes.flat().some(n => activeNotes.has(n))) {
            // Mistake logic: played a note not in ANY part of the exercise? Or just not current step?
            // Strict: setStatus('mistake'); setTimeout(() => setStatus('idle'), 500);
            // Let's keep it lenient for MVP.
        }
    }, [activeNotes, currentExercise, patternStep, status]);

    const nextExercise = () => {
        if (currentExerciseIndex < lesson.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setPatternStep(0);
            setStatus('idle');
            setProgress(((currentExerciseIndex + 1) / lesson.exercises.length) * 100);
        } else {
            // Lesson Complete
            progressStore.completeLesson(lesson.id);
            progressStore.addPracticeTime(5); // Assume 5 mins per lesson for MVP

            router.push('/lessons?completed=true');
        }
    };

    return (
        <div className="flex flex-col items-center max-w-4xl mx-auto w-full gap-8 animate-in fade-in duration-500">

            {/* HUD */}
            <div className="w-full flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                <div>
                    <h2 className="text-xl font-bold">{lesson.title}</h2>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        Exercise {currentExerciseIndex + 1} / {lesson.exercises.length}
                        <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentExerciseIndex) / lesson.exercises.length) * 100}%` }} />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Metronome />
                    <div className="text-center">
                        <div className={clsx(
                            "px-4 py-2 rounded-lg font-bold transition-all text-sm",
                            status === 'idle' && "bg-white/5 text-muted-foreground",
                            status === 'success' && "bg-green-500/20 text-green-400 border border-green-500/50 animate-bounce",
                            status === 'mistake' && "bg-red-500/20 text-red-400 border border-red-500/50"
                        )}>
                            {status === 'idle' && "Play the notes..."}
                            {status === 'success' && "Excellent! 🎉"}
                            {status === 'mistake' && "Try Again"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Instruction */}
            <div className="text-center py-8">
                <p className="text-2xl font-medium mb-4">{currentExercise.instruction}</p>
                <div className="flex gap-2 justify-center">
                    {currentExercise.notes.map((step, i) => (
                        <div key={i} className={clsx(
                            "px-3 py-1 rounded border",
                            i === patternStep && status !== 'success' ? "border-primary bg-primary/20 text-primary" : "border-transparent bg-white/5 text-muted-foreground",
                            i < patternStep || status === 'success' ? "text-green-400 border-green-500/30 bg-green-500/10" : ""
                        )}>
                            {step.join('+')}
                        </div>
                    ))}
                </div>
            </div>

            {/* Keyboard */}
            <div className="relative">
                {/* Visual overlay for hints could go here */}
                <Keyboard
                    octaves={2}
                    onPlayNote={handlePlayNote}
                    onStopNote={handleStopNote}
                />
            </div>

            {/* Controls */}
            <div className="h-16 flex items-center justify-center">
                {status === 'success' && (
                    <button
                        onClick={nextExercise}
                        className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25 animate-in slide-in-from-bottom-2"
                    >
                        {currentExerciseIndex < lesson.exercises.length - 1 ? 'Next Exercise' : 'Finish Lesson'}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
}
