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
            variant="pink-outline"
            onClick={onClose}
            className="px-6"
          >
            {t('confirmCancel.continueEditing')}
          </Button>
          <Button
            onClick={onConfirm}
            variant="pink" className="px-6"
          >
            {t('confirmCancel.discard')}
          </Button>
        </>
      }
    >
      <span className="type-caption mb-4 text-muted-foreground">
        Illustration by{' '}
        <a
          className="text-muted-foreground hover:text-main"
          href="https://blush.design/artists/RyUTVuP8G4QeAAEEQgug/pablo-stanley"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pablo Stanley
        </a>{' '}
        from{' '}
        <a
          className="text-muted-foreground hover:text-main"
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
