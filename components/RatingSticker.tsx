function RatingSticker({ rating, className = "" }: { rating: number; className?: string }) {
    return (
        <span
            className={`grid size-12 rotate-[-10deg] place-items-center rounded-full border-2 border-lyons bg-mikado text-sm font-bold text-lyons shadow-print-sm ${className}`}
        >
            ★{rating}
        </span>
    );
}

export default RatingSticker;