import Hero from "@/components/ui/Hero";

export default function Home() {
  return (
    <main>
      <Hero
        title="A thing of beauty is a joy forever"
        subtitle="La magia delle parole delle antiche storie risuona in nuovi racconti incantati"
        breadcrumbs={[]}
        home
        videoUrl="/videos/hero-video_cesare.mp4"
        cta={{ label: "Scopri i prossimi eventi", href: "/calendario" }}
      />
    </main>
  );
}
