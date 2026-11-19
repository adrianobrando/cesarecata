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
      className={`relative -mt-20 flex items-center bg-dark-blue bg-cover bg-center px-5 pb-12 pt-32 text-left text-white sm:px-6 ${
        home ? "min-h-[80vh]" : "min-h-[58vh] sm:min-h-[62vh]"
      }`}
      style={{ backgroundImage: 'url("/images/bg_cesare-header1.jpg")' }}
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
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />
      <div className="relative mx-auto w-full max-w-screen-2xl">
        <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
        {subtitle && (
          <h2 className="mt-5 max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl">
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
