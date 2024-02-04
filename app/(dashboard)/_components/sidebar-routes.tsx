"use client";
import { useAuth } from "@clerk/nextjs";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/",
  },
];

const registeredRoutes = [
  ...guestRoutes,
  {
    icon: Layout,
    label: "Dashboard",
    href: "/courses",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();

  const isTeacherPage = pathname?.includes("/teacher");
  const isRegistered = userId && isLoaded;

  // TODO: Add is teacher check
  const routes = isTeacherPage
    ? teacherRoutes
    : isRegistered
    ? registeredRoutes
    : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
