import "./datasets.scss";
import Search from "@/components/Search";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatasetsList from "@/components/DatasetsList";
import PhaseBanner from "@/components/PhaseBanner";

import FilterSelection from "@/components/FilterSelection";
import {
  getDatasetsWithSpatialCoverageInfo,
  getTopics,
} from "../../libs/dataRequests";
import Header from "@/components/Header";

export default async function Datasets({
  searchParams,
}: {
  searchParams: any;
}) {
  const datasets = await getDatasetsWithSpatialCoverageInfo();
  const topics = await getTopics();
  const KEY = "page";
  const params = new URLSearchParams(searchParams);
  params.delete(KEY);

  const getUniquePublishers = (datasets: any[]): any[] => {
    const uniquePublishers = new Set<string>();
    const publisherFulls: string[] = [];

    datasets.forEach((dataset) => {
      if (!uniquePublishers.has(dataset.publisher)) {
        uniquePublishers.add(dataset.publisher);
        publisherFulls.push(dataset.publisher_full);
      }
    });

    return publisherFulls;
  };
  const publishers = getUniquePublishers(datasets.datasets);

  const getParentTopics = (topics: any[]) => {
    const filteredTopics = topics.filter(
      (topic) => topic.parent_topics.length === 0
    );
    return filteredTopics;
  };
  const parentTopics = getParentTopics(topics.topics);

  return (
    <>
      <Header borderColour="blue-border" />
      <div className="app-width-container">
        <PhaseBanner
          href="/"
          tag={{ children: "prototype" }}
          className="govuk-phase-banner--inverse"
        />
        <Breadcrumbs items={[{ text: "Home", href: "/" }]} />
        <main className="app-datasets" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl">Data catalogue</h1>
            </div>
          </div>
          <Search />
          <div className="govuk-grid-row">
            <FilterSelection
              searchParams={searchParams}
              publishers={publishers}
              parentTopics={parentTopics}
              allTopics={topics.topics}
            />
            <DatasetsList
              items={datasets.datasets}
              page={searchParams.page}
              searchParams={searchParams}
              filterParams={params}
            />
          </div>
        </main>
      </div>
    </>
  );
}
