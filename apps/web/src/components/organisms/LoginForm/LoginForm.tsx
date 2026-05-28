import { useState, type FormEvent } from 'react';
import { Button } from '../../atoms/Button/Button';
import { TextField } from '../../molecules/TextField/TextField';
import { PasswordField } from '../../molecules/PasswordField/PasswordField';

export interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginFormProps {
  title: string;
  onSubmit: (credentials: LoginCredentials) => void | Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export function LoginForm({ title, onSubmit, loading = false, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate={false}>
      <h1 className="mb-1 text-xl font-bold text-slate-900 sm:text-2xl">
        {title}
      </h1>

      <TextField
        id="email"
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        autoComplete="email"
        required
      />

      <PasswordField
        id="password"
        label="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••"
        required
        minLength={6}
      />

      {/* TODO: replace with router navigation once a /auth/forgot-password route exists. */}
      <a
        href="#"
        className="-mt-1 self-end text-xs text-slate-400 hover:text-slate-600"
      >
        Esqueci minha senha?
      </a>

      {error ? (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-3 py-2 text-center text-xs text-rose-600"
        >
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
