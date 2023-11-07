export default function Search({
  id,
  ariaDescribedBy,
}: {
  id?: string;
  ariaDescribedBy?: string;
}) {
  return (
    <div className="govuk-form-group govuk-search--on-white">
      <div className="govuk-input__wrapper">
        <input
          className="govuk-input govuk-search__item govuk-search__input js-class-toggle"
          id={id}
          name="q"
          type="search"
          aria-describedby={ariaDescribedBy}
        />
        <div className="govuk-search__item govuk-search__submit-wrapper">
          <button
            className="govuk-search__submit"
            type="submit"
            data-module="gem-track-click"
          >
            Search
            <svg
              className="govuk-search__icon"
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <circle
                cx="12.0161"
                cy="11.0161"
                r="8.51613"
                stroke="currentColor"
                strokeWidth="3"
              ></circle>
              <line
                x1="17.8668"
                y1="17.3587"
                x2="26.4475"
                y2="25.9393"
                stroke="currentColor"
                strokeWidth="3"
              ></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
