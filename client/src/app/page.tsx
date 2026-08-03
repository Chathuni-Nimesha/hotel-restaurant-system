import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import About from "@/components/home/About";
import Menu from "@/components/home/Menu";
import Reservation from "@/components/home/Reservation";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <Hero />
      <Featured />
      <About />
      <Menu />
      <Reservation />
      <Gallery />
      <Testimonials />
      <Contact />

      <section aria-label="Guest trust highlights" className="landing-trust-section bg-black text-white">
        <div className="section-container text-center">
          <p className="text-3xl text-yellow-500" aria-hidden="true">
            ★★★★★
          </p>
          <h3 className="mt-4 text-2xl font-bold text-white">
            Trusted by 5,000+ Guests
          </h3>
          <p className="mt-2 text-gray-400">
            Award Winning Fine Dining Experience
          </p>
        </div>
      </section>

      <div className="section-container">
        <div
          className="h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
          aria-hidden="true"
        />
      </div>

      <Footer />
    </main>
  );
}
