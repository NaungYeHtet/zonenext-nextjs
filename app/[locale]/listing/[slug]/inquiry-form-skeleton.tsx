import { cn } from "../../utils/helpers";

export default function InquiryFormSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-5 bg-gray-200 p-7 shadow-lg",
        className,
      )}
    >
      <div className="h-[40px] w-2/5 animate-pulse rounded-md bg-gray-300"></div>
      <div className="inline-flex w-full items-center justify-center gap-1">
        <div className="h-[40px] w-[40px] animate-pulse rounded-full bg-gray-300"></div>
        <div className="h-[19px] w-[150px] animate-pulse bg-gray-300"></div>
      </div>
      <div className="flex flex-col justify-start gap-1">
        <div className="h-[17px] w-[90px] animate-pulse bg-gray-300"></div>
        <div className="h-[40px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="flex flex-col justify-start gap-1">
        <div className="h-[17px] w-[50px] animate-pulse bg-gray-300"></div>
        <div className="h-[40px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="flex flex-col justify-start gap-1">
        <div className="h-[17px] w-[90px] animate-pulse bg-gray-300"></div>
        <div className="h-[40px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="flex flex-col justify-start gap-1">
        <div className="h-[17px] w-[90px] animate-pulse bg-gray-300"></div>
        <div className="h-[70px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="flex flex-col justify-start gap-1">
        <div className="h-[17px] w-[190px] animate-pulse bg-gray-300"></div>
        <div className="h-[40px] w-full animate-pulse rounded-md bg-gray-300"></div>
      </div>
      <div className="mb-2 h-[50px] w-full animate-pulse rounded-md bg-gray-300"></div>
      <div className="mb-2 h-[50px] w-full animate-pulse rounded-md bg-gray-300"></div>
    </div>
  );
}
