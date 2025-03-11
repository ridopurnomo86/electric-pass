import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { TransactionLoader } from "services/main/settings/transaction";
import Mainlayout from "~/components/layout/MainLayout";
import TransactionPage from "~/pages/Settings/Transaction";

export const meta: MetaFunction = () => [{ title: "Transaction" }];

export const loader = async (params: LoaderFunctionArgs) => await TransactionLoader(params);

const Transaction = () => (
  <Mainlayout>
    <TransactionPage />
  </Mainlayout>
);

export default Transaction;
