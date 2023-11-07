import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import PhaseBanner from "@/components/PhaseBanner";

import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"] });

const Guidance = ({}: {}) => {
  return (
    <>
      <Header borderColour="blue-border" />
      <div className="app-width-container">
        <PhaseBanner
          href="/"
          tag={{ children: "prototype" }}
          className="govuk-phase-banner--inverse"
        />
        <Breadcrumbs items={[{ text: "Home", href: "/" }]} />
        <div className={`app-datasets`}>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-xl app-datasets__title">
                Data catalogue API developer guidance
              </h1>
              <p className="govuk-body app-guidance__description">
                The Data Catalogue API provides endpoints to interact with
                datasets, editions, and versions within the IDS (Information
                Data System). This guidance document will walk you through the
                available endpoints and provide examples of how to use them
                using `curl`, R, and Python.
              </p>
            </div>
          </div>
        </div>
        <main className="app-datasets" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l" id="about">
                API Base URL
              </h1>
              <div className="govuk-body">
                <div className="app-datasets__publisher">
                  <h3 className="app-datasets__publisher-text">
                    The base URL for the Data Catalogue API is:
                  </h3>
                </div>
              </div>
              <h1 className="govuk-heading-l" id="about">
                Endpoints
              </h1>
              <div>
                <h3 className="govuk-heading-s">Get dataset information</h3>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>Endpoint:</span>
                  <code
                    className={firaCode.className}
                    style={{
                      outline: "1px solid rgba(0,0,0,0)",
                      outlineColor: "#000",
                      outlineStyle: "solid",
                      borderRadius: 2,
                      borderColor: "#B1B4B6",
                      outlineWidth: 1,
                      color: "#0B0C0C",
                      backgroundColor: "#F3F2F1",
                      fontSize: 16,
                      paddingRight: 10,
                      paddingLeft: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                    }}
                  >
                    {"GET /dataset/{dataset_id}"}
                  </code>
                </div>
              </div>

              <h1 className="govuk-heading-l" id="about">
                Handling responses
              </h1>
              <div className="govuk-body">
                <div className="app-datasets__publisher">
                  Responses from the API are typically in JSON format. You can
                  parse the JSON response to extract the information you need.
                  In the examples provided, the `curl` command-line tool and the
                  `httr` library in R return the raw JSON response. In Python,
                  the `requests` library's `.json()` method is used to parse the
                  response.
                </div>
                <div className="app-datasets__publisher">
                  Remember to handle potential errors, such as invalid IDs or
                  network issues, by checking the status code of the response.
                </div>
              </div>
              <h1 className="govuk-heading-l" id="about">
                Authentication
              </h1>
              <div className="govuk-body">
                <div className="app-datasets__publisher">
                  Make sure you have the necessary authentication tokens or
                  credentials to access the Data Catalogue API. Include these in
                  your requests' headers as required.
                </div>
              </div>
              <h1 className="govuk-heading-l" id="about">
                Conclusion
              </h1>
              <div className="govuk-body">
                <div className="app-datasets__publisher">
                  This developer guidance has provided examples of how to use
                  the Data Catalogue API endpoints to retrieve information about
                  datasets, editions, and versions. Make sure to refer to the
                  API documentation for any additional query parameters or
                  features that might be available. Happy coding!
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Guidance;
