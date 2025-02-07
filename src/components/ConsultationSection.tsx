import { Button } from "./ui/button";

export const ConsultationSection = () => {
  return (
    <section
      id="help-offer"
      className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 md:gap-12">
        {/* Image à droite avec style */}
        <div className="flex-shrink-0 relative">
          <div className="rounded-full bg-gradient-to-tr from-[#71c088] via-[#5ea374] to-[#4d9365] w-48 h-48 md:w-56 md:h-56 flex items-center justify-center shadow-lg">
            <img
              src="/lovable-uploads/i44.JPG"
              alt="Yanis from Manamind"
              className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Contenu textuel à gauche */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            Besoin d'aide pour choisir votre offre ?
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Hello, c'est Yanis, votre interlocuteur chez{" "}
            <span className="text-[#71c088] font-semibold">Mana</span>. Discutons pour répondre à vos questions, explorer vos besoins et vous aider à choisir l'offre idéale. Prenons rendez-vous, c’est rapide, gratuit et sans aucun doute ManamindBlowing !
          </p>
          <div>
            <Button
              size="lg"
              className="bg-[#71c088] hover:bg-[#5ea374] text-white px-6 py-3 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
              onClick={() =>
                window.open("https://calendar.app.google/8PzSHhTa8sLE9XWf7", "_blank")
              }
            >
              Je réserve un rendez-vous
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};