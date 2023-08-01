import BigNumber from "@/components/BigNumber";
import CardList from "@/components/CardList";
import Hero from "@/components/Hero";
import SubHero from "@/components/Hero/SubHero";
import Search from "@/components/Search";

const CardListItems = [
  {
    heading: "Agriculture, energy and environment",
    href: "",
    description:
      "Food and farming, the natural environment, animal and plant health, flooding and water, fisheries, and environmental quality.",
  },
  {
    heading: "Business, trade and international development",
    href: "",
    description:
      "Company structure, size and location; closures or mergers; and turnover, international and UK trade, and research and development.",
  },
  {
    heading: "Children, education and skills",
    href: "",
    description:
      "Teachers and lecturers, learners, and those not in education, employment or training.",
  },
  {
    heading: "Crime and security",
    href: "",
    description:
      "Crime; justice systems (family, civil and criminal); and policing, people, organizations, and money.",
  },
  {
    heading: "Economy",
    href: "",
    description:
      "The UK economy and the economies of Devolved Administrations and UK regions.",
  },
  {
    heading: "Health and social Care",
    href: "",
    description:
      "Health care provision, social care provision, health status and disease, disability, cause of death, and health and safety at work.",
  },
  {
    heading: "Housing, planning and local services",
    href: "",
    description:
      "Current housing, household estimates and projections, homelessness, housing requirements, and commercial, industrial, retail and residential planning.",
  },
  {
    heading: "Labour market and welfare",
    href: "",
    description:
      "Includes statistics measuring different aspects of work and jobs and covers people's employment, working patterns, and the types of work they do.",
  },
  {
    heading: "Travel, transport and tourism",
    href: "",
    description:
      "All modes of travel and transport, transport infrastructure, and tourism; travel patterns and distances travelled using various modes of transport; and international visits to the UK.",
  },
];

export default async function Home() {
  return (
    <>
      <Hero
        title="Find government statistics and data"
        description="Browse statistical summaries and download associated data to help you understand and analyse our range of statistics."
        startButton={{ href: "/catalogue", text: "View data catalogue" }}
        phaseBanner={{
          href: "#",
          tag: { children: "prototype" },
        }}
      />
      <SubHero>
        <Search />
      </SubHero>
      <div className="app-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={9}
                label="topics"
                subtext="View and download datasets by topics and subtopics"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList items={CardListItems} />
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber number={13} label="publishers" />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <p className="govuk-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                recusandae! Illum eligendi totam sapiente exercitationem quidem
                culpa voluptatem, magni labore animi perferendis adipisci quasi
                tempore molestiae maiores sunt quis voluptatibus.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
