import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { appointmentId, doctorName, date, time } = req.body;

    if (!appointmentId || !doctorName || !date || !time) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    if (!process.env.CLIENT_URL || !process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: "ENV missing (CLIENT_URL or STRIPE_SECRET_KEY)" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Doctor Appointment - ${doctorName}`,
              description: `Appointment on ${date} at ${time}`,
            },
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_URL}/success?appointmentId=${appointmentId}`,
      cancel_url: `${process.env.CLIENT_URL}/appointments?cancel=true`,
    });

    console.log("STRIPE SESSION:", session);

    return res.status(200).json({
      id: session.id,
      url: session.url, 
    });

  } catch (err) {
    console.error("Stripe Error FULL:", err);
    return res.status(500).json({ message: err.message });
  }
};