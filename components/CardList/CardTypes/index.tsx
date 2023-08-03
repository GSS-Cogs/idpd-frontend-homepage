import { CardProps } from "../types";

export function PublisherCard({ heading, href }: CardProps) {
  return (
    <li className="app-cards-publisher__list-item">
      <div className="app-cards-publisher__list-item-wrapper">
        <h2 className="app-cards__sub-heading govuk-heading-s">
          <a className="govuk-link app-cards-publisher__link" href={href}>
            {heading}
          </a>
        </h2>
      </div>
    </li>
  );
}

export function TopicCard({ heading, href, description }: CardProps) {
  return (
    <li className="app-cards__list-item">
      <div className="app-cards__list-item-wrapper">
        <h2 className="app-cards__sub-heading govuk-heading-s">
          <a className="govuk-link app-cards__link" href={href}>
            {heading}
          </a>
        </h2>
        <p className="govuk-body app-cards__description">{description}</p>
      </div>
    </li>
  );
}
