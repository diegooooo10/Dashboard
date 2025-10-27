import type { UserConfiguration } from "../types";

export const getFilteredUsers = (
  users: UserConfiguration[],
  filter: string
) => {
  return users.filter(
    (user) => user.email.includes(filter) || user.fullName.includes(filter)
  );
};
