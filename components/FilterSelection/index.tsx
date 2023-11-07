"use client";

import { useEffect, useState } from "react";
import SelectCheckbox from "../MultiSelect";

import { useGlobalContext } from "@/app/context/store";
import { isValidDate } from "@/utils/dateValidation";

const topics = [
  { topic: "All topics", subtopics: [] },
  {
    topic: "Agriculture, energy and environment",
    subtopics: [
      "Business and the environment",
      "Climate change and energy",
      "Commercial fishing, fisheries and vessels",
      "Food and farming",
      "Water and Marine Management",
      "Pollution, environmental quality and chemicals",
      "Rural and countryside",
      "Waste and recycling",
      "Wildlife, animals, biodiversity and ecosystems",
    ],
  },
  {
    topic: "Business, trade and international development",
    subtopics: [
      "Business and local business",
      "Charities and social enterprises",
      "Tax and finance",
      "International development",
      "Media and communications",
      "Science and innovation",
      "Trade and investment",
    ],
  },
  {
    topic: "Children, education and skills",
    subtopics: [
      "Funding and finance for students",
      "Further and higher education, skills and vocational training",
      "Inspections and performance of education providers",
      "Pupil wellbeing, behaviour and attendance",
      "School curriculum",
      "Childcare and early years",
      "Special educational needs and disability (SEND) and high needs",
      "Teaching and leadership",
    ],
  },
  {
    topic: "Crime and the Justice System",
    subtopics: [
      "Crime",
      "Justice system",
      "Policing and crime prevention",
      "Violence against women and girls",
    ],
  },
  {
    topic: "Economy",
    subtopics: [
      "Business tax",
      "Brexit",
      "Court claims, debt and bankruptcy",
      "Expenses and employee benefits",
      "Personal tax",
      "Tax evasion and avoidance",
    ],
  },
  {
    topic: "Health and social care",
    subtopics: [
      "Coronavirus",
      "Disabled people",
      "Medicines, medical devices",
      "National Health Service",
      "Public health",
      "Social care",
      "Children’s health and welfare",
      "Wellbeing",
    ],
  },
  {
    topic: "Housing, planning and local services",
    subtopics: [
      "Housing and communities",
      "Rent and mortgages",
      "Planning and building",
      "Local councils and government",
      "Public services",
    ],
  },
  {
    topic: "Immigration and asylum",
    subtopics: [
      "Border control",
      "Immigration offences",
      "Inspections of border, immigration and asylum services",
      "Permanent stay in the UK",
      "Refugees, asylum and human rights",
      "Visas and documentation",
    ],
  },
  {
    topic: "Population and society",
    subtopics: [
      "Certificates, register offices, changes of name or gender",
      "Death and bereavement",
      "Having a child, parenting and adoption",
      "Marriage, civil partnerships and divorce",
      "Adoption, fostering and surrogacy",
      "Pregnancy and birth",
    ],
  },
  {
    topic: "Security, defence and international relations",
    subtopics: [
      "Armed forces and defence",
      "Foreign affairs",
      "International aid and development",
      "Cyber security",
      "National security",
    ],
  },
  {
    topic: "Travel, transport and tourism",
    subtopics: [
      "Living abroad",
      "Travel abroad",
      "Aviation",
      "Driving and roads",
      "Freight, haulage and cargo",
      "Local transport",
      "Maritime and shipping",
      "Rail",
      "Tourism",
    ],
  },
  {
    topic: "Labour market and welfare",
    subtopics: [
      "Self-employment",
      "Trade unions",
      "Work and disabled people",
      "Pensions",
      "Employment",
      "Benefits",
    ],
  },
  {
    topic: "Culture and identity",
    subtopics: [
      "Arts and culture",
      "Charities, volunteering and honours",
      "Digital inclusion and accessibility in society",
      "National events and ceremonies",
      "Sports and leisure",
    ],
  },
];

const publishers = [
  { heading: "All publishers" },
  {
    heading: "Department for Business, Energy & Industrial Strategy",
  },
  {
    heading: "Department for Education",
  },
  {
    heading: "Department for Environment, Food & Rural Affairs",
  },
  {
    heading: "Department for Levelling Up, Housing & Communities",
  },
  {
    heading: "Department for Transport",
  },
  {
    heading: "Forest Research",
  },
  {
    heading: "HM Revenue & Customs",
  },
  {
    heading: "Met Office",
  },
  {
    heading: "Ministry of Housing, Communities & Local Government",
  },
  {
    heading: "Ofcom",
  },
  {
    heading: "Office for Health Improvement and Disparities",
  },
  {
    heading: "Office for National Statistics",
  },
  {
    heading: "Welsh Government",
  },
];

const Filters = ({ searchParams }: { searchParams: any }) => {
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

  useEffect(() => {
    if (afterDate === null) {
      setAfterDateCurrentInput("");
    }
    if (beforeDate === null) {
      setBeforeDateCurrentInput("");
    }
  }, [afterDate, beforeDate]);

  const addPublisher = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const publisher = e.target.value;
    updateFilter("publisher", publisher, setPublisherFilter);
  };

  const addTopic = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topic = e.target.value;
    updateFilter("topic", topic, setTopicFilter);
  };

  const updateFilter = (
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
  };

  const handleDateKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    dateType: "from_date" | "to_date"
  ) => {
    const date = event.currentTarget.value;
    if (event.key === "Enter" && (isValidDate(date) || date === "")) {
      if (dateType === "from_date") {
        setAfterDate(date);
      } else if (dateType === "to_date") {
        setBeforeDate(date);
      }

      const params = new URLSearchParams(window.location.search);
      if (date === "") {
        params.delete(dateType);
      } else {
        params.set(dateType, date);
      }

      const newURL = `${window.location.pathname}?${params}`;
      window.history.pushState(
        { ...window.history.state, as: newURL, url: newURL },
        "",
        newURL
      );
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
              className="govuk-select"
              id="topic-select"
              onChange={addTopic}
              value={(!isJsEnabled ? initialTopicFilter : topicFilter) || ""}
            >
              {topics.map((item) => (
                <option key={item.topic} value={item.topic}>
                  {item.topic}
                </option>
              ))}
            </select>
          </div>
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label">Subtopic</label>
            <SelectCheckbox
              options={
                topicFilter === null
                  ? []
                  : topics.filter((x) => x.topic === topicFilter)[0]?.subtopics
              }
            />
          </div>
        </div>
      </details>
      <details className="app-accordion">
        <summary className="app-accordian__title">Publisher</summary>
        <div className="app-accordian__panel">
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label">Publisher</label>
            <select
              className="govuk-select"
              id="publisher-select"
              onChange={addPublisher}
              value={
                (!isJsEnabled ? initialPublisherFilter : publisherFilter) || ""
              }
            >
              {publishers.map((topic) => (
                <option key={topic.heading} value={topic.heading}>
                  {topic.heading}
                </option>
              ))}
            </select>
          </div>
        </div>
      </details>
      <details className="app-accordion">
        <summary className="app-accordian__title">Updated</summary>
        <div className="app-accordian__panel">
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label">Updated after</label>
            <div className="govuk-caption-m">
              For example, 2005 or 21/11/2004
            </div>
            <input
              className="govuk-input"
              id="from-date-input"
              type="text"
              value={afterDateCurrentInput || ""}
              defaultValue={afterDate || ""}
              onKeyPress={(event) => handleDateKeyPress(event, "from_date")}
              onChange={(event) =>
                handleDateInputChange(event, setAfterDateCurrentInput)
              }
            />
          </div>
          <div className="app-accordian__panel-inner govuk-form-group">
            <label className="govuk-label">Updated before</label>
            <div className="govuk-caption-m">
              For example, 2005 or 21/11/2004
            </div>
            <input
              className="govuk-input"
              id="to-date-input"
              type="text"
              value={beforeDateCurrentInput || ""}
              defaultValue={beforeDate || ""}
              onKeyPress={(event) => handleDateKeyPress(event, "to_date")}
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
