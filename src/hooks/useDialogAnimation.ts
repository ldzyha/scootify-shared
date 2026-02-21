"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface UseDialogAnimationOptions {
  /** Callback when dialog opens */
  onOpen?: () => void;
  /** Callback when dialog closes (after animation) */
  onClose?: () => void;
}

interface UseDialogAnimationReturn {
  /** Ref for the dialog element */
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  /** Ref for the content container (for backdrop click detection) */
  contentRef: React.RefObject<HTMLDivElement | null>;
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Whether the dialog is in closing animation */
  isClosing: boolean;
  /** Open the dialog */
  open: () => void;
  /** Close the dialog (triggers animation) */
  close: () => void;
  /** Handler for animation end - call this on the animated element */
  handleAnimationEnd: () => void;
  /** Handler for dialog backdrop click */
  handleDialogClick: (e: React.MouseEvent<HTMLDialogElement>) => void;
}

/**
 * useDialogAnimation - Manages dialog open/close with CSS animations
 *
 * @example
 * const {
 *   dialogRef,
 *   contentRef,
 *   isOpen,
 *   isClosing,
 *   open,
 *   close,
 *   handleAnimationEnd,
 *   handleDialogClick
 * } = useDialogAnimation({
 *   onOpen: () => console.log('Dialog opened'),
 *   onClose: () => console.log('Dialog closed')
 * });
 *
 * return (
 *   <dialog
 *     ref={dialogRef}
 *     onClick={handleDialogClick}
 *   >
 *     <div
 *       ref={contentRef}
 *       className={isClosing ? 'animate-slide-out' : 'animate-slide-in'}
 *       onAnimationEnd={handleAnimationEnd}
 *     >
 *       Content here
 *     </div>
 *   </dialog>
 * );
 */
export function useDialogAnimation(
  options: UseDialogAnimationOptions = {}
): UseDialogAnimationReturn {
  const { onOpen, onClose } = options;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      setIsOpen(true);
      setIsClosing(false);
      onOpen?.();
    }
  }, [onOpen]);

  const close = useCallback(() => {
    if (isOpen && !isClosing) {
      setIsClosing(true);
    }
  }, [isOpen, isClosing]);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      dialogRef.current?.close();
      setIsClosing(false);
      setIsOpen(false);
      onClose?.();
    }
  }, [isClosing, onClose]);

  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      // Close on backdrop click (outside content)
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        close();
      }
    },
    [close]
  );

  // Handle ESC key - prevent default close and use animation
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [close]);

  return {
    dialogRef,
    contentRef,
    isOpen,
    isClosing,
    open,
    close,
    handleAnimationEnd,
    handleDialogClick,
  };
}

/**
 * useControlledDialogAnimation - Manages dialog animations with external state control
 *
 * This hook is designed for dialogs that are controlled by external state (e.g., global state, URL params).
 * Unlike `useDialogAnimation`, this hook doesn't manage the open state internally - it syncs with external state.
 *
 * @param externalIsOpen - External boolean state controlling whether the dialog should be open
 * @param onClose - Callback invoked when dialog should close (after animation completes)
 * @param options - Optional configuration object
 * @param options.onOpen - Callback invoked when dialog opens
 *
 * @returns Object containing refs, state, and handlers for the dialog
 * @returns dialogRef - Ref for the dialog element
 * @returns contentRef - Ref for the content container (for backdrop click detection)
 * @returns isClosing - Whether the dialog is currently in closing animation
 * @returns close - Function to trigger the close animation
 * @returns handleAnimationEnd - Handler for animation end - call this on the animated element
 * @returns handleDialogClick - Handler for dialog backdrop click
 *
 * @example
 * const [isCartOpen, setIsCartOpen] = useState(false);
 *
 * const {
 *   dialogRef,
 *   contentRef,
 *   isClosing,
 *   handleAnimationEnd,
 *   handleDialogClick
 * } = useControlledDialogAnimation(
 *   isCartOpen,
 *   () => setIsCartOpen(false),
 *   { onOpen: () => console.log('Cart opened') }
 * );
 *
 * return (
 *   <dialog ref={dialogRef} onClick={handleDialogClick}>
 *     <div
 *       ref={contentRef}
 *       className={isClosing ? 'animate-out' : 'animate-in'}
 *       onAnimationEnd={handleAnimationEnd}
 *     >
 *       Cart content
 *     </div>
 *   </dialog>
 * );
 */
export function useControlledDialogAnimation(
  externalIsOpen: boolean,
  onClose: () => void,
  options: { onOpen?: () => void } = {}
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Sync with external state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (externalIsOpen && !dialog.open) {
      dialog.showModal();
      setIsClosing(false);
      options.onOpen?.();
    }
  }, [externalIsOpen, options]);

  const close = useCallback(() => {
    if (externalIsOpen && !isClosing) {
      setIsClosing(true);
    }
  }, [externalIsOpen, isClosing]);

  const handleAnimationEnd = useCallback(() => {
    if (isClosing) {
      dialogRef.current?.close();
      setIsClosing(false);
      onClose();
    }
  }, [isClosing, onClose]);

  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        close();
      }
    },
    [close]
  );

  // Handle ESC key
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [close]);

  return {
    dialogRef,
    contentRef,
    isClosing,
    close,
    handleAnimationEnd,
    handleDialogClick,
  };
}
