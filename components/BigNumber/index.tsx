export default function BigNumber({
  number,
  label,
  href,
  subtext,
  className,
  attributes,
}: {
  number: number;
  label?: string;
  href?: string;
  subtext?: string;
  className?: string;
  attributes?: object;
}) {
  return (
    <>
      <div
        className={`app-big-number govuk-!-margin-bottom-3 ${className || ""}`}
        {...attributes}
      >
        {href ? (
          label ? (
            <a className="govuk-link app-big-number__link" href={href}>
              <span className="app-big-number__value">{number}</span>
              <span className="govuk-visually-hidden">&nbsp;</span>
              <span className="app-big-number__label">{label}</span>
            </a>
          ) : (
            <a className="govuk-link app-big-number__link" href={href}>
              <span className="app-big-number__value app-big-number__value--decorated">
                {number}
              </span>
            </a>
          )
        ) : (
          <>
            <span className="app-big-number__value">{number}</span>
            <span className="govuk-visually-hidden">&nbsp;</span>
            <span className="app-big-number__label">{label}</span>
          </>
        )}
        {subtext ? (
          <div className="app-big-number__subtext">{subtext}</div>
        ) : null}
      </div>
    </>
  );
}
