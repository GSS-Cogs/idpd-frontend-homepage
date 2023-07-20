// pages/api/health.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";

interface HealthCheck {
  name: string;
  status: string;
  status_code: number;
  message: string;
  last_checked: Date;
  last_success: Date | null;
  last_failure: Date | null;
}

export async function GET() {
  let statusCode = 429;
  const language = "TypeScript";
  const process = require("process");
  const languageVersion = process.env.npm_package_dependencies_typescript;
  const uptime = Math.floor(process.uptime());
  const startTime = new Date(Date.now() - uptime * 1000).toISOString();

  const buildTime =
    process.env.NEXT_PUBLIC_BUILD_TIME !== undefined
      ? new Date(
          Number(process.env.NEXT_PUBLIC_BUILD_TIME) * 1000
        ).toISOString()
      : "";
  const gitCommit = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA;
  const appVersion = process.env.NEXT_PUBLIC_GIT_VERSION;

  const response: {
    status: string;
    version: {
      build_time: string;
      git_commit: string | undefined;
      language: string;
      language_version: string | undefined;
      version: string | undefined;
    };
    uptime: number;
    start_time: string;
    checks: HealthCheck[];
  } = {
    status: "WARNING",
    version: {
      build_time: buildTime,
      git_commit: gitCommit,
      language: language,
      language_version: languageVersion,
      version: appVersion,
    },
    uptime: uptime,
    start_time: startTime,
    checks: [],
  };

  const checks = [await checkDataExplorer()];
  response.checks = checks;
  const warnings = checks.filter((x) => x.status_code === 429).length;
  const criticals = checks.filter(
    (x) => x.status_code !== 200 && x.status_code !== 429
  ).length;
  if (criticals > 0) {
    response.status = "CRITICAL";
    statusCode = 500;
  } else if (warnings === 0) {
    response.status = "OK";
    statusCode = 200;
  }
  return NextResponse.json(response, { status: statusCode });
}

async function getStatusCode(): Promise<[number, string]> {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const domain2 = headersList.get("x-forwarded-host") || "";
  const proto = headersList.get("x-forwarded-proto") || "";
  const fullUrl = (headersList.get("referer") || "").split(domain)[0] + domain;

  try {
    const response = await fetch(fullUrl);
    return [response.status, fullUrl + " : " + proto + " : " + domain2];
  } catch (error) {
    return [500, fullUrl + " : " + proto + " : " + domain2];
  }
}

async function checkDataExplorer(): Promise<HealthCheck> {
  const check = {
    name: "data explorer",
    status: "WARNING",
    status_code: 429,
    message: "data explorer is partially functioning",
    last_checked: new Date(),
    last_success: null as Date | null,
    last_failure: null as Date | null,
  };
  const [statusCode, fullUrl] = await getStatusCode();

  if (statusCode === 200) {
    check.status = "OK";
    check.status_code = 200;
    check.message = fullUrl; // "data explorer is ok";
    check.last_success = new Date();
  } else if (statusCode >= 400 && statusCode !== 429) {
    check.status = "CRITICAL";
    check.status_code = 500;
    check.message = fullUrl; // "data explorer is unavailable or non-functioning";
    check.last_failure = new Date();
  }

  return check;
}
