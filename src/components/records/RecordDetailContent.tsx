'use client';

import { useTranslations } from 'next-intl';
import { StoryField, detailLabelClassName } from './StoryField';
import { formatRecordDate, buildStrengthDisplay, getExpectText } from '@/lib/record-utils';
import type { RecordData } from '@/types/record-detail';

interface RecordDetailContentProps {
  record: RecordData;
  isEditing: boolean;
  editStory: string;
  setEditStory: (v: string) => void;
  editActions: string;
  setEditActions: (v: string) => void;
  editResults: string;
  setEditResults: (v: string) => void;
  editFeelings: string;
  setEditFeelings: (v: string) => void;
  editReaction: string;
  setEditReaction: (v: string) => void;
}

export function RecordDetailContent({
  record,
  isEditing,
  editStory,
  setEditStory,
  editActions,
  setEditActions,
  editResults,
  setEditResults,
  editFeelings,
  setEditFeelings,
  editReaction,
  setEditReaction,
}: RecordDetailContentProps) {
  const t = useTranslations('records.detail');
  const na = t('empty.notAvailable');

  return (
    <div className="grow px-3 sm:px-0">
      <div className="container mx-auto pb-20">
        {/* Date and emotion strength section */}
        <div className="mt-4 space-y-2">
          {/* Date */}
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
            <div className={detailLabelClassName}>{t('fields.date')}</div>
            <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm">
              {formatRecordDate(record.created_at)}
            </div>
          </div>

          {/* Emotion strength before */}
          <div className="flex flex-col lg:flex-row gap-0">
            <div className={detailLabelClassName}>{t('fields.strengthBefore')}</div>
            <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm">
              {buildStrengthDisplay(
                record.card_1,
                record.card_2,
                record.card_3,
                record.before_level_1,
                record.before_level_2,
                record.before_level_3,
                na
              )}
            </div>
          </div>

          {/* Emotion strength after */}
          <div className="flex flex-col lg:flex-row gap-0">
            <div className={detailLabelClassName}>{t('fields.strengthAfter')}</div>
            <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm">
              {buildStrengthDisplay(
                record.card_1,
                record.card_2,
                record.card_3,
                record.after_level_1,
                record.after_level_2,
                record.after_level_3,
                na
              ) || na}
            </div>
          </div>
        </div>

        {/* Story Background Section */}
        <div className="mt-6">
          <div className="type-subsection-title mb-4 border-b-2 border-main-tint02 px-2 py-1">
            {t('sections.storyBackground')}
          </div>
          <StoryField
            label={t('fields.storyBackground')}
            value={record.story}
            editValue={editStory}
            isEditing={isEditing}
            onChange={setEditStory}
            emptyValue={na}
          />
        </div>

        {/* Story Action Section */}
        <div className="mt-6">
          <div className="type-subsection-title mb-4 border-b-2 border-main-tint02 px-2 py-1">
            {t('sections.storyAction')}
          </div>
          <div className="space-y-2">
            <StoryField
              label={t('fields.actionTaken')}
              value={record.actions}
              editValue={editActions}
              isEditing={isEditing}
              onChange={setEditActions}
              emptyValue={na}
            />
            <StoryField
              label={t('fields.resultAfterAction')}
              value={record.results}
              editValue={editResults}
              isEditing={isEditing}
              onChange={setEditResults}
              emptyValue={na}
            />
            <StoryField
              label={t('fields.feelingAfterResult')}
              value={record.feelings}
              editValue={editFeelings}
              isEditing={isEditing}
              onChange={setEditFeelings}
              emptyValue={na}
            />
            {/* Expect - read only */}
            <div className="flex flex-col lg:flex-row gap-0">
              <div className={detailLabelClassName}>{t('fields.expectedResult')}</div>
              <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm flex items-center">
                {getExpectText(record.expect, t)}
              </div>
            </div>
            <StoryField
              label={
                <span className="flex flex-col">
                  <span>{t('fields.nextActionAndAffirmationLine1')}</span>
                  <span>{t('fields.nextActionAndAffirmationLine2')}</span>
                </span>
              }
              value={record.reaction}
              editValue={editReaction}
              isEditing={isEditing}
              onChange={setEditReaction}
              emptyValue={na}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
