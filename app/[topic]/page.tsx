import Header from "@/components/Header";
import BigNumber from "@/components/BigNumber";
import {
  CardList,
  CardListDatasetCard,
  CardListLink,
  CardListPublisherCard,
  CardListTitle,
  CardListTopicCard,
} from "@/components/CardList";
import {
  Hero,
  HeroMainContent,
  HeroMainContentDescription,
  HeroMainContentTitle,
  HeroPhaseBanner,
  HeroPhaseBannerDescription,
  HeroPhaseBannerTag,
  HeroBreadcrumbs,
  HeroMainContentCaption,
} from "@/components/Hero";

const data = {
  topicTitle: "Agriculture, energy and environment",
  topicDescription:
    "Food and farming, the natural environment, animal and plant health, flooding and water, fisheries, and environmental quality.",
};

const datasetItems = [
  {
    heading:
      "Domestic Energy Performance Certificates for new dwellings by energy efficiency rating (updated)",
    href: "",
  },
  {
    heading:
      "Domestic Energy Performance Certificates for existing dwellings by energy efficiency rating 2022",
    href: "",
  },
  {
    heading:
      "Domestic Energy Performance Certificates for new dwellings by energy efficiency rating 2022",
    href: "",
  },
  {
    heading: "Energy Intensity Extract 1970 - 2021",
    href: "",
  },
  {
    heading: "Inland energy consumption: primary fuel input basis 2021",
    href: "",
  },
];

const subtopicItems = [
  {
    heading: "Chemicals",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Climate change and energy",
    href: "",
    description:
      "Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels (like coal, oil and gas), which produces heat-trapping gases.",
  },
  {
    heading: "Commercial fishing, fisheries and vessels",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Energy infrastructure",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Food and farming",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Marine",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Pollution and environmental quality",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "River maintenance, flooding and coastal erosion",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Rural and countryside",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Waste and recycling",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
  {
    heading: "Wildlife, animals, biodiversity and ecosystems",
    href: "",
    description:
      "Proin massa sapien, posuere in imperdiet vitae, dignissim eu nulla. Maecenas vehicula nulla dui, in vehicula nulla porttitor in. Phasellus dictum aliquam lectus, a condimentum justo iaculis sit amet. Nulla.",
  },
];

const publisherItems = [
  {
    heading: "Department for Business, Energy & Industrial Strategy",
    href: "",
  },
  {
    heading: "Department for Environment, Food & Rural Affairs",
    href: "",
  },
  {
    heading: "Forest Research",
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
    heading: "Office for National Statistics",
    href: "",
  },
  {
    heading: "Welsh Government",
    href: "",
  },
];

const Topics = ({
  params,
  searchParams,
}: {
  params: { topic: string };
  searchParams: any;
}) => {
  return (
    <>
      <Header borderColour="blue-alt-border" />
      <Hero className="app-hero--alternative">
        <HeroPhaseBanner className="govuk-!-padding-top-4">
          <HeroPhaseBannerTag className="app-hero__phase-banner__tag--alternative">
            Alpha
          </HeroPhaseBannerTag>
          <HeroPhaseBannerDescription>
            This is a new service - your{" "}
            <a className="govuk-link govuk-link--inverse" href="/">
              feedback
            </a>{" "}
            will help us to improve it.
          </HeroPhaseBannerDescription>
        </HeroPhaseBanner>
        <HeroBreadcrumbs />
        <HeroMainContent>
          <HeroMainContentCaption>Topic</HeroMainContentCaption>
          <HeroMainContentTitle>{data.topicTitle}</HeroMainContentTitle>
          <HeroMainContentDescription>
            {data.topicDescription}
          </HeroMainContentDescription>
        </HeroMainContent>
      </Hero>
      <div className="app-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={datasetItems.length}
                label="datasets"
                subtext={
                  "View and download datasets related to " +
                  data.topicTitle.toLowerCase()
                }
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListTitle>Latest datasets</CardListTitle>
                <CardListDatasetCard items={datasetItems}></CardListDatasetCard>
                <CardListLink href="/datasets">View all datasets</CardListLink>
              </CardList>
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={subtopicItems.length}
                label="subtopics"
                subtext="View and download datasets by subtopics"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListTopicCard items={subtopicItems}></CardListTopicCard>
              </CardList>
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={publisherItems.length}
                label="publishers"
                subtext="View and download datasets by publishers"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListPublisherCard
                  items={publisherItems}
                ></CardListPublisherCard>
              </CardList>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Topics;
