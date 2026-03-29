'use client';

import Image from 'next/image';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  titleColor?: string;
  description?: React.ReactNode;
  actions: React.ReactNode;
  children?: React.ReactNode;
}

export function ConfirmModal({
  open,
  onClose,
  imageSrc,
  imageAlt = '',
  title,
  titleColor = 'text-pink',
  description,
  actions,
  children,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <p className={`type-page-title mb-3 ${titleColor}`}>{title}</p>}
        {description && (
          <div className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">{description}</div>
        )}
        {imageSrc && (
          <div className="w-[45%] mb-4">
            <Image src={imageSrc} alt={imageAlt} width={200} height={200} className="w-full" />
          </div>
        )}
        {children}
        <div className="flex gap-4">{actions}</div>
      </div>
    </div>
  );
}
