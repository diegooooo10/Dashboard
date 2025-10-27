import { Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound";
import type { PropsWithChildren } from "react";

export const RouteWithNotFound = ({ children }: PropsWithChildren) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
