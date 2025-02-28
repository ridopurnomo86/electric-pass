import TransactionCard from "~/components/cards/TransactionCard";
import { useLoaderData } from "@remix-run/react";
import { TransactionLoader } from "services/main/settings/transaction";
import { Skeleton } from "~/components/ui/Skeleton";
import ProfileLayout from "../components/Layout";

type OrderDataType = {
  id: number;
  event: {
    country: string;
    name: string;
    start_date: string;
  };
  transaction: {
    stripe_id: string;
    payment_method: string;
    status: "SUCCEEDED" | "INCOMPLETE";
    order_date: string;
  };
  plans: Array<{ amount: number; name: string; id: number }>;
};

const EmptyTransaction = () => (
  <div className="mt-10 flex flex-col items-center justify-center px-6 py-4 text-center">
    <div className="mx-4 mb-4 flex w-full rounded border bg-white p-4 md:w-[300px]">
      <Skeleton className="size-10 rounded" />
      <div className="ml-2">
        <Skeleton className="mb-1 h-[10px] w-[100px] rounded" />
        <Skeleton className="h-[12px] w-[60px] rounded" />
      </div>
    </div>
    <div className="mx-4 mb-4 flex w-full rounded border bg-white p-4 md:w-[300px]">
      <Skeleton className="size-10 rounded" />
      <div className="ml-2">
        <Skeleton className="mb-1 h-[10px] w-[100px] rounded" />
        <Skeleton className="h-[12px] w-[60px] rounded" />
      </div>
    </div>
    <p className="text-sm font-medium tracking-tight text-neutral-900">No Transaction</p>
    <p className="mt-1 text-sm font-medium tracking-tight text-neutral-500">
      Hang tight! We&apos;ve still hooking up your userbase.<br></br>
      Please check back in a few minutes.
    </p>
  </div>
);

const Transaction = () => {
  const { orders } = useLoaderData<typeof TransactionLoader>();

  return (
    <ProfileLayout resolve={orders}>
      <section>
        <div className="mb-4 border-b pb-4">
          <p className="text-xl font-semibold tracking-tight text-neutral-900">Transaction</p>
          <p className="text-sm font-medium text-neutral-500">
            Manage your recent transaction orders and invoices
          </p>
        </div>
        {orders.length > 0 ? (
          <div className="grid grid-cols-none gap-4 md:grid-cols-2">
            {orders.map((order: OrderDataType) => (
              <TransactionCard
                key={order.id}
                onClickDetail={() => {}}
                country={order.event.country}
                eventName={order.event.name}
                eventStartDate={order.event.start_date}
                orderId={order.transaction.stripe_id}
                paymentMethod={order.transaction.payment_method}
                paymentStatus={order.transaction.status === "SUCCEEDED" ? "success" : "failed"}
                plans={order.plans}
                orderDate={order.transaction.order_date}
              />
            ))}
          </div>
        ) : (
          <EmptyTransaction />
        )}
      </section>
    </ProfileLayout>
  );
};

export default Transaction;
