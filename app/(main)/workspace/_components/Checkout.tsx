import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Loader2Icon, WalletCardsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";

const Checkout = ({
  email,
  amount,
  onSuccess,
}: {
  email: string;
  amount: number;
  onSuccess: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPaymentElement, setShowPaymentElement] = useState(false);

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        customerEmail: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleButtonClick = () => {
    setShowPaymentElement(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent?.status === "requires_action") {
      // Handle additional authentication (3D Secure, etc.)
      const { error: actionError } =
        await stripe.handleCardAction(clientSecret);

      if (actionError) {
        setErrorMessage(actionError.message);
      } else {
        onSuccess();
        toast.success("Payment successful!");
      }
    } else if (paymentIntent?.status === "succeeded") {
      onSuccess();
      toast.success("Payment successful!");
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center gap-4">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {showPaymentElement ? (
        <form onSubmit={handleSubmit}>
          {clientSecret && showPaymentElement && <PaymentElement />}

          {errorMessage && <div>{errorMessage}</div>}

          <Button
            className="w-full bg-amber-600 mt-4"
            disabled={!stripe || loading || !showPaymentElement}
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <WalletCardsIcon />
            )}
            <span className="font-bold">Submit</span>
          </Button>
        </form>
      ) : (
        <Button
          className="w-full bg-amber-600"
          onClick={handleButtonClick}
          disabled={!stripe || loading}
        >
          <WalletCardsIcon />
          <span className="font-bold">Upgrade for ${amount}/month</span>
        </Button>
      )}
    </>
  );
};
export default Checkout;
