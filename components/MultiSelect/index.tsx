"use client";
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context/store";

const MultiSelect = ({
  options,
  searchParams,
}: {
  options: any[];
  searchParams: any;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isJsEnabled, setIsJsEnabled] = useState(false);

  const jsCheck = () => {
    const hasJavaScript =
      typeof window !== "undefined" && "IntersectionObserver" in window;
    setIsJsEnabled(hasJavaScript);
  };
  useEffect(() => {
    jsCheck();
  });

  const { subtopicsFilter, setSubtopicsFilter } = useGlobalContext();
  const initialSubtopicsFilter = searchParams?.subtopics;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const addSubtopics = (subtopics: string[]) => {
    const params = new URLSearchParams(window.location.search);

    params.delete("subtopics");
    subtopics.forEach((x) => {
      params.append("subtopics", x);
    });

    const newURL = `${window.location.pathname}?${params}`;
    history.pushState(null, "", newURL);
    setSubtopicsFilter(subtopics);
  };

  const CheckboxItem = useCallback(
    ({ option }: { option: string }) => {
      const toggleOption = async (option: string) => {
        const updatedOptions = subtopicsFilter?.includes(option)
          ? subtopicsFilter.filter((o) => o !== option)
          : [...(subtopicsFilter || []), option];

        addSubtopics([...updatedOptions]);
      };

      return (
        <div className="govuk-checkboxes__item" style={{ marginLeft: 10 }}>
          <input
            className="govuk-checkboxes__input"
            type="checkbox"
            checked={subtopicsFilter?.includes(option)}
            onChange={() => toggleOption(option)}
          />
          <label className="govuk-label govuk-checkboxes__label">
            {option}
          </label>
        </div>
      );
    },
    [subtopicsFilter]
  );

  const SubtopicsDisplayContainer = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <div
      className={`govuk-select app-multi-select__box ${
        isOpen ? "app-multi-select__box--open" : ""
      }`}
      onClick={toggleDropdown}
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e)}
    >
      {children}
    </div>
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      toggleDropdown();
    }
  };

  const SubtopicsDisplay = () => {
    const displayText = !isJsEnabled
      ? Array.isArray(initialSubtopicsFilter)
        ? initialSubtopicsFilter.join(", ")
        : initialSubtopicsFilter
      : subtopicsFilter?.join(", ");

    const shouldShowAllSubtopics =
      (!isJsEnabled && !initialSubtopicsFilter?.length) ||
      (isJsEnabled && !subtopicsFilter?.length);

    return (
      <div
        className={`app-multi-select__option ${
          isOpen && "app-multi-select__option--open"
        }`}
      >
        {shouldShowAllSubtopics ? "All subtopics" : displayText}
      </div>
    );
  };

  return (
    <div className="app-multi-select">
      {options?.length > 0 ? (
        <SubtopicsDisplayContainer>
          <SubtopicsDisplay />
        </SubtopicsDisplayContainer>
      ) : (
        <div className={`app-multi-select__box--disabled govuk-select`}>
          <div className="app-multi-select__option app-multi-select__option--disabled">
            All subtopics
          </div>
        </div>
      )}
      {isOpen && (
        <div className="app-multi-select__dropdown govuk-checkboxes govuk-checkboxes--small">
          {options?.map((option) => (
            <CheckboxItem option={option.title} key={option.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
