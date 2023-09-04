import "./datasets.scss";
import Search from "@/components/Search";
import Breadcrumbs from "@/components/Breadcrumbs";
import DatasetsList from "@/components/DatasetsList";
import PhaseBanner from "@/components/PhaseBanner";

import data from "../data/data.json";

const topics = [
  {
    topic: "Agriculture, energy and environment",
    subtopics: [
      "Business and the environment",
      "Climate change and energy",
      "Commercial fishing, fisheries and vessels",
      "Food and farming",
      "Water and Marine Management",
      "Pollution, environmental quality and chemicals",
      "Rural and countryside",
      "Waste and recycling",
      "Wildlife, animals, biodiversity and ecosystems",
    ],
  },
  {
    topic: "Business, trade and international development",
    subtopics: [
      "Business and local business",
      "Charities and social enterprises",
      "Tax and finance",
      "International development",
      "Media and communications",
      "Science and innovation",
      "Trade and investment",
    ],
  },
  {
    topic: "Children, education and skills",
    subtopics: [
      "Funding and finance for students",
      "Further and higher education, skills and vocational training",
      "Inspections and performance of education providers",
      "Pupil wellbeing, behaviour and attendance",
      "School curriculum",
      "Childcare and early years",
      "Special educational needs and disability (SEND) and high needs",
      "Teaching and leadership",
    ],
  },
  {
    topic: "Crime and the Justice System",
    subtopics: [
      "Crime",
      "Justice system",
      "Policing and crime prevention",
      "Violence against women and girls",
    ],
  },
  {
    topic: "Economy",
    subtopics: [
      "Business tax",
      "Brexit",
      "Court claims, debt and bankruptcy",
      "Expenses and employee benefits",
      "Personal tax",
      "Tax evasion and avoidance",
    ],
  },
  {
    topic: "Health and social care",
    subtopics: [
      "Coronavirus",
      "Disabled people",
      "Medicines, medical devices",
      "National Health Service",
      "Public health",
      "Social care",
      "Children’s health and welfare",
      "Wellbeing",
    ],
  },
  {
    topic: "Housing, planning and local services",
    subtopics: [
      "Housing and communities",
      "Rent and mortgages",
      "Planning and building",
      "Local councils and government",
      "Public services",
    ],
  },
  {
    topic: "Immigration and asylum",
    subtopics: [
      "Border control",
      "Immigration offences",
      "Inspections of border, immigration and asylum services",
      "Permanent stay in the UK",
      "Refugees, asylum and human rights",
      "Visas and documentation",
    ],
  },
  {
    topic: "Population and society",
    subtopics: [
      "Certificates, register offices, changes of name or gender",
      "Death and bereavement",
      "Having a child, parenting and adoption",
      "Marriage, civil partnerships and divorce",
      "Adoption, fostering and surrogacy",
      "Pregnancy and birth",
    ],
  },
  {
    topic: "Security, defence and international relations",
    subtopics: [
      "Armed forces and defence",
      "Foreign affairs",
      "International aid and development",
      "Cyber security",
      "National security",
    ],
  },
  {
    topic: "Travel, transport and tourism",
    subtopics: [
      "Living abroad",
      "Travel abroad",
      "Aviation",
      "Driving and roads",
      "Freight, haulage and cargo",
      "Local transport",
      "Maritime and shipping",
      "Rail",
      "Tourism",
    ],
  },
  {
    topic: "Labour market and welfare",
    subtopics: [
      "Self-employment",
      "Trade unions",
      "Work and disabled people",
      "Pensions",
      "Employment",
      "Benefits",
    ],
  },
  {
    topic: "Culture and identity",
    subtopics: [
      "Arts and culture",
      "Charities, volunteering and honours",
      "Digital inclusion and accessibility in society",
      "National events and ceremonies",
      "Sports and leisure",
    ],
  },
];

const publishers = [
  { heading: "All publishers" },
  {
    heading: "Department for Business, Energy & Industrial Strategy",
  },
  {
    heading: "Department for Education",
  },
  {
    heading: "Department for Environment, Food & Rural Affairs",
  },
  {
    heading: "Department for Levelling Up, Housing & Communities",
  },
  {
    heading: "Department for Transport",
  },
  {
    heading: "Forest Research",
  },
  {
    heading: "HM Revenue & Customs",
  },
  {
    heading: "Met Office",
  },
  {
    heading: "Ministry of Housing, Communities & Local Government",
  },
  {
    heading: "Ofcom",
  },
  {
    heading: "Office for Health Improvement and Disparities",
  },
  {
    heading: "Office for National Statistics",
  },
  {
    heading: "Welsh Government",
  },
];

export default async function Datasets({
  searchParams,
}: {
  searchParams: any;
}) {
  const KEY = "page";
  const params = new URLSearchParams(searchParams);
  params.delete(KEY);

  return (
    <div className="app-width-container">
      <PhaseBanner
        href="/"
        tag={{ children: "prototype" }}
        className="govuk-phase-banner--inverse"
      />
      <Breadcrumbs items={[{ text: "Home", href: "/" }]} />
      <main className="app-datasets" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <h1 className="govuk-caption-xl app-datasets_caption">Dataset</h1>
            <h1 className="govuk-heading-xl">Data catalogue</h1>
          </div>
        </div>

        <Search />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third-from-desktop">
            <details className="app-accordion">
              <summary className="app-accordian__title">Topic</summary>
              <div className="app-accordian__panel">
                <div className="app-accordian__panel-inner govuk-form-group">
                  <label className="govuk-label">Topic</label>
                  <select className="govuk-select" id="sort" name="sort">
                    {topics.map((item) => (
                      <option value={item.topic}>{item.topic}</option>
                    ))}
                  </select>
                </div>
                <div className="app-accordian__panel-inner govuk-form-group">
                  <label className="govuk-label">Sub-Topic</label>
                  <select className="govuk-select" id="sort" name="sort">
                    <option value="published">Recently published</option>
                    <option value="updated" selected>
                      Recently updated
                    </option>
                    <option value="views">Most views</option>
                    <option value="comments">Most comments</option>
                  </select>
                </div>
              </div>
            </details>

            <details className="app-accordion">
              <summary className="app-accordian__title">Publisher</summary>
              <div className="app-accordian__panel">
                <div className="app-accordian__panel-inner govuk-form-group">
                  <label className="govuk-label">Publisher</label>
                  <select className="govuk-select" id="sort" name="sort">
                    {publishers.map((topic) => (
                      <option value={topic.heading}>{topic.heading}</option>
                    ))}
                  </select>
                </div>
              </div>
            </details>
            <details className="app-accordion">
              <summary className="app-accordian__title">Updated</summary>
              <div className="app-accordian__panel">
                <div className="app-accordian__panel-inner govuk-form-group">
                  <label className="govuk-label">Updated before</label>
                  <div className="govuk-caption-m">
                    For example, 2005 or 21/11/2004
                  </div>
                  <input
                    className="govuk-input"
                    id="event-name"
                    name="eventName"
                    type="text"
                  />
                </div>
                <div className="app-accordian__panel-inner govuk-form-group">
                  <label className="govuk-label">Updated after</label>
                  <div className="govuk-caption-m">
                    For example, 2005 or 21/11/2004
                  </div>
                  <input
                    className="govuk-input"
                    id="event-name"
                    name="eventName"
                    type="text"
                  />
                </div>
              </div>
            </details>
          </div>
          <DatasetsList
            items={data?.results.bindings}
            page={searchParams.page}
            searchParams={params}
          />
        </div>
      </main>
    </div>
  );
}
