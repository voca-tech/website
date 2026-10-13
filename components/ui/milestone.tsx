"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MilestoneIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MilestoneIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAG_VARIANTS: Variants = {
  normal: {
    d: "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z",
  },
  animate: {
    d: [
      "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z",
      "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4.6-3L18 6Z",
      "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l3.4-4L18 6Z",
      "M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z",
    ],
    transition: {
      duration: 1.4,
      ease: "easeInOut",
      times: [0, 0.33, 0.66, 1],
      repeat: Number.POSITIVE_INFINITY,
    },
  },
};

const MilestoneIcon = forwardRef<MilestoneIconHandle, MilestoneIconProps>(
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
          <motion.path
            animate={controls}
            variants={FLAG_VARIANTS}
            d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"
          />
          <path d="M12 13v8" />
          <path d="M12 3v3" />
        </svg>
      </div>
    );
  }
);

MilestoneIcon.displayName = "MilestoneIcon";

export { MilestoneIcon };
