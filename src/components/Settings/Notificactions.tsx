import React from "react";
import { IconNotification } from "../Icons";
import { useSettingsStore } from "../../store";
import { Checkbox } from "./Checkbox";
type Options = {
  title: string;
  information: string;
  fn: () => void;
  isChecked: boolean;
};

export const Notificactions = () => {
  const {
    changeStateEmailNotifications,
    changeStateMarketingNotifications,
    changeStatePushNotifications,
    settings,
  } = useSettingsStore();
  const options: Options[] = [
    {
      title: "Email Notifications",
      information: "Receive notifications via Email",
      fn: changeStateEmailNotifications,
      isChecked: settings.emailNotifications,
    },
    {
      title: "Push Notifications",
      information: "Receive push notifications in your browser",
      fn: changeStatePushNotifications,
      isChecked: settings.pushNotifications,
    },
    {
      title: "Marketing Email",
      information: "Receive promotional and marketing emails",
      fn: changeStateMarketingNotifications,
      isChecked: settings.marketingNotifications,
    },
  ];

  return (
    <section className="card p-5">
      <h3 className="font-bold text-lg flex items-center gap-2 ">
        <IconNotification /> Notifications
      </h3>
      <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
        Configure how you receive notifications
      </p>
      {options.map((option, idx) => (
        <React.Fragment key={idx}>
          <div className="grid grid-cols-[1fr_auto] gap-2 my-4">
            <div>
              <h4 className="font-semibold">{option.title}</h4>
              <p className="text-text-secondary dark:text-text-secondary-dark text-sm">
                {option.information}
              </p>
            </div>
            <Checkbox
              id={option.title}
              isChecked={option.isChecked}
              onChange={option.fn}
              className="place-self-center"
            />
          </div>
          {idx < options.length - 1 && (
            <hr className="border-divider dark:border-divider-dark border-[1px]" />
          )}
        </React.Fragment>
      ))}
    </section>
  );
};
