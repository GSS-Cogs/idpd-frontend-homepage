export const dynamic = "force-dynamic";
import "./datasets.scss";
import Search from "@/components/Search";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatasetsList from "@/components/DatasetsList";
import PhaseBanner from "@/components/PhaseBanner";

import FilterSelection from "@/components/FilterSelection";
import {
  getDatasetsWithSpatialCoverageInfo,
  getBackendUrl,
} from "../../libs/dataRequests";
import Header from "@/components/Header";

export default async function Datasets({
  searchParams,
}: {
  searchParams: any;
}) {
  const datasets = await getDatasetsWithSpatialCoverageInfo();
  const backendUrl = await getBackendUrl();
  const KEY = "page";
  const params = new URLSearchParams(searchParams);
  params.delete(KEY);

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
          {backendUrl}
          <Search />
          <div className="govuk-grid-row">
            <FilterSelection searchParams={params} />
            {/* <DatasetsList
              items={datasets.datasets}
              page={searchParams.page}
              searchParams={searchParams}
              filterParams={params}
            /> */}
          </div>
        </main>
      </div>
    </>
  );
}
