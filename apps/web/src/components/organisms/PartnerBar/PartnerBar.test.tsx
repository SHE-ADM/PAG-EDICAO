import { render, screen } from '@testing-library/react';
import { PartnerBar, type Partner } from './PartnerBar';

const PARTNERS: Partner[] = [
  {
    name: 'Otimotex',
    href: 'https://www.otimotex.com.br/',
    src: '/Otimotex.png',
    alt: 'Logo Otimotex',
    ariaLabel: 'Visitar site da Otimotex',
  },
  {
    name: 'Le Bianco',
    href: 'https://www.lebianco.com.br/',
    src: '/Lebianco.jpg',
    alt: 'Logo Le Bianco',
    ariaLabel: 'Visitar site da Le Bianco',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/',
    src: '/whatsapp.png',
    alt: 'Abrir WhatsApp',
    ariaLabel: 'Abrir WhatsApp',
  },
];

describe('PartnerBar', () => {
  it('renders one link per partner with the correct href', () => {
    render(<PartnerBar partners={PARTNERS} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', 'https://www.otimotex.com.br/');
    expect(links[1]).toHaveAttribute('href', 'https://www.lebianco.com.br/');
    expect(links[2]).toHaveAttribute('href', 'https://wa.me/');
  });

  it('exposes a "Parceiros" landmark for assistive tech', () => {
    render(<PartnerBar partners={PARTNERS} />);
    expect(screen.getByRole('navigation', { name: /parceiros/i })).toBeInTheDocument();
  });
});
