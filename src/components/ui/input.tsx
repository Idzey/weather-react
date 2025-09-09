export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  name,
  onFocus,
}: {
  type?: string;
  placeholder?: string;
  value: string | null;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
  onFocus?: () => void;
}) {
  return (
    <input
      name={name}
      onFocus={onFocus}
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={(evt) => onChange && onChange(evt.target.value)}
      className={`border border-gray-light p-2 focus:outline-0 ${className}`}
    />
  );
}