"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
  formatLabel?: (value: number) => string;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
  formatLabel,
}: SliderProps) {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-xs text-medium-gray">
        <span>{formatLabel ? formatLabel(localValue[0]) : `PKR ${localValue[0].toLocaleString()}`}</span>
        <span>{formatLabel ? formatLabel(localValue[1]) : `PKR ${localValue[1].toLocaleString()}`}</span>
      </div>
      <div className="relative h-2">
        <div className="absolute w-full h-2 bg-lighter-gray rounded-full" />
        <div
          className="absolute h-2 bg-gold rounded-full"
          style={{
            left: `${getPercent(localValue[0])}%`,
            width: `${getPercent(localValue[1]) - getPercent(localValue[0])}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={(e) => {
            const newVal = Math.min(Number(e.target.value), localValue[1] - step);
            const pair: [number, number] = [newVal, localValue[1]];
            setLocalValue(pair);
            onChange(pair);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={(e) => {
            const newVal = Math.max(Number(e.target.value), localValue[0] + step);
            const pair: [number, number] = [localValue[0], newVal];
            setLocalValue(pair);
            onChange(pair);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
