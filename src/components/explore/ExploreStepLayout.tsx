'use client';

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
      <div className="sticky top-[64px] z-30 pb-2 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-3 sm:px-0">
          {showProgressBar && <ProgressBar currentStep={currentStep} />}

          {/* Title bar */}
          <div className="pb-2 border-b-2 border-main-tint02 flex justify-between items-center gap-4">
            {/* Desktop title */}
            <h2 className="text-2xl font-bold text-[#3C9DAE] hidden md:block">{title}</h2>
            {/* Mobile title */}
            {titleMobile ? (
              <h2 className="text-2xl font-bold text-[#3C9DAE] md:hidden flex flex-col">
                <span>{titleMobile.line1}</span>
                <span>{titleMobile.line2}</span>
              </h2>
            ) : (
              <h2 className="text-2xl font-bold text-[#3C9DAE] md:hidden">{title}</h2>
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
      <div className="container mx-auto px-3 sm:px-0 pb-20">
        {children}
      </div>
    </>
  );
}
