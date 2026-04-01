'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { AUTH_STICKY_TOP } from '@/lib/layout';
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

  return (
    <>
      {/* Sticky title bar */}
      <div className={`sticky ${AUTH_STICKY_TOP} z-30 pb-2 bg-gray-100 dark:bg-gray-900 px-3 sm:px-0`}>
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
      <div className="grow px-3 sm:px-0 flex flex-col items-center pt-6">
        <div className="w-full max-w-2xl px-3 sm:px-0">
          {/* Illustration */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/images/account_illu.svg"
              alt="Account illustration"
              width={180}
              height={180}
              className="w-36 sm:w-44"
              priority
            />
            <p className="type-caption mt-2 text-gray-500 dark:text-gray-400">
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

          {/* Profile fields */}
          <ProfileFormFields
            email={email}
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
