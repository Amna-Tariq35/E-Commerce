import Hero from "@/src/components/home/Hero";
import FeatureCards from "@/src/components/home/FeatureCards";
import Newsletter from "@/src/components/home/Newsletter";
import Footer from "@/src/components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FBF7F4] text-[#1A1A1A]">
      <Hero />
      <main className="mx-auto max-w-6xl px-4">
        <div className="mt-14">
          <FeatureCards />
        </div>
        <Newsletter />
        <div className="mt-16" />
      </main>
      <Footer />
    </div>
  );
}