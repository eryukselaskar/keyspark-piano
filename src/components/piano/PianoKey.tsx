import clsx from 'clsx';
import { memo } from 'react';

interface PianoKeyProps {
    note: string;
    isBlack: boolean;
    isActive: boolean;
    startNote: (note: string) => void;
    stopNote: (note: string) => void;
    label?: string; // e.g. "C4" or keyboard key "A"
}

export const PianoKey = memo(function PianoKey({
    note,
    isBlack,
    isActive,
    startNote,
    stopNote,
    label
}: PianoKeyProps) {
    const handleDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Prevent scrolling on touch
        startNote(note);
    };

    const handleUp = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        stopNote(note);
    };

    const handleLeave = () => {
        if (isActive) stopNote(note);
    };

    return (
        <div
            onMouseDown={handleDown}
            onMouseUp={handleUp}
            onMouseLeave={handleLeave}
            onTouchStart={handleDown}
            onTouchEnd={handleUp}
            className={clsx(
                "relative rounded-b-lg cursor-pointer transition-colors duration-100 select-none shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50",
                isBlack
                    ? "w-8 h-32 -mx-4 z-10 bg-slate-900 border border-slate-700 text-white/50 text-[10px]"
                    : "w-12 h-48 bg-white border border-slate-200 text-slate-400 text-xs hover:bg-slate-50",
                isActive && isBlack && "bg-slate-700 scale-[0.98] origin-top",
                isActive && !isBlack && "bg-slate-100 scale-[0.99] origin-top shadow-inner",
                // Position label at bottom
            )}
            role="button"
            tabIndex={0}
            aria-label={`Play note ${note}`}
        >
            <div className="absolute bottom-2 w-full text-center pointer-events-none">
                {label}
            </div>
        </div>
    );
});
