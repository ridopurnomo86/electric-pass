import { Button } from "~/components/ui/Button";
import formatPrice from "~/modules/formatPrice";

type BottomNavigationPropsType = {
  startedPrice: number;
  onBuyTicket: (e: React.FormEvent) => void;
  isLoading: boolean;
};

const BottomNavigation = ({
  startedPrice,
  onBuyTicket,
  isLoading = false,
}: BottomNavigationPropsType) => (
  <div className="fixed bottom-0 w-full min-[1024px]:hidden">
    <div className="flex w-full items-center justify-between bg-white px-6 py-4">
      <div>
        <p className="text-base font-medium text-neutral-600 antialiased">Prices start from</p>
        <p className="text-lg font-medium antialiased">
          {startedPrice > 0 ? formatPrice(startedPrice) : "Free"}
        </p>
      </div>
      <Button onClick={onBuyTicket} disabled={isLoading}>
        Buy Ticket
      </Button>
    </div>
  </div>
);

export default BottomNavigation;
