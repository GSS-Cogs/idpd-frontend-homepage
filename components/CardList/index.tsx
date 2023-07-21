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

export default function CardList({ items }: { items: CardProps[] }) {
  return (
    <div className="app-cards">
      <ul className="app-cards__list" data-track-count="cardList">
        {items.map((item) => (
          <Card key={item.heading} {...item} />
        ))}
      </ul>
    </div>
  );
}
