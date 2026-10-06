import { GroupData, Project, ResponseData } from "./lib";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import apiPaths from "./utils/api-paths";
import { fetchApi } from "./utils/helpers";
import CarouselSlider from "./components/carousel-slider";
import { HOME_CAROUSEL_PROPS } from "./components/carousel-presets";
import ProjectCardCompact from "./components/project/project-card-compact";

export default async function SectionTopTenProject({
  locale,
}: {
  locale: string;
}) {
  const {
    data: { group },
  }: ResponseData<GroupData<Project>> = await fetchApi({
    method: "GET",
    path: apiPaths.GROUP,
    body: {
      language: locale,
      type: "TopTenProjects",
    },
    options: {
      next: { revalidate: 60 * 60 * 24 },
    },
  });

  return (
    <section
      className="h-full bg-gray-50 px-4 py-24 text-center md:px-4"
      aria-label="Top ten projects"
    >
      <h2 className="mb-3 text-xl md:text-2xl">{group.name}</h2>
      <p className="md:text-md text-sm text-gray-500">{group.description}</p>
      <div className="compact-container mx-auto mt-8 h-full">
        <CarouselSlider
          {...HOME_CAROUSEL_PROPS}
          id="TopTenProjects"
          autoplay={{
            disableOnInteraction: false, // Optional, but recommended
            delay: 5000,
            pauseOnMouseEnter: true,
          }}
        >
          {group.items.map((project: Project, i) => (
            <ProjectCardCompact key={i} project={project} />
          ))}
        </CarouselSlider>
      </div>
    </section>
  );
}
