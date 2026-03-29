'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface CancelConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CancelConfirmModal({ open, onClose, onConfirm }: CancelConfirmModalProps) {
  const t = useTranslations('account.profile');

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title={t('confirmCancel.title')}
      description={t('confirmCancel.description')}
      imageSrc="/images/sureToDelete.svg"
      imageAlt={t('confirmCancel.title')}
      actions={
        <>
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full border-2 border-pink text-pink hover:bg-pink/10 px-6"
          >
            {t('confirmCancel.continueEditing')}
          </Button>
          <Button
            onClick={onConfirm}
            className="rounded-full bg-pink hover:bg-pink-dark text-white px-6"
          >
            {t('confirmCancel.discard')}
          </Button>
        </>
      }
    >
      <span className="type-caption mb-4 text-gray-500 dark:text-gray-300">
        Illustration by{' '}
        <a
          className="text-gray-500 dark:text-gray-300 hover:text-main"
          href="https://blush.design/artists/RyUTVuP8G4QeAAEEQgug/pablo-stanley"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pablo Stanley
        </a>{' '}
        from{' '}
        <a
          className="text-gray-500 dark:text-gray-300 hover:text-main"
          href="https://blush.design/"
          target="_blank"
          rel="noopener noreferrer"
        >
          blush design
        </a>
      </span>
    </ConfirmModal>
  );
}
