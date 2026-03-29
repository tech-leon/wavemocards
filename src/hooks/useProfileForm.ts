'use client';

import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { updateUserProfile } from '@/lib/profile';
import type { Profile } from '@/types/database';

interface UseProfileFormOptions {
  initialProfile: Profile;
  t: (key: string) => string;
}

export function useProfileForm({ initialProfile, t }: UseProfileFormOptions) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form field state
  const [formLastName, setFormLastName] = useState(initialProfile.last_name || '');
  const [formFirstName, setFormFirstName] = useState(initialProfile.first_name || '');
  const [formBirthday, setFormBirthday] = useState(initialProfile.day_of_birth || '');
  const [formTitle, setFormTitle] = useState(initialProfile.title || 'Null');

  // Validation state
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveResultModal, setShowSaveResultModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const validateLastName = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setLastNameError(t('errors.required'));
        return false;
      }
      setLastNameError('');
      return true;
    },
    [t]
  );

  const validateFirstName = useCallback(
    (value: string) => {
      if (!value.trim()) {
        setFirstNameError(t('errors.required'));
        return false;
      }
      setFirstNameError('');
      return true;
    },
    [t]
  );

  const handleEdit = useCallback(() => {
    // Reset form to current profile values
    setFormLastName(profile.last_name || '');
    setFormFirstName(profile.first_name || '');
    setFormBirthday(profile.day_of_birth || '');
    setFormTitle(profile.title || 'Null');
    setLastNameError('');
    setFirstNameError('');
    setIsEditing(true);
  }, [profile]);

  const handleCancelClick = useCallback(() => {
    setShowCancelModal(true);
  }, []);

  const handleCancelConfirm = useCallback(() => {
    // Restore original values
    setFormLastName(profile.last_name || '');
    setFormFirstName(profile.first_name || '');
    setFormBirthday(profile.day_of_birth || '');
    setFormTitle(profile.title || 'Null');
    setLastNameError('');
    setFirstNameError('');
    setIsEditing(false);
    setShowCancelModal(false);
  }, [profile]);

  const handleSave = useCallback(async () => {
    const isLastNameValid = validateLastName(formLastName);
    const isFirstNameValid = validateFirstName(formFirstName);

    if (!isLastNameValid || !isFirstNameValid) {
      return;
    }

    setSaving(true);
    try {
      const updatedProfile = await updateUserProfile({
        first_name: formFirstName.trim(),
        last_name: formLastName.trim(),
        title: formTitle,
        day_of_birth: formBirthday || null,
      });

      if (updatedProfile) {
        setSaveSuccess(true);
        setProfile(updatedProfile);
        setIsEditing(false);
      } else {
        setSaveSuccess(false);
      }
      setShowSaveResultModal(true);
    } catch {
      setSaveSuccess(false);
      setShowSaveResultModal(true);
    } finally {
      setSaving(false);
    }
  }, [formLastName, formFirstName, formBirthday, formTitle, validateLastName, validateFirstName]);

  return {
    profile,
    isEditing,
    saving,
    // Form fields
    formLastName,
    setFormLastName,
    formFirstName,
    setFormFirstName,
    formBirthday,
    setFormBirthday,
    formTitle,
    setFormTitle,
    // Validation
    lastNameError,
    firstNameError,
    validateLastName,
    validateFirstName,
    // Modal state
    showCancelModal,
    setShowCancelModal,
    showSaveResultModal,
    setShowSaveResultModal,
    saveSuccess,
    // Handlers
    handleEdit,
    handleCancelClick,
    handleCancelConfirm,
    handleSave,
  };
}
