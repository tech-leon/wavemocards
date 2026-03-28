import { redirect } from 'next/navigation';
import { DEFAULT_LOCALE, localizeHref } from '@/lib/i18n/locale';

export default function HomePageRedirect() {
  redirect(localizeHref('/', DEFAULT_LOCALE));
}
