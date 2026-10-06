import Navbar from "../components/navbar/navbar";
import TranslationsProvider from "../components/translation-provider";
import initTranslations from "../utils/i18n";
import BaseFooter from "../components/footer";
import { Agent, CollectionData, ResponseData } from "../lib";
import { fetchApi } from "../utils/helpers";
import apiPaths from "../utils/api-paths";
import Breadcrumb from "../components/breadcumb/breadcrumb";
import Image from "next/image";
import Pagination from "../components/pagination";

const i18nNamespaces = ["general", "login"];

type PageProps = {
  params: {
    locale: string;
  };
  searchParams: {
    page: number;
  };
};

type AgentData = {
  agents: CollectionData<Agent>;
};

export default async function Agents({
  params: { locale },
  searchParams: { page },
}: PageProps) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const {
    data: { agents },
  }: ResponseData<AgentData> = await fetchApi({
    method: "GET",
    path: apiPaths.AGENT,
    body: {
      language: locale,
      page,
    },
    options: {
      next: { revalidate: 60 * 60 * 24 },
    },
  });

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <div className="flex flex-col">
        <div className="">
          <Navbar />
        </div>
        <main className="min-h-screen bg-gray-100">
          <div className="md:compact-container mt-5 flex">
            <Breadcrumb
              items={[
                { label: "home_nav", path: "/" },
                {
                  label: "agents",
                  path: "#",
                },
              ]}
            />
          </div>

          <section className="compact-container w-full md:flex-row md:pb-7">
            <h1 className="font-serif text-3xl font-semibold">Agents</h1>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {agents.data.map(({ name, image, email, phone }, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-md bg-white p-5 md:flex-row"
                >
                  <div className="relative h-32 w-32 md:h-28 md:w-28">
                    <Image
                      src={image}
                      alt={`Agent image `}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 300px, (max-width: 1200px) 400px, 600px"
                    />
                  </div>
                  <div className="flex w-3/5 flex-col gap-2">
                    <p className="text-wrap text-xl">{name}</p>
                    <span className="inline-block truncate text-wrap">
                      {email}
                    </span>
                    <p className="">{phone}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center py-5">
              <Pagination links={agents.links} />
            </div>
          </section>
        </main>
        <div>
          <BaseFooter />
        </div>
      </div>
    </TranslationsProvider>
  );
}
