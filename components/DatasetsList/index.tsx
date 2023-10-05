"use client";
import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";

import { useCallback, useEffect } from "react";
import { useState } from "react";
import { MdRssFeed } from "react-icons/md";
import FilterDisplay from "../FilterDisplay";
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
  searchParams: any;
}) {
  const RESULTS_LENGTH = 20;
  const sliceStart = page * RESULTS_LENGTH - RESULTS_LENGTH;
  const sliceEnd = page * RESULTS_LENGTH;

  const [isJsEnabled, setIsJsEnabled] = useState(false);

  const jsCheck = () => {
    const hasJavaScript =
      typeof window !== "undefined" && "IntersectionObserver" in window;
    setIsJsEnabled(hasJavaScript);
  };
  useEffect(() => {
    jsCheck();
  });

  let filterParams = new URLSearchParams(searchParams);
  const {
    topicFilter,
    subtopicsFilter,
    publisherFilter,
    afterDate,
    beforeDate,
  } = useGlobalContext();
  const initialTopicFilter = filterParams.get("topic");
  const initialSubtopicsFilter = searchParams?.subtopics;
  const initialPublisherFilter = filterParams.get("publisher");
  const initialAfterDateFilter = filterParams.get("from_date");
  const initialBeforeDateFilter = filterParams.get("to_date");

  // TODO this is a temp solution until we add in a correct sort by process
  const sortByDate = (data: any[]) => {
    return data.sort((a, b) => {
      const dateA = new Date(a.modified).getTime();
      const dateB = new Date(b.modified).getTime();
      return dateB - dateA;
    });
  };

  function parseUKDate(date: string) {
    const splitDate = date.split("/");
    if (splitDate.length < 2) {
      return Date.parse(date);
    }
    const [day, month, year] = splitDate;
    const newDate = `${year}-${month}-${day}T00:00:00.000Z`;
    return Date.parse(newDate);
  }

  const filterData = useCallback(
    (data: any[]) => {
      let filteredData = [...data];
      let activeTopicFilter = topicFilter || "All topics";
      let activeSubtopicsFilter = subtopicsFilter;
      let activePublisherFilter = publisherFilter || "All publisher";
      let activeAfterDateFilter = parseUKDate(afterDate || "");
      let activeBeforeDateFilter = parseUKDate(beforeDate || "");

      if (!isJsEnabled) {
        activeTopicFilter = initialTopicFilter || "All topics";
        activeSubtopicsFilter = initialSubtopicsFilter;
        activePublisherFilter = initialPublisherFilter || "All publisher";
        activeAfterDateFilter = parseUKDate(initialAfterDateFilter || "");
        activeBeforeDateFilter = parseUKDate(initialBeforeDateFilter || "");
      }

      if (activeTopicFilter !== "All topics") {
        filteredData = filteredData.filter(
          (x) => x.topic === activeTopicFilter
        );
      }

      if (activeSubtopicsFilter?.length > 0) {
        filteredData = filteredData.filter((x) =>
          activeSubtopicsFilter.includes(x.subTopic)
        );
      }

      if (activePublisherFilter !== "All publisher") {
        filteredData = filteredData.filter(
          (x) => x.publisher === activePublisherFilter
        );
      }

      if (activeAfterDateFilter) {
        filteredData = filteredData.filter(
          (x) => Date.parse(x.modified) >= activeAfterDateFilter
        );
      }

      if (activeBeforeDateFilter) {
        filteredData = filteredData.filter(
          (x) => Date.parse(x.modified) <= activeBeforeDateFilter
        );
      }

      return filteredData;
    },
    [topicFilter, subtopicsFilter, publisherFilter, afterDate, beforeDate]
  );

  const filteredItems = filterData(items);
  const sortedItems = sortByDate(filteredItems);
  const totalPages = Math.ceil(sortedItems.length / RESULTS_LENGTH);

  return (
    <div className="govuk-grid-column-two-thirds-from-desktop">
      <div className="app-datasets-header">
        <h3 className="app-datasets-header__results">
          {sortedItems.length} results
        </h3>
      </div>
      <FilterDisplay searchParams={searchParams} />
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
        searchParams={filterParams}
      />
    </div>
  );
}
