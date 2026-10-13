export default function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="stepper-bar mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 gap-2">
          <div className="flex flex-col items-center shrink-0">
            <div className={`step-dot ${i < current ? "done" : i === current ? "active" : ""}`}>
              {i < current ? "✓" : i + 1}
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-muted mt-2 hidden sm:block whitespace-nowrap">
              {label}
            </span>
          </div>
          {i < steps.length - 1 && <div className={`step-line ${i < current ? "done" : ""}`} />}
        </div>
      ))}
    </div>
  );
}
