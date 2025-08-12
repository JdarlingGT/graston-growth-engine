import { NavLink, Outlet } from "react-router-dom";
import { Gem, Home, Users, BarChart2, Bot, Settings, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: Home },
  { to: "/admin/providers", label: "Providers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { to: "/admin/ai-assistant", label: "AI Assistant", icon: Bot },
];

const bottomNavItems = [
    { to: "/admin/settings", label: "Settings", icon: Settings },
    { to: "/support", label: "Support", icon: LifeBuoy },
]

const AdminLayout = () => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <NavLink
              to="/"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Gem className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Graston Directory</span>
            </NavLink>
            {navItems.map((item) => (
              <Tooltip key={item.to}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.to}
                    end={item.to === "/admin"}
                    className={({ isActive }) =>
                      cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                        isActive && "bg-accent text-accent-foreground"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            {bottomNavItems.map((item) => (
                 <Tooltip key={item.to}>
                 <TooltipTrigger asChild>
                   <NavLink
                     to={item.to}
                     className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                   >
                     <item.icon className="h-5 w-5" />
                     <span className="sr-only">{item.label}</span>
                   </NavLink>
                 </TooltipTrigger>
                 <TooltipContent side="right">{item.label}</TooltipContent>
               </Tooltip>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1">
          <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdminLayout;