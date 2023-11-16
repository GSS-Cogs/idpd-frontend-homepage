import { CardProps } from "./types";
import Image from "next/image";

const CardListTitle = ({ children }: { children: any }) => (
  <h3 className="govuk-heading-m app-cards__title">{children}</h3>
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
        <li className="app-cards__list-item--publisher" key={item.heading}>
          <h2 className="app-cards__sub-heading--publisher govuk-heading-s">
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
        <li className="app-cards__list-item--topic" key={item.heading}>
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

function formatDate(date: string) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return d
    .toLocaleDateString("en-GB", options)
    .replace(",", "")
    .replace(/( AM| PM)/g, (m) => m.trim().toLowerCase());
}

const CardListDatasetCard = ({ items }: { items: any }) => {
  return (
    <ul
      className="app-cards__list app-cards__list--one-column"
      data-track-count="cardList"
    >
      {items.map((item: any) => (
        <>
          <DatasetCardDesktopView item={item} />
          <DatasetCardMobileView item={item} />
        </>
      ))}
    </ul>
  );
};

const DatasetCardDesktopView = ({ item }: { item: any }) => {
  return (
    <li className="app-cards__list-item--dataset">
      <h2 className="app-cards__sub-heading--dataset govuk-heading-s">
        <a className="govuk-link app-cards__link--dataset" href={item.creator}>
          {item?.datasetTitle}
        </a>
      </h2>
    </li>
  );
};

const DatasetCardMobileView = ({ item }: { item: any }) => {
  return (
    <li className="app-datasets-list__item">
      <div className="app-datasets-list__item-top">
        <a
          className="app-datasets-list__item-title app-datasets-list__item-title--context govuk-link"
          href={item.creator}
        >
          {item?.datasetTitle}
        </a>
        <p className="app-datasets-list__item-description">
          {item?.shortDescription}
        </p>
      </div>
      <div className="app-datasets-list__item-bottom">
        <div className="app-datasets-list__item-bottom-publisher">
          <Image
            src="/assets/images/crest.png"
            width={40}
            height={34}
            alt="Govuk Crest"
          />
          <h3 className="app-datasets-list__item-publisher-inner">
            {item?.publisher}
          </h3>
        </div>
        <ul
          className="app-datasets-list__item-metadata"
          style={{ textAlign: "right" }}
        >
          <li className="app-datasets-list__item-metadata-row">
            <div>{item?.topic}</div>
          </li>
          <li className="app-datasets-list__item-metadata-row">
            <time dateTime={item.modified?.value}>{item?.subTopic}</time>
          </li>
          <li className="app-datasets-list__item-metadata-row">
            <time dateTime={item.modified?.value}>
              Updated: {formatDate(item.modified)}
            </time>
          </li>
        </ul>
      </div>
    </li>
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
