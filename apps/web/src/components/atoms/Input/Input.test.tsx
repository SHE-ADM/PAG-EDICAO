import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

function Controlled() {
  const [value, setValue] = useState('');
  return (
    <Input
      aria-label="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

describe('Input', () => {
  it('reflects controlled value as the user types', async () => {
    const user = userEvent.setup();
    render(<Controlled />);

    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'a@b.co');

    expect(input).toHaveValue('a@b.co');
  });

  it('exposes aria-invalid when set', () => {
    render(<Input aria-label="email" aria-invalid />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('defaults to type=text when no type is provided', () => {
    render(<Input aria-label="any" />);
    expect(screen.getByLabelText(/any/i)).toHaveAttribute('type', 'text');
  });
});
