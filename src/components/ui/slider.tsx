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
  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-xs text-medium-gray">
        <span>{formatLabel ? formatLabel(value[0]) : `PKR ${value[0].toLocaleString()}`}</span>
        <span>{formatLabel ? formatLabel(value[1]) : `PKR ${value[1].toLocaleString()}`}</span>
      </div>
      <div className="relative h-2">
        <div className="absolute w-full h-2 bg-lighter-gray rounded-full" />
        <div
          className="absolute h-2 bg-gold rounded-full"
          style={{
            left: `${getPercent(value[0])}%`,
            width: `${getPercent(value[1]) - getPercent(value[0])}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => {
            const newVal = Math.min(Number(e.target.value), value[1] - step);
            onChange([newVal, value[1]]);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => {
            const newVal = Math.max(Number(e.target.value), value[0] + step);
            onChange([value[0], newVal]);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
