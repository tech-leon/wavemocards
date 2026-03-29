'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface SaveResultModalProps {
  open: boolean;
  success: boolean;
  onClose: () => void;
}

export function SaveResultModal({ open, success, onClose }: SaveResultModalProps) {
  const t = useTranslations('account.profile');

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      title={success ? t('saveResult.successTitle') : t('saveResult.failureTitle')}
      titleColor={success ? 'text-main' : 'text-pink'}
      description={
        !success ? (
          <>
            <p className="type-body-sm mt-3 text-gray-800 dark:text-gray-100">
              {t('saveResult.failureDescription')}
            </p>
            <p className="type-body-sm mt-2 text-gray-800 dark:text-gray-100">
              {t('saveResult.contactUsPrompt')}{' '}
              <a className="text-pink hover:underline" href="mailto:info@wavemocards.com">
                {t('saveResult.contactUs')}
              </a>
            </p>
          </>
        ) : undefined
      }
      imageSrc={success ? '/images/emoCards/5.svg' : '/images/addCardFail.svg'}
      imageAlt={success ? t('saveResult.successAlt') : t('saveResult.failureAlt')}
      actions={
        <Button
          onClick={onClose}
          className={`rounded-full px-8 py-2 text-white font-bold ${
            success ? 'bg-main hover:bg-main-dark' : 'bg-pink hover:bg-pink-dark'
          }`}
        >
          {t('saveResult.acknowledge')}
        </Button>
      }
    />
  );
}
