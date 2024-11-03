import { cn } from "../../../utils/helpers";

export default function PropertyCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[460px] w-full flex-col gap-3 bg-gray-200 shadow-lg",
        className,
      )}
    >
      <div className="h-[300px] w-full animate-pulse rounded-md bg-gray-300"></div>
      <div className="mx-3 h-[20px] w-2/4 animate-pulse rounded-md bg-gray-300"></div>
      <div className="mx-3 h-[15px] w-3/4 animate-pulse rounded-md bg-gray-300"></div>
      <div className="flex h-[60px] w-full justify-between gap-5 px-3">
        <div className="h-full w-full animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-full w-full animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-full w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
}
