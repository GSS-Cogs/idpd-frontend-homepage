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

const HeroMainContentCaption = ({ children }: { children: any }) => (
  <span className="govuk-caption-xl app-hero__caption">{children}</span>
);
const HeroMainContentTitle = ({ children }: { children: any }) => (
  <h1 className="govuk-heading-xl app-hero__title">{children}</h1>
);
const HeroMainContentDescription = ({ children }: { children: any }) => (
  <p className="app-hero__description">{children}</p>
);

const HeroActionButton = ({
  children,
  href,
}: {
  children: any;
  href: string;
}) => (
  <a
    href={href}
    role="button"
    draggable="false"
    className="govuk-button govuk-button--inverse govuk-!-margin-top-6 govuk-!-margin-bottom-0 govuk-button--start"
    data-module="govuk-button"
  >
    {children}
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
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={`govuk-phase-banner govuk-phase-banner--inverse govuk-!-margin-bottom-2 ${
        className || ""
      }`}
    >
      <p className="govuk-phase-banner__content">{children}</p>
    </div>
  );
}

function HeroPhaseBannerTag({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <Tag
      className={`govuk-phase-banner__content__tag app-hero__phase-banner__tag ${
        className || ""
      }`}
    >
      {children}
    </Tag>
  );
}

function HeroPhaseBannerDescription({ children }: { children?: any }) {
  return (
    <span className="govuk-phase-banner__text govuk-phase-banner__text--inverse">
      {children}
    </span>
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
  HeroPhaseBannerTag,
  HeroPhaseBannerDescription,
  HeroMainContent,
  HeroMainContentCaption,
  HeroMainContentTitle,
  HeroMainContentDescription,
  HeroActionButton,
};
