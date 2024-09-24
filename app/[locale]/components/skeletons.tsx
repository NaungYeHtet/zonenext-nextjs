export function PropertyCardLongSkeleton() {
  return (
    <div className="bg-white w-[900px] animate-pulse">
      <div className="flex flex-row">
        <div className="relative w-[300px]">
          <div className="h-60 bg-gray-200"></div>
        </div>
        <div className="flex flex-col justify-between w-full px-5 pt-4 pb-7">
          <span className="col-span-2">
            <div className="h-5 bg-gray-200 w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 w-full"></div>
          </span>

          <span className="inline-flex flex-row w-full gap-3">
            <div className="h-5 bg-gray-200 w-1/5"></div>
            <div className="h-5 bg-gray-200 w-1/5"></div>
          </span>

          <span className="inline-flex flex-row w-full gap-3">
            <div className="h-10 bg-gray-200 w-1/4"></div>
            <div className="h-10 bg-gray-200 w-1/4"></div>
            <div className="h-10 bg-gray-200 w-1/4"></div>
          </span>
        </div>
      </div>
    </div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="w-80 lg:w-88 flex flex-col shadow-lg bg-white my-4 rounded-md gap-3 h-115 animate-pulse">
      <div className="relative w-[320px] lg:w-[350px]">
        <div className="h-60 bg-gray-200"></div>
      </div>

      <div className="flex flex-col justify-between h-2/3 px-4 py-4 space-y-4 text-left">
        <div className="inline-flex flex-col space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="flex flex-row gap-5 p-1 text-gray-600">
          <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
