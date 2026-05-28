import { render, screen } from '@testing-library/react';
import { LoginTemplate } from './LoginTemplate';

describe('LoginTemplate', () => {
  it('renders its children inside the card', () => {
    render(
      <LoginTemplate>
        <p>conteúdo do card</p>
      </LoginTemplate>,
    );

    expect(screen.getByText('conteúdo do card')).toBeInTheDocument();
  });

  it('exposes a testable root container', () => {
    render(
      <LoginTemplate>
        <p>x</p>
      </LoginTemplate>,
    );
    expect(screen.getByTestId('login-template')).toBeInTheDocument();
  });
});
