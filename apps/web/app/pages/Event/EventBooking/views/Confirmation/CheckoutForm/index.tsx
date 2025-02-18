import { useSubmit } from "@remix-run/react";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import CircularLoading from "~/components/core/CircularLoading";
import { Button } from "~/components/ui/Button";
import { useToast } from "~/components/ui/Toaster/useToast";
import stripePromise from "~/config/stripe";
import { EventPlanDataType } from "~/data/test-data/types";
import useHttpRequest from "~/hooks/useHttpRequest";
import formatPrice from "~/modules/formatPrice";
import useEventBooking from "../../../useEventBooking";

type CheckoutFormPropsType = {
  amount: number;
  billingData: {
    first_name: string;
    last_name: string;
    email: string;
    dialing_code: string;
    phone_number: string;
  };
  selectedPlans: {
    [key: number]: EventPlanDataType;
  };
};

const Form = ({
  amount,
  selectedPlans,
}: {
  amount: number;
  selectedPlans: CheckoutFormPropsType["selectedPlans"];
}) => {
  const submit = useSubmit();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();

  const { handleOrder, isRequestOrder } = useEventBooking();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const formData = new FormData();

    const orders = Object.keys(selectedPlans).map((plan) => ({
      id: selectedPlans[Number(plan)].id,
      total_order: Number(selectedPlans[Number(plan)].order?.total_order),
    }));

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/order/success`,
      },
    });

    if (result.error || !result)
      return toast({
        title: "Warning",
        description: result.error?.message ? result.error?.message : "A processing error occurred.",
        variant: "destructive",
      });

    const transactionStatus =
      result.paymentIntent.status === "succeeded" ? "SUCCEEDED" : "INCOMPLETE";

    await handleOrder({
      paymentMethod: "card",
      totalPrice: amount,
      orders,
      status: transactionStatus,
    });

    // Need put value inside LocalStorage, for order/success page
    formData.append("transaction_type", transactionStatus);

    submit(formData, { method: "POST" });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <form onSubmit={handleSubmit as any}>
      <PaymentElement />
      <Button disabled={!stripe || isRequestOrder} className="mt-4 w-full">
        Pay {formatPrice(amount)}
      </Button>
    </form>
  );
};

const CheckoutForm = ({ amount, billingData, selectedPlans }: CheckoutFormPropsType) => {
  const elementRef = useRef(null);
  const [paymentIntent, setPaymentIntent] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  const { request } = useHttpRequest({
    path: "/payment/intent",
    body: {
      amount,
      costumer: billingData,
    },
    method: "POST",
  });

  const fetch = async () => {
    const { data } = await request();

    if (data?.type === "success") {
      setIsLoading(false);
      setPaymentIntent(data.data);
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <CircularLoading />;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
      <div ref={elementRef}>
        <ExpressCheckoutElement onReady={() => setIsLoading(false)} onConfirm={() => {}} />
        <div className="my-4"></div>
        <Form amount={amount} selectedPlans={selectedPlans} />
      </div>
    </Elements>
  );
};

export default CheckoutForm;
