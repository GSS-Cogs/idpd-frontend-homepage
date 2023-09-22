interface Props {
  page: number;
  totalPages: number;
  searchParams: any;
}

const Pagination: React.FC<Props> = ({ page, totalPages, searchParams }) => {
  const nextPage =
    `/datasets?` +
    (searchParams != "" ? `${new URLSearchParams(searchParams)}&` : "") +
    `page=${+page + 1}`;

  const previousPage =
    `/datasets?` +
    (searchParams != "" ? `${new URLSearchParams(searchParams)}&` : "") +
    `page=${page - 1}`;

  return (
    <nav
      className="govuk-pagination govuk-pagination--block"
      role="navigation"
      aria-label="results"
    >
      {page - 1 > 0 && (
        <div className="govuk-pagination__prev">
          <a
            className="govuk-link govuk-pagination__link"
            rel="prev"
            href={previousPage}
          >
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--prev"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            <span className="govuk-pagination__link-title">Previous</span>
            <span className="govuk-visually-hidden">:</span>
            <span className="govuk-pagination__link-label">
              {page - 1} of {totalPages}
            </span>
          </a>
        </div>
      )}
      {page < totalPages && (
        <div className="govuk-pagination__next">
          <a
            className="govuk-link govuk-pagination__link"
            rel="next"
            href={nextPage}
          >
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--next"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>{" "}
            <span className="govuk-pagination__link-title">Next</span>
            <span className="govuk-visually-hidden">:</span>
            <span className="govuk-pagination__link-label">
              {+page + 1} of {totalPages}
            </span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
