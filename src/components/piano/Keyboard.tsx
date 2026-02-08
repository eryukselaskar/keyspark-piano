"use client";

import { useEffect, useState } from 'react';
import { PianoKey } from './PianoKey';
import { audioEngine } from '@/lib/audio';
import { useMidi } from '@/hooks/use-midi';

interface KeyboardProps {
    startOctave?: number;
    octaves?: number;
    showLabels?: boolean;
}

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Simple keyboard mapping for 1.5 octaves approximately
const KEY_MAP: Record<string, string> = {
    'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
    'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4',
    'k': 'C5', 'o': 'C#5', 'l': 'D5', 'p': 'D#5', ';': 'E5', "'": 'F5'
};

export function Keyboard({ startOctave = 4, octaves = 2, showLabels = true, onPlayNote, onStopNote }: KeyboardProps & {
    onPlayNote?: (note: string) => void;
    onStopNote?: (note: string) => void;
}) {
    const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

    // Initialize keys
    const keys = [];
    for (let i = 0; i < octaves; i++) {
        const octave = startOctave + i;
        NOTES.forEach(noteName => {
            keys.push({
                note: `${noteName}${octave}`,
                isBlack: noteName.includes('#'),
                baseNote: noteName
            });
        });
    }
    // Add final C
    keys.push({ note: `C${startOctave + octaves}`, isBlack: false, baseNote: 'C' });

    const startNote = async (note: string) => {
        await audioEngine.initialize();
        audioEngine.startNote(note);
        setActiveNotes(prev => new Set(prev).add(note));
        onPlayNote?.(note);
    };

    const stopNote = (note: string) => {
        audioEngine.stopNote(note);
        setActiveNotes(prev => {
            const next = new Set(prev);
            next.delete(note);
            return next;
        });
        onStopNote?.(note);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            const note = KEY_MAP[e.key.toLowerCase()];
            if (note) {
                startNote(note);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const note = KEY_MAP[e.key.toLowerCase()];
            if (note) {
                stopNote(note);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [onPlayNote, onStopNote]); // Re-bind if callbacks change

    // MIDI Support
    const { activeInput } = useMidi();

    useEffect(() => {
        if (!activeInput) return;

        const handleMidiMessage = (event: WebMidi.MIDIMessageEvent) => {
            const [command, note, velocity] = event.data;

            // Note On (144) or Note Off (128)
            // Some devices send Note On with 0 velocity for Note Off
            const isNoteOn = command === 144 && velocity > 0;
            const isNoteOff = command === 128 || (command === 144 && velocity === 0);

            // Convert MIDI number to Note Name (e.g., 60 -> C4)
            const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            const octave = Math.floor(note / 12) - 1;
            const noteName = noteNames[note % 12];
            const fullNoteString = `${noteName}${octave}`;

            if (isNoteOn) {
                startNote(fullNoteString);
            } else if (isNoteOff) {
                stopNote(fullNoteString);
            }
        };

        activeInput.onmidimessage = handleMidiMessage;

        return () => {
            activeInput.onmidimessage = null;
        };
    }, [activeInput, onPlayNote, onStopNote]); // Re-bind if input changes

    return (
        <div className="flex flex-col items-center gap-4">
            {activeInput && (
                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full animate-pulse">
                    🎹 MIDI Connected: {activeInput.name}
                </div>
            )}
            <div className="flex justify-center items-start select-none p-4 rounded-xl bg-slate-900/50 backdrop-blur-sm shadow-2xl overflow-x-auto">
                <div className="flex relative">
                    {keys.map((key) => {
                        const mappedKey = Object.entries(KEY_MAP).find(([k, v]) => v === key.note)?.[0];

                        return (
                            <PianoKey
                                key={key.note}
                                note={key.note}
                                isBlack={key.isBlack}
                                isActive={activeNotes.has(key.note)}
                                startNote={startNote}
                                stopNote={stopNote}
                                label={showLabels ? (mappedKey?.toUpperCase() || key.note) : undefined}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
