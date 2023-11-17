import "./datasets.scss";
import Search from "@/components/Search";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatasetsList from "@/components/DatasetsList";
import PhaseBanner from "@/components/PhaseBanner";

import FilterSelection from "@/components/FilterSelection";
import { getDatasetsWithSpatialCoverageInfo } from "../../libs/dataRequests";
import Header from "@/components/Header";

export default async function Datasets({
  searchParams,
}: {
  searchParams: any;
}) {
  const datasets = await getDatasetsWithSpatialCoverageInfo();
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
              <h1 className="govuk-caption-xl app-datasets_caption">Dataset</h1>
              <h1 className="govuk-heading-xl">Data catalogue</h1>
            </div>
          </div>
          <Search />
          <div className="govuk-grid-row">
            <FilterSelection searchParams={params} publishers={publishers} />
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
