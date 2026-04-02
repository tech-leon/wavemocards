import type { ReactNode } from 'react';
import { ExploreStoreHydrator } from '@/store/ExploreStoreHydrator';

export default function ExploreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ExploreStoreHydrator />
      {children}
    </>
  );
}
