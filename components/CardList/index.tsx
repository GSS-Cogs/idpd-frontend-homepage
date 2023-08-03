import { CardProps } from "./types";

export default function CardList({
  items,
  CardComponent,
}: {
  items: CardProps[];
  CardComponent: React.ComponentType<CardProps>;
}) {
  return (
    <div className="app-cards">
      <ul className="app-cards__list" data-track-count="cardList">
        {items.map((item) => (
          <CardComponent key={item.heading} {...item} />
        ))}
      </ul>
    </div>
  );
}
