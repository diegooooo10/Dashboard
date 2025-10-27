import { useSettingsStore } from "../../store";
import type { TypeThemes } from "../../types";
import { IconPalette } from "../Icons";
const themes: TypeThemes[] = ["system", "dark", "light"];
export const Apparence = () => {
  const {
    changeTheme,
    settings: { theme },
  } = useSettingsStore();
  return (
    <section className="card p-5">
      <h3 className="font-bold text-lg flex items-center gap-2 ">
        <IconPalette />
        Apparence
      </h3>
      <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
        Customize how the application looks
      </p>

      <div className="flex flex-col gap-2 text-text dark:text-text-dark">
        <label htmlFor="theme" className="font-semibold">
          Theme
        </label>
        <select
          className="px-2 py-1 flex items-center rounded-md h-8 w-32 outline-1 outline-border dark:outline-border-dark dark:focus:outline-primary-dark  focus:outline-primary cursor-pointer"
          id="theme"
          value={theme}
          onChange={(e) => {
            const value = e.target.value as TypeThemes;
            if (themes.includes(value)) {
              changeTheme(value);
            }
          }}
        >
          {themes.map((theme, idx) => (
            <option
              value={theme}
              className="cursor-pointer bg-bg dark:bg-bg-dark"
              key={idx}
            >
              {`${theme.charAt(0).toUpperCase()}${theme.slice(1)} `}
            </option>
          ))}
        </select>
        <span className="text-text-secondary dark:text-text-secondary-dark text-sm">
          Choose your preferred color scheme
        </span>
      </div>
    </section>
  );
};
