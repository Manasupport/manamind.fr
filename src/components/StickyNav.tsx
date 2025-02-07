import { useEffect } from "react";
import { Button } from "./ui/button";
import { useLocation, useNavigate } from "react-router-dom";

export const StickyNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#71c088]/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        <button
          onClick={() => scrollToSection("hero")}
          className="flex-shrink-0 focus:outline-none cursor-pointer"
          aria-label="Retour à l'accueil"
        >
          <img
            src="/lovable-uploads/384c8e47-f179-4499-b24e-4ee8556324d9.png"
            alt="Manamind Logo"
            className="h-10 w-10"
          />
        </button>

        <div className="flex-1 flex justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => scrollToSection("about")}
            className="text-white font-bold hover:underline hover:bg-transparent hover:text-white"
          >
            À propos de Manamind
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("pricing")}
            className="text-white font-bold hover:underline hover:bg-transparent hover:text-white"
          >
            Nos offres
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("help-offer")}
            className="text-white font-bold hover:underline hover:bg-transparent hover:text-white"
          >
            Contactez-nous
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection("faq")}
            className="text-white font-bold hover:underline hover:bg-transparent hover:text-white"
          >
            FAQ
          </Button>
        </div>

        <div>
          <Button
            onClick={() => (window.location.href = "https://app.manamind.fr")}
            size="lg"
            className="bg-[#0c3d5e] text-white hover:bg-[#09314c] hover:scale-105 transition-all duration-300 px-6 py-2 rounded-lg font-bold shadow-lg"
          >
            Connexion
          </Button>
        </div>
      </div>
    </nav>
  );
};