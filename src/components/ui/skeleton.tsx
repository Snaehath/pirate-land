import { cn } from "@/lib/utils";

const Skeleton = ({
  className,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-base bg-bw border-2 border-border",
        className,
      )}
      {...properties}
    />
  );
};

export { Skeleton };
