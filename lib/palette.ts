const swatches = [
  { bg: "bg-ryza", text: "text-sleeve" },
  { bg: "bg-mikado", text: "text-lyons" },
  { bg: "bg-flat", text: "text-sleeve" },
  { bg: "bg-fanfare", text: "text-sleeve" },
  { bg: "bg-lyons", text: "text-mikado" },
  { bg: "bg-piercing", text: "text-sleeve" },
] as const;

export function swatchFor(id: number) {
  return swatches[Math.abs(Math.trunc(id)) % swatches.length];
}

export const stripeColors = swatches.map((s) => s.bg);