"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Play, Pause, Minus, Plus } from 'lucide-react';
import clsx from 'clsx';

export function Metronome() {
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const oscillator = useRef<Tone.Oscillator | null>(null);
    const loop = useRef<Tone.Loop | null>(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            stop();
            oscillator.current?.dispose();
            loop.current?.dispose();
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            Tone.Transport.bpm.value = bpm;
        }
    }, [bpm, isPlaying]);

    const start = async () => {
        await Tone.start();

        if (!oscillator.current) {
            oscillator.current = new Tone.Oscillator(800, "sine").toDestination();
        }

        if (!loop.current) {
            loop.current = new Tone.Loop((time) => {
                oscillator.current?.start(time).stop(time + 0.05);
            }, "4n").start(0);
        }

        Tone.Transport.bpm.value = bpm;
        Tone.Transport.start();
        setIsPlaying(true);
    };

    const stop = () => {
        Tone.Transport.stop();
        setIsPlaying(false);
        // We don't necessarily dispose here to allow quick restart, but strict cleanup is good.
        // However, keeping loop allocated is fine.
    };

    const toggle = () => {
        if (isPlaying) stop();
        else start();
    };

    const changeBpm = (delta: number) => {
        setBpm(prev => Math.max(40, Math.min(240, prev + delta)));
    };

    return (
        <div className="flex items-center gap-4 bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
            <button
                onClick={toggle}
                className={clsx(
                    "p-2 rounded-full transition-colors",
                    isPlaying ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-primary/20 text-primary hover:bg-primary/30"
                )}
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2">
                <button onClick={() => changeBpm(-5)} className="p-1 hover:bg-white/10 rounded"><Minus className="w-3 h-3" /></button>
                <span className="font-mono font-bold w-12 text-center">{bpm}</span>
                <span className="text-xs text-muted-foreground mr-1">BPM</span>
                <button onClick={() => changeBpm(5)} className="p-1 hover:bg-white/10 rounded"><Plus className="w-3 h-3" /></button>
            </div>
        </div>
    );
}
