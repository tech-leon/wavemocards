'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { buildAuthHref, buildCurrentReturnTo } from '@/lib/auth-routing';
import type { Profile } from '@/types/database';

function getTitleDisplay(title: string | null, t: (key: string) => string): string {
  switch (title) {
    case 'Student':
      return t('options.student');
    case 'Teacher':
      return t('options.teacher');
    default:
      return t('options.other');
  }
}

interface ProfileFormFieldsProps {
  email: string;
  profile: Profile;
  isEditing: boolean;
  // Form fields
  formLastName: string;
  setFormLastName: (v: string) => void;
  formFirstName: string;
  setFormFirstName: (v: string) => void;
  formBirthday: string;
  setFormBirthday: (v: string) => void;
  formTitle: string;
  setFormTitle: (v: string) => void;
  // Validation
  lastNameError: string;
  firstNameError: string;
  validateLastName: (v: string) => boolean;
  validateFirstName: (v: string) => boolean;
}

export function ProfileFormFields({
  email,
  profile,
  isEditing,
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
}: ProfileFormFieldsProps) {
  const t = useTranslations('account.profile');
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const passwordResetHref = buildAuthHref('sign-in', buildCurrentReturnTo(pathname, searchParams), {
    force: true,
  });

  return (
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
        {/* Last Name */}
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
              {lastNameError && <p className="type-caption mt-1 ml-3 text-pink">{lastNameError}</p>}
            </div>
          ) : (
            <p className="type-body ml-1 font-bold">{profile.last_name || t('empty.notAvailable')}</p>
          )}
        </div>

        {/* First Name */}
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
              {firstNameError && <p className="type-caption mt-1 ml-3 text-pink">{firstNameError}</p>}
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
  );
}
