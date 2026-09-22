type Variant = "primary" | "edit" | "danger" | "favorite" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-ryza text-sleeve",
  edit: "bg-fanfare text-sleeve",
  danger: "bg-piercing text-sleeve",
  favorite: "bg-mikado text-lyons",
  ghost: "bg-sleeve text-lyons",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1 text-xs shadow-print-sm",
  md: "px-5 py-2.5 text-sm shadow-print",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return [
    "inline-flex items-center justify-center gap-1.5 rounded-full border-2 border-lyons font-semibold",
    "transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
    "disabled:opacity-50",
    variants[variant],
    sizes[size],
  ].join(" ");
}

export const inputClass =
  "w-full rounded-lg border-2 border-lyons/30 bg-sleeve px-4 py-2.5 text-lyons outline-none transition-colors placeholder:text-lyons/40 focus:border-fanfare aria-[invalid=true]:border-piercing";

export const labelClass = "mb-1.5 block text-sm font-semibold";