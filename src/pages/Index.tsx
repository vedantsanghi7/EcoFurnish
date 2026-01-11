import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Impact from "@/components/Impact";
import MarketValidation from "@/components/MarketValidation";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import AuthModal from "@/components/AuthModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Products />
      <Process />
      <Impact />
      <MarketValidation />
      <About />
      <Footer />
      <CartSidebar />
      <AuthModal />
    </div>
  );
};

export default Index;
