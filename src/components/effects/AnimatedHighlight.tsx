'use client';
import type { FC } from 'react';
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedHighlightProps {
  className?: string;
}

const H_LENGTH = 160; // Length of horizontal part of L
const V_LENGTH = 100; // Length of vertical part of L
const STROKE_WIDTH = 6; // Stroke width for each line
const NUM_LINES = 4;
const LINE_SPACING_FACTOR = 1.5; // Multiplier for STROKE_WIDTH to get center-to-center spacing (includes STROKE_WIDTH + gap)
const ANIMATION_STAGGER_DELAY = 0.15; // seconds

export const AnimatedHighlight: FC<AnimatedHighlightProps> = ({ className }) => {
  const firstLineTopLeftAnimId = React.useId();
  const firstLineBottomRightAnimId = React.useId();

  const lineOffsetIncrement = STROKE_WIDTH * LINE_SPACING_FACTOR;

  return (
    <>
      {/* Top-left corner */}
      <svg
        className={cn(
          "absolute top-[5px] left-[5px] pointer-events-none z-0",
          className
        )}
        width={H_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement } // Adjusted for spread
        height={V_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement} // Adjusted for spread
        viewBox={`0 0 ${H_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement} ${V_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: NUM_LINES }).map((_, k) => {
          const coord_val_k = STROKE_WIDTH / 2 + k * lineOffsetIncrement;
          return (
            <path
              key={`tl-${k}`}
              d={`M ${H_LENGTH} ${coord_val_k} L ${coord_val_k} ${coord_val_k} L ${coord_val_k} ${V_LENGTH}`}
              stroke="hsl(var(--primary) / 0.65)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="0.25 0.75"
            >
              <animate
                id={k === 0 ? firstLineTopLeftAnimId : undefined}
                attributeName="stroke-dashoffset"
                values="1;-1"
                dur="3s"
                begin={k === 0 ? undefined : `${firstLineTopLeftAnimId}.begin+${k * ANIMATION_STAGGER_DELAY}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}
      </svg>

      {/* Bottom-right corner */}
      <svg
        className={cn(
          "absolute bottom-[5px] right-[5px] pointer-events-none z-0",
          className
        )}
        width={H_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement }
        height={V_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement}
        viewBox={`0 0 ${H_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement} ${V_LENGTH + STROKE_WIDTH + (NUM_LINES -1) * lineOffsetIncrement}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: NUM_LINES }).map((_, k) => {
          const y_coord_val_k = (V_LENGTH - STROKE_WIDTH / 2) - k * lineOffsetIncrement;
          const x_coord_val_k = (H_LENGTH - STROKE_WIDTH / 2) - k * lineOffsetIncrement;
          // Base coordinates for the "tip" of the L, adjusted for consistency with top-left
          const tip_x_base = STROKE_WIDTH / 2;
          const tip_y_base = STROKE_WIDTH / 2;


          // Path for bottom-right: M (tip_x) (far_y) L (far_x) (far_y) L (far_x) (tip_y)
          // We want the lines to grow from the inner corner outwards for consistency
          // Original: M ${SW/2} ${V_LENGTH - SH} L ${H_LENGTH - SH} ${V_LENGTH - SH} L ${H_LENGTH - SH} ${SW/2}
          // This means the "SW/2" is the inner edge and "V_LENGTH - SH" / "H_LENGTH - SH" is the outer edge of the group
          
          // For line k:
          // Inner y for horizontal part: (V_LENGTH - STROKE_WIDTH/2) - k * lineOffsetIncrement
          // Inner x for vertical part: (H_LENGTH - STROKE_WIDTH/2) - k * lineOffsetIncrement
          // Far x for horizontal part: STROKE_WIDTH/2 + k * lineOffsetIncrement (NO, this should be fixed for the group)
          // Far y for vertical part: STROKE_WIDTH/2 + k * lineOffsetIncrement (NO, this should be fixed for the group)

          // Let's adjust the path definition to be more clear for bottom-right
          // Start point (bottom-left of the L): (STROKE_WIDTH/2 + k*lineOffsetIncrement, V_LENGTH - STROKE_WIDTH/2 - k*lineOffsetIncrement) -> No this is not right
          
          // Path: Start at bottom-most point of vertical arm, go up to corner, then go right along horizontal arm.
          // To mirror the top-left which starts at right-most of H-arm, goes left to corner, then down V-arm.
          // BR equivalent: Start at left-most of H-arm (relative to BR corner), go right to corner, then up V-arm.
          // H-arm: y is (V_LENGTH - (SW/2 + k*offset)), x from (SW/2 + k*offset) to (H_LENGTH - (SW/2 + k*offset))
          // V-arm: x is (H_LENGTH - (SW/2 + k*offset)), y from (V_LENGTH - (SW/2 + k*offset)) to (SW/2 + k*offset)
          
          // Re-using similar logic to top-left, but inverted coords relative to (H_LENGTH, V_LENGTH)
          const currentVLength = V_LENGTH - (k * lineOffsetIncrement);
          const currentHLength = H_LENGTH - (k * lineOffsetIncrement);
          const currentOffset = STROKE_WIDTH / 2; // This is the "innermost" line's offset from edge of its box

          return (
            <path
              key={`br-${k}`}
              d={`M ${currentOffset} ${currentVLength} L ${currentHLength} ${currentVLength} L ${currentHLength} ${currentOffset}`}
              stroke="hsl(var(--primary) / 0.65)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="0.25 0.75"
            >
              <animate
                id={k === 0 ? firstLineBottomRightAnimId : undefined}
                attributeName="stroke-dashoffset"
                values="1;-1"
                dur="3s"
                begin={k === 0 ? `${firstLineTopLeftAnimId}.begin+1.5s` : `${firstLineBottomRightAnimId}.begin+${k * ANIMATION_STAGGER_DELAY}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}
      </svg>
    </>
  );
};