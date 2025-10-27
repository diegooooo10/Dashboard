import { useState } from "react";
import type { Rol, UserConfiguration } from "../../types";
import { ImageProfile } from "../Common";
import { changeUserRol } from "../../services";
import { showToast } from "../ShowToast";
type UserCardProps = {
  user: UserConfiguration;
};
export const UserCard = ({ user }: UserCardProps) => {
  const [currentUser, setCurrentUser] = useState<Rol>(user.rol);
  const roles: Rol[] = ["manager", "user"];

  const changeRol = async (value: string) => {
    const newRol = value as Rol;
    if (roles.includes(newRol) && user.id && newRol !== "admin") {
      setCurrentUser(newRol);
      const message = await changeUserRol(newRol, user.id);
      showToast(message);
    }
  };
  return (
    <div className="card grid gap-2 p-4 w-full place-items-center">
      <header className="flex  flex-col items-center gap-1 pointer-events-none">
        <ImageProfile
          fullName={user.fullName}
          src={user.imageProfile.toString()}
          className="h-14 w-14 rounded-full"
        />
        <h3 className="text-lg font-semibold">{user.fullName}</h3>
      </header>

      <section className="flex flex-col gap-1 text-sm text-center text-text-secondary dark:text-text-secondary-dark">
        <p>{user.email}</p>
        <p>{user.phoneNumber}</p>
      </section>
      <label htmlFor="rol" aria-label="change rol" className="w-full">
        <select
          name="rol"
          id="rol"
          value={currentUser}
          onChange={(e) => changeRol(e.target.value.trim().toLowerCase())}
          className="outline px-3 rounded-md h-8 bg-bg-card dark:bg-bg-card-dark text-text dark:text-text-dark outline-border dark:outline-border-dark focus:outline-primary dark:focus:outline-primary-dark w-full"
        >
          {roles.map((rol) => (
            <option value={rol} key={rol}>
              {rol}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
