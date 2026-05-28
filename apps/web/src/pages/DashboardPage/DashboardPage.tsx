import { Button } from '../../components/atoms/Button/Button';
import { useAuth } from '../../contexts/useAuth';

export function DashboardPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-[var(--color-page-from)] via-[var(--color-page-via)] to-[var(--color-page-to)] px-4">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 text-center shadow-[var(--shadow-card)]">
        <h1 className="mb-2 text-xl font-bold text-slate-900">
          Lançamentos de contas a pagar
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Conectado como{' '}
          <span className="font-medium text-slate-700">{user?.email}</span>
        </p>
        <Button variant="primary" className="w-full" onClick={signOut}>
          Sair
        </Button>
      </div>
    </div>
  );
}
