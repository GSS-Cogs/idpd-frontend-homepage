import Image from "next/image";

const CardListTitle = ({ children }: { children: any }) => (
  <h3 className="govuk-heading-m app-cards__title">{children}</h3>
);
const CardListLink = ({ href, children }: { href: string; children: any }) => (
  <a href={href} className="govuk-link app-cards__link">
    {children}
  </a>
);

const CardListPublisherCard = ({ items }: { items: { title: string }[] }) => {
  return (
    <ul className="app-cards__list" data-track-count="cardList">
      {items.map((item: { title: string }, index: number) => (
        <li
          className="app-cards__list-item--publisher"
          key={item.title + index}
        >
          <h2 className="app-cards__sub-heading--publisher govuk-heading-s">
            <a
              className="govuk-link app-cards__link--publisher"
              href={"/datasets?publisher=" + encodeURIComponent(item.title)}
            >
              {item.title}
            </a>
          </h2>
        </li>
      ))}
    </ul>
  );
};

const CardListSubtopicCard = ({
  items,
  parentTopic,
}: {
  items: { title: string; description: string }[];
  parentTopic: { title: string };
}) => {
  const getDatasetHref = (id: string) => {
    return (
      "/datasets?topic=" +
      encodeURIComponent(parentTopic.title) +
      "&subtopics=" +
      encodeURIComponent(id)
    );
  };

  return (
    <ul className="app-cards__list" data-track-count="cardList">
      {items.map(
        (item: { title: string; description: string }, index: number) => (
          <li className="app-cards__list-item--topic" key={item.title + index}>
            <div className="app-cards__list-item-wrapper--topic">
              <h2 className="app-cards__sub-heading govuk-heading-s">
                <a
                  className="govuk-link app-cards__link--topic"
                  href={getDatasetHref(item.title)}
                >
                  {item.title}
                </a>
              </h2>
              <p className="govuk-body app-cards__description">
                {item.description}
              </p>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

const CardListTopicCard = ({
  items,
}: {
  items: { title: string; description: string; identifier: string }[];
}) => {
  const getTopicHref = (id: string) => {
    return "/" + encodeURIComponent(id);
  };

  return (
    <ul className="app-cards__list" data-track-count="cardList">
      {items.map(
        (
          item: { title: string; description: string; identifier: string },
          index: number
        ) => (
          <li className="app-cards__list-item--topic" key={item.title + index}>
            <div className="app-cards__list-item-wrapper--topic">
              <h2 className="app-cards__sub-heading govuk-heading-s">
                <a
                  className="govuk-link app-cards__link--topic"
                  href={getTopicHref(item.identifier)}
                >
                  {item.title}
                </a>
              </h2>
              <p className="govuk-body app-cards__description">
                {item.description}
              </p>
            </div>
          </li>
        )
      )}
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
        <a className="govuk-link app-cards__link--dataset" href={item["@id"]}>
          {item?.title}
        </a>
      </h2>
    </li>
  );
};

const DatasetCardMobileView = ({ item }: { item: any }) => {
  return (
    <li className="app-cards__item">
      <div className="app-cards__item-top">
        <a
          className="app-cards__item-title app-cards__item-title--context govuk-link"
          href={item.creator}
        >
          {item?.title}
        </a>
        <p className="app-cards__item-description">{item?.summary}</p>
      </div>
      <div className="app-cards__item-bottom">
        <div className="app-cards__item-bottom-publisher">
          <Image
            src="/assets/images/crest.png"
            width={40}
            height={34}
            alt="Govuk Crest"
          />
          <h3 className="app-cards__item-publisher-inner">
            {item?.publisher_full.title}
          </h3>
        </div>
        <ul className="app-cards__item-metadata" style={{ textAlign: "right" }}>
          <li className="app-cards__item-metadata-row">
            <div>{item?.topic}</div>
          </li>
          <li className="app-cards__item-metadata-row">
            <time dateTime={item.modified?.value}>{item?.subTopic}</time>
          </li>
          <li className="app-cards__item-metadata-row">
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
  CardListSubtopicCard,
  CardListPublisherCard,
  CardListDatasetCard,
};
