import { useEffect, useState } from "react";
import { subscribeToUsers } from "../../services";
import type { UserConfiguration } from "../../types";
import { getFilteredUsers, handleFirebaseError } from "../../utils";
import { CircleLoader } from "../Loaders";
import { IconUser } from "../Icons";
import { UserCard } from "./UserCard";

export const Users = () => {
  const [users, setUsers] = useState<UserConfiguration[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserConfiguration[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = subscribeToUsers(
      (data) => {
        setUsers(data.filter((user) => user.rol !== "admin"));
        setIsLoading(false);
      },
      (error) => {
        setError(handleFirebaseError(error.code));
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserName(currentUserName);
    }, 400);
    return () => clearTimeout(timeout);
  }, [currentUserName]);

  useEffect(() => {
    setFilteredUsers(getFilteredUsers(users, userName));
  }, [users, userName]);

  return (
    <article className="mt-[5.05rem] px-6 py-3 text-text dark:text-text-dark h-[calc(100dvh-5.05rem)]">
      <header className="mb-4 flex lg:flex-row flex-col lg:justify-between lg:items-center gap-4">
        <div>
          <h2 className="font-bold text-2xl">Users</h2>
          <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm">
            Change roles for your users
          </p>
        </div>
        <label
          htmlFor="users-name"
          aria-label="search users by name"
          className="flex h-full"
        >
          <input
            type="text"
            placeholder="Search user by name or email..."
            className="px-2 py-1 h-8 flex rounded-md lg:w-72 w-full bg-bg-card dark:bg-bg-card-dark text-text dark:text-text-dark dark:outline-border-dark outline-border focus:outline-primary dark:focus:outline-primary-dark outline"
            id="users-name"
            name="users-name"
            value={currentUserName}
            onChange={(e) => {
              setCurrentUserName(e.target.value);
            }}
          />
        </label>
      </header>
      {isLoading && <CircleLoader />}
      {!isLoading && error !== "" && (
        <p className="text-lg text-error dark:text-error-dark font-semibold text-center">
          {error}
        </p>
      )}
      {!isLoading && error === "" && filteredUsers.length < 1 && (
        <div className="text-text-secondary dark:text-text-secondary-dark grid grid-rows-[1fr_auto_auto_1fr] gap-2 lg:h-[calc(100%-5.05rem)] md:h-[calc(100%-14rem)] h-[calc(100%-12.05rem)] place-items-center">
          <IconUser size={60} className="row-start-2"/>
          <span className="font-semibold text-lg text-center text-pretty row-start-3">
            No user accounts available.
          </span>
        </div>
      )}
      {!isLoading && error === "" && filteredUsers.length > 0 && (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(288px,1fr))] gap-5">
          {filteredUsers.map((user) => (
            <UserCard user={user} key={user.email} />
          ))}
        </section>
      )}
    </article>
  );
};
