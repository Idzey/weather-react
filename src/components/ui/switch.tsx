import clsx from "clsx";

export default function Switch({
  value,
  onChange,
  className = "",
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}) {
  return (
    <label
      className={`inline-flex items-center cursor-pointer select-none ${className}`}
    >
      <input
        type="checkbox"
        checked={value}
        onChange={() => onChange(!value)}
        className="sr-only peer"
      />
      <span className="flex items-center w-20 h-6 bg-secondary p-2 rounded-full relative transition-colors duration-200">
        <span
          className={clsx(
            "w-4 h-4 bg-background-main rounded-full shadow transition-transform duration-200 ease-in-out",
            value ? "translate-x-11" : "translate-x-0"
          )}
        ></span>
      </span>
    </label>
  );
}
