import { LESSONS } from '@/data/lessons';
import { LessonRunner } from '@/components/lesson/LessonRunner';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: string;
    };
}

// In Next.js 15+ or 14, params might need to be awaited or used differently depending on exact version, 
// strictly speaking in 14 it's just props.
export default function LessonPage({ params }: Props) {
    const lesson = LESSONS.find(l => l.id === params.id);

    if (!lesson) {
        notFound();
    }

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
            <LessonRunner lesson={lesson} />
        </div>
    );
}

export function generateStaticParams() {
    return LESSONS.map((lesson) => ({
        id: lesson.id,
    }));
}
