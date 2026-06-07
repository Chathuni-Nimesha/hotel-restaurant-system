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
    <main>
      <Navbar />
      <Hero />
      <Featured />
      <About />
      <Menu />
      <Reservation />
      <Gallery />
      <Testimonials />
      <Contact />
      <div className="text-center py-16">
        <p className="text-yellow-500 text-3xl">
          ★★★★★
        </p>
        <h3 className="text-2xl font-bold mt-4 text-white">
          Trusted by 5,000+ Guests
        </h3>
        <p className="text-gray-400 mt-2">
          Award Winning Fine Dining Experience
        </p>
      </div>
      <div className="max-w-7xl mx-zuto">
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        </div>
      </div>
      
      <Footer />
      
    </main>
  );
}