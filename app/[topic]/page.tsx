import Header from "@/components/Header";
import BigNumber from "@/components/BigNumber";
import {
  CardList,
  CardListDatasetCard,
  CardListLink,
  CardListPublisherCard,
  CardListSubtopicCard,
  CardListTitle,
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
import {
  getDatasetsWithSpatialCoverageInfo,
  getTopic,
  getSubtopics,
} from "@/libs/dataRequests";

const Topics = async ({ params }: { params: { topic: string } }) => {
  const topic = await getTopic(params.topic);
  const subtopics = await getSubtopics(params.topic);
  const datasets = await getDatasetsWithSpatialCoverageInfo();

  const getUniquePublishers = (datasets: any[]): any[] => {
    // this gets a unique list of publishers based on if they have a dataset with the given topic
    const uniquePublishers = new Set<string>();
    const publisherFulls: string[] = [];
    const filteredDatasets = datasets.filter((item) =>
      item.topics.includes(topic["@id"])
    );

    filteredDatasets.forEach((dataset) => {
      if (!uniquePublishers.has(dataset.publisher)) {
        uniquePublishers.add(dataset.publisher);
        publisherFulls.push(dataset.publisher_full);
      }
    });

    return publisherFulls;
  };
  const publishers = getUniquePublishers(datasets.datasets);

  const getLatestRelatedDatasets = (datasets: any[]) => {
    const filteredDatasets = datasets.filter((item) =>
      item.topics.includes(topic["@id"])
    );

    const sortedDatasets = filteredDatasets.sort((a, b) => {
      const dateA = new Date(a.issued);
      const dateB = new Date(b.issued);

      return dateA.getTime() - dateB.getTime();
    });

    return sortedDatasets;
  };

  const latestDatasets = getLatestRelatedDatasets(datasets.datasets);

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
          <HeroMainContentTitle>{topic.title}</HeroMainContentTitle>
          <HeroMainContentDescription>
            {topic.description}
          </HeroMainContentDescription>
        </HeroMainContent>
      </Hero>
      <div className="app-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row app-section-row">
            <div className="govuk-grid-column-one-quarter">
              <BigNumber
                number={latestDatasets.length}
                label="datasets"
                subtext={
                  "View and download datasets related to " +
                  topic.title.toLowerCase()
                }
              />
            </div>
            <div className="govuk-grid-column-three-quarters">
              <CardList>
                <CardListTitle>Latest datasets</CardListTitle>
                <CardListDatasetCard
                  items={latestDatasets}
                ></CardListDatasetCard>
                <CardListLink
                  href={"/datasets?topic=" + encodeURIComponent(topic.title)}
                >
                  View all datasets
                </CardListLink>
              </CardList>
            </div>
          </div>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
          {subtopics && (
            <>
              <div className="govuk-grid-row app-section-row">
                <div className="govuk-grid-column-one-quarter">
                  <BigNumber
                    number={subtopics?.topics.length}
                    label="subtopics"
                    subtext="View and download datasets by subtopics"
                  />
                </div>

                <div className="govuk-grid-column-three-quarters">
                  <CardList>
                    <CardListSubtopicCard
                      items={subtopics?.topics}
                      parentTopic={topic}
                    ></CardListSubtopicCard>
                  </CardList>
                </div>
              </div>
              <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
            </>
          )}
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
};

export default Topics;
