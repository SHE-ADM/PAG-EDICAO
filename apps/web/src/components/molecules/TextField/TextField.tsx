import type { ChangeEvent, ReactNode } from 'react';
import { Input } from '../../atoms/Input/Input';
import { Label } from '../../atoms/Label/Label';

export interface TextFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  error?: string;
  /** Optional element rendered absolutely inside the input wrapper (e.g. eye toggle). */
  adornment?: ReactNode;
}

export function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  minLength,
  error,
  adornment,
}: TextFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="w-full">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={adornment ? 'pr-11' : undefined}
        />
        {adornment ? (
          <div className="absolute inset-y-0 right-2 flex items-center">
            {adornment}
          </div>
        ) : null}
      </div>
      {error ? (
        <span
          id={errorId}
          role="alert"
          className="mt-1 block text-xs text-rose-500"
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}
