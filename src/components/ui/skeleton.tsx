export default function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-card opacity-80 rounded-lg ${className}`}></div>
    );
}