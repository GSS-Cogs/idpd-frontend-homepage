import Tag from "@/components/Tag";
import { PhaseBannerProps } from "@/components/PhaseBanner";

// The phase banner within the Hero component needs inverse colours to show up
// against a coloured background.

const HeroBreadcrumbs = () => {
  return (
    <div className="govuk-breadcrumbs govuk-breadcrumbs--inverse">
      <ol className="govuk-breadcrumbs__list">
        <li className="govuk-breadcrumbs__list-item">
          <a className="govuk-breadcrumbs__link" href="#">
            Home
          </a>
        </li>
      </ol>
    </div>
  );
};

const HeroMainContent = ({ children }: { children: any }) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">{children}</div>
    </div>
  );
};

const HeroMainContentCaption = ({ caption }: { caption: string }) => (
  <span className="govuk-caption-xl app-hero__caption">{caption}</span>
);
const HeroMainContentTitle = ({ title }: { title: string }) => (
  <h1 className="govuk-heading-xl app-hero__title">{title}</h1>
);
const HeroMainContentDescription = ({
  description,
}: {
  description: string;
}) => <p className="app-hero__description">{description}</p>;

const HeroActionButton = ({ href, text }: { href: string; text: string }) => (
  <a
    href={href}
    role="button"
    draggable="false"
    className="govuk-button govuk-button--inverse govuk-!-margin-top-6 govuk-!-margin-bottom-0 govuk-button--start"
    data-module="govuk-button"
  >
    {text}
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
);

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

function Hero({ children, className }: { children: any; className?: string }) {
  return (
    <div
      className={
        `app-hero ${className} govuk-!-padding-top-0` //todo change this for phasebanner conditional
      }
    >
      <div className="app-width-container">{children}</div>
    </div>
  );
}

export {
  Hero,
  HeroBreadcrumbs,
  HeroPhaseBanner,
  HeroMainContent,
  HeroMainContentCaption,
  HeroMainContentTitle,
  HeroMainContentDescription,
  HeroActionButton,
};
