import { CardProps } from "./types";

const CardListTitle = ({ children }: { children: any }) => (
  <h3 className="govuk-heading-m">{children}</h3>
);
const CardListLink = ({ href, children }: { href: string; children: any }) => (
  <a href={href} className="govuk-link app-cards__link">
    {children}
  </a>
);

const CardListPublisherCard = ({ items }: { items: CardProps[] }) => {
  return (
    <ul className="app-cards__list" data-track-count="cardList">
      {items.map((item: CardProps) => (
        <li className="app-cards__list-item--publisher">
          <h2 className="app-cards__sub-heading govuk-heading-s">
            <a
              className="govuk-link app-cards__link--publisher"
              href={item.href}
            >
              {item.heading}
            </a>
          </h2>
        </li>
      ))}
    </ul>
  );
};

const CardListTopicCard = ({ items }: { items: CardProps[] }) => {
  return (
    <ul className="app-cards__list" data-track-count="cardList">
      {items.map((item: CardProps) => (
        <li className="app-cards__list-item--topic">
          <div className="app-cards__list-item-wrapper--topic">
            <h2 className="app-cards__sub-heading govuk-heading-s">
              <a className="govuk-link app-cards__link--topic" href={item.href}>
                {item.heading}
              </a>
            </h2>
            <p className="govuk-body app-cards__description">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const CardListDatasetCard = ({ items }: { items: CardProps[] }) => {
  return (
    <ul
      className="app-cards__list app-cards__list--one-column"
      data-track-count="cardList"
    >
      {items.map((item: CardProps) => (
        <li className="app-cards__list-item--dataset">
          <h2 className="app-cards__sub-heading--dataset govuk-heading-s">
            <a className="govuk-link app-cards__link--dataset" href={item.href}>
              {item.heading}
            </a>
          </h2>
        </li>
      ))}
    </ul>
  );
};

const CardList = ({ children }: { children: any }) => {
  return <div className="app-cards">{children}</div>;
};

export {
  CardList,
  CardListTitle,
  CardListLink,
  CardListTopicCard,
  CardListPublisherCard,
  CardListDatasetCard,
};
