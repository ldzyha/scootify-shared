'use client';

import { useDialog } from '../Dialog';
import { Icon } from '../Icon';
import { specsExplainer, type SpecExplanation } from '@scootify/shared/data/specs-explainer';
import styles from './SpecInfoButton.module.css';

/**
 * Props for SpecInfoButton component
 */
export interface SpecInfoButtonProps {
  /** Spec key from specs-explainer.ts */
  specKey: string;
  /** Optional: override spec explanation data */
  specData?: SpecExplanation;
  /** Size of the info icon */
  size?: 'sm' | 'md';
  /** Additional CSS class */
  className?: string;
}

/**
 * Info icon button that shows spec explainer in a dialog.
 * 
 * @example
 * ```tsx
 * <SpecInfoButton specKey="voltage" />
 * <SpecInfoButton specKey="power" size="sm" />
 * ```
 */
export function SpecInfoButton({
  specKey,
  specData,
  size = 'md',
  className = '',
}: SpecInfoButtonProps) {
  const { openDialog } = useDialog();
  
  const explanation = specData || specsExplainer[specKey];
  
  if (!explanation) {
    console.warn(`SpecInfoButton: No explanation found for spec key "${specKey}"`);
    return null;
  }

  const handleClick = () => {
    openDialog(
      <div className={styles.dialogContent}>
        <h3 className={styles.title}>{explanation.title}</h3>
        <div className={styles.label}>{explanation.label}</div>
        <p className={styles.explanation}>{explanation.explanation}</p>
        {explanation.example && (
          <div className={styles.example}>
            <strong>Приклад:</strong> {explanation.example}
          </div>
        )}
      </div>,
      {
        size: 'sm',
        position: 'center',
      }
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${styles.button} ${styles[`size-${size}`]} ${className}`}
      aria-label={`Що таке ${explanation.title}?`}
      title="Що це означає?"
    >
      <Icon name="info" size={size === 'sm' ? 'xs' : 'sm'} />
    </button>
  );
}

export default SpecInfoButton;
