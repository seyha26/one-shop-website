import React, { useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  inconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Poppins",
      fontSize: "16px",
      fontSmoothing: "antialiased",
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = async () => {
  const [success, setSeccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  if (!error) {
    try {
      const { id } = paymentMethod;
      const response = await axios.post("http://localhost:4000/payment", {
        amount: 1000,
        id,
      });

      if (response.data.success) {
        // console.log("Successful payment");
        setSeccess(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  } else {
    console.log(error.message);
  }

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
        </form>
      ) : (
        <div>
          <h1>
            You just bought a sweet spatula congrats this is the best dicision
            of your life.
          </h1>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
