import { PartnerLink } from '../../molecules/PartnerLink/PartnerLink';

export interface Partner {
  name: string;
  href: string;
  src: string;
  alt: string;
  ariaLabel: string;
}

interface PartnerBarProps {
  partners: ReadonlyArray<Partner>;
}

export function PartnerBar({ partners }: PartnerBarProps) {
  return (
    <nav
      aria-label="Parceiros"
      className="flex items-center justify-center gap-4"
    >
      {partners.map((p) => (
        <PartnerLink
          key={p.name}
          href={p.href}
          src={p.src}
          alt={p.alt}
          ariaLabel={p.ariaLabel}
        />
      ))}
    </nav>
  );
}
