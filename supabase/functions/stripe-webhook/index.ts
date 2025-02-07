import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      Deno.env.get("STRIPE_WEBHOOK_SECRET") || ""
    );

    console.log("Processing event:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const customerId = session.customer;
        const subscriptionId = session.subscription;

        console.log("Customer ID:", customerId);
        console.log("Subscription ID:", subscriptionId);

        if (customerId && subscriptionId) {
          // Récupération des infos du client Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const customer = await stripe.customers.retrieve(customerId as string);
          
          if (!customer || !("email" in customer)) {
            console.error("Customer email not found.");
            return new Response(JSON.stringify({ error: "Customer email missing" }), { status: 400 });
          }

          console.log("Customer Email:", customer.email);

          // Mise à jour du statut dans Supabase
          const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .update({
              "Statut de l'abonnement": "active",
              "Date de reconduction de l'abonnement": new Date(
                subscription.current_period_end * 1000
              ).toISOString(),
            })
            .eq("email", customer.email)
            .select();

          if (profileError) {
            console.error("Error updating profile:", profileError);
            return new Response(
              JSON.stringify({ error: "Failed to update profile" }),
              { status: 500 }
            );
          }

          console.log("Profile updated successfully:", profiles);

          // Vérification que l'utilisateur a bien été mis à jour
          if (!profiles || profiles.length === 0) {
            console.error("No user profile found after update.");
            return new Response(
              JSON.stringify({ error: "No profile found" }),
              { status: 404 }
            );
          }

          const user = profiles[0];

          console.log("Sending welcome email to:", user.email);

          // Envoi de l'email de bienvenue
          const emailResponse = await fetch(
            `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-welcome-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
              },
              body: JSON.stringify({
                firstName: user.Prenom,
                email: user.email,
              }),
            }
          );

          if (!emailResponse.ok) {
            console.error("Error sending welcome email:", await emailResponse.text());
          } else {
            console.log("Welcome email sent successfully.");
          }

          // Notification à l'admin
          console.log("Notifying admin...");
          const adminResponse = await fetch(
            `${Deno.env.get("SUPABASE_URL")}/functions/v1/notify-admin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
              },
              body: JSON.stringify({
                firstName: user.Prenom,
                lastName: user.Nom,
                email: user.email,
                plan: user["Plan choisi"],
                numberOfCourses: user["Nombre de parcours"],
                accountType: user["Type de compte"],
              }),
            }
          );

          if (!adminResponse.ok) {
            console.error("Error notifying admin:", await adminResponse.text());
          } else {
            console.log("Admin notified successfully.");
          }
        }
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object;
        const updatedCustomer = await stripe.customers.retrieve(
          updatedSubscription.customer as string
        );

        if ("email" in updatedCustomer) {
          await supabase
            .from("profiles")
            .update({
              "Date de reconduction de l'abonnement": new Date(
                updatedSubscription.current_period_end * 1000
              ).toISOString(),
            })
            .eq("email", updatedCustomer.email);
        }
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object;
        const deletedCustomer = await stripe.customers.retrieve(
          deletedSubscription.customer as string
        );

        if ("email" in deletedCustomer) {
          await supabase
            .from("profiles")
            .update({
              "Statut de l'abonnement": "inactive",
              "Date de reconduction de l'abonnement": null,
            })
            .eq("email", deletedCustomer.email);
        }
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
});