"use client";
import { useGlobalContext } from "@/app/context/store";
import { useEffect, useState } from "react";

const FilterDisplay = ({ searchParams }: { searchParams: any }) => {
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  const jsCheck = () => {
    const hasJavaScript =
      typeof window !== "undefined" && "IntersectionObserver" in window;
    setIsJsEnabled(hasJavaScript);
  };
  useEffect(() => {
    jsCheck();
  }, []);

  const {
    topicFilter,
    setTopicFilter,
    subtopicsFilter,
    setSubtopicsFilter,
    publisherFilter,
    setPublisherFilter,
    afterDate,
    setAfterDate,
    beforeDate,
    setBeforeDate,
    setAllFilters,
  } = useGlobalContext();
  const initialParams = new URLSearchParams(searchParams);
  const initialTopicFilter = initialParams.get("topic");
  const initialSubtopicsFilter = searchParams?.subtopics;
  const initialPublisherFilter = initialParams.get("publisher");
  const initialBeforeDateFilter = initialParams.get("to_date");
  const initialAfterDateFilter = initialParams.get("from_date");

  function parseUKDate(date: string) {
    const splitDate = date.split("/");

    if (splitDate.length === 1) {
      const [year] = splitDate;
      return new Date(year);
    } else if (splitDate.length === 2) {
      const [month, year] = splitDate;
      return new Date(parseInt(year), parseInt(month) - 1);
    } else if (splitDate.length === 3) {
      const [day, month, year] = splitDate;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    return new Date(date);
  }

  const removeFilter = (filter: string, offsetIndex = 0) => {
    if (filter === "topic") {
      setTopicFilter(null);
      setSubtopicsFilter([]);
    } else if (filter === "subtopics") {
      const tempSubtopics = subtopicsFilter.filter(
        (x, index) => index !== offsetIndex - 1
      );
      setSubtopicsFilter([...tempSubtopics]);
    } else if (filter === "publisher") {
      setPublisherFilter(null);
    } else if (filter === "from_date") {
      setAfterDate(null);
    } else if (filter === "to_date") {
      setBeforeDate(null);
    }

    removeFromUrl(filter);
  };

  const removeFromUrl = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(value);
    if (value === "topic") {
      params.delete("subtopics");
    }
    const newURL = `${window.location.pathname}?${params}`;
    history.pushState(null, "", newURL);
  };

  function formatDate(inputDate: Date) {
    if (!inputDate) {
      return null;
    }
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(inputDate);
  }

  const FilterDisplayItem = ({
    title,
    items,
    filter,
  }: {
    title: string;
    items: (string | null)[];
    filter: string;
  }) => {
    if (!items || items.every((item) => item === null)) {
      return null;
    }

    const getPrefixText = (index: number) => {
      if (index === 1) {
        return "and";
      } else if (index > 1) {
        return "or";
      }
      return null;
    };

    const filterItem = (item: string | null, index: number) => {
      if (item === null) {
        return null;
      }
      const prefixText = getPrefixText(index);

      return (
        <>
          {prefixText && (
            <div style={{ marginLeft: 5, marginRight: 5 }}>{prefixText}</div>
          )}
          <span
            key={index}
            className="app-filter-display__item"
            onClick={() =>
              removeFilter(index > 0 ? "subtopics" : filter, index)
            }
          >
            <div style={{ marginRight: 8 }}>X</div>
            <div>{item}</div>
          </span>
        </>
      );
    };

    return (
      <div className="app-filter-display__row">
        <div className="app-filter-display__row-title">{title}</div>
        {items.map(filterItem)}
      </div>
    );
  };

  const FilterDisplayDateItem = ({
    fromDate,
    toDate,
  }: {
    fromDate: string;
    toDate: string;
  }) => {
    if (!fromDate && !toDate) {
      return null;
    }

    const dateItem = (date: string, filterName: string) => {
      if (!date) {
        return null;
      }

      const formattedDate = formatDate(parseUKDate(date));

      return (
        <div
          className="app-filter-display__item"
          onClick={() => removeFilter(filterName)}
        >
          <div style={{ marginRight: 8 }}>X</div>
          <div>{formattedDate}</div>
        </div>
      );
    };

    const textBetweenDates = () => {
      if (fromDate && toDate) {
        return <div style={{ marginLeft: 5, marginRight: 5 }}>and</div>;
      }
      return null;
    };

    const getPrefixText = (value1: string, value2: string) => {
      if (value1 && value2) {
        return "Updated between";
      } else if (value1) {
        return "Updated after";
      }
      return "Updated before";
    };
    const prefixText = getPrefixText(fromDate, toDate);

    return (
      <div className="app-filter-display__row">
        <div className="app-filter-display__row-title">{prefixText}</div>
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {dateItem(fromDate, "from_date")}
          {textBetweenDates()}
          {dateItem(toDate, "to_date")}
        </span>
      </div>
    );
  };

  return (
    <div className="app-filter-display">
      <FilterDisplayItem
        items={
          !isJsEnabled
            ? initialSubtopicsFilter
              ? [initialTopicFilter].concat(initialSubtopicsFilter)
              : [initialTopicFilter]
            : subtopicsFilter
            ? [topicFilter].concat(subtopicsFilter)
            : [topicFilter]
        }
        title={"About"}
        filter={"topic"}
      />
      <FilterDisplayItem
        items={
          !isJsEnabled
            ? [initialPublisherFilter || null]
            : [publisherFilter || null]
        }
        title={"Published by"}
        filter={"publisher"}
      />
      <FilterDisplayDateItem
        fromDate={(!isJsEnabled ? initialAfterDateFilter : afterDate) || ""}
        toDate={(!isJsEnabled ? initialBeforeDateFilter : beforeDate) || ""}
      />
    </div>
  );
};

export default FilterDisplay;
