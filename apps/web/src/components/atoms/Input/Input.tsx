import type { InputHTMLAttributes } from 'react';
import { cn } from '../../../lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = 'text', ...rest }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'w-full rounded-full border border-[var(--color-field-border)] bg-white',
        'px-5 py-2.5 text-sm text-slate-700 placeholder:text-[var(--color-field-placeholder)]',
        'focus:outline-none focus:border-[var(--color-cta-via)] focus:ring-2 focus:ring-[var(--color-cta-via)]/30',
        'aria-invalid:border-rose-400 aria-invalid:focus:ring-rose-300/40',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        className,
      )}
      {...rest}
    />
  );
}
