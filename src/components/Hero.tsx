import { Button } from "./ui/button";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  const handleNavigation = (target: string) => {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden"
    >
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/lovable-uploads/lavideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Superposition pour l'effet de fondu */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-1"></div>

      {/* Logo */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10">
        <img
          src="/lovable-uploads/Manamind.png"
          alt="Manamind Logo"
          className="mx-auto w-[30rem]"
        />
      </div>

      {/* Texte central */}
      <div className="flex-1 flex items-center justify-center mt-48">
        <div className="max-w-3xl mx-auto text-center space-y-8 z-10">
          <h1 className="text-2xl md:text-3xl text-white/90 mb-4"></h1>
          <div className="text-3xl md:text-4xl text-white/90 leading-relaxed font-telegraph">
            <span>Des parcours d'apprentissage interactifs pour des </span>
            <span style={{ display: "inline-block", minHeight: "1.2em" }}>
              <TypeAnimation
                sequence={[
                  "expériences engageantes.",
                  1000, // Temps avant le passage au texte suivant
                  "compétences boostées.",
                  1000,
                  "projets mémorables.",
                  1000,
                  "formations impactantes.",
                  1000,
                ]}
                wrapper="span"
                speed={60} // Vitesse de saisie
                className="font-bold"
                style={{ color: "#71c088" }}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Bouton CTA */}
      <div className="w-full flex justify-center pb-12">
        <Button
          onClick={() => handleNavigation("about")}
          size="lg"
          className="bg-[#71c088] text-white hover:bg-[#5a9a6e] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 h-auto font-telegraph font-bold z-10"
        >
          À propos de Manamind
        </Button>
      </div>
    </section>
  );
};