"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({ id, checked, onCheckedChange, label, className }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn("flex items-center gap-2.5 cursor-pointer group", className)}
    >
      <div
        className={cn(
          "flex items-center justify-center w-4 h-4 rounded border transition-all duration-200",
          checked
            ? "bg-gold border-gold"
            : "border-border group-hover:border-gold/50"
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      {label && <span className="text-sm text-dark">{label}</span>}
    </label>
  );
}
