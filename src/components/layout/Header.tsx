"use client";

import { Link, NavLink } from "react-router-dom";
import { Gem, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NotificationBell from "./NotificationBell";
import CommandPaletteShortcut from "./CommandPaletteShortcut";
import { useAuthStore } from "@/store/auth";

const navItems = [
  // ...
];

const Header = () => {
  const isAdmin = useAuthStore((s) => s.isAdmin);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      {/* ... */}
    </header>
  );
};

export default Header;