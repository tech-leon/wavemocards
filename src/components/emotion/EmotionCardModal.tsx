'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, PlusCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from '@/components/ui/motion';
import type { EmotionCardData } from '@/types/emotion-card';
import { getEmotionCardCategoryStyle, getEmotionCardImageSrc } from './emotion-card-config';

interface EmotionCardModalProps {
  card: EmotionCardData | null;
  categorySlug: string;
  isOpen: boolean;
  onClose: () => void;
  onAdd?: () => void;
}

export function EmotionCardModal({
  card,
  categorySlug,
  isOpen,
  onClose,
  onAdd,
}: EmotionCardModalProps) {
  const t = useTranslations('emoCards.modal');
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const bgColor = getEmotionCardCategoryStyle(categorySlug).bg;

  return (
    <AnimatePresence>
      {isOpen && card && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Content */}
          <motion.div
            className={cn(
              'relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden my-9',
              bgColor
            )}
            role="dialog"
            aria-modal="true"
            aria-label={card ? t('aria.cardDetail', { cardName: card.name }) : t('dialogLabel')}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100/80 dark:bg-gray-900/80 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label={t('close')}
            >
              <X className="w-5 h-5 text-gray-800 dark:text-gray-100" />
            </button>

            {/* Add to holder button */}
            {onAdd && (
              <button
                onClick={onAdd}
                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-pink-tint01 hover:bg-pink text-white transition-colors shadow"
                aria-label={t('addToHolder')}
                title={t('addToHolder')}
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            )}

            <div className="p-6 md:p-9 flex flex-col sm:flex-row items-center gap-6">
              {/* Text Content */}
              <div className="flex-1 order-2 sm:order-1">
                {/* Mobile Image */}
                <div className="flex sm:hidden justify-center mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden">
                    <Image
                      src={getEmotionCardImageSrc(card)}
                      alt={card.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-bold text-main mb-5 text-center sm:text-left">
                  {card.name}
                </h2>

                {/* Description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-main mb-1">{t('meaning')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {card.description || t('empty.noDescription')}
                  </p>
                </div>

                {/* Example */}
                <div>
                  <h3 className="text-xl font-bold text-main mb-1">{t('example')}</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {card.example || t('empty.noExample')}
                  </p>
                </div>
              </div>

              {/* Desktop Image */}
              <div className="hidden sm:block order-1 sm:order-2 shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
                  <Image
                    src={getEmotionCardImageSrc(card)}
                    alt={card.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
