"use client";

import { useEffect, useState } from "react";
import SelectCheckbox from "../MultiSelect";

import { useGlobalContext } from "@/app/context/store";
import { isValidDate } from "@/utils/dateValidation";
import { getSubtopics } from "@/libs/dataRequests";

const Filters = ({
  searchParams,
  publishers,
  parentTopics,
  allTopics,
}: {
  searchParams: any;
  publishers: any[];
  parentTopics: any[];
  allTopics: any[];
}) => {
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  const jsCheck = () => {
    const hasJavaScript =
      typeof window !== "undefined" && "IntersectionObserver" in window;
    setIsJsEnabled(hasJavaScript);
  };
  useEffect(() => {
    jsCheck();
  });

  let tempParams = new URLSearchParams(searchParams);
  const {
    topicFilter,
    setTopicFilter,
    publisherFilter,
    setPublisherFilter,
    afterDate,
    setAfterDate,
    beforeDate,
    setBeforeDate,
    setAllFilters,
  } = useGlobalContext();
  const initialTopicFilter = tempParams.get("topic");
  const initialPublisherFilter = tempParams.get("publisher");
  const initialTimeBeforeFilter = tempParams.get("to_date");
  const initialTimeAfterFilter = tempParams.get("from_date");
  const [afterDateCurrentInput, setAfterDateCurrentInput] = useState(
    initialTimeAfterFilter
  );
  const [beforeDateCurrentInput, setBeforeDateCurrentInput] = useState(
    initialTimeBeforeFilter
  );
  const [isAfterDateValid, setisAfterDateValid] = useState(
    !afterDateCurrentInput ? true : isValidDate(afterDateCurrentInput || "")
  );
  const [isBeforeDateValid, setisBeforeDateValid] = useState(
    !beforeDateCurrentInput ? true : isValidDate(beforeDateCurrentInput || "")
  );

  useEffect(() => {
    if (afterDate === null) {
      setAfterDateCurrentInput("");
    } else {
      setAfterDateCurrentInput(afterDate);
    }
    if (beforeDate === null) {
      setBeforeDateCurrentInput("");
    } else {
      setBeforeDateCurrentInput(beforeDate);
    }
  }, [afterDate, beforeDate]);

  useEffect(() => {
    const updateSubtopics = async (id: string) => {
      const formattedSubtopic = id.toLowerCase().replaceAll(" ", "-");
      const subs = await getSubtopics(formattedSubtopic);

      setSubtopics(subs?.topics || []);
    };

    updateSubtopics(topicFilter || "");
  }, [topicFilter]);

  const addPublisher = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const publisher = e.target.value;
    updateFilter("publisher", publisher, setPublisherFilter);
  };

  const addTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topic = e.target.value;
    updateFilter("topic", topic, setTopicFilter);
  };

  const initialSubtopicsFilter = initialTopicFilter
    ? allTopics.filter((x) =>
        x.parent_topics.some((topic: string) =>
          topic.includes(
            initialTopicFilter.trim().toLowerCase().replaceAll(" ", "-")
          )
        )
      )
    : [];

  const [subtopics, setSubtopics] = useState(initialSubtopicsFilter);

  const updateFilter = async (
    key: string,
    value: string | null,
    setFilter: (value: string | null) => void
  ) => {
    const params = new URLSearchParams(window.location.search);
    if (key === "topic") {
      params.delete("subtopics");
    }
    if (value === "All publishers" || value === "All topics") {
      params.delete(key);
      setFilter(null);
    } else {
      params.set(key, value || "");
      setFilter(value);
    }
    const newURL = `${window.location.pathname}?${params}`;
    history.pushState(null, "", newURL);

    updateDateFilters();
  };

  const updateDateFilters = () => {
    setAfterDate(afterDateCurrentInput);
    setBeforeDate(beforeDateCurrentInput);

    const params = new URLSearchParams(window.location.search);
    const tempAfterInput = afterDateCurrentInput || "";
    if (!isValidDate(tempAfterInput) && tempAfterInput !== "") {
      setisAfterDateValid(false);
    } else {
      setisAfterDateValid(true);
    }
    if (tempAfterInput === "") {
      params.delete("from_date");
    } else {
      params.set("from_date", tempAfterInput);
    }
    const tempBeforeInput = beforeDateCurrentInput || "";
    if (!isValidDate(tempBeforeInput) && tempBeforeInput !== "") {
      setisBeforeDateValid(false);
    } else {
      setisBeforeDateValid(true);
    }
    if (tempBeforeInput === "") {
      params.delete("to_date");
    } else {
      params.set("to_date", tempBeforeInput);
    }

    const newURL = `${window.location.pathname}?${params}`;
    window.history.pushState(
      { ...window.history.state, as: newURL, url: newURL },
      "",
      newURL
    );
  };

  const handleDateKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateDateFilters();
    }
  };

  const handleDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const { value } = event.target;
    setDate(value);
  };

  return (
    <div className="govuk-grid-column-one-third-from-desktop">
      <details className="app-accordion">
        <summary className="app-accordian__title">Topic</summary>
        <div className="app-accordian__panel">
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label" style={{ paddingLeft: 0 }}>
              Topic
            </label>
            <select
              className="govuk-select app-select"
              id="topic-select"
              onChange={addTopic}
              value={(!isJsEnabled ? initialTopicFilter : topicFilter) || ""}
            >
              <option key={"All topics"} value={"All topics"}>
                All topics
              </option>
              {parentTopics.map((item: { title: string }) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label">Subtopic</label>
            <SelectCheckbox options={subtopics} searchParams={searchParams} />
          </div>
        </div>
      </details>
      <details className="app-accordion">
        <summary className="app-accordian__title">Publisher</summary>
        <div className="app-accordian__panel">
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label">Publisher</label>
            <select
              className="govuk-select app-select"
              id="publisher-select"
              onChange={addPublisher}
              value={
                (!isJsEnabled ? initialPublisherFilter : publisherFilter) || ""
              }
            >
              <option key={"All publishers"} value={"All publishers"}>
                All publishers
              </option>
              {publishers.map((topic) => (
                <option key={topic.title} value={topic.title}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </details>
      <details className="app-accordion">
        <summary className="app-accordian__title">Updated</summary>
        <div className="app-accordian__panel">
          <div
            className={`app-accordian__panel-inner govuk-form-group  ${
              !isAfterDateValid && "govuk-form-group--error"
            }`}
          >
            <label className="govuk-label">Updated after</label>
            <div className="govuk-caption-m">
              For example, 2005 or 21/11/2004
            </div>
            {!isAfterDateValid && (
              <p id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter a
                real date
              </p>
            )}
            <input
              className={`govuk-input ${
                !isAfterDateValid && "govuk-input--error"
              }`}
              id="from-date-input"
              type="text"
              value={
                (afterDateCurrentInput === null
                  ? initialTimeAfterFilter
                  : afterDateCurrentInput) || ""
              }
              onKeyPress={(event) => handleDateKeyPress(event)}
              onChange={(event) =>
                handleDateInputChange(event, setAfterDateCurrentInput)
              }
            />
          </div>
          <div
            className={`app-accordian__panel-inner govuk-form-group  ${
              !isBeforeDateValid && "govuk-form-group--error"
            }`}
          >
            <label className="govuk-label">Updated before</label>
            <div className="govuk-caption-m">
              For example, 2005 or 21/11/2004
            </div>
            {!isBeforeDateValid && (
              <p id="event-name-error" className="govuk-error-message">
                <span className="govuk-visually-hidden">Error:</span> Enter a
                real date
              </p>
            )}
            <input
              className={`govuk-input ${
                !isBeforeDateValid && "govuk-input--error"
              }`}
              id="to-date-input"
              type="text"
              value={beforeDateCurrentInput || ""}
              onKeyPress={(event) => handleDateKeyPress(event)}
              onChange={(event) =>
                handleDateInputChange(event, setBeforeDateCurrentInput)
              }
            />
          </div>
        </div>
      </details>
    </div>
  );
};

export default Filters;
