'use client';

import { useState, useEffect, useRef } from 'react';
import { MetallicButton } from './MetallicButton';
import { MetallicText } from './MetallicText';
import { Icon } from './Icon';
import { Dialog, type DialogHandle } from './Dialog';
import styles from './CallButton.module.css';

/**
 * CallButton component displays a phone call CTA button with icon.
 * On mobile devices, it renders as a direct tel: link.
 * On desktop, it opens a dialog with a QR code for calling from mobile.
 * 
 * @param {CallButtonProps} props - Component props
 * @param {string} props.phoneNumber - Phone number in E.164 format (e.g., '+380772770006')
 * @param {string} [props.phoneDisplay] - Formatted phone number for display (defaults to phoneNumber)
 * @param {string} [props.buttonText] - Button label text (defaults to 'Дзвінок')
 * @param {string} [props.dialogTitle] - Dialog title text (defaults to 'Скануйте для дзвінка')
 * @param {string} [props.dialogSubtitle] - Dialog subtitle text (defaults to 'Відскануйте QR-код камерою телефону')
 * @param {string} [props.copyButtonText] - Copy button text (defaults to 'Копіювати номер')
 * @param {string} [props.copiedText] - Text shown after copying (defaults to 'Скопійовано!')
 * @param {string} [props.className] - Optional CSS class name for the button wrapper
 * @returns {JSX.Element} CallButton component
 */
export interface CallButtonProps {
  phoneNumber: string;
  phoneDisplay?: string;
  buttonText?: string;
  dialogTitle?: string;
  dialogSubtitle?: string;
  copyButtonText?: string;
  copiedText?: string;
  className?: string;
}

export function CallButton({ 
  phoneNumber,
  phoneDisplay = phoneNumber,
  buttonText = 'Дзвінок',
  dialogTitle = 'Скануйте для дзвінка',
  dialogSubtitle = 'Відскануйте QR-код камерою телефону',
  copyButtonText = 'Копіювати номер',
  copiedText = 'Скопійовано!',
  className 
}: CallButtonProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<DialogHandle>(null);

  // Detect desktop (no touch or large screen)
  useEffect(() => {
    const checkDesktop = () => {
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const isLargeScreen = window.innerWidth >= 768;
      setIsDesktop(!hasCoarsePointer && isLargeScreen);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${phoneNumber}&bgcolor=1E1E1E&color=ffffff`;

  // Mobile - direct tel link
  if (!isDesktop) {
    return (
      <a href={`tel:${phoneNumber}`} className={className}>
        <MetallicButton variant="silver" size="md" className="w-full">
          <Icon name="phone" size="sm" className="me-2" />
          {buttonText}
        </MetallicButton>
      </a>
    );
  }

  // Desktop - show QR dialog
  return (
    <>
      <MetallicButton
        variant="silver"
        size="md"
        className={className}
        onClick={() => dialogRef.current?.open()}
      >
        <Icon name="phone" size="sm" className="me-2" />
        {buttonText}
      </MetallicButton>

      <Dialog ref={dialogRef} size="sm" position="center">
        <div className={styles.content}>
          <MetallicText variant="silver" as="h3" className={styles.title}>
            {dialogTitle}
          </MetallicText>
          <p className={styles.subtitle}>
            {dialogSubtitle}
          </p>

          <div className={styles.qrContainer}>
            <img
              src={qrUrl}
              alt="QR код для дзвінка"
              className={styles.qrCode}
              width={200}
              height={200}
            />
          </div>

          <p className={styles.phone}>{phoneDisplay}</p>

          <button
            className={styles.copyButton}
            onClick={handleCopy}
          >
            <Icon name={copied ? 'check' : 'copy'} size="sm" />
            {copied ? copiedText : copyButtonText}
          </button>
        </div>
      </Dialog>
    </>
  );
}

export default CallButton;
