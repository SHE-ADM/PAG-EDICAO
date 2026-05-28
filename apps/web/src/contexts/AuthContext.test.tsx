import { render, screen, waitFor, renderHook } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import { useAuth } from './useAuth';
import { supabase } from '../lib/supabase';

function SessionProbe() {
  const { user, loading } = useAuth();
  if (loading) return <span>carregando</span>;
  return <span>user: {user?.email ?? 'none'}</span>;
}

describe('AuthContext', () => {
  it('exposes no user once getSession resolves with an empty session', async () => {
    render(
      <AuthProvider>
        <SessionProbe />
      </AuthProvider>,
    );

    await waitFor(() => expect(screen.getByText('user: none')).toBeInTheDocument());
  });

  it('exposes the user from the current session', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: { email: 'admin@sheild.app.br' } } },
    } as never);

    render(
      <AuthProvider>
        <SessionProbe />
      </AuthProvider>,
    );

    await waitFor(() =>
      expect(screen.getByText('user: admin@sheild.app.br')).toBeInTheDocument(),
    );
  });

  it('throws when useAuth is used outside an AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/);
  });
});
