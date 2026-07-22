import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE, localizeHref } from '@/lib/i18n/locale';

export default function TermsRedirect() {
  redirect(localizeHref('/terms', DEFAULT_LOCALE));
}
