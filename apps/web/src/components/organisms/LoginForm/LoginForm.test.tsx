import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders the provided title as a top-level heading', () => {
    render(<LoginForm title="Lançamentos de contas a pagar" onSubmit={() => {}} />);
    expect(
      screen.getByRole('heading', { name: /lançamentos de contas a pagar/i }),
    ).toBeInTheDocument();
  });

  it('submits email and password when both fields are filled', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<LoginForm title="Entrar" onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText('E-mail'), 'user@sheild.app.br');
    await user.type(screen.getByLabelText('Senha'), 'secret123');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@sheild.app.br',
      password: 'secret123',
    });
  });

  it('renders a placeholder forgot-password link', () => {
    render(<LoginForm title="Entrar" onSubmit={() => {}} />);
    const link = screen.getByRole('link', { name: /esqueci minha senha/i });
    expect(link).toHaveAttribute('href', '#');
  });

  it('shows a loading state and disables the button while loading', () => {
    render(<LoginForm title="Entrar" onSubmit={() => {}} loading />);
    const button = screen.getByRole('button', { name: /entrando/i });
    expect(button).toBeDisabled();
  });

  it('renders an inline error message when error is provided', () => {
    render(
      <LoginForm
        title="Entrar"
        onSubmit={() => {}}
        error="E-mail ou senha incorretos."
      />,
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'E-mail ou senha incorretos.',
    );
  });
});
