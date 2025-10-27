import type { ReactNode } from "react";
import { IconCalendar, IconEmail, IconShield, IconUser } from "../Icons";
import { DetailItem } from "./DetailItem";
import { useAuthStore } from "../../store";
type AccountDetails = {
  icon: ReactNode;
  title: string;
  info: string;
};

export const Details = () => {
  const { userConfiguration, user } = useAuthStore();

  const details: AccountDetails[] = [
    {
      icon: <IconUser className="text-primary dark:text-blue-300" />,
      title: "User ID",
      info: user
        ? user.uid.slice(0, 5) + "*".repeat(user.uid.length - 5)
        : "N/A",
    },
    {
      icon: <IconShield className="text-primary dark:text-blue-300" />,
      title: "Role",
      info: userConfiguration.rol,
    },
    {
      icon: <IconEmail className="text-primary dark:text-blue-300" />,
      title: "Email",
      info: userConfiguration.email,
    },
    {
      icon: <IconCalendar className="text-primary dark:text-blue-300" />,
      title: "Member Since",
      info: user?.metadata.creationTime
        ? new Date(user.metadata.creationTime).toLocaleDateString("en-US")
        : "N/A",
    },
  ];
  return (
    <aside className="card p-5">
      <h3 className="font-bold text-lg">Account Details</h3>
      <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
        Your account information
      </p>
      <section className="flex flex-col gap-2">
        {details.map((detail) => (
          <DetailItem key={detail.title} detailItem={detail} />
        ))}
      </section>
    </aside>
  );
};
