'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Types for the record detail
interface CardInfo {
  id: number;
  name: string;
  category_id: number;
  description?: string | null;
  image_path?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

interface RecordData {
  id: string;
  created_at: string;
  card_1_id: number | null;
  card_2_id: number | null;
  card_3_id: number | null;
  before_level_1: number | null;
  before_level_2: number | null;
  before_level_3: number | null;
  after_level_1: number | null;
  after_level_2: number | null;
  after_level_3: number | null;
  story: string | null;
  actions: string | null;
  results: string | null;
  feelings: string | null;
  expect: string | null;
  reaction: string | null;
  card_1: CardInfo | null;
  card_2: CardInfo | null;
  card_3: CardInfo | null;
}

interface RecordDetailProps {
  recordId: string;
}

export function RecordDetail({ recordId }: RecordDetailProps) {
  const t = useTranslations('records.detail');
  const tToast = useTranslations('toast.records');
  const router = useRouter();
  const [record, setRecord] = useState<RecordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [editStory, setEditStory] = useState('');
  const [editActions, setEditActions] = useState('');
  const [editResults, setEditResults] = useState('');
  const [editFeelings, setEditFeelings] = useState('');
  const [editReaction, setEditReaction] = useState('');

  // Delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchRecord = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/records/${recordId}`);
      const data = await res.json();

      if (res.ok && data.record) {
        setRecord(data.record);
        // Initialize editable fields
        setEditStory(data.record.story || '');
        setEditActions(data.record.actions || '');
        setEditResults(data.record.results || '');
        setEditFeelings(data.record.feelings || '');
        setEditReaction(data.record.reaction || '');
      } else {
        toast.error(data.error || tToast('loadFailed'));
        router.push('/records');
      }
    } catch {
      toast.error(tToast('loadUnexpected'));
      router.push('/records');
    } finally {
      setLoading(false);
    }
  }, [recordId, router, tToast]);

  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  // Format date display
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year} / ${month} / ${day}`;
  };

  // Build emotion strength string
  const buildStrengthDisplay = (
    card1: CardInfo | null,
    card2: CardInfo | null,
    card3: CardInfo | null,
    level1: number | null,
    level2: number | null,
    level3: number | null
  ) => {
    const parts: string[] = [];
    if (card1 && level1 != null) parts.push(`${card1.name} ${level1}`);
    if (card2 && level2 != null) parts.push(`${card2.name} ${level2}`);
    if (card3 && level3 != null) parts.push(`${card3.name} ${level3}`);
    return parts.join('・') || t('empty.notAvailable');
  };

  // Get expect display text
  const getExpectText = (expect: string | null) => {
    switch (expect) {
      case '0':
        return t('expect.yes');
      case '1':
        return t('expect.no');
      case '2':
        return t('expect.unknown');
      default:
        return t('empty.notAvailable');
    }
  };

  // Start editing
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    if (!record) return;
    // Restore original values
    setEditStory(record.story || '');
    setEditActions(record.actions || '');
    setEditResults(record.results || '');
    setEditFeelings(record.feelings || '');
    setEditReaction(record.reaction || '');
    setIsEditing(false);
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/records/${recordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          story: editStory,
          actions: editActions,
          results: editResults,
          feelings: editFeelings,
          reaction: editReaction,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(tToast('saveSuccess'));
        // Update local state
        setRecord((prev) =>
          prev
            ? {
                ...prev,
                story: editStory,
                actions: editActions,
                results: editResults,
                feelings: editFeelings,
                reaction: editReaction,
              }
            : null
        );
        setIsEditing(false);
      } else {
        toast.error(data.error || tToast('saveFailed'));
      }
    } catch {
      toast.error(tToast('saveUnexpected'));
    } finally {
      setSaving(false);
    }
  };

  // Delete record
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/records/${recordId}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success(tToast('deleteSuccess'));
        router.push('/records');
      } else {
        const data = await res.json();
        toast.error(data.error || tToast('deleteFailed'));
      }
    } catch {
      toast.error(tToast('deleteUnexpected'));
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-main-tint02 border-t-main rounded-full animate-spin" />
      </div>
    );
  }

  if (!record) {
    return (
        <div className="type-subsection-title py-20 text-center text-gray-500 dark:text-gray-300">{t('empty.notFound')}</div>
    );
  }

  return (
    <>
      {/* Sticky title bar */}
      <div className="sticky top-[64px] z-30 pb-2 bg-gray-100 dark:bg-gray-900 px-3 sm:px-0">
          <div className="container mx-auto pt-4">
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center gap-2">
            {/* Title */}
            <h2 className="hidden md:block">{t('title')}</h2>
            <h2 className="md:hidden flex flex-col">
              <span>{t('titleMobile.line1')}</span>
              <span>{t('titleMobile.line2')}</span>
            </h2>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gshrink-0">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="p-2 rounded-full text-main hover:bg-main-tint03 transition-colors"
                    title={t('actions.delete')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/records')}
                    className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
                  >
                    {t('actions.back')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleEdit}
                    className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
                  >
                    {t('actions.edit')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white font-bold"
                    disabled={saving}
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="type-button rounded-full bg-main hover:bg-main-dark text-white px-6 font-bold"
                    disabled={saving}
                  >
                    {saving ? t('actions.saving') : t('actions.save')}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-0">
      <div className="container mx-auto pb-20">
        {/* Date and emotion strength section */}
        <div className="mt-4 space-y-2">
          {/* Date */}
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-0">
            <div className="type-button lg:w-1/4 px-3 py-2 bg-main text-white rounded-sm font-medium whitespace-nowrap">
              {t('fields.date')}
            </div>
            <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm">
              {formatDate(record.created_at)}
            </div>
          </div>

          {/* Emotion strength 1st */}
          <div className="flex flex-col lg:flex-row gap-0">
            <div className="type-button lg:w-1/4 px-3 py-2 bg-main text-white rounded-sm font-medium whitespace-nowrap">
              {t('fields.strengthBefore')}
            </div>
            <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm">
              {buildStrengthDisplay(
                record.card_1,
                record.card_2,
                record.card_3,
                record.before_level_1,
                record.before_level_2,
                record.before_level_3
              )}
            </div>
          </div>

          {/* Emotion strength 2nd */}
          <div className="flex flex-col lg:flex-row gap-0">
            <div className="type-button lg:w-1/4 px-3 py-2 bg-main text-white rounded-sm font-medium whitespace-nowrap">
              {t('fields.strengthAfter')}
            </div>
            <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm">
              {buildStrengthDisplay(
                record.card_1,
                record.card_2,
                record.card_3,
                record.after_level_1,
                record.after_level_2,
                record.after_level_3
              ) || t('empty.notAvailable')}
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
              emptyValue={t('empty.notAvailable')}
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
              emptyValue={t('empty.notAvailable')}
            />
            <StoryField
              label={t('fields.resultAfterAction')}
              value={record.results}
              editValue={editResults}
              isEditing={isEditing}
              onChange={setEditResults}
              emptyValue={t('empty.notAvailable')}
            />
            <StoryField
              label={t('fields.feelingAfterResult')}
              value={record.feelings}
              editValue={editFeelings}
              isEditing={isEditing}
              onChange={setEditFeelings}
              emptyValue={t('empty.notAvailable')}
            />
            {/* Expect - read only */}
            <div className="flex flex-col lg:flex-row gap-0">
              <div className="type-body-sm lg:w-1/4 px-3 py-2 bg-main-tint02 rounded-sm flex items-center">
                {t('fields.expectedResult')}
              </div>
              <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm flex items-center">
                {getExpectText(record.expect)}
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
              emptyValue={t('empty.notAvailable')}
            />
          </div>
        </div>
      </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
            <p className="type-page-title mb-3 text-pink">{t('confirmDelete.title')}</p>
            <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
              {t('confirmDelete.description')}
            </p>
            <div className="w-[45%] mb-4">
              <Image className="w-full" src="/images/sureToDelete.svg" alt={t('confirmDelete.title')} width={200} height={200} />
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                className="rounded-full border-2 border-pink text-pink hover:bg-pink/10 px-6"
                disabled={deleting}
              >
                {t('confirmDelete.cancel')}
              </Button>
              <Button
                onClick={handleDelete}
                className="rounded-full bg-pink hover:bg-pink-dark text-white px-6"
                disabled={deleting}
              >
                {deleting ? t('confirmDelete.deleting') : t('confirmDelete.confirm')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable story field component
function StoryField({
  label,
  value,
  editValue,
  isEditing,
  onChange,
  emptyValue,
}: {
  label: React.ReactNode;
  value: string | null;
  editValue: string;
  isEditing: boolean;
  onChange: (v: string) => void;
  emptyValue: string;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-0">
      <div className="type-body-sm lg:w-1/4 px-3 py-2 bg-main-tint02 rounded-sm flex items-center">
        {label}
      </div>
      {isEditing ? (
        <div className="lg:w-3/4 px-3">
          <textarea
            className="type-body-sm w-full py-2 px-2 border-2 border-main-tint02 rounded-sm min-h-[80px] resize-y focus:outline-none focus:border-main"
            value={editValue}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      ) : (
        <div className="type-body-sm lg:w-3/4 px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-sm min-h-[40px] flex items-center">
          {value || emptyValue}
        </div>
      )}
    </div>
  );
}
