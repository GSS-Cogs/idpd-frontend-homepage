import Search from "@/components/Search";

export default function SubHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-sub-hero">
      <div className="app-width-container">{children}</div>
    </div>
  );
}

function SubHeroSearch() {
  return (
    <div className="govuk-form-group">
      <h2 className="govuk-label-wrapper">
        <label className="govuk-label govuk-label--m" htmlFor="sub-hero-search">
          Search the catalogue
        </label>
      </h2>
      <div id="sub-hero-search-hint" className="govuk-hint">
        Search for datasets using keywords.
      </div>
      <Search id="sub-hero-search" ariaDescribedBy="sub-hero-search-hint" />
    </div>
  );
}

function SubHeroButton({ children }: { children: any }) {
  return (
    <a
      href="/datasets"
      role="button"
      draggable="false"
      className="govuk-button"
      data-module="govuk-button"
    >
      {children}
    </a>
  );
}

export { SubHero, SubHeroSearch, SubHeroButton };
