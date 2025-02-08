import { MetaFunction } from "@remix-run/node";
import Mainlayout from "~/components/layout/MainLayout";
import TransactionPage from "~/pages/Settings/Transaction";

export const meta: MetaFunction = () => [{ title: "Transaction" }];

const Transaction = () => (
  <Mainlayout>
    <TransactionPage />
  </Mainlayout>
);

export default Transaction;
