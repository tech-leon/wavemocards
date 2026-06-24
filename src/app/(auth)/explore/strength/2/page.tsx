'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EmotionCard } from '@/components/emotion/EmotionCard';
import { useExploreStore } from '@/store/exploreStore';
import { ExploreStepLayout, StrengthSelector } from '@/components/explore';
import { Button } from '@/components/ui/button';

export default function ExploreStrength2Page() {
  const t = useTranslations('explore.strength2');
  const tToast = useTranslations('toast.explore');
  const router = useRouter();
  const store = useExploreStore();
  const { selectedCards, afterLevels, setAfterLevel } = store;
  const [saving, setSaving] = useState(false);

  const handleBack = () => {
    router.push('/explore/story/action');
  };

  const handleSave = async () => {
    if (saving) return;

    setSaving(true);
    try {
      const body = {
        cards: selectedCards.map((c) => c.id),
        beforeLevels: store.beforeLevels,
        afterLevels: store.afterLevels,
        storyBackground: store.storyBackground,
        storyAction: store.storyAction,
        storyResult: store.storyResult,
        storyFeeling: store.storyFeeling,
        storyExpect: store.storyExpect,
        storyBetterAction: store.storyBetterAction,
      };

      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        toast.success(tToast('saveSuccess'));
        store.reset();
        router.push('/explore/complete');
      } else {
        const data = await res.json();
        toast.error(data.error || tToast('saveFailed'));
      }
    } catch {
      toast.error(tToast('saveUnexpected'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ExploreStepLayout
      currentStep={4}
      title={t('title')}
      titleMobile={{ line1: t('titleMobile.line1'), line2: t('titleMobile.line2') }}
      actions={
        <>
          <Button
            type="button"
            variant="main-tint-outline"
            className="px-6 py-1.5"
            onClick={handleBack}
          >
            {t('actions.previous')}
          </Button>
          <Button
            type="button"
            variant="main"
            className="px-6 py-1.5"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? t('actions.saving') : t('actions.saveRecord')}
          </Button>
        </>
      }
    >
      {/* Instructions */}
      <ul className="type-body-sm ml-1 mt-8 mb-12 text-foreground space-y-1">
        <li>{t('instructions.line1')}</li>
        <li>
          <span className="text-main font-medium">{t('instructions.line2')}</span>
          <span className="type-caption text-muted-foreground">{t('instructions.scoreHint')}</span>
        </li>
        <li className="type-caption text-muted-foreground">{t('instructions.skipHint')}</li>
      </ul>

      {/* Strength selectors for each card */}
      <div className="space-y-10">
        {selectedCards.map((card) => {
          return (
            <div
              key={card.id}
              className="flex flex-col md:flex-row md:justify-between items-center gap-4"
            >
              <EmotionCard card={card} />

              <StrengthSelector
                value={afterLevels[card.id]}
                onChange={(level) => setAfterLevel(card.id, level)}
              />
            </div>
          );
        })}
      </div>
    </ExploreStepLayout>
  );
}
