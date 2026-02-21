'use client';

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './Dialog.module.css';
import { Icon } from './Icon';

// ============================================
// Types
// ============================================

/**
 * Dialog position options.
 * - Corner positions (top-left, top-right, bottom-left, bottom-right) show in corners on desktop, center on mobile
 * - Panel positions (panel-left, panel-right, panel-top, panel-bottom) slide from edges
 * - Center position shows centered on desktop, bottom sheet on mobile
 */
export type DialogPosition =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'panel-left'
  | 'panel-right'
  | 'panel-top'
  | 'panel-bottom';

/**
 * Props for the Dialog component.
 */
export interface DialogProps {
  /** Dialog content */
  children: ReactNode;
  /** Callback when dialog closes */
  onClose?: () => void;
  /** Additional CSS class name */
  className?: string;
  /** Show close button in top-right corner (default: true) */
  showCloseButton?: boolean;
  /** Allow closing by clicking backdrop (default: true) */
  closeOnBackdrop?: boolean;
  /** Dialog size (default: 'md') */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Dialog position (default: 'center') */
  position?: DialogPosition;
}

/**
 * Dialog imperative handle for programmatic control.
 */
export interface DialogHandle {
  /** Open the dialog */
  open: () => void;
  /** Close the dialog */
  close: () => void;
  /** Current open state */
  isOpen: boolean;
}

/**
 * Context value for global dialog management.
 */
export interface DialogContextValue {
  /** Open a dialog with content and options */
  openDialog: (content: ReactNode, options?: DialogOptions) => void;
  /** Close the active dialog */
  closeDialog: () => void;
  /** Whether a dialog is currently open */
  isOpen: boolean;
}

/**
 * Options for opening a dialog via context.
 */
export interface DialogOptions {
  /** Callback when dialog closes */
  onClose?: () => void;
  /** Show close button in top-right corner */
  showCloseButton?: boolean;
  /** Allow closing by clicking backdrop */
  closeOnBackdrop?: boolean;
  /** Dialog size */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** Dialog position */
  position?: DialogPosition;
  /** Additional CSS class name */
  className?: string;
}

// ============================================
// Dialog Component (Controlled)
// ============================================

/**
 * Native HTML `<dialog>` component with animations, positions, and swipe-to-close.
 *
 * @example
 * ```tsx
 * const dialogRef = useRef<DialogHandle>(null);
 *
 * <Dialog ref={dialogRef} onClose={() => console.log('closed')}>
 *   <h2>Hello World</h2>
 *   <p>This is a dialog</p>
 * </Dialog>
 *
 * // Open programmatically
 * dialogRef.current?.open();
 * ```
 *
 * @features
 * - Native `<dialog>` element for accessibility
 * - Smooth animations (fade/scale on desktop, slide on mobile)
 * - Multiple positions: center, corners, panels
 * - Swipe-to-close on mobile (for bottom-positioned dialogs)
 * - ESC key and backdrop click support
 * - Multiple sizes: sm, md, lg, full
 * - Accessible focus management
 */
export const Dialog = forwardRef<DialogHandle, DialogProps>(function Dialog(
  {
    children,
    onClose,
    className = '',
    showCloseButton = true,
    closeOnBackdrop = true,
    size = 'md',
    position = 'center',
  },
  ref
) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Swipe gesture state
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  /**
   * Close dialog with exit animation.
   */
  const handleClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    // Step 1: Add data-closing attribute to trigger exit animation
    dialog.setAttribute('data-closing', 'true');

    let closed = false;
    const closeDialog = () => {
      if (closed) return;
      closed = true;
      dialog.removeAttribute('data-closing');
      dialog.close();
      setIsOpen(false);
      onClose?.();
    };

    // Step 2: Listen for animation end on content element
    const content = contentRef.current;
    if (content) {
      const handleAnimationEnd = (event: AnimationEvent) => {
        // Only handle animations on the content element itself
        if (event.target !== content) return;
        content.removeEventListener('animationend', handleAnimationEnd);
        closeDialog();
      };
      content.addEventListener('animationend', handleAnimationEnd);
    }

    // Step 3: Fallback timeout for Firefox and other browsers where animation events may not fire
    // This ensures the dialog closes even if animationend doesn't trigger
    setTimeout(closeDialog, 250);
  }, [onClose]);

  /**
   * Open dialog as modal.
   */
  const handleOpen = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    dialog.showModal();
    setIsOpen(true);
  }, []);

  /**
   * Handle backdrop click.
   */
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLDialogElement>) => {
      if (!closeOnBackdrop) return;

      // If the click target is the dialog element itself (not content or its children),
      // then it's a backdrop click. The dialog fills the viewport, and content is nested inside.
      if (event.target === event.currentTarget) {
        handleClose();
      }
    },
    [closeOnBackdrop, handleClose]
  );

  /**
   * Handle ESC key (native dialog handles this, but we need animation).
   */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      handleClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [handleClose]);

  /**
   * Swipe down to close (mobile only).
   */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const content = contentRef.current;
    if (!content) return;

    // Don't interfere with form elements
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target.isContentEditable) {
      return;
    }

    // Only allow swipe if at the top of scrollable content
    if (content.scrollTop > 0) return;

    touchStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const content = contentRef.current;
    if (!content) return;

    touchCurrentY.current = e.touches[0].clientY;
    const deltaY = touchCurrentY.current - touchStartY.current;

    // Only allow downward drag
    if (deltaY > 0) {
      // Apply visual feedback - translate the content
      content.style.transform = `translateY(${Math.min(deltaY * 0.5, 150)}px)`;
      content.style.transition = 'none';
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;

    const content = contentRef.current;
    if (!content) return;

    const deltaY = touchCurrentY.current - touchStartY.current;

    // Reset transform
    content.style.transform = '';
    content.style.transition = '';

    // If swiped down more than 80px, close the dialog
    if (deltaY > 80) {
      handleClose();
    }

    isDragging.current = false;
    touchStartY.current = 0;
    touchCurrentY.current = 0;
  }, [handleClose]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
    isOpen,
  }));

  const sizeClass = styles[`size-${size}`] || styles['size-md'];
  const positionClass = styles[`position-${position}`] || styles['position-center'];

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${sizeClass} ${positionClass} ${className}`}
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className={styles.content}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle for mobile */}
        <div className={styles.dragHandle} aria-hidden="true">
          <div className={styles.dragHandleBar} />
        </div>
        {showCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeButton}
            aria-label="Close dialog"
          >
            <Icon name="close" size="md" />
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
});

// ============================================
// Dialog Context & Provider (Global Dialog)
// ============================================

const DialogContext = createContext<DialogContextValue | null>(null);

/**
 * Provider for global dialog management.
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <DialogProvider>
 *       <YourApp />
 *     </DialogProvider>
 *   );
 * }
 *
 * function YourComponent() {
 *   const { openDialog, closeDialog } = useDialog();
 *
 *   return (
 *     <button onClick={() => openDialog(<p>Hello!</p>, { size: 'sm' })}>
 *       Open Dialog
 *     </button>
 *   );
 * }
 * ```
 */
export function DialogProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<DialogHandle>(null);
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const [dialogOptions, setDialogOptions] = useState<DialogOptions>({});
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback((content: ReactNode, options: DialogOptions = {}) => {
    setDialogContent(content);
    setDialogOptions(options);
    // Need to wait for state update before opening
    setTimeout(() => {
      dialogRef.current?.open();
      setIsOpen(true);
    }, 0);
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    dialogOptions.onClose?.();
    // Clear content after close animation
    setTimeout(() => {
      setDialogContent(null);
      setDialogOptions({});
    }, 300);
  }, [dialogOptions]);

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen }}>
      {children}
      <Dialog
        ref={dialogRef}
        onClose={handleClose}
        showCloseButton={dialogOptions.showCloseButton ?? true}
        closeOnBackdrop={dialogOptions.closeOnBackdrop ?? true}
        size={dialogOptions.size ?? 'md'}
        position={dialogOptions.position ?? 'center'}
        className={dialogOptions.className}
      >
        {dialogContent}
      </Dialog>
    </DialogContext.Provider>
  );
}

// ============================================
// useDialog Hook
// ============================================

/**
 * Hook to access global dialog context.
 * Must be used within a DialogProvider.
 *
 * @throws Error if used outside DialogProvider
 *
 * @example
 * ```tsx
 * const { openDialog, closeDialog, isOpen } = useDialog();
 *
 * openDialog(
 *   <div>
 *     <h2>Confirm Action</h2>
 *     <p>Are you sure?</p>
 *   </div>,
 *   {
 *     size: 'sm',
 *     position: 'center',
 *     onClose: () => console.log('Dialog closed')
 *   }
 * );
 * ```
 */
export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

export default Dialog;
