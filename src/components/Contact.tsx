import { Button } from "./ui/button";
import { Mail, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-10 px-4" style={{ backgroundColor: "#0c3d5e" }}>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-4 animate-fadeIn text-center">
          <h2 className="text-3xl font-bold text-white font-quattrocento">Contactez-nous</h2>
          <div className="space-y-3">
            <div className="flex justify-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.location.href = "mailto:contact@mana.fr"}
              >
                <Mail className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/10"
                onClick={() => window.open("https://linkedin.com/company/manadvise", "_blank")}
              >
                <Linkedin className="h-5 w-5 text-white" />
              </Button>
            </div>
            <p className="text-sm text-white font-quattrocento">
              24 rue Pierre Semard, 75009, PARIS, FRANCE
            </p>
          </div>
          <div className="pt-4 space-y-1">
            <img
              src="/lovable-uploads/Manamind.png"
              alt="Manamind Logo"
              className="h-8 mx-auto"
            />
            <p className="text-xs text-white font-quattrocento">
              une solution originale designée par
            </p>
            <img
              src="/lovable-uploads/8a236523-7325-450e-af98-859d2716368d.png"
              alt="Mana Logo"
              className="h-8 mx-auto hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};