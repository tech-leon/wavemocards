'use client';

import { PAGE_CONTAINER, STICKY_TITLE_BAR } from '@/lib/layout';
import { ProgressBar } from './ProgressBar';

interface ExploreStepLayoutProps {
  currentStep: number;
  title: string;
  titleMobile?: { line1: string; line2: string };
  children: React.ReactNode;
  actions?: React.ReactNode;
  showProgressBar?: boolean;
}

export function ExploreStepLayout({
  currentStep,
  title,
  titleMobile,
  children,
  actions,
  showProgressBar = true,
}: ExploreStepLayoutProps) {
  return (
    <>
      {/* Sticky header area */}
      <div className={STICKY_TITLE_BAR}>
        <div className={PAGE_CONTAINER}>
          {showProgressBar && <ProgressBar currentStep={currentStep} />}

          {/* Title bar */}
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center gap-4">
            {/* Desktop title */}
            <h2 className="hidden md:block">{title}</h2>
            {/* Mobile title */}
            {titleMobile ? (
              <h2 className="md:hidden flex flex-col">
                <span>{titleMobile.line1}</span>
                <span>{titleMobile.line2}</span>
              </h2>
            ) : (
              <h2 className="md:hidden">{title}</h2>
            )}

            {/* Action buttons */}
            {actions && (
              <div className="nav-btn flex flex-col sm:flex-row justify-end items-end sm:items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className={`grow ${PAGE_CONTAINER} pb-10 md:pb-12`}>
        {children}
      </div>
    </>
  );
}
