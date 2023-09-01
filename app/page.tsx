import BigNumber from "@/components/BigNumber";
import CardList from "@/components/CardList";
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
import SubHero from "@/components/Hero/SubHero";
import Search from "@/components/Search";
import { PublisherCard, TopicCard } from "@/components/CardList/CardTypes";

const CardListTopicItems = [
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

const CardListPublisherItems = [
  {
    heading: "Department for Business, Energy & Industrial Strategy",
    href: "",
  },
  {
    heading: "Department for Education",
    href: "",
  },
  {
    heading: "Department for Environment, Food & Rural Affairs",
    href: "",
  },
  {
    heading: "Department for Levelling Up, Housing & Communities",
    href: "",
  },
  {
    heading: "Department for Transport",
    href: "",
  },
  {
    heading: "Forest Research",
    href: "",
  },
  {
    heading: "HM Revenue & Customs",
    href: "",
  },
  {
    heading: "Met Office",
    href: "",
  },
  {
    heading: "Ministry of Housing, Communities & Local Government",
    href: "",
  },
  {
    heading: "Ofcom",
    href: "",
  },
  {
    heading: "Office for Health Improvement and Disparities",
    href: "",
  },
  {
    heading: "Office for National Statistics",
    href: "",
  },
  {
    heading: "Welsh Government",
    href: "",
  },
];

export default async function Home() {
  return (
    <>
      <Hero>
        <HeroPhaseBanner>
          <HeroPhaseBannerTag>Alpha</HeroPhaseBannerTag>
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
        <HeroActionButton href="/catalogue">
          View data catalogue
        </HeroActionButton>
      </Hero>
      <SubHero>
        <Search />
      </SubHero>
      <div className="app-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={9}
                label="topics"
                subtext="View and download datasets by topics and subtopics"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList items={CardListTopicItems} CardComponent={TopicCard} />
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={13}
                label="publishers"
                subtext="View and download datasets by publishers"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList
                items={CardListPublisherItems}
                CardComponent={PublisherCard}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
