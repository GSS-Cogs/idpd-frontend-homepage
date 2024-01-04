"use server";

import moment from "moment";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const USERNAME = process.env.NEXT_PRIVATE_USERNAME;
const PASSWORD = process.env.NEXT_PRIVATE_PASSWORD;

const backendUrlSplit = BACKEND_URL?.split("://");
const scheme = backendUrlSplit?.[0];
const domain = backendUrlSplit?.[1];

const logInfo = (message: string, method: string, url: string) => {
  console.info({
    event: message,
    http: {
      method: method,
      scheme: scheme,
      host: domain,
      // port: // TODO add port number
      path: url,
      started_at: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
    },
  });
};

const logError = (message: string, method: string, url: string) => {
  console.error({
    event: message,
    http: {
      method: method,
      scheme: scheme,
      host: domain,
      // port: // TODO add port number
      path: url,
      started_at: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZZ"),
    },
  });
};

const getHeaders = () => {
  const headers: Record<string, string> = {
    Accept: "application/ld+json",
  };

  const basicAuth = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString(
    "base64"
  )}`;
  headers.Authorization = basicAuth;

  return headers;
};

const handleResponse = async (response: Response) => {
  // TODO rework how we handle responses
  // commented outt for the time being as was throwing errors on no subtopics
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch data. Status: ${response.status}`);
  // }

  return response.json();
};

const fetchData = async (url: string, method: string): Promise<any> => {
  logInfo(`fetching data from ${url}`, method, url);
  try {
    const options: RequestInit = {
      method,
      headers: getHeaders(),
      credentials: "include",
      next: { revalidate: 600 }, // revalidate at most every 10 minutes
    };

    const response = await fetch(`${BACKEND_URL}${url}`, options);
    return handleResponse(response);
  } catch (error) {
    logError(`failed fetch data from ${url}`, method, url);
    throw error;
  }
};

const getDatasets = async () => {
  const data = await fetchData("/datasets", "GET");
  return data;
};

const getDatasetsWithSpatialCoverageInfo = async () => {
  // this function gets the list of datasets like normal then adds a new field 'spatial_coverage_name' to each dataset
  // which is the corresponding name of the given coverage code
  // e.g. K02000001 -> United Kingdom
  const data = await fetchData("/datasets", "GET");
  const geoportalUrl =
    "https://opendata.arcgis.com/datasets/33a3c8eadd084ac38d20ff3dcfa110ce_0/FeatureServer/0/query?outFields=*&where=1%3D1";

  try {
    logInfo(`fetching data from ${geoportalUrl}`, "GET", geoportalUrl);
    const geoportalCodes = await handleResponse(await fetch(geoportalUrl));

    const codesMap = new Map<string, string>(
      geoportalCodes.features.map(
        (feature: { attributes: { CTRY15CD: string; CTRY15NM: string } }) => {
          return [feature.attributes.CTRY15CD, feature.attributes.CTRY15NM];
        }
      )
    );

    data.datasets.forEach(
      (item: { spatial_coverage_name: string; spatial_coverage: string }) => {
        item.spatial_coverage_name =
          codesMap.get(item.spatial_coverage) || "UNKNOWN";
      }
    );

    const response = await getPublishers();
    let publishersDict: any = {};

    for (const pub of response.publishers) {
      if (pub.hasOwnProperty("@id")) {
        publishersDict[pub["@id"]] = pub;
      }
    }

    data.datasets.forEach(
      (item: {
        publisher_full: { code: string; coverage: any };
        publisher: string;
      }) => {
        item.publisher_full = publishersDict[item.publisher];
      }
    );

    return data;
  } catch (error) {
    logError(`failed fetch data from ${geoportalUrl}`, "GET", geoportalUrl);
    throw error;
  }
};

const getDataset = async (id: string) => {
  const data = await fetchData(`/datasets/${id}`, "GET");
  return data;
};

const getTopics = async () => {
  const data = await fetchData(`/topics`, "GET");
  return data;
};

const getTopic = async (id: string) => {
  const data = await fetchData(`/topics/${id}`, "GET");
  return data;
};

const getSubtopics = async (id: string) => {
  const data = await fetchData(`/topics/${id}/subtopics`, "GET");
  return data;
};

const getPublishers = async () => {
  const data = await fetchData(`/publishers`, "GET");
  return data;
};

export {
  getDatasets,
  getDatasetsWithSpatialCoverageInfo,
  getDataset,
  getTopics,
  getTopic,
  getSubtopics,
  getPublishers,
};
