"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface BarChart3IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BarChart3IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BAR1_VARIANTS: Variants = {
  normal: { d: "M18 17V9" },
  animate: {
    d: ["M18 17V9", "M18 17V6", "M18 17V11", "M18 17V9"],
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      times: [0, 0.33, 0.66, 1],
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const BAR2_VARIANTS: Variants = {
  normal: { d: "M13 17V5" },
  animate: {
    d: ["M13 17V5", "M13 17V9", "M13 17V3", "M13 17V5"],
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      times: [0, 0.33, 0.66, 1],
      delay: 0.2,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const BAR3_VARIANTS: Variants = {
  normal: { d: "M8 17V14" },
  animate: {
    d: ["M8 17V14", "M8 17V10", "M8 17V16", "M8 17V14"],
    transition: {
      duration: 1.8,
      ease: "easeInOut",
      times: [0, 0.33, 0.66, 1],
      delay: 0.4,
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const BarChart3Icon = forwardRef<BarChart3IconHandle, BarChart3IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 3v18h18" />
          <motion.path animate={controls} variants={BAR1_VARIANTS} d="M18 17V9" />
          <motion.path animate={controls} variants={BAR2_VARIANTS} d="M13 17V5" />
          <motion.path animate={controls} variants={BAR3_VARIANTS} d="M8 17V14" />
        </svg>
      </div>
    );
  }
);

BarChart3Icon.displayName = "BarChart3Icon";

export { BarChart3Icon };
