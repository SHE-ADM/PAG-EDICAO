import type { LabelHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function Label({ className, children, ...rest }: LabelProps) {
  return (
    <label
      className={cn(
        'mb-1.5 block text-xs font-medium text-slate-500',
        className,
      )}
      {...rest}
    >
      {children}
    </label>
  );
}
