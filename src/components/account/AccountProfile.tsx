'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { STICKY_TITLE_BAR } from '@/lib/layout';
import { useProfileForm } from '@/hooks/useProfileForm';
import { ProfileFormFields } from './ProfileFormFields';
import { CancelConfirmModal } from './CancelConfirmModal';
import { SaveResultModal } from './SaveResultModal';
import type { Profile } from '@/types/database';

interface AccountProfileProps {
  initialProfile: Profile;
  email: string;
}

export function AccountProfile({ initialProfile, email }: AccountProfileProps) {
  const t = useTranslations('account.profile');

  const {
    profile,
    isEditing,
    saving,
    formLastName,
    setFormLastName,
    formFirstName,
    setFormFirstName,
    formBirthday,
    setFormBirthday,
    formTitle,
    setFormTitle,
    lastNameError,
    firstNameError,
    validateLastName,
    validateFirstName,
    showCancelModal,
    setShowCancelModal,
    showSaveResultModal,
    setShowSaveResultModal,
    saveSuccess,
    handleEdit,
    handleCancelClick,
    handleCancelConfirm,
    handleSave,
  } = useProfileForm({ initialProfile, t });

  const lastName = profile.last_name?.trim() ?? '';
  const firstName = profile.first_name?.trim() ?? '';
  // CJK names follow the locale's order (e.g. 姓+名 without a space);
  // purely Latin names always read as "First Last".
  const hasCjkName = /[぀-ヿ㐀-鿿豈-﫿]/.test(lastName + firstName);
  const displayName =
    lastName || firstName
      ? hasCjkName
        ? t('nameDisplay', { lastName, firstName }).trim()
        : [firstName, lastName].filter(Boolean).join(' ')
      : '';

  return (
    <>
      {/* Sticky title bar — constrained to the content column so the title,
          actions and underline align with the fields below. */}
      <div className={`${STICKY_TITLE_BAR} px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-2xl mx-auto pt-4">
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center gap-2">
            <h2>{t('title')}</h2>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {!isEditing ? (
                <Button
                  variant="main-outline"
                  onClick={handleEdit}
                >
                  {t('actions.edit')}
                </Button>
              ) : (
                <>
                  <Button
                    variant="main-outline"
                    onClick={handleCancelClick}
                    disabled={saving}
                  >
                    {t('actions.cancel')}
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="main" className="px-6"
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
      <div className="grow px-4 sm:px-6 lg:px-8 flex flex-col items-center pt-8 pb-16">
        <div className="w-full max-w-2xl">
          {/* Identity header */}
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="min-w-0">
              <p className="type-identity break-words">{displayName || email}</p>
              {displayName && (
                <p className="type-body-sm mt-1 break-all text-muted-foreground">{email}</p>
              )}
            </div>
            <Image
              src="/images/account_illu.svg"
              alt=""
              width={180}
              height={180}
              className="w-24 sm:w-32 shrink-0"
              priority
            />
          </div>

          {/* Profile fields */}
          <ProfileFormFields
            profile={profile}
            isEditing={isEditing}
            formLastName={formLastName}
            setFormLastName={setFormLastName}
            formFirstName={formFirstName}
            setFormFirstName={setFormFirstName}
            formBirthday={formBirthday}
            setFormBirthday={setFormBirthday}
            formTitle={formTitle}
            setFormTitle={setFormTitle}
            lastNameError={lastNameError}
            firstNameError={firstNameError}
            validateLastName={validateLastName}
            validateFirstName={validateFirstName}
          />

          {/* Illustration attribution */}
          <p className="type-caption mt-14 text-center text-muted-foreground">
            Illustration by{' '}
            <a
              className="hover:text-main underline"
              href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Krasutska
            </a>{' '}
            from{' '}
            <a
              className="hover:text-main underline"
              href="https://icons8.com/illustrations"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouch!
            </a>
          </p>
        </div>
      </div>

      {/* Modals */}
      <CancelConfirmModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
      />
      <SaveResultModal
        open={showSaveResultModal}
        success={saveSuccess}
        onClose={() => setShowSaveResultModal(false)}
      />
    </>
  );
}
