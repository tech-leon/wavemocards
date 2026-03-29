'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateRecordStory, deleteRecord } from '@/lib/records-actions';
import type { RecordData } from '@/types/record-detail';

interface UseRecordEditOptions {
  recordId: string;
  initialRecord: RecordData;
  tToast: (key: string) => string;
}

export function useRecordEdit({ recordId, initialRecord, tToast }: UseRecordEditOptions) {
  const router = useRouter();
  const [record, setRecord] = useState<RecordData>(initialRecord);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable fields
  const [editStory, setEditStory] = useState(initialRecord.story || '');
  const [editActions, setEditActions] = useState(initialRecord.actions || '');
  const [editResults, setEditResults] = useState(initialRecord.results || '');
  const [editFeelings, setEditFeelings] = useState(initialRecord.feelings || '');
  const [editReaction, setEditReaction] = useState(initialRecord.reaction || '');

  // Delete dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setEditStory(record.story || '');
    setEditActions(record.actions || '');
    setEditResults(record.results || '');
    setEditFeelings(record.feelings || '');
    setEditReaction(record.reaction || '');
    setIsEditing(false);
  }, [record]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const updated = await updateRecordStory(recordId, {
        story: editStory,
        actions: editActions,
        results: editResults,
        feelings: editFeelings,
        reaction: editReaction,
      });

      if (updated) {
        toast.success(tToast('saveSuccess'));
        setRecord((prev) => ({
          ...prev,
          story: editStory,
          actions: editActions,
          results: editResults,
          feelings: editFeelings,
          reaction: editReaction,
        }));
        setIsEditing(false);
      } else {
        toast.error(tToast('saveFailed'));
      }
    } catch {
      toast.error(tToast('saveUnexpected'));
    } finally {
      setSaving(false);
    }
  }, [recordId, editStory, editActions, editResults, editFeelings, editReaction, tToast]);

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      const success = await deleteRecord(recordId);
      if (success) {
        toast.success(tToast('deleteSuccess'));
        router.push('/records');
      } else {
        toast.error(tToast('deleteFailed'));
      }
    } catch {
      toast.error(tToast('deleteUnexpected'));
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }, [recordId, router, tToast]);

  return {
    record,
    isEditing,
    saving,
    // Edit fields
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
    // Delete dialog
    showDeleteDialog,
    setShowDeleteDialog,
    deleting,
    // Handlers
    handleEdit,
    handleCancel,
    handleSave,
    handleDelete,
  };
}
