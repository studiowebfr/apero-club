// Icônes dessinées à la main, en SVG inline — aucun icon-pack (Lucide,
// Heroicons...) dans les sections éditoriales, conformément au brief.

type IconProps = { className?: string };

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 3.5c.6 0 1.1.4 1.3.9l1 2.6c.2.5.1 1.1-.3 1.5L7 9.9c1 2.4 2.8 4.2 5.1 5.1l1.4-1.5c.4-.4 1-.5 1.5-.3l2.6 1c.5.2.9.7.9 1.3v2.2c0 1-.9 1.8-1.9 1.6C10.6 18.4 5.6 13.4 4.8 7.4c-.1-1 .7-1.9 1.7-1.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s-6.5-6.1-6.5-11A6.5 6.5 0 0 1 18.5 10c0 4.9-6.5 11-6.5 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconInstagram({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMenu({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconGlass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 4h12l-1.6 9.5a4.4 4.4 0 0 1-8.8 0L6 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 13.5V20M8.5 20h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconDice({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.3" cy="8.3" r="1.1" fill="currentColor" />
      <circle cx="15.7" cy="8.3" r="1.1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
      <circle cx="8.3" cy="15.7" r="1.1" fill="currentColor" />
      <circle cx="15.7" cy="15.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function IconNote({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 17.5a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 9 17.5Zm0 0V6.2c0-.5.35-.9.85-1L18 3.5v9.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 13.3a2.5 2.5 0 1 1-2.5 2.5 2.5 2.5 0 0 1 2.5-2.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconBall({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3.75v16.5M3.75 12h16.5M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.1" opacity=".55" />
    </svg>
  );
}
