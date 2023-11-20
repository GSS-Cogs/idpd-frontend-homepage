"use client";
import "./guidance.scss";
import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import PhaseBanner from "@/components/PhaseBanner";

import SyntaxHighlighter from "react-syntax-highlighter";
import { googlecode } from "react-syntax-highlighter/dist/esm/styles/hljs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Guidance = ({}: {}) => {
  const codeStyle = { backgroundColor: "transparent", margin: 0, padding: 0 };

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
              <h1 className="govuk-heading-xl app-guidance__title">
                Data catalogue API developer guidance
              </h1>
              <p className="govuk-body-l app-guidance__description">
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
              <div className="govuk-body govuk-!-margin-bottom-0">
                <span style={{ marginRight: 10 }}>
                  The base URL for the Data Catalogue API is:
                </span>
                <code className={"app-guidance__code"}>
                  {BACKEND_URL}
                </code>
              </div>
              <h1
                className="govuk-heading-l"
                id="about"
                style={{ paddingTop: 0, marginTop: 50, marginBottom: 50 }}
              >
                Endpoints
              </h1>
              <section>
                <h3 className="govuk-heading-m">Get dataset information</h3>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>Endpoint:</span>
                  <code className={"app-guidance__code"}>
                    {"GET /dataset/{dataset_id}"}
                  </code>
                </div>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>
                    This endpoint retrieves information about a specific dataset
                    identified by
                  </span>
                  <code className={"app-guidance__code"}>{"{dataset_id}"}</code>
                </div>
                <h4 className="govuk-heading-s">Example using curl:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="bash"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "bash\ncurl-X GET \""+BACKEND_URL+"/dataset/{dataset_id} -H \"accept: application/json\""
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
                <h4 className="govuk-heading-s">Example using R:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="r"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "r\nlibrary(httr)\nresponse <- GET('"+BACKEND_URL+"/dataset/{dataset_id}', accept(\"application/json\"))\ncontent <- content(response, 'text')\nprint(content)"
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
                <h4 className="govuk-heading-s">Example using Python:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="python"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "python\nimport requests\nresponse = requests.get('"+BACKEND_URL+"/dataset/{dataset_id}', headers={'accept': 'application/json'})\ncontent = response.json()\nprint(content)"
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
              </section>
              <section style={{ marginTop: 50 }}>
                <h3 className="govuk-heading-m">Get edition information</h3>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>Endpoint:</span>
                  <code className={"app-guidance__code"}>
                    {"GET /dataset/{dataset_id}/edition/{edition_id}"}
                  </code>
                </div>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>
                    This endpoint retrieves information about a specific edition
                    of a dataset identified by
                  </span>
                  <code className={"app-guidance__code"}>{"{edition_id}"}</code>
                  <span style={{ marginRight: 10, marginLeft: 10 }}>
                    within the dataset{" "}
                  </span>
                  <code className={"app-guidance__code"}>{"{dataset_id}"}</code>
                </div>
                <h4 className="govuk-heading-s">Example using curl:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="bash"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "bash\ncurl-X GET "+BACKEND_URL+"/dataset/{dataset_id}/edition/{edition_id} -H \"accept: application/json\""
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
                <h4 className="govuk-heading-s">Example using R:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="r"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "r\nlibrary(httr)\nresponse <- GET('"+BACKEND_URL+"/dataset/{dataset_id}/edition/{edition_id}', accept(\"application/json\"))\ncontent <- content(response, 'text')\nprint(content)"
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
                <h4 className="govuk-heading-s">Example using Python:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="python"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "python\nimport requests\nresponse = requests.get('"+BACKEND_URL+"/dataset/{dataset_id}/edition/{edition_id}', headers={'accept': 'application/json'})\ncontent = response.json()\nprint(content)"
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
              </section>
              <section style={{ marginTop: 50 }}>
                <h3 className="govuk-heading-m">Get version information</h3>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>Endpoint:</span>
                  <code className={"app-guidance__code"}>
                    {
                      "GET /dataset/{dataset_id}/edition/{edition_id}/version/{version_id}"
                    }
                  </code>
                </div>
                <div className="govuk-body">
                  <span style={{ marginRight: 10 }}>
                    This endpoint retrieves information about a specific version
                    of an edition within a dataset.
                  </span>
                </div>
                <h4 className="govuk-heading-s">Example using curl:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="bash"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "bash\ncurl-X GET "+BACKEND_URL+"/dataset/{dataset_id}/edition/{edition_id}/version/{version_id} -H \"accept: application/json\""
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
                <h4 className="govuk-heading-s">Example using R:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="r"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "r\nlibrary(httr)\nresponse <- GET('"+BACKEND_URL+"/dataset/{dataset_id}/edition/{edition_id}/version/{version_id}', accept(\"application/json\"))\ncontent <- content(response, 'text')\nprint(content)"
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
                <h4 className="govuk-heading-s">Example using Python:</h4>
                <div className="govuk-body" style={{ display: "flex" }}>
                  <div className={"app-guidance__code"}>
                    <SyntaxHighlighter
                      language="python"
                      style={googlecode}
                      customStyle={codeStyle}
                    >
                      {
                        "python\nimport requests\nresponse = requests.get('"+BACKEND_URL+"/dataset/{dataset_id}/edition/{edition_id}/version/{version_id}', headers={'accept': 'application/json')\ncontent = response.json()\nprint(content)"
                      }
                    </SyntaxHighlighter>
                  </div>
                </div>
              </section>
              <h1
                className="govuk-heading-l"
                id="responses"
                style={{ paddingTop: 0, marginTop: 50, marginBottom: 25 }}
              >
                Handling responses
              </h1>
              <div className="govuk-body">
                <div className="app-datasets__publisher">
                  The above eesponses from the API are in JSON format. You can
                  parse the JSON response to extract the information you need.
                  <br></br>
                  <br></br>
                  In the examples provided:
                  <ul>- The `curl` command-line tool and the `httr` library in R return the raw JSON response.</ul>
                  <ul>- In Python, the `requests` library `.json()` method is used to parse the response.</ul>
                </div>
                <div className="app-datasets__publisher">
                  Remember to handle potential errors, such as invalid IDs or
                  network issues, by checking the status code of the response.
                </div>
              </div>
              <h1
                className="govuk-heading-l"
                id="conclusion"
                style={{ paddingTop: 0, marginTop: 50, marginBottom: 25 }}
              >
                Conclusion
              </h1>
              <div className="govuk-body">
                <div className="app-datasets__publisher">
                  This developer guidance has provided examples of how to use
                  the Data Catalogue API endpoints to retrieve information about
                  datasets, editions, and versions. Make sure to refer to the
                   <a href="/openapi"> API documentation</a> for any additional query parameters or
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
