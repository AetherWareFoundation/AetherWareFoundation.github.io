import { Hero } from "@/components/marketing/Hero";

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      <section className="min-h-section flex">
        <Hero
          titleLine1="The future of"
          titleLine2="Motion Control"
          description="Make your robots move with ease. Aether is a motion control platform that allows you to control like you never have before."
          mainButtonText="Get started"
          mainButtonHref="/docs/lib"
          altButtonText="I came here for 3D printing"
          altButtonHref="/docs/printer"
          background={{ from: "#fc6ff7", to: "#fc6ff7" }}
          className="flex-1"
        />
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Precision Control
              </h3>
              <p className="text-white/60">
                Advanced algorithms for smooth and accurate motion control.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Easy Integration
              </h3>
              <p className="text-white/60">
                Simple APIs and SDKs to get your robots moving quickly.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-lg">
              <h3 className="text-xl font-semibold mb-3 text-white">
                Real-time Feedback
              </h3>
              <p className="text-white/60">
                Monitor and adjust motion parameters on the fly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
