'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { buildAuthHref, buildCurrentReturnTo } from '@/lib/auth-routing';

interface ProfileData {
  id: string;
  workos_user_id: string;
  email: string;
  title: string | null;
  first_name: string | null;
  last_name: string | null;
  day_of_birth: string | null;
  gender: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Map title value to display text
 */
function getTitleDisplay(title: string | null, t: ReturnType<typeof useTranslations>): string {
  switch (title) {
    case 'Student':
      return t('options.student');
    case 'Teacher':
      return t('options.teacher');
    default:
      return t('options.other');
  }
}

export function AccountProfile() {
  const t = useTranslations('account.profile');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Editable form fields
  const [formLastName, setFormLastName] = useState('');
  const [formFirstName, setFormFirstName] = useState('');
  const [formBirthday, setFormBirthday] = useState('');
  const [formTitle, setFormTitle] = useState('Null');

  // Validation state
  const [lastNameError, setLastNameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSaveResultModal, setShowSaveResultModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const passwordResetHref = buildAuthHref('sign-in', buildCurrentReturnTo(pathname, searchParams), {
    force: true,
  });

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user');
      const data = await res.json();

      if (res.ok && data.profile) {
        setProfile(data.profile);
        setEmail(data.email || data.profile.email || '');
        // Initialize form fields
        setFormLastName(data.profile.last_name || '');
        setFormFirstName(data.profile.first_name || '');
        setFormBirthday(data.profile.day_of_birth || '');
        setFormTitle(data.profile.title || 'Null');
      } else {
        toast.error(data.error || t('errors.loadFailed'));
      }
    } catch {
      toast.error(t('errors.loadUnexpected'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  // Validate last name
  const validateLastName = (value: string) => {
    if (!value.trim()) {
      setLastNameError(t('errors.required'));
      return false;
    }
    setLastNameError('');
    return true;
  };

  // Validate first name
  const validateFirstName = (value: string) => {
    if (!value.trim()) {
      setFirstNameError(t('errors.required'));
      return false;
    }
    setFirstNameError('');
    return true;
  };

  // Enter edit mode
  const handleEdit = () => {
    if (!profile) return;
    // Reset form to current profile values
    setFormLastName(profile.last_name || '');
    setFormFirstName(profile.first_name || '');
    setFormBirthday(profile.day_of_birth || '');
    setFormTitle(profile.title || 'Null');
    setLastNameError('');
    setFirstNameError('');
    setIsEditing(true);
  };

  // Show cancel confirmation modal
  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  // Confirm cancel editing
  const handleCancelConfirm = () => {
    if (!profile) return;
    // Restore original values
    setFormLastName(profile.last_name || '');
    setFormFirstName(profile.first_name || '');
    setFormBirthday(profile.day_of_birth || '');
    setFormTitle(profile.title || 'Null');
    setLastNameError('');
    setFirstNameError('');
    setIsEditing(false);
    setShowCancelModal(false);
  };

  // Save changes
  const handleSave = async () => {
    // Validate
    const isLastNameValid = validateLastName(formLastName);
    const isFirstNameValid = validateFirstName(formFirstName);

    if (!isLastNameValid || !isFirstNameValid) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formFirstName.trim(),
          last_name: formLastName.trim(),
          title: formTitle,
          day_of_birth: formBirthday || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSaveSuccess(true);
        // Update local state with new data
        if (data.profile) {
          setProfile(data.profile);
        } else {
          // Manually update local profile
          setProfile((prev) =>
            prev
              ? {
                  ...prev,
                  first_name: formFirstName.trim(),
                  last_name: formLastName.trim(),
                  title: formTitle,
                  day_of_birth: formBirthday || null,
                }
              : null
          );
        }
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
  };

  // Handle password reset - redirect to WorkOS sign-in page
  // Users can use WorkOS "forgot password" from the sign-in page

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <div className="w-8 h-8 border-4 border-main-tint02 border-t-main rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-300 text-lg">{t('empty.loadFailed')}</div>
    );
  }

  return (
    <>
      {/* Sticky title bar */}
      <div className="sticky top-[64px] z-30 pb-2 bg-gray-100 dark:bg-gray-900 px-3 sm:px-0">
          <div className="container mx-auto pt-4">
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center gap-2">
            <h2>{t('title')}</h2>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white dark:hover:text-zinc-800 font-bold"
                >
                  {t('actions.edit')}
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancelClick}
                    className="type-button rounded-full border-2 border-main text-main hover:bg-main hover:text-white dark:hover:text-zinc-800 font-bold"
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
      <div className="container mx-auto pt-4 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-16">
          {/* Left: Illustration */}
          <div className="w-full max-w-[300px] md:max-w-[280px] shrink-0">
            <Image
              src="/images/account_illu.svg"
              alt="Account illustration"
              width={280}
              height={280}
              className="w-full mb-4"
              priority
            />
            <p className="type-caption text-gray-800 dark:text-gray-100">
              Illustration by{' '}
              <a
                className="text-gray-800 dark:text-gray-100 hover:text-main underline"
                href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya Krasutska
              </a>{' '}
              from{' '}
              <a
                className="text-gray-800 dark:text-gray-100 hover:text-main underline"
                href="https://icons8.com/illustrations"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ouch!
              </a>
            </p>
          </div>

          {/* Right: Profile fields */}
          <div className="w-full flex-1">
            {/* Email - always read only */}
            <div className="mb-6">
              <span className="type-body-sm block mb-2 text-gray-800 dark:text-gray-100">{t('fields.email')}</span>
              <p className="type-body ml-1 font-bold">{email}</p>
            </div>

            {/* Password */}
            <div className="mb-6">
              <span className="type-body-sm block mb-2 text-gray-800 dark:text-gray-100">{t('fields.password')}</span>
              <div className="flex justify-between items-center">
                <p className="type-body ml-1 font-bold">{t('passwordMask')}</p>
                {!isEditing && (
                  <AuthNavigationButton
                    href={passwordResetHref}
                    className="type-button px-4 py-1 rounded-full bg-pink-tint01 text-white hover:bg-pink transition-colors"
                  >
                    {t('resetPassword')}
                  </AuthNavigationButton>
                )}
              </div>
            </div>

            {/* Last Name & First Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
              {/* Last Name (姓) */}
              <div className="mb-6">
                <span className="type-body-sm block mb-2 text-gray-800 dark:text-gray-100">{t('fields.lastName')}</span>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      className="type-body w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                      value={formLastName}
                      onChange={(e) => {
                        setFormLastName(e.target.value);
                        validateLastName(e.target.value);
                      }}
                      placeholder={t('placeholders.lastName')}
                    />
                    {lastNameError && (
                      <p className="type-caption mt-1 ml-3 text-pink">{lastNameError}</p>
                    )}
                  </div>
                ) : (
                  <p className="type-body ml-1 font-bold">{profile.last_name || t('empty.notAvailable')}</p>
                )}
              </div>

              {/* First Name (名) */}
              <div className="mb-6">
                <span className="type-body-sm block mb-2 text-gray-800 dark:text-gray-100">{t('fields.firstName')}</span>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      className="type-body w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                      value={formFirstName}
                      onChange={(e) => {
                        setFormFirstName(e.target.value);
                        validateFirstName(e.target.value);
                      }}
                      placeholder={t('placeholders.firstName')}
                    />
                    {firstNameError && (
                      <p className="type-caption mt-1 ml-3 text-pink">{firstNameError}</p>
                    )}
                  </div>
                ) : (
                  <p className="type-body ml-1 font-bold">{profile.first_name || t('empty.notAvailable')}</p>
                )}
              </div>
            </div>

            {/* Birthday & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
              {/* Birthday */}
              <div className="mb-6">
                <span className="type-body-sm block mb-2 text-gray-800 dark:text-gray-100">{t('fields.birthDate')}</span>
                {isEditing ? (
                  <input
                    type="date"
                    className="type-body w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                    value={formBirthday}
                    onChange={(e) => setFormBirthday(e.target.value)}
                  />
                ) : (
                  <p className="type-body ml-1 font-bold">{profile.day_of_birth || t('empty.notAvailable')}</p>
                )}
              </div>

              {/* Title (身份) */}
              <div className="mb-6">
                <span className="type-body-sm block mb-2 text-gray-800 dark:text-gray-100">{t('fields.role')}</span>
                {isEditing ? (
                  <select
                    className="type-body w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  >
                    <option value="Student">{t('options.student')}</option>
                    <option value="Teacher">{t('options.teacher')}</option>
                    <option value="Null">{t('options.other')}</option>
                  </select>
                ) : (
                  <p className="type-body ml-1 font-bold">{getTitleDisplay(profile.title, t)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
            <p className="type-page-title mb-3 text-pink">{t('confirmCancel.title')}</p>
            <p className="type-body-sm mb-4 text-gray-800 dark:text-gray-100">
              {t('confirmCancel.description')}
            </p>
            <div className="w-[45%] mb-4">
              <Image
                src="/images/sureToDelete.svg"
                alt={t('confirmCancel.title')}
                width={200}
                height={200}
                className="w-full"
              />
            </div>
            <span className="type-caption mb-4 text-gray-500 dark:text-gray-300">
              Illustration by{' '}
              <a className="text-gray-500 dark:text-gray-300 hover:text-main" href="https://blush.design/artists/RyUTVuP8G4QeAAEEQgug/pablo-stanley" target="_blank" rel="noopener noreferrer">
                Pablo Stanley
              </a>{' '}
              from{' '}
              <a className="text-gray-500 dark:text-gray-300 hover:text-main" href="https://blush.design/" target="_blank" rel="noopener noreferrer">
                blush design
              </a>
            </span>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                className="rounded-full border-2 border-pink text-pink hover:bg-pink/10 px-6"
              >
                {t('confirmCancel.continueEditing')}
              </Button>
              <Button
                onClick={handleCancelConfirm}
                className="rounded-full bg-pink hover:bg-pink-dark text-white px-6"
              >
                {t('confirmCancel.discard')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Save Result Modal */}
      {showSaveResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
            <p className={`type-page-title mb-3 ${saveSuccess ? 'text-main' : 'text-pink'}`}>
              {saveSuccess ? t('saveResult.successTitle') : t('saveResult.failureTitle')}
            </p>
            {!saveSuccess && (
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
            )}
            <div className="w-[45%] my-4">
              <Image
                src={saveSuccess ? '/images/emoCards/5.svg' : '/images/addCardFail.svg'}
                alt={saveSuccess ? t('saveResult.successAlt') : t('saveResult.failureAlt')}
                width={200}
                height={200}
                className="w-full"
              />
            </div>
            <Button
              onClick={() => setShowSaveResultModal(false)}
              className={`rounded-full px-8 py-2 text-white font-bold ${
                saveSuccess ? 'bg-main hover:bg-main-dark' : 'bg-pink hover:bg-pink-dark'
              }`}
            >
              {t('saveResult.acknowledge')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
