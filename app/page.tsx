import About from "@/components/page/About";
import Customer from "@/components/page/Customers";
import Header from "@/components/page/Header";
import Showcase from "@/components/page/Showcase";

export default function HomePage() {
  return (
    <main className="min-h-screen text-white font-sans">
      <Header />
      <About />
      <Customer />
      <Showcase />
    </main>
  );
}
