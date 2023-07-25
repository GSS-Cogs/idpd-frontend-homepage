export default function SubHero({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-sub-hero">
      <div className="govuk-width-container">{children}</div>
    </div>
  );
}
