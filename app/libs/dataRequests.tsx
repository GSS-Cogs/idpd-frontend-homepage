import { headers } from "next/headers";

const USERNAME = process.env.NEXT_PRIVATE_USERNAME;
const PASSWORD = process.env.NEXT_PRIVATE_PASSWORD;

const getBackendUrl = () => {
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const proto = (headersList.get("x-forwarded-proto") || "").split(",")[0];
  const fullUrl = `${proto}://${domain}`;

  return fullUrl;
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
  if (!response.ok) {
    throw new Error(`Failed to fetch data. Status: ${response.status}`);
  }

  return response.json();
};

const fetchData = async (url: string, method: string): Promise<any> => {
  try {
    const options: RequestInit = {
      method,
      headers: getHeaders(),
      credentials: "include",
    };

    // const backendUrl = getBackendUrl();
    // const response = await fetch(`${backendUrl}${url}`, options);
    const response = await fetch(`${url}`, options);
    return handleResponse(response);
  } catch (error) {
    console.error("Fetch Error:", error);
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
  let codes = new Set<string>();

  data.datasets.forEach((item: { spatial_coverage: string }) => {
    codes.add(item.spatial_coverage);
  });

  const uniqueCodes = Array.from(codes);

  const codesUpdated: { [key: string]: { code: string; coverage: any } } = {};
  await Promise.all(
    uniqueCodes.map(async (item: string) => {
      const response = await handleResponse(
        await fetch(`https://findthatpostcode.uk/areas/${item}.json`)
      );

      const coverage = response.data.attributes.name;
      return (codesUpdated[item] = coverage);
    })
  );

  data.datasets.forEach(
    (item: {
      spatial_coverage_name: { code: string; coverage: any };
      spatial_coverage: string;
    }) => {
      item.spatial_coverage_name = codesUpdated[item.spatial_coverage];
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
};

const getDataset = async (id: string) => {
  const data = await fetchData(`/datasets/${id}`, "GET");
  return data;
};

const getTopics = async () => {
  const data = await fetchData(`/topics`, "GET");
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
  getPublishers,
};
