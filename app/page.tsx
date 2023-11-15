import BigNumber from "@/components/BigNumber";
import {
  CardList,
  CardListPublisherCard,
  CardListTopicCard,
} from "@/components/CardList";
import {
  Hero,
  HeroActionButton,
  HeroMainContent,
  HeroMainContentDescription,
  HeroMainContentTitle,
  HeroPhaseBanner,
  HeroPhaseBannerTag,
  HeroPhaseBannerDescription,
} from "@/components/Hero";
import {
  SubHero,
  SubHeroButton,
  SubHeroSearch,
} from "@/components/Hero/SubHero";
import Search from "@/components/Search";
import Header from "@/components/Header";
import { getPublishers } from "@/libs/dataRequests";

const CardListTopicItems = [
  {
    heading: "Agriculture, energy and environment",
    href: "/agriculture-energy-and-environment",
    description:
      "Food and farming, the natural environment, animal and plant health, flooding and water, fisheries, and environmental quality.",
  },
  {
    heading: "Business, trade and international development",
    href: "/business-trade-and-international-development",
    description:
      "Company structure, size and location; closures or mergers; and turnover, international and UK trade, and research and development.",
  },
  {
    heading: "Children, education and skills",
    href: "/children-education-and-skills",
    description:
      "Teachers and lecturers, learners, and those not in education, employment or training.",
  },
  {
    heading: "Crime and security",
    href: "/crime-and-security",
    description:
      "Crime; justice systems (family, civil and criminal); and policing, people, organizations, and money.",
  },
  {
    heading: "Economy",
    href: "/economy",
    description:
      "The UK economy and the economies of Devolved Administrations and UK regions.",
  },
  {
    heading: "Health and social care",
    href: "/health-and-social-care",
    description:
      "Health care provision, social care provision, health status and disease, disability, cause of death, and health and safety at work.",
  },
  {
    heading: "Housing, planning and local services",
    href: "/housing-planning-and-local-services",
    description:
      "Current housing, household estimates and projections, homelessness, housing requirements, and commercial, industrial, retail and residential planning.",
  },
  {
    heading: "Labour market and welfare",
    href: "/labour-market-and-welfare",
    description:
      "Includes statistics measuring different aspects of work and jobs and covers people's employment, working patterns, and the types of work they do.",
  },
  {
    heading: "Travel, transport and tourism",
    href: "/travel-transport-and-tourism",
    description:
      "All modes of travel and transport, transport infrastructure, and tourism; travel patterns and distances travelled using various modes of transport; and international visits to the UK.",
  },
];

export default async function Home() {
  const publishers = await getPublishers();

  const datasets = 189;
  return (
    <>
      <Header />
      <Hero>
        <HeroPhaseBanner>
          <HeroPhaseBannerTag>Prototype</HeroPhaseBannerTag>
          <HeroPhaseBannerDescription>
            This is a new service - your{" "}
            <a className="govuk-link govuk-link--inverse" href="/">
              feedback
            </a>{" "}
            will help us to improve it.
          </HeroPhaseBannerDescription>
        </HeroPhaseBanner>
        <HeroMainContent>
          <HeroMainContentTitle>
            Find government statistics and data
          </HeroMainContentTitle>
          <HeroMainContentDescription>
            Browse statistical summaries and download associated data to help
            you understand and analyse our range of statistics.
          </HeroMainContentDescription>
        </HeroMainContent>
      </Hero>
      <SubHero>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">Explore our data</h2>
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half app-sub-hero__search--divider">
            <SubHeroSearch />
          </div>
          <div className="govuk-grid-column-one-half">
            <h2 className="govuk-label-wrapper">
              <span className=" govuk-label govuk-label--m">
                {datasets} datasets
              </span>
            </h2>
            <div className="govuk-hint">
              Browse datasets in the dataset catalogue.
            </div>
            <SubHeroButton>View all datasets</SubHeroButton>
          </div>
        </div>
      </SubHero>
      <div className="app-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          {/* <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={9}
                label="topics"
                subtext="View and download datasets by topics and subtopics"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListTopicCard
                  items={CardListTopicItems}
                ></CardListTopicCard>
              </CardList>
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr> */}
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={13}
                label="publishers"
                subtext="View and download datasets by publishers"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListPublisherCard
                  items={publishers.publishers}
                ></CardListPublisherCard>
              </CardList>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
