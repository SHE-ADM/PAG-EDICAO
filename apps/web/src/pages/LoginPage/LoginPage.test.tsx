import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { supabase } from '../../lib/supabase';

function renderLogin() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/auth/login']}>
        <Routes>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<span>dashboard</span>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe('LoginPage', () => {
  it('renders the page heading', () => {
    renderLogin();
    expect(
      screen.getByRole('heading', { name: /lançamentos de contas a pagar/i }),
    ).toBeInTheDocument();
  });

  it('renders the three partner shortcuts', () => {
    renderLogin();

    expect(
      screen.getByRole('link', { name: /visitar site da otimotex/i }),
    ).toHaveAttribute('href', 'https://www.otimotex.com.br/');
    expect(
      screen.getByRole('link', { name: /visitar site da le bianco/i }),
    ).toHaveAttribute('href', 'https://www.lebianco.com.br/');
    expect(
      screen.getByRole('link', { name: /abrir whatsapp/i }),
    ).toHaveAttribute('href', 'https://wa.me/');
  });

  it('authenticates and navigates to the dashboard on success', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText('E-mail'), 'admin@sheild.app.br');
    await user.type(screen.getByLabelText('Senha'), 'secret123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'admin@sheild.app.br',
      password: 'secret123',
    });
    await waitFor(() =>
      expect(screen.getByText('dashboard')).toBeInTheDocument(),
    );
  });

  it('shows an inline error when credentials are invalid', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    } as never);

    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText('E-mail'), 'admin@sheild.app.br');
    await user.type(screen.getByLabelText('Senha'), 'wrong-pass');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'E-mail ou senha incorretos.',
      ),
    );
  });
});
