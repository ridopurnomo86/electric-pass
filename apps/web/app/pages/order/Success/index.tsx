/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoaderData } from "@remix-run/react";
import Mainlayout from "~/components/layout/MainLayout";
import InfoTransaction from "./InfoTransaction";
import PlanList from "./PlanList";
import Pricing from "./Pricing";

const OrderSuccess = () => {
  const { message } = useLoaderData<{ message: { [key: string]: string } }>() || {};

  const { paymentMethod, event, orders, transactionId, transactionDate, totalPrice, fees } =
    message as any;

  const totalItems = orders
    .map((order: any) => order.order.total_order)
    .reduce((accumulator: number, current: number) => accumulator + current, 0);

  const subTotal = totalPrice - fees;

  return (
    <Mainlayout hasHideNavigation>
      <main className="container mx-auto flex items-center justify-center py-8">
        <section className="w-full rounded-md border md:w-3/5">
          <div className="w-full">
            <InfoTransaction
              paymentMethod={paymentMethod}
              transactionDate={transactionDate}
              transactionId={transactionId}
            />
            <PlanList plans={orders} event={event} />
            <Pricing
              fees={fees}
              subTotal={subTotal}
              totalItems={totalItems}
              totalPrice={totalPrice}
            />
          </div>
        </section>
      </main>
    </Mainlayout>
  );
};

export default OrderSuccess;
