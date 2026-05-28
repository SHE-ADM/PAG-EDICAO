import { render, screen } from '@testing-library/react';
import { PartnerLink } from './PartnerLink';

describe('PartnerLink', () => {
  it('renders an external anchor with secure rel and accessible label', () => {
    render(
      <PartnerLink
        href="https://example.com"
        src="/example.png"
        alt="Logo Example"
        ariaLabel="Visitar site da Example"
      />,
    );

    const link = screen.getByRole('link', { name: /visitar site da example/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the partner image with the provided alt text', () => {
    render(
      <PartnerLink
        href="https://example.com"
        src="/example.png"
        alt="Logo Example"
        ariaLabel="Visitar site da Example"
      />,
    );

    const img = screen.getByAltText('Logo Example');
    expect(img).toHaveAttribute('src', '/example.png');
  });
});
