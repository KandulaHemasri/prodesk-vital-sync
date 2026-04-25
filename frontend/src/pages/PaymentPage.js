
import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { createCheckoutSession } from "../services/paymentService";

const PaymentPage = () => {
  const location = useLocation();

  const { doctorName, date, time } = location.state || {};

  const handlePayment = async () => {
    try {
      const session = await createCheckoutSession(
        doctorName,
        date,
        time
      );

      console.log("SESSION:", session);

      if (session?.url) {
        window.location.href = session.url;
      } else if (session?.id) {
        // fallback (rare)
        window.location.href = `https://api.stripe.com/pay/${session.id}`;
      } else {
        throw new Error("No session returned");
      }

    } catch (err) {
      console.log(err);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="payment-container">
      <h2>Confirm Payment</h2>

      <div className="card">
        <h3>{doctorName}</h3>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Amount: ₹500</p>
      </div>

      <button onClick={handlePayment} className="pay-btn">
        Proceed to Pay 💳
      </button>
    </div>
  );
};

export default PaymentPage;