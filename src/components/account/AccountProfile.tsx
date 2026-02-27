'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { handleSignIn } from '@/lib/auth';

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
function getTitleDisplay(title: string | null): string {
  switch (title) {
    case 'Student':
      return '學生';
    case 'Teacher':
      return '教師';
    default:
      return '其他';
  }
}

export function AccountProfile() {
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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
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
        toast.error('載入帳戶資料失敗');
      }
    } catch {
      toast.error('載入帳戶資料時發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  // Validate last name
  const validateLastName = (value: string) => {
    if (!value.trim()) {
      setLastNameError('此欄為必填');
      return false;
    }
    setLastNameError('');
    return true;
  };

  // Validate first name
  const validateFirstName = (value: string) => {
    if (!value.trim()) {
      setFirstNameError('此欄為必填');
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
      <div className="py-20 text-center text-gray-500 dark:text-gray-300 text-lg">無法載入帳戶資料</div>
    );
  }

  return (
    <>
      {/* Sticky title bar */}
      <div className="sticky top-[64px] z-30 pb-2 bg-gray-100 dark:bg-gray-900 px-3 sm:px-0">
          <div className="container mx-auto pt-4">
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center gap-2">
            <h2 className="text-2xl font-bold text-[#3C9DAE]">我的帳戶</h2>

            {/* Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {!isEditing ? (
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="rounded-full border-2 border-main text-main hover:bg-main hover:text-white dark:hover:text-zinc-800 text-sm font-bold"
                >
                  編輯
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancelClick}
                    className="rounded-full border-2 border-main text-main hover:bg-main hover:text-white dark:hover:text-zinc-800 text-sm font-bold"
                    disabled={saving}
                  >
                    取消
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="rounded-full bg-main hover:bg-main-dark text-white px-6 text-sm font-bold"
                    disabled={saving}
                  >
                    {saving ? '儲存中...' : '儲存'}
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
            <p className="text-gray-800 dark:text-gray-100 text-xs">
              Illustration by{' '}
              <a
                className="text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] underline"
                href="https://icons8.com/illustrations/author/iAdLsFJOKDrk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya Krasutska
              </a>{' '}
              from{' '}
              <a
                className="text-gray-800 dark:text-gray-100 hover:text-[#3C9DAE] underline"
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
              <span className="block mb-2 text-gray-800 dark:text-gray-100 text-sm">Email</span>
              <p className="ml-1 text-base font-bold">{email}</p>
            </div>

            {/* Password */}
            <div className="mb-6">
              <span className="block mb-2 text-gray-800 dark:text-gray-100 text-sm">密碼</span>
              <div className="flex justify-between items-center">
                <p className="ml-1 text-base font-bold">********</p>
                {!isEditing && (
                  <form action={handleSignIn}>
                    <button
                      type="submit"
                      className="px-4 py-1 text-sm rounded-full bg-pink-tint01 text-white hover:bg-pink transition-colors cursor-pointer"
                    >
                      重設密碼
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Last Name & First Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
              {/* Last Name (姓) */}
              <div className="mb-6">
                <span className="block mb-2 text-gray-800 dark:text-gray-100 text-sm">姓</span>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      className="w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full text-base bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                      value={formLastName}
                      onChange={(e) => {
                        setFormLastName(e.target.value);
                        validateLastName(e.target.value);
                      }}
                      placeholder="請輸入姓氏"
                    />
                    {lastNameError && (
                      <p className="mt-1 ml-3 text-xs text-pink">{lastNameError}</p>
                    )}
                  </div>
                ) : (
                  <p className="ml-1 text-base font-bold">{profile.last_name || '—'}</p>
                )}
              </div>

              {/* First Name (名) */}
              <div className="mb-6">
                <span className="block mb-2 text-gray-800 dark:text-gray-100 text-sm">名</span>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      className="w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full text-base bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                      value={formFirstName}
                      onChange={(e) => {
                        setFormFirstName(e.target.value);
                        validateFirstName(e.target.value);
                      }}
                      placeholder="請輸入名字"
                    />
                    {firstNameError && (
                      <p className="mt-1 ml-3 text-xs text-pink">{firstNameError}</p>
                    )}
                  </div>
                ) : (
                  <p className="ml-1 text-base font-bold">{profile.first_name || '—'}</p>
                )}
              </div>
            </div>

            {/* Birthday & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-0">
              {/* Birthday */}
              <div className="mb-6">
                <span className="block mb-2 text-gray-800 dark:text-gray-100 text-sm">生日</span>
                {isEditing ? (
                  <input
                    type="date"
                    className="w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full text-base bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                    value={formBirthday}
                    onChange={(e) => setFormBirthday(e.target.value)}
                  />
                ) : (
                  <p className="ml-1 text-base font-bold">{profile.day_of_birth || '—'}</p>
                )}
              </div>

              {/* Title (身份) */}
              <div className="mb-6">
                <span className="block mb-2 text-gray-800 dark:text-gray-100 text-sm">身份</span>
                {isEditing ? (
                  <select
                    className="w-full px-5 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-full text-base bg-gray-100 dark:bg-gray-900 focus:outline-none focus:border-main transition-colors"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  >
                    <option value="Student">學生</option>
                    <option value="Teacher">教師</option>
                    <option value="Null">其他</option>
                  </select>
                ) : (
                  <p className="ml-1 text-base font-bold">{getTitleDisplay(profile.title)}</p>
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
            <p className="mb-3 text-2xl font-bold text-pink">確定要取消編輯嗎？</p>
            <p className="mb-4 text-sm text-gray-800 dark:text-gray-100">
              取消編輯後，
              <span className="text-pink pl-1">將不會儲存</span>
              您所做的變更，確定要取消編輯嗎？
            </p>
            <div className="w-[45%] mb-4">
              <Image
                src="/images/sureToDelete.svg"
                alt="確認取消"
                width={200}
                height={200}
                className="w-full"
              />
            </div>
            <span className="text-gray-500 dark:text-gray-300 text-xs mb-4">
              Illustration by{' '}
              <a className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE]" href="https://blush.design/artists/RyUTVuP8G4QeAAEEQgug/pablo-stanley" target="_blank" rel="noopener noreferrer">
                Pablo Stanley
              </a>{' '}
              from{' '}
              <a className="text-gray-500 dark:text-gray-300 hover:text-[#3C9DAE]" href="https://blush.design/" target="_blank" rel="noopener noreferrer">
                blush design
              </a>
            </span>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                className="rounded-full border-2 border-pink text-pink hover:bg-pink/10 px-6"
              >
                繼續編輯
              </Button>
              <Button
                onClick={handleCancelConfirm}
                className="rounded-full bg-pink hover:bg-pink-dark text-white px-6"
              >
                取消編輯
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Save Result Modal */}
      {showSaveResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 flex flex-col items-center">
            <p className={`mb-3 text-2xl font-bold ${saveSuccess ? 'text-main' : 'text-pink'}`}>
              {saveSuccess ? '儲存成功' : '儲存失敗'}
            </p>
            {!saveSuccess && (
              <>
                <p className="mt-3 text-sm text-gray-800 dark:text-gray-100">
                  很抱歉儲存失敗，請確認您所輸入的內容是否有無錯誤。
                </p>
                <p className="mt-2 text-sm text-gray-800 dark:text-gray-100">
                  若無法排除問題，請{' '}
                  <a className="text-pink hover:underline" href="mailto:info@wavemocards.com">
                    與我們聯繫
                  </a>
                </p>
              </>
            )}
            <div className="w-[45%] my-4">
              <Image
                src={saveSuccess ? '/images/emoCards/5.svg' : '/images/addCardFail.svg'}
                alt={saveSuccess ? '儲存成功' : '儲存失敗'}
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
              我知道了
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
