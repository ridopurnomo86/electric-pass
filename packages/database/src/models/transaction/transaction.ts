import { db } from "../..";

const TransactionModel = {
  getTransaction: async ({ organizerId }: { organizerId: number }) => {
    const transactions = await db.order.findMany({
      where: {
        Event: {
          user_id: organizerId,
        },
      },
      include: {
        Event: {
          select: {
            name: true,
          },
        },
        Transaction: {
          select: {
            status: true,
            payment_method: true,
            stripe_id: true,
          },
        },
      },
    });

    return transactions.map((transaction) => ({
      id: transaction.id,
      total_price: transaction.total_price,
      event_name: transaction.Event.name,
      event_id: transaction.event_id,
      status: transaction.Transaction[0]?.status,
      payment_method: transaction.Transaction[0]?.payment_method,
      stripe_id: transaction.Transaction[0]?.stripe_id,
      order_date: transaction.created_at,
      updated_at: transaction.updated_at,
    }));
  },
};

export default TransactionModel;
