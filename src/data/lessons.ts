export interface Exercise {
    id: string;
    type: 'single' | 'pattern' | 'chord'; // single: 1 note, pattern: sequence, chord: simultaneous
    notes: string[][]; // Array of note groups (for chords) or single notes. e.g. [["C4"], ["D4"]] or [["C4", "E4", "G4"]]
    instruction: string;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    level: 'Beginner' | 'Intermediate';
    exercises: Exercise[];
}

export const LESSONS: Lesson[] = [
    {
        id: 'intro-c-major',
        title: '1. The C Major Scale',
        description: 'Learn the first 5 notes of the C Major scale.',
        level: 'Beginner',
        exercises: [
            { id: 'ex1', type: 'single', notes: [['C4']], instruction: 'Find and play Middle C (C4)' },
            { id: 'ex2', type: 'single', notes: [['D4']], instruction: 'Play the next white key, D4' },
            { id: 'ex3', type: 'single', notes: [['E4']], instruction: 'Play E4' },
            { id: 'ex4', type: 'pattern', notes: [['C4'], ['D4'], ['E4']], instruction: 'Play C4, then D4, then E4' },
        ]
    },
    {
        id: 'intervals',
        title: '2. Basic Intervals',
        description: 'Jumping between notes.',
        level: 'Beginner',
        exercises: [
            { id: 'ex1', type: 'pattern', notes: [['C4'], ['E4']], instruction: 'Play a Third: C4 to E4' },
            { id: 'ex2', type: 'pattern', notes: [['C4'], ['G4']], instruction: 'Play a Fifth: C4 to G4' },
            { id: 'ex3', type: 'pattern', notes: [['C4'], ['C5']], instruction: 'Play an Octave: C4 to C5' },
        ]
    },
    {
        id: 'first-chord',
        title: '3. Your First Chord',
        description: 'Playing multiple notes at once.',
        level: 'Intermediate',
        exercises: [
            { id: 'ex1', type: 'chord', notes: [['C4', 'E4', 'G4']], instruction: 'Play C4, E4, and G4 together (C Major Triad)' },
        ]
    }
];
