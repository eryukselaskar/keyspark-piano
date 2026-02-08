export interface UserProgress {
    completedLessons: string[];
    totalPracticeTimeMinutes: number;
    xp: number;
    level: number;
}

const STORAGE_KEY = 'keyspark-progress';

// Level = Math.floor(Math.sqrt(XP / 100))
// Rank based on Level
export const progressStore = {
    get: (): UserProgress => {
        if (typeof window === 'undefined') return { completedLessons: [], totalPracticeTimeMinutes: 0, xp: 0, level: 1 };
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? { ...JSON.parse(data), xp: JSON.parse(data).xp || 0, level: JSON.parse(data).level || 1 } : { completedLessons: [], totalPracticeTimeMinutes: 0, xp: 0, level: 1 };
        } catch {
            return { completedLessons: [], totalPracticeTimeMinutes: 0, xp: 0, level: 1 };
        }
    },

    save: (progress: UserProgress) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    },

    addXp: (amount: number) => {
        const current = progressStore.get();
        const newXp = current.xp + amount;
        const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;

        const updated = {
            ...current,
            xp: newXp,
            level: newLevel
        };
        progressStore.save(updated);
        return updated;
    },

    completeLesson: (lessonId: string) => {
        const current = progressStore.get();
        if (!current.completedLessons.includes(lessonId)) {
            // Award 500 XP for lesson completion
            const xpUpdated = progressStore.addXp(500);

            const updated = {
                ...xpUpdated,
                completedLessons: [...current.completedLessons, lessonId]
            };
            progressStore.save(updated);
            return updated;
        }
        return current;
    },

    addPracticeTime: (minutes: number) => {
        const current = progressStore.get();
        // Award 10 XP per minute
        const xpUpdated = progressStore.addXp(minutes * 10);

        const updated = {
            ...xpUpdated,
            totalPracticeTimeMinutes: current.totalPracticeTimeMinutes + minutes
        };
        progressStore.save(updated);
        return updated;
    }
};
