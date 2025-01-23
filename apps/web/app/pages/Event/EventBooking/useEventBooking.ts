import { useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { useToast } from "~/components/ui/Toaster/useToast";
import { EventPlanDataType } from "~/data/test-data/types";
import useHttpRequest from "~/hooks/useHttpRequest";

const useEventBooking = () => {
  const { user } = useOutletContext<{ user: { name: string; id: string } }>();

  const { toast } = useToast();

  const [step, setStep] = useState<"ticket" | "billing" | "confirmation">("ticket");

  const [selectedPlans, setSelectedPlans] = useState<{ [key: string]: EventPlanDataType }>({});

  const subTotalPrice =
    selectedPlans &&
    Object.keys(selectedPlans)
      .map((item) => Number(selectedPlans[item].order?.total_price))
      .reduce((accumulator, current) => accumulator + current, 0);

  const totalOrder =
    selectedPlans &&
    Object.keys(selectedPlans)
      .map((item) => Number(selectedPlans[item].order?.total_order))
      .reduce((accumulator, current) => accumulator + current, 0);

  const totalFees = 0;

  const onSelectedPlans = (item: EventPlanDataType) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        order: {
          total_order: Number(prev[item.id]?.order?.total_order)
            ? Number(prev[item.id]?.order?.total_order) + 1
            : 1,
          total_price: Number(prev[item.id]?.order?.total_price)
            ? Number(prev[item.id]?.order?.total_price) + Number(prev[item.id]?.order?.total_price)
            : Number(item.price),
        },
      },
    }));
  };

  const onRemovePlans = (item: EventPlanDataType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [item.id]: tmp, ...rest } = selectedPlans;
    setSelectedPlans(rest);
  };

  const { request: requestAmount, isLoading: isRequestAmount } = useHttpRequest({
    path: "/payment/amount",
    method: "POST",
    body: {
      payment_method: "card",
      user_id: user.id,
      orders: Object.keys(selectedPlans).map((plan) => ({
        id: selectedPlans[plan].id,
        total_order: selectedPlans[plan].order?.total_order,
      })),
    },
  });

  const handleTicket = async () => {
    const { data, error } = await requestAmount();

    if (error)
      return toast({
        title: "Warning",
        description: error.message,
        variant: "destructive",
      });

    if (data.data.total_price === subTotalPrice) return setStep("billing");

    return toast({
      title: "Warning",
      description: "Something gone wrong",
      variant: "destructive",
    });
  };

  return {
    selectedPlans,
    subTotalPrice,
    totalFees,
    onSelectedPlans,
    onRemovePlans,
    totalOrder,
    step,
    onStep: setStep,
    handleTicket,
    isRequestLoading: isRequestAmount,
  };
};

export default useEventBooking;
