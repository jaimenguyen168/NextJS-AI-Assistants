import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Checkout from "@/app/(main)/workspace/_components/Checkout";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const SUBSCRIPTION_AMOUNT = 9.99;

const UserDetails = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user } = useContext(AuthContext);
  const hasOrderId = user?.orderId;
  const userCredits = user?.credits;
  const userTokens = user?.tokens;
  const creditProgress = (userTokens / userCredits) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Image
          src={user?.profileImage}
          alt="profile image"
          width={100}
          height={100}
          className="size-[60px] rounded-full"
        />

        <div>
          <h2 className="font-bold">{user?.name}</h2>
          <h3 className="text-gray-500">{user?.email}</h3>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-semibold">Token Usage</h2>
          <h3>
            {userTokens && userTokens.toLocaleString()} /{" "}
            {userCredits && userCredits.toLocaleString()}
          </h3>
        </div>
        <Progress value={creditProgress} />

        <h2 className="flex justify-between items-center font-bold">
          Current Plan{" "}
          <span
            className={`px-3 font-normal py-1 rounded-lg text-gray-600 ${hasOrderId ? "bg-amber-200 font-semibold" : "bg-gray-200"}`}
          >
            {hasOrderId ? "Premium Plan" : "Free Plan"}
          </span>
        </h2>

        {hasOrderId ? (
          <div className="flex-col flex mt-2">
            <Button variant="secondary" className="w-full">
              Cancel Subscription
            </Button>
          </div>
        ) : (
          <div className="p-4 border rounded-2xl flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-lg">Premium Plan</h2>
                <h2>500,000 Tokens</h2>
              </div>

              <h2 className="font-bold text-lg">
                ${SUBSCRIPTION_AMOUNT}/month
              </h2>
            </div>

            <hr />

            <Elements
              stripe={stripePromise}
              options={{
                mode: "subscription",
                amount: convertToSubcurrency(SUBSCRIPTION_AMOUNT),
                currency: "usd",
              }}
            >
              <Checkout amount={SUBSCRIPTION_AMOUNT} onSuccess={onSuccess} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
