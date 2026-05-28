import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

function Controlled({ error }: { error?: string }) {
  const [value, setValue] = useState('');
  return (
    <TextField
      id="email"
      label="E-mail"
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={error}
    />
  );
}

describe('TextField', () => {
  it('associates the label with the input via htmlFor/id', () => {
    render(<Controlled />);
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('id', 'email');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    await user.type(screen.getByLabelText('E-mail'), 'a@b.co');

    expect(screen.getByLabelText('E-mail')).toHaveValue('a@b.co');
  });

  it('shows the error message and sets aria-invalid when error is provided', () => {
    render(<Controlled error="E-mail inválido" />);

    const input = screen.getByLabelText('E-mail');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('E-mail inválido');
    expect(alert).toHaveAttribute('id', 'email-error');
  });
});
