'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface DeleteConfirmModalProps {
  open: boolean;
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ open, deleting, onClose, onConfirm }: DeleteConfirmModalProps) {
  const t = useTranslations('records.detail');

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title={t('confirmDelete.title')}
      description={t('confirmDelete.description')}
      imageSrc="/images/sureToDelete.svg"
      imageAlt={t('confirmDelete.title')}
      actions={
        <>
          <Button
            variant="pink-outline"
            onClick={onClose}
            className="px-6"
            disabled={deleting}
          >
            {t('confirmDelete.cancel')}
          </Button>
          <Button
            onClick={onConfirm}
            variant="pink" className="px-6"
            disabled={deleting}
          >
            {deleting ? t('confirmDelete.deleting') : t('confirmDelete.confirm')}
          </Button>
        </>
      }
    />
  );
}
