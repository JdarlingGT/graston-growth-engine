"use client";

import { Link } from "react-router-dom";
import { Gem, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NotificationBell from "./NotificationBell";
import CommandPaletteShortcut from "./CommandPaletteShortcut";
import MegaMenu from "./MegaMenu";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => {
        const user = data.user;
        // assume role is in user.app_metadata.role
        if (user?.app_metadata?.role === "admin") {
          setIsAdmin(true);
        }
      });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold">Graston Directory</span>
          </Link>
          <div className="hidden md:block">
            <MegaMenu />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          {isAdmin && (
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">Admin</Link>
            </Button>
          )}
          <CommandPaletteShortcut />

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-4">
                <div className="space-y-4">
                  <Link to="/" className="block text-lg">Find a Provider</Link>
                  <Link to="/about" className="block text-lg">About Us</Link>
                  <Link to="/faq" className="block text-lg">FAQ</Link>
                  <Link to="/onboarding" className="block text-lg">Onboarding</Link>
                  <Link to="/support" className="block text-lg">Support</Link>
                  {isAdmin && <Link to="/admin" className="block text-lg text-red-600">Admin</Link>}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;