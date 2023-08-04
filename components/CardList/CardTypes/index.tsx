import { CardProps } from "../types";

export function PublisherCard({ heading, href }: CardProps) {
  return (
    <li className="app-cards__list-item--publisher">
      <h2 className="app-cards__sub-heading govuk-heading-s">
        <a className="govuk-link app-cards__link--publisher" href={href}>
          {heading}
        </a>
      </h2>
    </li>
  );
}

export function TopicCard({ heading, href, description }: CardProps) {
  return (
    <li className="app-cards__list-item--topic">
      <div className="app-cards__list-item-wrapper--topic">
        <h2 className="app-cards__sub-heading govuk-heading-s">
          <a className="govuk-link app-cards__link--topic" href={href}>
            {heading}
          </a>
        </h2>
        <p className="govuk-body app-cards__description">{description}</p>
      </div>
    </li>
  );
}
