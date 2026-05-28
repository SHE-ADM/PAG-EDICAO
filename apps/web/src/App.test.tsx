import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('redirects unknown routes to the login page', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /lançamentos de contas a pagar/i }),
    ).toBeInTheDocument();
  });
});
