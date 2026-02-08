import { SAMPLE_SONGS } from '@/data/songs';
import { Visualizer } from '@/components/songs/Visualizer';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: string;
    };
}

export default function SongPlayerPage({ params }: Props) {
    const song = SAMPLE_SONGS.find(s => s.id === params.id);

    if (!song) {
        notFound();
    }

    return (
        <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-8">
            <Visualizer song={song} />
        </div>
    );
}

export function generateStaticParams() {
    return SAMPLE_SONGS.map((song) => ({
        id: song.id,
    }));
}
