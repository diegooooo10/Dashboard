import { Apparence } from "./Apparence";
import { DangerZone } from "./DangerZone";
import { Notificactions } from "./Notificactions";
import { Security } from "./Security";

export const Settings = () => {
  return (
    <article className="mt-[5.05rem] py-3 px-6 text-text dark:text-text-dark">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Settings</h2>
        <p className="text-text-secondary dark:text-text-secondary-dark y md:text-base text-sm">
          Manage your application preferences and security
        </p>
      </header>
      <section className="grid gap-5">
        <Notificactions />
        <Security />
        <Apparence />
        <DangerZone />
      </section>
    </article>
  );
};
