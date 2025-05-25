import { useLoaderData } from "@remix-run/react";
import { TransactionLoader } from "services/main/settings/transaction";
import ProfileLayout from "../../components/Layout";
import { DataTable } from "./DataTable";
import { columns } from "./DataTable/columns";
import SectionCard from "./SectionCard";

const OrganizerDashboard = () => {
  const { transactions } = useLoaderData<typeof TransactionLoader>();

  const totalRevenue =
    transactions.reduce(
      (accumulator: number, currentValue: { total_price: number }) =>
        accumulator + currentValue.total_price,
      0
    ) || 0;
  const totalSales = transactions.length;

  return (
    <ProfileLayout>
      <section>
        <div>
          <SectionCard totalRevenue={totalRevenue} totalSales={totalSales} />
          <DataTable data={transactions} columns={columns} />
        </div>
      </section>
    </ProfileLayout>
  );
};

export default OrganizerDashboard;
