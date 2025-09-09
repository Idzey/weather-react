export function HorizontalDivider({
    className = "",
}: {
    className?: string;
}) {
    return <div className={`h-1 w-full border-b-2 border-gray-300 ${className}`} />;
}
export function VerticalDivider({
    className = "",
    size
}: {
    className?: string;
    size?: "small" | "large";
}) {
    const sizeClasses = size === "small" ? "h-6" : "h-12";
    return <div className={`border-l border-gray-300 ${sizeClasses} ${className}`} />;
}