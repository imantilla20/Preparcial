function LoadingSkeleton() {
    return (
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-10 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-[2/3] rounded-md bg-sleeve" />
                    <div className="mt-3 h-5 w-3/4 rounded bg-sleeve" />
                    <div className="mt-2 h-4 w-1/2 rounded bg-sleeve" />
                </div>
            ))}
        </div>
    );
}

export default LoadingSkeleton;