import { useAuthStore } from "../../store";
import { FormEditProfile } from "../Forms";
import { Details } from "./Details";
import { Activity } from "./Activity";
import { CircleLoader } from "../Loaders";

export const Profile = () => {
  const { userConfiguration, user } = useAuthStore();

  if (!userConfiguration.email && !user) return <CircleLoader />;

  return (
    <article className="mt-[5.05rem] py-3 px-6 text-text dark:text-text-dark">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Profile</h2>
        <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm">
          Manage your account information and preferences
        </p>
      </header>

      <section className="grid lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] gap-4">
        <FormEditProfile />
        <Details />
        <Activity />
      </section>
    </article>
  );
};
