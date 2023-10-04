"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

interface ContextProps {
  topicFilter: string | null;
  setTopicFilter: Dispatch<SetStateAction<string | null>>;

  subtopicsFilter: string[];
  setSubtopicsFilter: Dispatch<SetStateAction<string[]>>;

  publisherFilter: string | null;
  setPublisherFilter: Dispatch<SetStateAction<string | null>>;

  afterDate: string | null;
  setAfterDate: Dispatch<SetStateAction<string | null>>;

  beforeDate: string | null;
  setBeforeDate: Dispatch<SetStateAction<string | null>>;

  setAllFilters: () => void;

  fullSearchParams: URLSearchParams | null;
  setFullSearchParams: Dispatch<SetStateAction<URLSearchParams | null>>;
}

const GlobalContext = createContext<ContextProps>({
  topicFilter: null,
  setTopicFilter: () => {},
  subtopicsFilter: [],
  setSubtopicsFilter: () => {},
  publisherFilter: null,
  setPublisherFilter: () => {},
  afterDate: null,
  setAfterDate: () => {},
  beforeDate: null,
  setBeforeDate: () => {},
  setAllFilters: () => {},
  fullSearchParams: null,
  setFullSearchParams: () => {},
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [topicFilter, setTopicFilter] = useState<string | null>(null);
  const [subtopicsFilter, setSubtopicsFilter] = useState<[] | string[]>([]);
  const [publisherFilter, setPublisherFilter] = useState<string | null>(null);
  const [afterDate, setAfterDate] = useState<string | null>(null);
  const [beforeDate, setBeforeDate] = useState<string | null>(null);
  const [fullSearchParams, setFullSearchParams] =
    useState<URLSearchParams | null>(null);

  const setAllFilters = () => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get("topic") || null;
    if (topic !== topicFilter && topicFilter !== null) {
      setSubtopicsFilter([]);
    } else {
      const subtopics = params.getAll("subtopics");
      setSubtopicsFilter(subtopics);
    }

    setFullSearchParams(params);
    setTopicFilter(topic);
    setPublisherFilter(params.get("publisher") || null);
    setBeforeDate(params.get("to_date") || null);
    setAfterDate(params.get("from_date") || null);
  };

  return (
    <GlobalContext.Provider
      value={{
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
        fullSearchParams,
        setFullSearchParams,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
