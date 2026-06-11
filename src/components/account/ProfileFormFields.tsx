'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';
import { AuthNavigationButton } from '@/components/auth/AuthNavigationButton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buildAuthHref, buildCurrentReturnTo } from '@/lib/auth-routing';
import type { Profile } from '@/types/database';

const KNOWN_TITLES = ['Student', 'Teacher'];

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

const sectionTitleClassName = 'type-subsection-title mb-4 border-b-2 border-main-tint02 px-2 py-1';
const labelClassName = 'type-body-sm block mb-1.5 px-1 text-muted-foreground';
// View value and edit input share the same pill geometry so toggling
// edit mode only changes the surface, never the layout.
const valuePillClassName =
  'type-body w-full px-5 py-2 rounded-full border-2 border-transparent bg-muted';
const inputPillClassName =
  'type-body w-full px-5 py-2 rounded-full border-2 border-input bg-background focus:outline-none focus:border-main transition-colors';

function ValuePill({ value, fallback }: { value: string | null; fallback: string }) {
  return (
    <p className={cn(valuePillClassName, !value && 'text-muted-foreground')}>
      {value || fallback}
    </p>
  );
}

interface ProfileFormFieldsProps {
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

  const notAvailable = t('empty.notAvailable');

  return (
    <div className="w-full flex-1">
      {/* Personal details */}
      <section>
        <div className={sectionTitleClassName}>{t('sections.personal')}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Last Name */}
          <div>
            <span className={labelClassName}>{t('fields.lastName')}</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className={inputPillClassName}
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
              <ValuePill value={profile.last_name} fallback={notAvailable} />
            )}
          </div>

          {/* First Name */}
          <div>
            <span className={labelClassName}>{t('fields.firstName')}</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className={inputPillClassName}
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
              <ValuePill value={profile.first_name} fallback={notAvailable} />
            )}
          </div>

          {/* Birthday */}
          <div>
            <span className={labelClassName}>{t('fields.birthDate')}</span>
            {isEditing ? (
              <input
                type="date"
                className={inputPillClassName}
                value={formBirthday}
                onChange={(e) => setFormBirthday(e.target.value)}
              />
            ) : (
              <ValuePill value={profile.day_of_birth} fallback={notAvailable} />
            )}
          </div>

          {/* Title (身份) */}
          <div>
            <span className={labelClassName}>{t('fields.role')}</span>
            {isEditing ? (
              <select
                className={inputPillClassName}
                value={KNOWN_TITLES.includes(formTitle) ? formTitle : 'Null'}
                onChange={(e) => setFormTitle(e.target.value)}
              >
                <option value="Student">{t('options.student')}</option>
                <option value="Teacher">{t('options.teacher')}</option>
                <option value="Null">{t('options.other')}</option>
              </select>
            ) : (
              <ValuePill value={getTitleDisplay(profile.title, t)} fallback={notAvailable} />
            )}
          </div>
        </div>
      </section>

      {/* Password & security */}
      <section className="mt-10">
        <div className={sectionTitleClassName}>{t('sections.security')}</div>
        <div>
          <span className={labelClassName}>{t('fields.password')}</span>
          <div className="flex items-center gap-3">
            <p className={cn(valuePillClassName, 'flex-1 min-w-0')}>{t('passwordMask')}</p>
            {!isEditing && (
              <AuthNavigationButton
                href={passwordResetHref}
                className={cn(buttonVariants({ variant: 'main-outline' }), 'shrink-0')}
              >
                {t('resetPassword')}
              </AuthNavigationButton>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
