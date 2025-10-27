import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center px-6">
      <h1 className="text-7xl font-extrabold text-text dark:text-text-dark">404</h1>
      <p className="mt-4 text-xl text-text-secondary dark:text-text-secondary-dark">
        This page doesn’t exist or has been moved.
      </p>

      <NavLink
        to="/"
        className="mt-8 inline-block px-6 py-3 button"
      >
        Go back home
      </NavLink>
    </section>
  );
};
