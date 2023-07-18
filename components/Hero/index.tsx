import Tag from "@/components/Tag";
import { PhaseBannerProps } from "@/components/PhaseBanner";

// The phase banner within the Hero component needs inverse colours to show up
// against a coloured background.

function HeroPhaseBanner({
  href,
  tag,
  className,
  attributes,
}: PhaseBannerProps) {
  return (
    <div
      className={`govuk-phase-banner govuk-phase-banner--inverse govuk-!-margin-bottom-2 ${
        className || ""
      }`}
      {...attributes}
    >
      <p className="govuk-phase-banner__content">
        <Tag
          className={`govuk-phase-banner__content__tag app-hero__phase-banner__tag ${
            tag.className || ""
          }`}
          {...tag.attributes}
        >
          {tag.children}
        </Tag>
        <span className="govuk-phase-banner__text govuk-phase-banner__text--inverse">
          This is a new service - your{" "}
          <a className="govuk-link govuk-link--inverse" href={href}>
            feedback
          </a>{" "}
          will help us to improve it.
        </span>
      </p>
    </div>
  );
}

export default function Hero({
  title,
  description,
  startButton,
  phaseBanner,
}: {
  title: string;
  description: string;
  startButton?: { href: string; text: string };
  phaseBanner?: PhaseBannerProps;
}) {
  return (
    <div className={"app-hero" + (phaseBanner ? " govuk-!-padding-top-0" : "")}>
      <div className="govuk-width-container">
        {phaseBanner ? <HeroPhaseBanner {...phaseBanner} /> : null}
        <h1 className="govuk-heading-xl app-hero__title">{title}</h1>
        <p className="app-hero__description">{description}</p>
        {startButton ? (
          <a
            href={startButton.href}
            role="button"
            draggable="false"
            className="govuk-button govuk-button--inverse govuk-!-margin-top-6 govuk-!-margin-bottom-0 govuk-button--start"
            data-module="govuk-button"
          >
            {startButton.text}
            <svg
              className="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
            </svg>
          </a>
        ) : null}
      </div>
    </div>
  );
}
