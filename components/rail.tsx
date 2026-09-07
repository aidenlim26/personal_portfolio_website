import type { ReactNode } from "react";

/** One line in the marginalia rail. */
export function RailItem({ children }: { children: ReactNode }) {
  return <p className="rail-item">{children}</p>;
}

export function RailLines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((line) => (
        <RailItem key={line}>{line}</RailItem>
      ))}
    </>
  );
}

export function ExternalLink({
  href,
  children,
  className = "link",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
