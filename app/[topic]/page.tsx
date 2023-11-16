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
import {
  getDatasetsWithSpatialCoverageInfo,
  getTopic,
} from "@/libs/dataRequests";

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

const datasetItems = [
  {
    published: "2021-06-24T08:30:00Z",
    modified: "2021-09-13T15:31:25.606948Z",
    datasetTitle:
      "2005 to 2019 local authority carbon dioxide (CO2) emissions dataset (revised)",
    longDescription:
      "These statistics provide the most reliable and consistent breakdown of CO2\nemissions across the country, using nationally available data sets going back\nto 2005.\n\nThe main data sources are the UK National Atmospheric Emissions Inventory and\nthe BEIS National Statistics of energy consumption for local authority areas.\nAll emissions included in the national inventory are covered, except aviation,\nshipping and military transport, for which there is no obvious basis for\nallocation to local areas.\n\nPublications:\n\n  * statistical summary: one page summary of local authority emissions statistics\n  * statistical release: summary of local authority emissions statistics including UK emissions maps\n  * data tables: all data tables for local authority emissions\n  * technical report: methodology adopted to estimate carbon dioxide emissions at local level\n  * employment based energy consumption mapping in the UK: methodology used to map emissions from smaller industrial and commercial sources\n  * mapping carbon emissions and removals for the land use, land use change and forestry (LULUCF) sector: LULUCF emissions and removals at the local authority level, prepared by the Centre for Ecology and Hydrology (CEH)\n  * dataset of local authority emissions data (revised 5 August 2021: updated to fix formatting error where totals were split over multiple rows: actual figures remain the same)\n\nIn addition, [interactive local authority level emissions\nmaps](http://naei.defra.gov.uk/data/local-authority-co2-map) are published on\nthe National Atmospheric Emissions Inventory (NAEI) website on behalf of BEIS.\nUsers can zoom in to any UK local authority, see the emissions for the area\nand identify the significant point sources, such as iron and steel plants. The\ndata can be filtered by sector, and to see how emissions have changed across\nthe time series.\n\n[Air pollution data](https://naei.beis.gov.uk/reports/reports?report_id=999)\nare also available on a local authority basis which looks at a number of gases\nthat cause air pollution. Carbon dioxide which is presented in the emissions\nreports above is also considered an air pollutant. A number of activities\ncontribute to both air pollutant and carbon dioxide emissions. Other\nactivities that contribute to carbon dioxide emissions do not contribute to\nair pollutant emissions and vice versa.\n\nThis is a National Statistics publication and complies with the code of\npractice for statistics. Please check our frequently asked questions or email\n[Climatechange.Statistics@beis.gov.uk](mailto:Climatechange.Statistics@beis.gov.uk)\nif you have any questions or comments about the information on this page.\n\n  *[CO2]: carbon dioxide\n  *[BEIS]: Department for Business, Energy and Industrial Strategy\n  *[LULUCF]: Land Use, Land Use Change & Forestry\n  *[CEH]: Centre for Ecology and Hydrology\n  *[NAEI]: National Atmospheric Emissions Inventory",
    shortDescription:
      "UK local authority and regional estimates of carbon dioxide emissions.",
    licenceURL: "",
    licence: "",
    creator:
      "https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy",
    publisher: "Department for Business, Energy & Industrial Strategy",
    topicURL: "http://gss-data.org.uk/def/gdp#climate-change",
    topic: "Agriculture, Energy and Environment",
    subTopic: "Climate Change and Energy",
  },
  {
    published: "2022-06-30T08:30:15Z",
    modified: "2022-10-20T20:31:08.078959Z",
    datasetTitle:
      "2005 to 2020 local authority greenhouse gas emissions dataset",
    longDescription:
      "These statistics provide a breakdown of greenhouse gas emissions \nacross the UK, using nationally available datasets going back to 2005. This year we have \nincluded estimates of methane and nitrous oxide emissions in these statistics \nfor the first time, in addition to the carbon dioxide emissions estimates \nwhich were published previously. Estimates of emissions within National Park areas \nhave also been included in the statistics for the first time.\n\nThe main data sources are the UK National Atmospheric Emissions Inventory \nand the BEIS National Statistics of energy consumption for local authority \nareas. All emissions included in the national inventory are covered except \nthose from aviation, shipping and military transport, for which there is no \nobvious basis for allocation to local areas, and emissions of fluorinated gases, \nfor which suitable data are not available to estimate these emissions at a local \nlevel.",
    shortDescription:
      "UK local authority greenhouse gas emissions national ststistics.",
    licenceURL: "",
    licence: "",
    creator:
      "https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy",
    publisher: "Department for Business, Energy & Industrial Strategy",
    topicURL: "http://gss-data.org.uk/def/gdp#climate-change",
    topic: "Agriculture, Energy and Environment",
    subTopic: "Climate Change and Energy",
  },
  {
    published: "2021-02-02T09:30:00Z",
    modified: "2021-09-16T08:22:25.071981Z",
    datasetTitle:
      "2019 UK greenhouse gas emissions: final figures – dataset of emissions by end user",
    longDescription:
      "This publication provides the final estimates of UK territorial greenhouse gas\nemissions going back to 1990.\n\nEstimates are presented by source in February of each year. They are updated\neach year:\n\n  * in March, to include estimates by end-user and fuel type\n  * in June, to include estimates by Standard Industrial Classification (SIC)\n\nThe statistics covers emissions that occur within the UK’s borders. When\nemissions are reported by source, emissions are attributed to the sector that\nemits them directly. When emissions are reported by end-user, energy supply\nemissions by source are reallocated in accordance with where the end-use\nactivity occurred. This reallocation of emissions is based on a modelling\nprocess. For example, all the carbon dioxide produced by a power station is\nallocated to the power station when reporting on a source basis. However, when\napplying the end-user method, these emissions are reallocated to the users of\nthis electricity, such as domestic homes or large industrial users.\n\nBEIS does not estimate emissions outside the UK associated with UK\nconsumption, however the Department for Environment, Food and Rural Affairs\npublishes estimates of the [UK’s carbon\nfootprint](https://www.gov.uk/government/statistics/uks-carbon-footprint)\nannually. The [alternative approaches to reporting UK greenhouse gas emissions\nreport](https://www.gov.uk/government/publications/uk-greenhouse-gas-\nemissions-explanatory-notes) outlines the differences between them.\n\nFor the purposes of reporting, greenhouse gas emissions are allocated into a\nsmall number of broad, high level sectors known as National Communication\nsectors, which are as follows: energy supply, business, transport, public,\nresidential, agriculture, industrial processes, land use land use change and\nforestry (LULUCF), and waste management.\n\nThese high-level sectors are made up of a number of more detailed sectors,\nwhich follow the definitions set out by the [International Panel on Climate\nChange (IPCC)](http://www.ipcc.ch/), and which are used in international\nreporting tables which are submitted to the [United Nations Framework\nConvention on Climate Change (UNFCCC)](https://unfccc.int/) every year. A\n[list of corresponding Global Warming Potentials (GWPs) used and a record of\nbase year emissions](https://www.gov.uk/government/publications/uk-greenhouse-\ngas-emissions-explanatory-notes) are published separately.\n\nThis is a National Statistics publication and complies with the Code of\nPractice for Statistics.\n\nPlease check our [frequently asked\nquestions](https://www.gov.uk/government/publications/uk-greenhouse-gas-\nemissions-statistics-user-guidance) or email\n[Climatechange.Statistics@beis.gov.uk](mailto:Climatechange.Statistics@beis.gov.uk)\nif you have any questions or comments about the information on this page.\n\n  *[SIC]: Standard Industrial Classification\n  *[LULUCF]: land use land use change and forestry\n  *[IPCC]: International Panel on Climate Change\n  *[UNFCCC]: United Nations Framework Convention on Climate Change\n  *[GWPs]: Global Warming Potentials",
    shortDescription:
      "Final estimates of UK territorial greenhouse gas emissions.",
    licenceURL: "",
    licence: "",
    creator:
      "https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy",
    publisher: "Department for Business, Energy & Industrial Strategy",
    topicURL: "http://gss-data.org.uk/def/gdp#climate-change",
    topic: "Agriculture, Energy and Environment",
    subTopic: "Climate Change and Energy",
  },
  {
    published: "2021-02-02T09:30:00Z",
    modified: "2021-09-16T08:56:34.932835Z",
    datasetTitle:
      "2019 UK greenhouse gas emissions: final figures – dataset of emissions by source",
    longDescription:
      "This publication provides the final estimates of UK territorial greenhouse gas\nemissions going back to 1990.\n\nEstimates are presented by source in February of each year. They are updated\neach year:\n\n  * in March, to include estimates by end-user and fuel type\n  * in June, to include estimates by Standard Industrial Classification (SIC)\n\nThe statistics covers emissions that occur within the UK’s borders. When\nemissions are reported by source, emissions are attributed to the sector that\nemits them directly. When emissions are reported by end-user, energy supply\nemissions by source are reallocated in accordance with where the end-use\nactivity occurred. This reallocation of emissions is based on a modelling\nprocess. For example, all the carbon dioxide produced by a power station is\nallocated to the power station when reporting on a source basis. However, when\napplying the end-user method, these emissions are reallocated to the users of\nthis electricity, such as domestic homes or large industrial users.\n\nBEIS does not estimate emissions outside the UK associated with UK\nconsumption, however the Department for Environment, Food and Rural Affairs\npublishes estimates of the [UK’s carbon\nfootprint](https://www.gov.uk/government/statistics/uks-carbon-footprint)\nannually. The [alternative approaches to reporting UK greenhouse gas emissions\nreport](https://www.gov.uk/government/publications/uk-greenhouse-gas-\nemissions-explanatory-notes) outlines the differences between them.\n\nFor the purposes of reporting, greenhouse gas emissions are allocated into a\nsmall number of broad, high level sectors known as National Communication\nsectors, which are as follows: energy supply, business, transport, public,\nresidential, agriculture, industrial processes, land use land use change and\nforestry (LULUCF), and waste management.\n\nThese high-level sectors are made up of a number of more detailed sectors,\nwhich follow the definitions set out by the [International Panel on Climate\nChange (IPCC)](http://www.ipcc.ch/), and which are used in international\nreporting tables which are submitted to the [United Nations Framework\nConvention on Climate Change (UNFCCC)](https://unfccc.int/) every year. A\n[list of corresponding Global Warming Potentials (GWPs) used and a record of\nbase year emissions](https://www.gov.uk/government/publications/uk-greenhouse-\ngas-emissions-explanatory-notes) are published separately.\n\nThis is a National Statistics publication and complies with the Code of\nPractice for Statistics.\n\nPlease check our [frequently asked\nquestions](https://www.gov.uk/government/publications/uk-greenhouse-gas-\nemissions-statistics-user-guidance) or email\n[Climatechange.Statistics@beis.gov.uk](mailto:Climatechange.Statistics@beis.gov.uk)\nif you have any questions or comments about the information on this page.\n\n  *[SIC]: Standard Industrial Classification\n  *[LULUCF]: land use land use change and forestry\n  *[IPCC]: International Panel on Climate Change\n  *[UNFCCC]: United Nations Framework Convention on Climate Change\n  *[GWPs]: Global Warming Potentials",
    shortDescription:
      "Final estimates of UK territorial greenhouse gas emissions.",
    licenceURL: "",
    licence: "",
    creator:
      "https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy",
    publisher: "Department for Business, Energy & Industrial Strategy",
    topicURL: "http://gss-data.org.uk/def/gdp#climate-change",
    topic: "Agriculture, Energy and Environment",
    subTopic: "Climate Change and Energy",
  },
  {
    published: "2022-02-01T09:30:00Z",
    modified: "2022-05-18T15:01:43.016353Z",
    datasetTitle:
      "2020 UK greenhouse gas emissions: final figures - dataset of emissions by end user",
    longDescription: "",
    shortDescription:
      "Final estimates of UK territorial greenhouse gas emissions.",
    licenceURL: "",
    licence: "",
    creator:
      "https://www.gov.uk/government/organisations/department-for-business-energy-and-industrial-strategy",
    publisher: "Department for Business, Energy & Industrial Strategy",
    topicURL: "http://gss-data.org.uk/def/gdp#climate-change",
    topic: "Agriculture, Energy and Environment",
    subTopic: "Climate Change and Energy",
  },
];

const Topics = async ({ params }: { params: { topic: string } }) => {
  const topic = await getTopic(params.topic);
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
                <CardListLink href="/datasets">View all datasets</CardListLink>
              </CardList>
            </div>
          </div>
          {/* <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible"></hr>
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
          </div> */}
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
};

export default Topics;
