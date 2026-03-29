'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AUTH_STICKY_TOP } from '@/lib/layout';
import { useRecordEdit } from '@/hooks/useRecordEdit';
import { RecordDetailContent } from './RecordDetailContent';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import type { RecordData } from '@/types/record-detail';

interface RecordDetailProps {
  recordId: string;
  initialRecord: RecordData;
}

export function RecordDetail({ recordId, initialRecord }: RecordDetailProps) {
  const t = useTranslations('records.detail');
  const tToast = useTranslations('toast.records');
  const router = useRouter();

  const {
    record,
    isEditing,
    saving,
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
    showDeleteDialog,
    setShowDeleteDialog,
    deleting,
    handleEdit,
    handleCancel,
    handleSave,
    handleDelete,
  } = useRecordEdit({ recordId, initialRecord, tToast });

  return (
    <>
      {/* Sticky title bar */}
      <div className={`sticky ${AUTH_STICKY_TOP} z-30 pb-2 bg-gray-100 dark:bg-gray-900 px-3 sm:px-0`}>
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
      <RecordDetailContent
        record={record}
        isEditing={isEditing}
        editStory={editStory}
        setEditStory={setEditStory}
        editActions={editActions}
        setEditActions={setEditActions}
        editResults={editResults}
        setEditResults={setEditResults}
        editFeelings={editFeelings}
        setEditFeelings={setEditFeelings}
        editReaction={editReaction}
        setEditReaction={setEditReaction}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmModal
        open={showDeleteDialog}
        deleting={deleting}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
