import dayjs from "dayjs";
import TransactionCard from "~/components/cards/TransactionCard";
import ProfileLayout from "../components/Layout";

const Transaction = () => (
  <ProfileLayout>
    <section>
      <div className="mb-4 border-b pb-4">
        <p className="text-xl font-semibold tracking-tight text-neutral-900">Transaction</p>
        <p className="text-sm font-medium text-neutral-500">
          Manage your recent transaction orders and invoices
        </p>
      </div>
      <div className="grid grid-cols-none gap-4 md:grid-cols-2">
        <TransactionCard
          onClickDetail={() => {}}
          country="Indonesia"
          customerName="Cameron Diaz"
          eventName="Indonesia Blockchain"
          eventStartDate={dayjs().format()}
          orderId={100231}
          paymentMethod="Visa"
          paymentStatus="success"
          plans={[
            {
              id: 1,
              amount: 1,
              name: "Regular",
            },
            {
              id: 2,
              amount: 1,
              name: "Primary",
            },
          ]}
          orderDate={dayjs().format()}
        />
        <TransactionCard
          onClickDetail={() => {}}
          country="Indonesia"
          customerName="Cameron Diaz"
          eventName="Practical Blockchain"
          eventStartDate={dayjs().format()}
          orderId={110231}
          paymentMethod="Visa"
          paymentStatus="failed"
          plans={[{ id: 4, amount: 1, name: "Regular" }]}
          orderDate={dayjs().format()}
        />
      </div>
    </section>
  </ProfileLayout>
);

export default Transaction;
