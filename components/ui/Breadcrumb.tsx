import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
};

export default function Breadcrumb({ items, variant = "light" }: BreadcrumbProps) {
  const textColor = variant === "light" ? "text-white/85" : "text-slate-600";
  const linkColor = variant === "light" ? "hover:text-white" : "hover:text-dark-blue";
  const focusColor = variant === "light" ? "focus-visible:outline-white" : "focus-visible:outline-primary-blue";

  return (
    <nav aria-label="Percorso di navigazione" className={`mt-5 ${textColor}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
        {items.map(({ label, href }, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {href && !current ? (
                <Link
                  href={href}
                  className={`rounded underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 ${linkColor} ${focusColor}`}
                >
                  {label}
                </Link>
              ) : (
                <span aria-current={current ? "page" : undefined}>{label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
