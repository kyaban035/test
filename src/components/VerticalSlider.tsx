import { useEffect, useRef, useCallback } from "react";

type Option = { value: number; label: string; sub?: string };

interface Props {
  options: Option[];
  value: number;
  onChange: (v: number) => void;
  accent?: string; // tailwind bg class for highlighted item
  ariaLabel?: string;
}

/**
 * Vertical drag selector. Users drag up/down (mouse or touch) to pick a value.
 * Also supports click on an item and keyboard arrows.
 */
export function VerticalSlider({
  options,
  value,
  onChange,
  accent = "bg-mint",
  ariaLabel,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemH = 56; // px per item
  const idx = Math.max(0, options.findIndex((o) => o.value === value));

  const dragging = useRef(false);
  const startY = useRef(0);
  const startIdx = useRef(0);

  const setByIdx = useCallback(
    (i: number) => {
      const clamped = Math.min(options.length - 1, Math.max(0, i));
      const next = options[clamped];
      if (next && next.value !== value) onChange(next.value);
    },
    [options, value, onChange]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startY.current = e.clientY;
    startIdx.current = idx;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dy = e.clientY - startY.current;
    const delta = Math.round(dy / itemH);
    setByIdx(startIdx.current + delta);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setByIdx(idx + (e.deltaY > 0 ? 1 : -1));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ top: idx * itemH, behavior: "smooth" });
  }, [idx]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setByIdx(idx + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setByIdx(idx - 1);
    }
  };

  return (
    <div
      className="relative mx-auto card-soft bg-background select-none touch-none"
      style={{ width: 240, height: itemH * 3, padding: 0, overflow: "hidden" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      onKeyDown={onKey}
      tabIndex={0}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={options[0]?.value}
      aria-valuemax={options[options.length - 1]?.value}
      aria-valuenow={value}
    >
      {/* center highlight */}
      <div
        className={`pointer-events-none absolute left-2 right-2 rounded-2xl border-2 border-foreground ${accent}`}
        style={{ top: itemH, height: itemH }}
      />
      <div
        ref={trackRef}
        className="absolute inset-0 overflow-hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        <ul style={{ paddingTop: itemH, paddingBottom: itemH }}>
          {options.map((o, i) => {
            const active = i === idx;
            return (
              <li
                key={o.value}
                onClick={() => setByIdx(i)}
                className={`flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  active ? "font-bold text-xl" : "text-base text-muted-foreground"
                }`}
                style={{ height: itemH }}
              >
                <span>{o.label}</span>
                {o.sub && <span className="text-xs">{o.sub}</span>}
              </li>
            );
          })}
        </ul>
      </div>
      {/* drag hint arrows */}
      <div className="pointer-events-none absolute inset-x-0 top-1 flex justify-center text-foreground/40 text-xs">▲</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center text-foreground/40 text-xs">▼</div>
    </div>
  );
}
