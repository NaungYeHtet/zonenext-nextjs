import Image from "next/image";
import { Project } from "../../lib";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCardCompact({
  project: { name, image },
}: ProjectCardProps) {
  return (
    <div className="group relative h-[230px] w-full">
      {image ? (
        <Image
          className="aspec rounded-md"
          src={image}
          alt="Gallery"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 500px"
          priority
        />
      ) : (
        ""
      )}
      <div className="absolute bottom-0 left-0 z-10 h-1/2 w-full rounded-b-md bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-0"></div>

      <div className="absolute bottom-0 left-0 w-full rounded-b-md p-4 text-white">
        <span className="relative z-10 inline-flex w-full justify-between">
          <span className="inline-flex w-[240px] flex-col gap-1 text-left text-sm font-bold">
            <Link
              href={`/listing`}
              type="button"
              className="truncate transition-colors duration-200 hover:text-primary-300"
            >
              {name}
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}
