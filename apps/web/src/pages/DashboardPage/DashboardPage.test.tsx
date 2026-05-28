import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '../../contexts/AuthContext';
import { DashboardPage } from './DashboardPage';
import { supabase } from '../../lib/supabase';

function renderDashboard() {
  return render(
    <AuthProvider>
      <DashboardPage />
    </AuthProvider>,
  );
}

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: { email: 'admin@sheild.app.br' } } },
    } as never);
  });

  it('shows the authenticated user email', async () => {
    renderDashboard();
    await waitFor(() =>
      expect(screen.getByText('admin@sheild.app.br')).toBeInTheDocument(),
    );
  });

  it('calls signOut when the Sair button is clicked', async () => {
    const user = userEvent.setup();
    renderDashboard();

    await waitFor(() =>
      expect(screen.getByText('admin@sheild.app.br')).toBeInTheDocument(),
    );
    await user.click(screen.getByRole('button', { name: /sair/i }));

    expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
  });
});
