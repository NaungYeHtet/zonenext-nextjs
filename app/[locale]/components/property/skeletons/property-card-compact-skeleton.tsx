import { cn } from "../../../utils/helpers";

export default function PropertyCardCompactSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-xx flex h-[270px] animate-pulse flex-col gap-3 bg-gray-200 shadow-lg",
        className,
      )}
    ></div>
  );
}
