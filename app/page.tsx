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
import {
  getDatasetsWithSpatialCoverageInfo,
  getTopics,
} from "@/libs/dataRequests";

export default async function Home() {
  const datasets = await getDatasetsWithSpatialCoverageInfo();
  const topics = await getTopics();

  const getParentTopics = (topics: any[]) => {
    const filteredTopics = topics.filter(
      (topic) => topic.parent_topics.length === 0
    );
    return filteredTopics;
  };
  const parentTopics = getParentTopics(topics.topics);

  const getUniquePublishers = (datasets: any[]): any[] => {
    const uniquePublishers = new Set<string>();
    const publisherFulls: string[] = [];

    datasets.forEach((dataset) => {
      if (!uniquePublishers.has(dataset.publisher)) {
        uniquePublishers.add(dataset.publisher);
        publisherFulls.push(dataset.publisher_full);
      }
    });

    return publisherFulls;
  };
  const publishers = getUniquePublishers(datasets.datasets);

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
                {datasets.datasets.length} datasets
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
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={9}
                label="topics"
                subtext="View and download datasets by topics and subtopics"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListTopicCard items={parentTopics}></CardListTopicCard>
              </CardList>
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={publishers.length}
                label="publishers"
                subtext="View and download datasets by publishers"
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListPublisherCard
                  items={publishers}
                ></CardListPublisherCard>
              </CardList>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
