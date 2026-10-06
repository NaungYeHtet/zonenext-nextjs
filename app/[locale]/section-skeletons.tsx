import InquiryFormSkeletion from "./components/inquiry/inquiry-form-skeleton";
import FilterSkeleton from "./components/property/filter/filter-skeleton";
import PropertyCardCompactSkeleton from "./components/property/skeletons/property-card-compact-skeleton";
import PropertyCardSkeleton from "./components/property/skeletons/property-card-skeleton";

type CarouselSectionSkeletonProps = {
  card: "property" | "compact";
};

export function CarouselSectionSkeleton({
  card,
}: CarouselSectionSkeletonProps) {
  const CardSkeleton =
    card === "property" ? PropertyCardSkeleton : PropertyCardCompactSkeleton;

  return (
    <section
      className="h-full bg-gray-50 px-4 py-24 text-center md:px-4"
      aria-busy="true"
    >
      <div className="mx-auto mb-3 h-7 w-48 animate-pulse rounded-md bg-gray-300 md:h-8" />
      <div className="mx-auto h-5 w-72 max-w-full animate-pulse rounded-md bg-gray-300" />
      <div className="compact-container mx-auto mt-8 h-full">
        <div className="flex justify-between gap-10">
          <CardSkeleton className="hidden lg:flex" />
          <CardSkeleton className="hidden md:flex" />
          <CardSkeleton />
        </div>
      </div>
    </section>
  );
}

export function InquirySectionSkeleton() {
  return (
    <section className="bg-secondary-900 px-4 py-20 md:px-4" aria-busy="true">
      <div className="mx-auto mb-3 h-7 w-40 animate-pulse rounded-md bg-white/20 md:h-8" />
      <div className="mx-auto h-5 w-80 max-w-full animate-pulse rounded-md bg-white/20" />
      <div className="flex w-full flex-col py-3 md:px-32">
        <InquiryFormSkeletion />
      </div>
    </section>
  );
}

export function FilterSectionSkeleton() {
  return (
    <div
      className="compact-container z-40 flex h-full w-full justify-center bg-white py-10"
      aria-busy="true"
    >
      <div className="w-full">
        <FilterSkeleton />
      </div>
    </div>
  );
}
