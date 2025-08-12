import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const EnhancedTooltipProvider = TooltipPrimitive.Provider;

const EnhancedTooltip = TooltipPrimitive.Root;

const EnhancedTooltipTrigger = TooltipPrimitive.Trigger;

const EnhancedTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = true, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        className,
      )}
      asChild
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 2 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 2 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {children}
        {showArrow && (
          <TooltipPrimitive.Arrow className="fill-popover" />
        )}
      </motion.div>
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
EnhancedTooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { EnhancedTooltip, EnhancedTooltipTrigger, EnhancedTooltipContent, EnhancedTooltipProvider };