import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { supabase } from '../lib/supabase';

function renderProtected() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <span>conteúdo protegido</span>
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<span>tela de login</span>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe('ProtectedRoute', () => {
  it('redirects to the login route when there is no user', async () => {
    renderProtected();
    await waitFor(() =>
      expect(screen.getByText('tela de login')).toBeInTheDocument(),
    );
    expect(screen.queryByText('conteúdo protegido')).not.toBeInTheDocument();
  });

  it('renders children when a user is authenticated', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: { email: 'admin@sheild.app.br' } } },
    } as never);

    renderProtected();

    await waitFor(() =>
      expect(screen.getByText('conteúdo protegido')).toBeInTheDocument(),
    );
  });
});
