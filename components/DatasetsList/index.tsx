"use client";
import { useGlobalContext } from "@/app/context/store";
import Image from "next/image";

import { useCallback, useEffect } from "react";
import { useState } from "react";
import FilterDisplay from "../FilterDisplay";
import Pagination from "../Pagination";
import { isValidDate } from "@/utils/dateValidation";

const DatasetsListItem = (props: {
  "@id": string;
  title: string;
  summary: string;
  issued: string;
  creator: string;
  publisher_full: { title: string };
  topic: string;
  subTopic: string;
  spatial_coverage_name: string;
  temporal_coverage: { start: string; end: string };
}) => {
  return (
    <li className="app-datasets-list__item">
      <div className="app-datasets-list__item-top">
        <a
          className="app-datasets-list__item-title app-datasets-list__item-title--context govuk-link"
          href={props["@id"]}
        >
          {props?.title}
        </a>
        <div className="app-datasets-list__item-topic">
          Topic
          <div className="app-datasets-list__chevron" />
          Subtopic
        </div>
        <p className="app-datasets-list__item-description">{props?.summary}</p>
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
            {props?.publisher_full.title}
          </h3>
        </div>
        <ul
          className="app-datasets-list__item-metadata"
          style={{ textAlign: "right" }}
        >
          <li className="app-datasets-list__item-metadata-row">
            <time dateTime={props.issued}>
              Updated {formatDate(props.issued)}
            </time>
          </li>
          <li className="app-datasets-list__item-metadata-row">
            <div>
              Time Period:{" "}
              {getYear(props?.temporal_coverage.start) +
                " - " +
                getYear(props?.temporal_coverage.end)}
            </div>
          </li>
          <li className="app-datasets-list__item-metadata-row">
            <div>Coverage: {props?.spatial_coverage_name}</div>
          </li>
        </ul>
      </div>
    </li>
  );
};

function getYear(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year;
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
  filterParams,
}: {
  items: any;
  page: number;
  searchParams: any;
  filterParams: URLSearchParams;
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
  }, []);

  // filterParams needs to be parsed as new UrlSearchParams to get the 'get' function to work
  filterParams = new URLSearchParams(filterParams);
  const {
    topicFilter,
    subtopicsFilter,
    publisherFilter,
    afterDate,
    beforeDate,
  } = useGlobalContext();

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
      let activeAfterDateFilter: number | null = null;
      if (isValidDate(afterDate || "")) {
        activeAfterDateFilter = parseUKDate(afterDate || "");
      }
      let activeBeforeDateFilter: number | null = null;
      if (isValidDate(beforeDate || "")) {
        activeBeforeDateFilter = parseUKDate(beforeDate || "");
      }

      if (!isJsEnabled) {
        // subtopics uses a different method here because using '.getAll("subtopics")'
        // returns the array as a single string, eg.
        // ["Business and the environment,Climate change and energy"]
        const initialSubtopicsFilter = searchParams?.subtopics;
        const initialTopicFilter = filterParams.get("topic") || "All topics";
        const initialPublisherFilter =
          filterParams.get("publisher") || "All publisher";
        const initialAfterDateFilter = parseUKDate(
          filterParams.get("from_date") || ""
        );
        const initialBeforeDateFilter = parseUKDate(
          filterParams.get("to_date") || ""
        );

        activeTopicFilter = initialTopicFilter;
        activeSubtopicsFilter = initialSubtopicsFilter;
        activePublisherFilter = initialPublisherFilter;
        activeAfterDateFilter = initialAfterDateFilter;
        activeBeforeDateFilter = initialBeforeDateFilter;
      }

      if (activeTopicFilter !== "All topics") {
        filteredData = filteredData.filter((x) =>
          x.topics.some((topic: string) =>
            topic.includes(activeTopicFilter.toLowerCase().replaceAll(" ", "-"))
          )
        );
      }

      if (activeSubtopicsFilter?.length > 0) {
        filteredData = filteredData.filter((x) =>
          x.topics.some((topic: string) => {
            if (typeof activeSubtopicsFilter === "string") {
              return topic.includes(
                (activeSubtopicsFilter as string)
                  ?.toLowerCase()
                  .replaceAll(" ", "-")
              );
            } else {
              return activeSubtopicsFilter?.some((subtopic) =>
                topic.includes(subtopic.toLowerCase().replaceAll(" ", "-"))
              );
            }
          })
        );
      }

      if (activePublisherFilter !== "All publisher") {
        filteredData = filteredData.filter(
          (x) => x.publisher_full.title === activePublisherFilter
        );
      }

      if (activeAfterDateFilter) {
        filteredData = filteredData.filter(
          (x) => Date.parse(x.modified) >= (activeAfterDateFilter || 0)
        );
      }

      if (activeBeforeDateFilter) {
        filteredData = filteredData.filter(
          (x) => Date.parse(x.modified) <= (activeBeforeDateFilter || 0)
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
