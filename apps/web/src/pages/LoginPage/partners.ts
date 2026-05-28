import type { Partner } from '../../components/organisms/PartnerBar/PartnerBar';

// Partner shortcuts surfaced on the login screen.
// TODO: replace WhatsApp href with the full https://wa.me/<DDI+phone> once the
// support number is provided. The bare https://wa.me/ still opens WhatsApp Web
// (asking the user to pick a number), which is the intentional placeholder.
export const PARTNERS: ReadonlyArray<Partner> = [
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
