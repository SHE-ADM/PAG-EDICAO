import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordField } from './PasswordField';

function Controlled() {
  const [value, setValue] = useState('');
  return (
    <PasswordField
      id="password"
      label="Senha"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

describe('PasswordField', () => {
  it('starts with type=password', () => {
    render(<Controlled />);
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password');
  });

  it('toggles to type=text when the eye button is clicked', async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    const toggle = screen.getByRole('button', { name: /mostrar senha/i });
    await user.click(toggle);

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: /ocultar senha/i }),
    ).toBeInTheDocument();
  });

  it('toggles back to type=password on a second click', async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    await user.click(screen.getByRole('button', { name: /mostrar senha/i }));
    await user.click(screen.getByRole('button', { name: /ocultar senha/i }));

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password');
  });
});
