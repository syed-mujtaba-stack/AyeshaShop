"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-dark text-white hover:bg-dark-gray shadow-sm hover:shadow-md",
        primary: "gold-gradient text-white shadow-sm hover:shadow-lg hover:opacity-90",
        secondary: "bg-white text-dark border border-border hover:border-gold/30 hover:shadow-sm",
        gold: "bg-gold text-white hover:bg-gold-dark shadow-sm hover:shadow-md",
        outline: "border-2 border-dark text-dark hover:bg-dark hover:text-white",
        ghost: "text-dark hover:bg-lighter-gray",
        link: "text-gold underline-offset-4 hover:underline",
        destructive: "bg-error text-white hover:bg-error/90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <div className="inline-block">
        <motion.button
          whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
          whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
        >
          {loading && (
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {children}
        </motion.button>
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
