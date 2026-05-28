import { cn } from '../../../lib/utils';

interface PartnerLinkProps {
  href: string;
  src: string;
  alt: string;
  ariaLabel: string;
  className?: string;
}

export function PartnerLink({
  href,
  src,
  alt,
  ariaLabel,
  className,
}: PartnerLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex size-12 items-center justify-center rounded-full bg-white',
        'border border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cta-via)]',
        className,
      )}
    >
      <img src={src} alt={alt} className="size-8 object-contain" />
    </a>
  );
}
