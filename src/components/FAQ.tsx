
import React from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";

export const FAQ = () => {
  const navigate = useNavigate();

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0c3d5e]">
          Questions fréquentes
        </h2>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Qu'est-ce que Manamind ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Manamind est un outil conçu pour concevoir et animer des parcours d'apprentissage, intégrant des compétences adaptées aux défis académiques et professionnels. Il combine les atouts d'un outil de gestion de projets et d'une plateforme LMS pour créer une expérience d'apprentissage unique.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Comment installer et configurer l'outil ?</span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-gray-600">
                  Manamind est une solution SaaS qui fonctionne directement en ligne sans installation. Des tutoriels sont disponibles pour la configuration, et nous proposons également des sessions de prise en main personnalisées.
                </p>
                <Button 
                  onClick={() => navigate("/#help-offer")} 
                  className="bg-[#71c088] hover:bg-[#5ea572] text-white"
                >
                  Je suis intéressé
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">À qui s'adresse Manamind ?</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-semibold mb-2">Académique :</h4>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Professeurs affiliés ➝ gestion des cours dans leur établissement</li>
                      <li>Professeurs vacataires ➝ gestion centralisée des cours</li>
                      <li>Directeurs de programme ➝ gestion des programmes académiques</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professionnel :</h4>
                    <p className="italic">Contenu à venir</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Existe-t-il une version gratuite ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Oui ! Manamind est gratuit jusqu'à 50 participants avec toutes les fonctionnalités essentielles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Le logiciel est-il en conformité avec le RGPD ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Oui, Manamind est conforme au RGPD en partenariat avec Trustem. Nos données sont hébergées sur des serveurs sécurisés en Europe.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Comment contacter l'assistance technique en cas de problème ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Par chat intégré directement sur la plateforme ou par email à support@manamind.fr. Notre équipe répond sous 24h.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Comment résilier mon abonnement Manamind ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Vous pouvez demander la résiliation directement depuis votre espace personnel sur la plateforme ou en contactant notre support. Une confirmation de désengagement vous sera envoyée par e-mail, et votre abonnement prendra fin à l'issue de la période en cours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg p-4 shadow-sm">
              <AccordionTrigger className="flex justify-between w-full">
                <span className="text-lg font-semibold text-left">Que deviennent mes données après la résiliation ?</span>
              </AccordionTrigger>
              <AccordionContent className="pt-4 text-gray-600">
                Vos données sont conservées temporairement dans une base archive sécurisée, conformément aux réglementations RGPD. Elles seront supprimées définitivement après un délai prédéfini (ex. 6 mois). Vous pouvez aussi demander une suppression immédiate via notre support.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
