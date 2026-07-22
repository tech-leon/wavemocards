import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE, localizeHref } from '@/lib/i18n/locale';

export default function PrivacyRedirect() {
  redirect(localizeHref('/privacy', DEFAULT_LOCALE));
}
