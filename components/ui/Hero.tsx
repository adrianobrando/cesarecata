import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";
import Button from "./Button";

type HeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  videoUrl?: string;
  home?: boolean;
  cta?: {
    label: string;
    href: string;
  };
};

const breadcrumbsFor = (title: string): BreadcrumbItem[] => [
  { label: "Home", href: "/" },
  { label: title },
];

export default function Hero({ title, subtitle, breadcrumbs, videoUrl, home = false, cta }: HeroProps) {
  const breadcrumbItems = breadcrumbs ?? breadcrumbsFor(title);

  return (
    <section
      className={`relative flex items-center ${
        home
          ? "-mt-20 min-h-[90vh] bg-dark-blue bg-cover bg-center pb-20 pt-40 text-white"
          : "pb-14 pt-16 text-dark-blue sm:pb-20 sm:pt-24"
      }`}
      style={home ? { backgroundImage: 'url("/images/bg_cesare-header1.jpg")' } : undefined}
    >
      {videoUrl && (
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/bg_cesare-header1.jpg"
          src={videoUrl}
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        />
      )}
      {home && <div aria-hidden="true" className="absolute inset-0 bg-[#102b42]/70" />}
      <div className="site-container relative">
        <h1 className={`font-display font-normal leading-[1.05] ${home ? "max-w-4xl text-5xl sm:text-6xl lg:text-7xl" : "text-5xl sm:text-6xl lg:text-7xl"}`}>
          {title}
        </h1>
        {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} variant={home ? "light" : "dark"} />}
        {subtitle && (
          <h2 className="mt-6 max-w-3xl text-xl font-normal leading-relaxed sm:text-2xl">
            {subtitle}
          </h2>
        )}
        {cta && (
          <Button href={cta.href} className="mt-8">
            {cta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
