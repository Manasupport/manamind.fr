import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

if (!RESEND_API_KEY) {
  console.error("⚠️ ERROR: RESEND_API_KEY is not set.");
}

const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  numberOfCourses: number;
  plan: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("📩 Starting welcome email handler");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📥 Parsing request body...");
    const { firstName, lastName, email, accountType, numberOfCourses, plan }: WelcomeEmailRequest = await req.json();
    console.log("✅ Received request data:", { firstName, lastName, email, accountType, numberOfCourses, plan });

    if (!firstName || !lastName || !email || !accountType) {
      console.error("❌ ERROR: Missing required fields");
      throw new Error("All fields are required");
    }

    console.log("✉️ Sending email via Resend...");
    const emailResponse = await resend.emails.send({
      from: "Manamind <no-reply@manamind.fr>", // Assurez-vous que ce domaine est validé sur Resend
      to: [email],
      subject: "🚀 Bienvenue sur Manamind – Votre compte est en cours de paramétrage !",
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenue sur Manamind</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
          
          <table align="center" width="100%" style="max-width: 600px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            
            <!-- LOGO -->
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src=/"lovable-uploads/212l.png" alt="Manamind Logo" width="150" style="display: block;">
              </td>
            </tr>

            <!-- TITRE -->
            <tr>
              <td align="center" style="color: #0c3d5e; font-size: 24px; font-weight: bold; padding-bottom: 10px;">
                Bienvenue sur Manamind, ${firstName} !
              </td>
            </tr>

            <!-- TEXTE INTRODUCTION -->
            <tr>
              <td align="center" style="color: #333; font-size: 16px; line-height: 1.6; padding: 0 20px;">
                🎉 Félicitations ! Nous sommes ravis de vous compter parmi les Manaminders !  
                Avec Manamind, vous allez pouvoir <strong>créer et animer des parcours d’apprentissage engageants et sur mesure.</strong>
              </td>
            </tr>

            <!-- INFO COMPTE -->
            <tr>
              <td style="padding: 20px; background-color: #f9f9f9; border-radius: 8px; margin: 20px;">
                <p style="color: #0c3d5e; font-size: 18px; font-weight: bold;">🛠️ Paramétrage en cours...</p>
                <p style="color: #333; font-size: 14px;">Si vous avez finalisé votre paiement, votre compte est en cours de configuration et sera paramétré sous 24 heures ouvrées. Vous recevrez un email contenant votre lien d'accès pour débuter votre expérience Manamind.</p>
              </td>
            </tr>

            <!-- CENTRE DE RESSOURCES -->
            <tr>
              <td align="center" style="padding: 20px;">
                <a href="https://manamind.notion.site/c9d8acd29d8f464e9cbf786d4ab6fb95?v=aa38325d3c854f74b277cf850267d4a7&pvs=74" 
                   style="background-color: #71c088; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 16px; display: inline-block;">
                  📚 Découvrir le Centre de Ressources
                </a>
              </td>
            </tr>

            <!-- CONTACT -->
            <tr>
              <td align="center" style="padding: 20px 0; font-size: 14px; color: #666;">
                Besoin d’aide ? Contactez-nous à 
                <a href="mailto:contact@mana.fr" style="color: #71c088; text-decoration: none;">contact@mana.fr</a>.
              </td>
            </tr>

            <!-- SIGNATURE -->
            <tr>
              <td align="center" style="padding-top: 10px; font-size: 14px; color: #333;">
                🔹 Merci pour votre confiance, et bienvenue dans l’univers Manamind !  
                <br><strong>L’équipe Manamind</strong>
              </td>
            </tr>

          </table>
        </body>
        </html>
      `,
    });

    console.log("✅ Email sent successfully:", JSON.stringify(emailResponse, null, 2));

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ ERROR in send-welcome-email function:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
    });

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "An error occurred while sending the welcome email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);