interface CardProps {
  heading: string;
  href: string;
  description: string;
}

function Card({ heading, href, description }: CardProps) {
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

function PublisherCard({ heading, href }: CardProps) {
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

export default function CardList({
  items,
  isAlternative = false,
}: {
  items: CardProps[];
  isAlternative?: boolean;
}) {
  return (
    <div className="app-cards">
      <ul className="app-cards__list" data-track-count="cardList">
        {items.map((item) =>
          !isAlternative ? (
            <Card key={item.heading} {...item} />
          ) : (
            <PublisherCard key={item.heading} {...item} />
          )
        )}
      </ul>
    </div>
  );
}
