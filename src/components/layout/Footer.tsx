export function Footer() {
    return (
        <footer className="w-full py-6 mt-auto border-t border-white/10 bg-black/20">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} KeySpark. All rights reserved.</p>
                <p className="mt-1 text-xs opacity-70">Build with ❤️ using Next.js & Tone.js</p>
            </div>
        </footer>
    );
}
