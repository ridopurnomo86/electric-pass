import { Icon } from "@iconify/react";
import Input from "~/components/core/Form/components/Input";
import { Control } from "react-hook-form";
import { CreateEventPriceValidationType } from "~/data/form-validation/CreateEventValidation";

type CardPlanPropsType = {
  control: Control<CreateEventPriceValidationType>;
  onCollapse: () => void;
  isCollapse: boolean;
  index: number;
};

const CardPlan = ({ control, onCollapse, isCollapse = true, index = 0 }: CardPlanPropsType) => (
  <div className="flex flex-col gap-4">
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center justify-between bg-neutral-50 p-4">
        <p className="text-base font-medium tracking-tight text-neutral-900">
          Pricing Plan {index}
        </p>
        <button className="rounded border bg-white p-1" onClick={onCollapse}>
          <Icon
            icon="material-symbols:chevron-right-rounded"
            className="rotate-90 text-neutral-600"
          />
        </button>
      </div>
      {isCollapse && (
        <div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="pricing_name"
                label="Pricing Name"
                name={`plans.${index}.pricing_name`}
                placeholder="Primary"
                description="Example:Regular, Premium, etc."
                control={control}
              />
              <Input
                id="description"
                label="Description"
                name={`plans.${index}.description`}
                placeholder=""
                description="Description about the plan, what benefit and more."
                control={control}
              />
            </div>
            <div className="flex">
              <Input
                id="price"
                label="Normal Sale"
                name={`plans.${index}.price`}
                type="number"
                description="Officially based price of plan. The currency is a dollar US."
                control={control}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default CardPlan;
