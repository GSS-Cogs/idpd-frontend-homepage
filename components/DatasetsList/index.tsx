import React, { useEffect, useState } from "react";
import Image from "next/image";
// import useDataList from "@/hooks/useDataList";
// import useSortData from "@/hooks/useSortData";

import { MdRssFeed } from "react-icons/md";
// import Dropdown from "../Dropdown";

function DatasetsListItem(props: {
  dataset: any;
  datasetTitle: any;
  shortDescription: any;
  themeName: any | undefined;
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

function formatDate(date: string | number | Date) {
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

export default function DatasetsList(items: any) {
  //   const sortedData = useSortData(items, sortBy, searchText);
  const changeSortBy = (e: { target: { value: any } }) => {
    const tempSortBy = e.target.value;
    // setSortBy(tempSortBy);
  };

  return (
    <div className="govuk-grid-column-two-thirds-from-desktop">
      <div className="app-datasets-header">
        <h3 className="app-datasets-header__results">
          {items.items.length} results
        </h3>
        <div
          style={{
            display: "flex",
          }}
        >
          <MdRssFeed className="app-datasets-header__icon" />
          <a className="app-datasets-header__link govuk-link" href={"#"}>
            Subscribe to feed
          </a>
        </div>
      </div>
      {/* <Dropdown
        options={[
          { value: "alphabetical", name: "Alphabetical" },
          { value: "date", name: "Release Date" },
          { value: "relevance", name: "Relevance" },
        ]}
        onChange={changeSortBy}
        value={sortBy}
      /> */}
      <ul className="app-datasets-list">
        {items.items.map((item: any, index: any) => {
          return <DatasetsListItem {...item} key={index} searchText={""} />;
        })}
      </ul>
    </div>
  );
}
