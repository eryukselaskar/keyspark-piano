export interface UserProgress {
    completedLessons: string[];
    totalPracticeTimeMinutes: number;
}

const STORAGE_KEY = 'keyspark-progress';

export const progressStore = {
    get: (): UserProgress => {
        if (typeof window === 'undefined') return { completedLessons: [], totalPracticeTimeMinutes: 0 };
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : { completedLessons: [], totalPracticeTimeMinutes: 0 };
        } catch {
            return { completedLessons: [], totalPracticeTimeMinutes: 0 };
        }
    },

    save: (progress: UserProgress) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    },

    completeLesson: (lessonId: string) => {
        const current = progressStore.get();
        if (!current.completedLessons.includes(lessonId)) {
            const updated = {
                ...current,
                completedLessons: [...current.completedLessons, lessonId]
            };
            progressStore.save(updated);
            return updated;
        }
        return current;
    },

    addPracticeTime: (minutes: number) => {
        const current = progressStore.get();
        const updated = {
            ...current,
            totalPracticeTimeMinutes: current.totalPracticeTimeMinutes + minutes
        };
        progressStore.save(updated);
        return updated;
    }
};
