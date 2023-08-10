import "./datasets.scss";
import Search from "@/components/Search";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatasetsList from "@/components/DatasetsList";
import data from "../../data/data.json";
import PhaseBanner from "@/components/PhaseBanner";

export default function Datasets() {
  return (
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
          <div className="govuk-grid-column-one-third-from-desktop">
            <h3></h3>
          </div>
          <DatasetsList items={data.results.bindings} />
        </div>
      </main>
    </div>
  );
}
