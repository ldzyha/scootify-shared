'use client';

import React from 'react';
import { Icon } from './Icon';

/**
 * Props for the ColorSwatches component
 */
export interface ColorSwatchesProps {
  /** Array of color names to display as swatches */
  colors: string[];
  /** Currently selected color name */
  selectedColor?: string;
  /** Callback fired when a color is clicked */
  onColorChange?: (color: string) => void;
  /** Size variant of the swatches */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const bgMap: Record<string, string> = {
  yellow: 'bg-yellow-400',
  gray: 'bg-zinc-500',
  black: 'bg-black',
  white: 'bg-white',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
};

const sizeMap = {
  sm: { button: 'w-6 h-6', icon: 12 },
  md: { button: 'w-8 h-8', icon: 14 },
  lg: { button: 'w-10 h-10', icon: 16 },
};

/**
 * ColorSwatches - Interactive color picker for product variants
 * 
 * Displays a row of circular color swatches with hover effects, selection state,
 * and a checkmark indicator for the selected color.
 * 
 * @example
 * ```tsx
 * <ColorSwatches
 *   colors={['black', 'white', 'red']}
 *   selectedColor="black"
 *   onColorChange={(color) => console.log(color)}
 *   size="md"
 * />
 * ```
 */
export function ColorSwatches({
  colors,
  selectedColor,
  onColorChange,
  size = 'md',
  className = '',
}: ColorSwatchesProps) {
  if (!colors || colors.length === 0) return null;

  const { button: buttonSize, icon: iconSize } = sizeMap[size];

  return (
    <div className={`flex gap-1.5 ${className}`}>
      {colors.map((color) => {
        const isSelected = selectedColor === color;
        const bgClass = bgMap[color.toLowerCase()] || 'bg-zinc-400';

        return (
          <button
            key={color}
            type="button"
            onClick={() => onColorChange?.(color)}
            title={color}
            aria-label={`Колір: ${color}`}
            aria-pressed={isSelected}
            className={`
              ${buttonSize} rounded-full border-2 transition-all duration-200
              flex items-center justify-center
              ${bgClass}
              ${
                isSelected
                  ? 'border-zinc-100 scale-110 shadow-lg ring-2 ring-zinc-400/50'
                  : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105'
              }
            `}
          >
            {isSelected && (
              <Icon
                name="check"
                size={iconSize}
                color={color.toLowerCase() === 'white' || color.toLowerCase() === 'yellow' ? '#000' : '#fff'}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ColorSwatches;
