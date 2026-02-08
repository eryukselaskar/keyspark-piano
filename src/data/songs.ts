export interface SongNote {
    midi: number;
    name: string; // e.g. "C4"
    time: number; // start time in seconds
    duration: number; // duration in seconds
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    notes: SongNote[];
    totalDuration: number;
}

// Sample Song: Twinkle Twinkle Little Star
// Simplified timing for demo purposes
export const SAMPLE_SONGS: Song[] = [
    {
        id: 'twinkle',
        title: 'Twinkle Twinkle Little Star',
        artist: 'Traditional',
        difficulty: 'Easy',
        totalDuration: 12,
        notes: [
            { midi: 60, name: 'C4', time: 0, duration: 0.5 },
            { midi: 60, name: 'C4', time: 0.5, duration: 0.5 },
            { midi: 67, name: 'G4', time: 1.0, duration: 0.5 },
            { midi: 67, name: 'G4', time: 1.5, duration: 0.5 },
            { midi: 69, name: 'A4', time: 2.0, duration: 0.5 },
            { midi: 69, name: 'A4', time: 2.5, duration: 0.5 },
            { midi: 67, name: 'G4', time: 3.0, duration: 1.0 },

            { midi: 65, name: 'F4', time: 4.0, duration: 0.5 },
            { midi: 65, name: 'F4', time: 4.5, duration: 0.5 },
            { midi: 64, name: 'E4', time: 5.0, duration: 0.5 },
            { midi: 64, name: 'E4', time: 5.5, duration: 0.5 },
            { midi: 62, name: 'D4', time: 6.0, duration: 0.5 },
            { midi: 62, name: 'D4', time: 6.5, duration: 0.5 },
            { midi: 60, name: 'C4', time: 7.0, duration: 1.0 },
        ]
    },
    {
        id: 'fur-elise',
        title: 'Für Elise (Easy)',
        artist: 'Beethoven',
        difficulty: 'Medium',
        totalDuration: 10,
        notes: [
            { midi: 76, name: 'E5', time: 0, duration: 0.25 },
            { midi: 75, name: 'D#5', time: 0.25, duration: 0.25 },
            { midi: 76, name: 'E5', time: 0.5, duration: 0.25 },
            { midi: 75, name: 'D#5', time: 0.75, duration: 0.25 },
            { midi: 76, name: 'E5', time: 1.0, duration: 0.25 },
            { midi: 71, name: 'B4', time: 1.25, duration: 0.25 },
            { midi: 74, name: 'D5', time: 1.5, duration: 0.25 },
            { midi: 72, name: 'C5', time: 1.75, duration: 0.25 },
            { midi: 69, name: 'A4', time: 2.0, duration: 1.0 },
        ]
    }
];
