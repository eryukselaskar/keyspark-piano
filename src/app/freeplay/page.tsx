import { Keyboard } from '@/components/piano/Keyboard';

export default function FreePlayPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-8 w-full animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Free Play Mode</h1>
                <p className="text-muted-foreground">Experiment with sounds and melodies. Use your keyboard or click the keys.</p>
            </div>

            <div className="w-full flex justify-center py-10">
                <Keyboard octaves={2} />
            </div>

            <div className="p-4 rounded-lg bg-secondary/50 border border-white/5 text-sm text-muted-foreground max-w-md text-center">
                <p>Pro Tip: Use keys <span className="font-mono text-primary font-bold">A-K</span> to play middle row notes.</p>
            </div>
        </div>
    );
}
