import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders children and associates with the given htmlFor target', () => {
    render(
      <>
        <Label htmlFor="email">E-mail</Label>
        <input id="email" />
      </>,
    );

    const label = screen.getByText('E-mail');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');
  });
});
