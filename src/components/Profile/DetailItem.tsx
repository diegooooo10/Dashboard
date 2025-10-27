import type { ReactNode } from "react";

type DetailItem = {
  icon: ReactNode;
  title: string;
  info: string;
};
type DetailProfileProps = {
  detailItem: DetailItem;
};
export const DetailItem = ({ detailItem }: DetailProfileProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-10 p-2 flex items-center justify-center h-10">
        {detailItem.icon}
      </div>
      <div className="flex flex-col">
        <p className="text-text-secondary dark:text-text-secondary-dark ">
          {detailItem.title}
        </p>
        <p
          className={`font-bold text-sm ${
            detailItem.title === "Role" &&
            "bg-blue-100 dark:bg-blue-900 rounded-md text-center px-2 py-0.5"
          }`}
        >
          {detailItem.info}
        </p>
      </div>
    </div>
  );
};
