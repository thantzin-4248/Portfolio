
import { useId } from "react";

export default function TextField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder = "",
  required = false,
  maxLength,
}) {
  const generatedId = useId();
  const inputId = `${generatedId}-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[
          "w-full rounded-lg border px-3 py-2",
          "bg-white text-slate-900 dark:bg-slate-900 dark:text-white",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500",
          error
            ? "border-red-500"
            : "border-slate-300 dark:border-slate-700",
        ].join(" ")}
      />

      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
