import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#71c088]/10 to-[#0c3d5e]/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 flex justify-center"
        >
          <PartyPopper className="w-20 h-20 text-[#71c088]" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-6"
        >
          Félicitations et bienvenue dans la communauté Manamind ! 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg leading-relaxed"
        >
          Votre compte sera paramétré dans les 24 heures ouvrées. Vous allez recevoir un email contenant le lien pour accéder à votre espace et débuter l'expérience Manamind.
        </motion.p>
      </motion.div>
    </div>
  );
};