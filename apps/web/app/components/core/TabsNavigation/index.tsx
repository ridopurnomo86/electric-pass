import { Button } from "~/components/ui/Button";

type TabsType = {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isDisabled?: boolean;
};

type TabsPropsType = {
  tabs: Array<TabsType>;
  className?: string;
  heightSize?: number;
  isUseIndex?: boolean;
};

const renderColorTabs = (isActive: boolean) =>
  isActive
    ? `border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500`
    : `border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300`;

const renderIndex = (isActive: boolean) =>
  isActive
    ? "mr-2 flex size-6 items-center justify-center rounded-full bg-blue-600 p-2 text-sm text-white"
    : "mr-2 flex size-6 items-center justify-center rounded-full bg-white p-2 border text-sm text-neutral-500";

const TabsNavigation = ({
  tabs = [],
  className,
  heightSize = 4,
  isUseIndex = false,
}: TabsPropsType) => (
  <div
    className={`border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400 ${className}`}
  >
    <nav>
      <ul className="-mb-px flex flex-wrap">
        {tabs.map((item, idx) => (
          <li className="me-2" key={item.id}>
            <Button
              variant="link"
              onClick={item.onClick}
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className={`rounded-t-lg border-b-2 px-4 ${heightSize ? `py-${heightSize}` : "py-4"} ${renderColorTabs(item.isActive)}`}
              aria-current="page"
              disabled={item.isDisabled}
            >
              {isUseIndex && <span className={renderIndex(item.isActive)}>{idx + 1}</span>}
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default TabsNavigation;
