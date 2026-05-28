import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/utils';

type Variant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  // Pill gradient — main CTA shown in the mockup.
  primary:
    'rounded-full px-8 py-3 text-white font-semibold ' +
    'bg-gradient-to-r from-[var(--color-cta-from)] via-[var(--color-cta-via)] to-[var(--color-cta-to)] ' +
    'shadow-[var(--shadow-cta)] hover:brightness-105 active:brightness-95 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed',
  ghost:
    'rounded-full p-2 text-slate-500 hover:text-slate-700 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
};

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-cta-via)]',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
