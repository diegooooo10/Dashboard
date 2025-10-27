import type { ReactNode } from "react";
import {
  IconDashboard,
  IconHistory,
  IconProduct,
  IconProfile,
  IconSettings,
  IconShoppingCart,
  IconUsers,
} from "../components";
import type { Rol } from "../types";
type NavItems = {
  Icon: ReactNode;
  Route: string;
  Label: string;
  AllowedRoles: Rol[];
};

export const navItems: NavItems[] = [
  {
    Icon: <IconDashboard />,
    Label: "Dashboard",
    AllowedRoles: ["admin", "manager", "user"],
    Route: "/home/dashboard",
  },
  {
    Icon: <IconProduct />,
    Label: "Product",
    AllowedRoles: ["admin", "manager", "user"],
    Route: "/home/products",
  },
  {
    Icon: <IconShoppingCart />,
    Label: "Cart",
    AllowedRoles: ["admin", "manager", "user"],
    Route: "/home/cart",
  },
  {
    Icon: <IconHistory />,
    Label: "History",
    AllowedRoles: ["admin", "manager", "user"],
    Route: "/home/history",
  },
  {
    Icon: <IconProfile />,
    Label: "Profile",
    AllowedRoles: ["admin", "manager", "user"],
    Route: "/home/profile",
  },
  {
    Icon: <IconSettings />,
    Label: "Settings",
    AllowedRoles: ["admin", "manager", "user"],
    Route: "/home/settings",
  },
  {
    Icon: <IconUsers />,
    Label: "Users",
    AllowedRoles: ["admin"],
    Route: "/home/users",
  },
];
