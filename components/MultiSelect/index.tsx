"use client";
import { useState } from "react";
import { useGlobalContext } from "@/app/context/store";

const MultiSelect = ({ options }: { options: string[] }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { subtopicsFilter, setSubtopicsFilter } = useGlobalContext();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleOption = async (option: string) => {
    const updatedOptions = subtopicsFilter?.includes(option)
      ? subtopicsFilter.filter((o) => o !== option)
      : [...(subtopicsFilter || []), option];

    addSubtopics([...updatedOptions]);
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

  return (
    <div className="app-multi-select">
      {options?.length > 0 ? (
        <div
          className={`govuk-select app-multi-select__box ${
            isOpen ? "app-multi-select__box--open" : ""
          }`}
          onClick={toggleDropdown}
          tabIndex={0}
          // todo this can be done better
          onKeyDown={(e) =>
            e.key == " " || e.code == "Space"
              ? (e.preventDefault(), toggleDropdown())
              : null
          }
        >
          {subtopicsFilter?.length === 0 ? (
            <div className="app-multi-select__option">All subtopics</div>
          ) : (
            subtopicsFilter?.map((option) => option).join(", ")
          )}
        </div>
      ) : (
        <div className={`app-multi-select__box--disabled govuk-select`}>
          <div className="app-multi-select__option app-multi-select__option--disabled">
            All subtopics
          </div>
        </div>
      )}
      {isOpen && (
        <div className="app-multi-select__dropdown govuk-checkboxes govuk-checkboxes--small">
          {options.map((option: string) => (
            <div
              key={option}
              className="govuk-checkboxes__item"
              style={{ marginLeft: 10 }}
            >
              <input
                className="govuk-checkboxes__input"
                type="checkbox"
                defaultChecked={subtopicsFilter?.includes(option)}
                onChange={() => toggleOption(option)}
              />
              <label className="govuk-label govuk-checkboxes__label">
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
