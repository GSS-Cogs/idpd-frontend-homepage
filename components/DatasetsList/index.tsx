"use client";
import Image from "next/image";
import Pagination from "../Pagination";

function DatasetsListItem(props: {
  dataset: any;
  datasetTitle: any;
  shortDescription: any;
  modified: any;
  creator: any;
  publisher: any;
  topic: any;
  subTopic: any;
}) {
  return (
    <li className="app-datasets-list__item">
      <div className="app-datasets-list__item-top">
        <a
          className="app-datasets-list__item-title app-datasets-list__item-title--context govuk-link"
          href={props.creator}
        >
          {props?.datasetTitle}
        </a>
        <p className="app-datasets-list__item-description">
          {props?.shortDescription}
        </p>
      </div>
      <div className="app-datasets-list__item-bottom">
        <div className="app-datasets-list__item-bottom-publisher">
          <Image
            src="/assets/images/crest.png"
            width={40}
            height={34}
            alt="Govuk Crest"
          />
          <h3 className="app-datasets-list__item-publisher-inner">
            {props?.publisher}
          </h3>
        </div>
        <ul
          className="app-datasets-list__item-metadata"
          style={{ textAlign: "right" }}
        >
          <li className="app-datasets-list__item-metadata-row">
            <div>{props?.topic}</div>
          </li>
          <li className="app-datasets-list__item-metadata-row">
            <time dateTime={props.modified?.value}>{props?.subTopic}</time>
          </li>
          <li className="app-datasets-list__item-metadata-row">
            <time dateTime={props.modified?.value}>
              Updated: {formatDate(props.modified)}
            </time>
          </li>
        </ul>
      </div>
    </li>
  );
}

function formatDate(date: string) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return d
    .toLocaleDateString("en-GB", options)
    .replace(",", "")
    .replace(/( AM| PM)/g, (m) => m.trim().toLowerCase());
}

export default function DatasetsList({
  items,
  page = 1,
  searchParams,
}: {
  items: any;
  page: number;
  searchParams: URLSearchParams;
}) {
  const RESULTS_LENGTH = 20;
  const sliceStart = page * RESULTS_LENGTH - RESULTS_LENGTH;
  const sliceEnd = page * RESULTS_LENGTH;
  const totalPages = Math.ceil(items.length / RESULTS_LENGTH);

  // TODO this is a temp solution until we add in a correct sort by process
  const sortByDate = (data: any[]) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.modified).getTime();
      const dateB = new Date(b.modified).getTime();
      return dateB - dateA;
    });
  };

  const sortedItems = sortByDate(items);

  return (
    <div className="govuk-grid-column-two-thirds-from-desktop">
      <div className="app-datasets-header">
        <h3 className="app-datasets-header__results">
          {sortedItems.length} results
        </h3>
      </div>
      <ul className="app-datasets-list">
        {sortedItems
          .slice(sliceStart, sliceEnd)
          .map((item: any, index: any) => {
            return <DatasetsListItem {...item} key={index} searchText={""} />;
          })}
      </ul>
      <Pagination
        page={page}
        totalPages={totalPages}
        searchParams={searchParams}
      />
    </div>
  );
}
