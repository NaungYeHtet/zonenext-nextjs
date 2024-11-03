import { cn } from "../../utils/helpers";

export default function GallerySkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[560px] w-full flex-col gap-1 bg-gray-50 shadow-lg",
        className,
      )}
    >
      <div className="h-[500px] w-full animate-pulse rounded-md bg-gray-300"></div>
      <div className="flex h-[70px] w-full justify-center gap-5 pb-3">
        <div className="h-full w-[100px] animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-full w-[100px] animate-pulse rounded-md bg-gray-300"></div>
        <div className="h-full w-[100px] animate-pulse rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
}
