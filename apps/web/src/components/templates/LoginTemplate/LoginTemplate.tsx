import type { ReactNode } from 'react';

interface LoginTemplateProps {
  children: ReactNode;
}

/**
 * Full-viewport gradient backdrop with a centered white card.
 * Decorative blobs at the top of the card mirror the mockup
 * (`apps/web/public/Login Page.png`).
 */
export function LoginTemplate({ children }: LoginTemplateProps) {
  return (
    <div
      data-testid="login-template"
      className="flex min-h-screen items-center justify-center px-4 py-8 bg-gradient-to-br from-[var(--color-page-from)] via-[var(--color-page-via)] to-[var(--color-page-to)]"
    >
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-card)]">
        {/* Decorative top header with two overlapping blobs. */}
        <div
          aria-hidden="true"
          className="relative h-36 overflow-hidden bg-white"
        >
          <div className="absolute -top-12 -left-10 size-56 rounded-full bg-gradient-to-br from-[var(--color-blob-purple-from)] to-[var(--color-blob-purple-to)] opacity-90" />
          <div className="absolute -top-6 right-[-30%] size-64 rounded-full bg-gradient-to-br from-[var(--color-blob-teal-from)] to-[var(--color-blob-teal-to)] opacity-95" />
          <div className="absolute bottom-0 left-1/2 size-16 -translate-x-1/2 translate-y-1/3 rounded-full bg-gradient-to-br from-[var(--color-blob-teal-from)] to-[var(--color-blob-accent)] shadow-lg" />
        </div>

        <div className="px-8 pb-8 pt-10">{children}</div>
      </div>
    </div>
  );
}
