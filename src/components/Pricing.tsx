import { PricingCard } from "./PricingCard";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Switch } from "./ui/switch";
import { useState, useEffect, useRef } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const getEssentialPaymentLink = (courses: number, isAnnual: boolean) => {
  const linkMap = {
    1: { monthly: "https://buy.stripe.com/dR64hv4wo0bm5444gu", yearly: "https://buy.stripe.com/14kdS5gf6e2c8gg7sB" },
    2: { monthly: "https://buy.stripe.com/3cseW96Ew8HS400007", yearly: "https://buy.stripe.com/4gw7tHfb26zKeEE9AK" },
    3: { monthly: "https://buy.stripe.com/7sIeW91kc3nyeEE7sy", yearly: "https://buy.stripe.com/3csaFT1kcbU47cc28j" },
    4: { monthly: "https://buy.stripe.com/fZe8xL6Ew6zK6887sx", yearly: "https://buy.stripe.com/28og0de6Ye2cfII9AM" },
    5: { monthly: "https://buy.stripe.com/bIYdS51kc0bm8ggaEI", yearly: "https://buy.stripe.com/dR615jbYQ3ny5446oB" },
  };
  return linkMap[courses]?.[isAnnual ? "yearly" : "monthly"];
};

const getProfessionalPaymentLink = (isAnnual: boolean) => {
  return isAnnual
    ? "https://buy.stripe.com/cN229naUM0bmcwweUW"
    : "https://buy.stripe.com/dR615j5Ase2c544fZ1";
};

export const Pricing = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);
  const [essentialCourses, setEssentialCourses] = useState([1]);
  const [isLoading, setIsLoading] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [featuresTopOffset, setFeaturesTopOffset] = useState<number | null>(null);

  useEffect(() => {
    if (featuresRef.current) {
      setFeaturesTopOffset(featuresRef.current.offsetTop);
    }
  }, [featuresRef.current, essentialCourses]);

  const handleSubscribe = async (plan: string) => {
    console.log('Handling subscription for plan:', plan);
    setIsLoading(true);

    try {
      if (plan === "Institution") {
        window.open("https://calendar.app.google/8PzSHhTa8sLE9XWf7", "_blank");
        setIsLoading(false);
        return;
      }

      if (plan === "Starter") {
        navigate("/create-account", {
          state: {
            selectedPlan: plan,
            numberOfCourses: 1,
            isAnnual: isAnnual,
          },
        });
        return;
      }

      // Get the appropriate payment link based on the plan
      const paymentLink = plan === "Essential" 
        ? getEssentialPaymentLink(essentialCourses[0], isAnnual)
        : getProfessionalPaymentLink(isAnnual);

      if (!paymentLink) {
        console.error('No payment link found for plan:', plan);
        toast({
          title: "Erreur de redirection",
          description: "Impossible de récupérer le lien de paiement.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Redirect to create account page with all necessary information
      navigate("/create-account", {
        state: {
          selectedPlan: plan,
          numberOfCourses: plan === "Essential" ? essentialCourses[0] : 15,
          isAnnual: isAnnual,
          paymentLink: paymentLink,
        },
      });

    } catch (error) {
      console.error('Error in subscription process:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const getPriceDisplay = (monthlyPrice: string, title: string) => {
    if (monthlyPrice === "Modulable" || monthlyPrice === "0 €") return monthlyPrice;
    const numericPrice = parseInt(monthlyPrice);
    if (isNaN(numericPrice)) return monthlyPrice;

    let price = numericPrice;

    if (title === "Essential") {
      price = numericPrice * essentialCourses[0];
    }

    if (isAnnual) {
      price = price * 12 * 0.9;
    }

    return `${price} € / ${isAnnual ? "an" : "mois"}${!isAnnual && title === "Essential" ? " / parcours" : ""}`;
  };

  const basePricingData = [
    {
      title: "Starter",
      monthlyPrice: "0 €",
      description: "Solution idéale pour une prise en main intuitive et rapide de l'outil.",
      features: [
        { text: "1 parcours", included: true },
        { text: "Jusqu'à 50 participants", included: true },
        { text: "Toutes les fonctionnalités d'édition et d'exécution", included: true },
        { text: "Centre de ressources générique", included: true },
        { text: "Assistance standard", included: true },
      ],
      buttonText: "J'essaye gratuitement",
    },
    {
      title: "Essential",
      monthlyPrice: "10 €",
      description: "Solution pour enseignants et équipes pédagogiques",
      features: [
        { text: "Jusqu'à 5 parcours simultanés", included: true },
        { text: "Jusqu'à 80 participants par parcours", included: true },
        { text: "Toutes les fonctionnalités d'édition et d'exécution", included: true },
        { text: "Centre de ressources générique", included: true },
        { text: "Tableaux de bord de reporting et de pilotage", included: true },
        { text: "Assistance prioritaire", included: true },
      ],
      buttonText: isLoading ? "Redirection en cours..." : "Je m'abonne",
      paymentLink: getEssentialPaymentLink(essentialCourses[0], isAnnual),
    },
    {
      title: "Professional",
      monthlyPrice: "130 €",
      description: "Idéal pour animer des programmes/départements.",
      features: [
        { text: "Jusqu'à 15 parcours simultanés", included: true },
        { text: "Jusqu'à 150 participants par parcours", included: true },
        { text: "Toutes les fonctionnalités d'édition, d'execution et d'administration ", included: true },
        { text: "Centre de ressources générique", included: true },
        { text: "Tableaux de bord de reporting et de pilotage consolidés", included: true },
        { text: "IA pour le design de parcours", included: true },
        { text: "Export des données, parfait pour l'auditabilité", included: true },
        { text: "Assistance prioritaire", included: true },
      ],
      buttonText: isLoading ? "Redirection en cours..." : "Je m'abonne",
      popular: true,
      paymentLink: getProfessionalPaymentLink(isAnnual),
    },
    {
      title: "Institution",
      monthlyPrice: "Sur demande",
      description: "Solution 100% sur mesure pour une institution.",
      features: [
        { text: "100% modulable", included: true },
        { text: "Fonctionnalités d'édition, d'execution et d'administration personnalisables", included: true },
        { text: "Centre de ressources personnalisable", included: true },
        { text: "Tableaux de bord de reporting et de pilotage consolidés", included: true },
        { text: "IA pour le design de parcours", included: true },
        { text: "Intégration Learning Management System (LMS)", included: true },
        { text: "Export des données, parfait pour l'auditabilité", included: true },
        { text: "Assistance spécialisée avec un chef de projet dédié", included: true },
      ],
      buttonText: "Je prends rendez-vous",
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0c3d5e]">
          Découvrez nos offres d'abonnements
        </h2>
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="pricing-toggle" className={!isAnnual ? "font-bold" : ""}>
            Mensuel
          </Label>
          <Switch id="pricing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="pricing-toggle" className={isAnnual ? "font-bold" : ""}>
            Annuel (-10%)
          </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {basePricingData.map((plan, index) => (
            <div
              className="h-full flex flex-col"
              key={index}
              style={{
                minHeight: `${featuresTopOffset}px`,
              }}
            >
              <PricingCard
                {...plan}
                price={getPriceDisplay(plan.monthlyPrice, plan.title)}
                onSubscribe={() => handleSubscribe(plan.title)}
                isLoading={isLoading}
              >
                {plan.title === "Essential" && (
                  <div ref={featuresRef} className="flex flex-col items-center mb-6">
                    <span className="text-[#0c3d5e] font-semibold mb-2">
                      {essentialCourses[0]} parcours
                    </span>
                    <Label className="text-sm text-gray-600 mb-2">
                      Choisis ton nombre de parcours
                    </Label>
                    <Slider
                      value={essentialCourses}
                      onValueChange={setEssentialCourses}
                      max={5}
                      min={1}
                      step={1}
                      className="w-3/4"
                    />
                  </div>
                )}
              </PricingCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
