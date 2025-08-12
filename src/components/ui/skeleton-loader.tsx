import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "card" | "avatar" | "text" | "button";
}

function Skeleton({ className, variant = "default", ...props }: SkeletonProps) {
  const variants = {
    default: "animate-pulse rounded-md bg-muted",
    card: "animate-pulse rounded-lg bg-muted h-48",
    avatar: "animate-pulse rounded-full bg-muted",
    text: "animate-pulse rounded bg-muted h-4",
    button: "animate-pulse rounded-md bg-muted h-10"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(variants[variant], className)}
      {...props}
    />
  );
}

// Specialized skeleton components
const ProviderCardSkeleton = () => (
  <div className="space-y-4 p-4 border rounded-lg">
    <div className="flex items-center gap-4">
      <Skeleton variant="avatar" className="h-16 w-16" />
      <div className="space-y-2 flex-1">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
    <Skeleton variant="text" className="w-full" />
    <Skeleton variant="text" className="w-2/3" />
    <Skeleton variant="button" className="w-full" />
  </div>
);

const MapSidebarSkeleton = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
        <Skeleton variant="avatar" className="h-12 w-12" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export { Skeleton, ProviderCardSkeleton, MapSidebarSkeleton };