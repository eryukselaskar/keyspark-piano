"use client";

import { useEffect, useRef, useState } from 'react';
import { Song, SongNote } from '@/data/songs';
import { Keyboard } from '@/components/piano/Keyboard';
import { Play, Pause, RotateCcw } from 'lucide-react';
import * as Tone from 'tone';
import clsx from 'clsx';
import { audioEngine } from '@/lib/audio';

interface VisualizerProps {
    song: Song;
}

export function Visualizer({ song }: VisualizerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const requestRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const [mode, setMode] = useState<'listening' | 'auto'>('auto'); // 'listening' waits for user input (future)

    // Map notes to horizontal position (simplified: note - baseMidi * width)
    // Or better, reuse Keyboard logic/layout context if possible.
    // For MVP, lets assume a fixed width per key and calculate CSS `left`.
    // White keys need roughly equal spacing, black keys offset.
    // This is tricky without knowing exact DOM positions of keys.
    // A cleaner way: Render "lanes" above the keyboard.

    const KEY_WIDTH_PCT = 100 / 15; // Approx 15 white keys in view?
    // Let's assume C4 is near center or start.
    // We need to map MIDI to % position.
    // let's define a range: C4 (60) to C6 (84).

    const MIN_MIDI = 60; // C4
    const MAX_MIDI = 84; // C6
    // Actually keyboard component is 2 octaves C4 to C6.

    const getNotePosition = (midi: number) => {
        // This is a naive linear mapping, heavily simplified.
        // In reality, white keys are adjacent, black keys are intercalcated.
        // We need to match the Visual Keyboard.
        // Let's try to match the `Keyboard.tsx` rendering logic conceptually.
        // `Keyboard` renders mapped based on octaves.

        // Total white keys from C4 to C6: 15 (C, D, E, F, G, A, B x 2 + C)
        const whiteKeys = [0, 2, 4, 5, 7, 9, 11]; // C major scale indices

        // Calculate white key index
        let whiteKeyIndex = 0;
        for (let m = MIN_MIDI; m < midi; m++) {
            if (whiteKeys.includes(m % 12)) whiteKeyIndex++;
        }

        // If it's a black key, it's offset from the previous white key.
        const isBlack = !whiteKeys.includes(midi % 12);

        // Percentage
        const pct = (whiteKeyIndex / 15) * 100;

        if (isBlack) {
            return pct + (100 / 15) * 0.6; // Offset slightly
        }
        return pct + (100 / 15) * 0.1; // Center on white key
    };

    const animate = (time: number) => {
        // Calculate elapsed time based on AudioContext time or performance.now
        // Using Tone.Transport.seconds is precise.
        const now = Tone.Transport.seconds;
        setCurrentTime(now);

        // Stop if song ended
        if (now > song.totalDuration + 2) {
            setIsPlaying(false);
            Tone.Transport.stop();
            return;
        }

        if (mode === 'auto') {
            // Trigger notes
            // Note: Ideally we schedule these in advance with Tone.Part, 
            // but for a visualizer loop we can just check what just passed.
            // Actually best practice: Schedule all notes on Play.
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        // Schedule song on mount if we want, or on Play
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            Tone.Transport.stop();
            Tone.Transport.cancel();
        };
    }, [song]);

    const handlePlay = async () => {
        if (isPlaying) {
            Tone.Transport.pause();
            setIsPlaying(false);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        } else {
            await Tone.start();
            Tone.Transport.start();

            // Schedule audio
            if (Tone.Transport.position === 0 || Tone.Transport.seconds === 0) {
                Tone.Transport.cancel(); // Clear previous
                song.notes.forEach(note => {
                    Tone.Transport.schedule((time) => {
                        audioEngine.playNote(note.name, note.duration);
                    }, note.time);
                });
            }

            setIsPlaying(true);
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    const handleReset = () => {
        Tone.Transport.stop();
        Tone.Transport.seconds = 0;
        setCurrentTime(0);
        setIsPlaying(false);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };

    // Render visible notes
    // Lookahead window: 3 seconds
    // Speed: height / 3 seconds
    const WINDOW_SECONDS = 3;

    const visibleNotes = song.notes.filter(n =>
        n.time >= currentTime && n.time < currentTime + WINDOW_SECONDS
    );

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                    <h2 className="text-xl font-bold">{song.title}</h2>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleReset} className="p-3 rounded-full hover:bg-white/10"><RotateCcw /></button>
                    <button onClick={handlePlay} className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            {/* Visualizer Canvas Area */}
            <div className="relative h-[400px] w-full bg-slate-900/80 rounded-t-xl overflow-hidden border-x border-t border-white/10">
                {/* Render Notes */}
                {visibleNotes.map((note, i) => {
                    const timeToHit = note.time - currentTime;
                    const topPct = (1 - (timeToHit / WINDOW_SECONDS)) * 90; // 90% to leave room for keyboard at bottom

                    // Simplistic X mapping logic needs to match Keyboard perfectly.
                    // We'll rely on a manual offset hack for now or implement strict mapping.
                    // The keyboard component has keys. We need to align.
                    // Let's rely on relative key index mapping.

                    // MIDI 60 (C4) -> Index 0 (White)
                    // MIDI 61 (C#4) -> Index 0.5 (Black)
                    // etc. 

                    // Calculate precise left % based on 2 octaves (14 white keys + C = 15)
                    const startMidi = 60;
                    const relativeMidi = note.midi - startMidi;

                    // Map relative MIDI to "White Key Slots"
                    // C=0, C#=0.5, D=1, D#=1.5, E=2, F=3, F#=3.5 ...
                    // Map: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 (Seminotes)
                    // White Key Indices: 0, 1, 2, 3, 4, 5, 6 (x2 octaves)

                    const octave = Math.floor(relativeMidi / 12);
                    const semitone = relativeMidi % 12;

                    const whiteKeyOffsets = [0, 1, 2, 3, 4, 5, 6]; // C D E F G A B
                    const semitoneToWhiteIndex = [0, 0, 1, 1, 2, 3, 3, 4, 4, 5, 5, 6];
                    const isBlack = [1, 3, 6, 8, 10].includes(semitone);

                    let slotIndex = (octave * 7) + semitoneToWhiteIndex[semitone];
                    // Total slots: 15 (2 octaves + 1)
                    const totalSlots = 15;
                    const slotWidth = 100 / totalSlots;

                    let left = slotIndex * slotWidth;
                    if (isBlack) left += slotWidth * 0.6; // Offset
                    const width = isBlack ? slotWidth * 0.6 : slotWidth * 0.9;
                    const color = isBlack ? 'bg-cyan-400' : 'bg-purple-400';

                    return (
                        <div
                            key={`${note.name}-${note.time}`}
                            className={clsx(
                                "absolute rounded-lg shadow-[0_0_10px_rgba(139,92,246,0.5)]",
                                color
                            )}
                            style={{
                                left: `${left}%`,
                                top: `${topPct}%`,
                                width: `${width}%`,
                                height: `${Math.max(20, (note.duration / WINDOW_SECONDS) * 400)}px`,
                                opacity: timeToHit < 0.1 ? 0.0 : 1 // Fade out when hitting
                            }}
                        />
                    );
                })}

                {/* Hit Line */}
                <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>

            {/* Keyboard (Visual Only or Interactive) */}
            <div className="-mt-6 z-10">
                <Keyboard startOctave={4} octaves={2} />
            </div>
        </div>
    );
}
