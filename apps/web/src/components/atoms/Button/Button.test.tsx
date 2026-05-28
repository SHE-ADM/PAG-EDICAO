import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Entrar</Button>);
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('applies the primary variant classes by default', () => {
    render(<Button>Entrar</Button>);
    const btn = screen.getByRole('button', { name: /entrar/i });
    expect(btn.className).toContain('rounded-full');
    expect(btn.className).toContain('bg-gradient-to-r');
  });

  it('applies the ghost variant when requested', () => {
    render(<Button variant="ghost">x</Button>);
    expect(screen.getByRole('button').className).toContain('text-slate-500');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Entrar</Button>);

    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Entrar
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
