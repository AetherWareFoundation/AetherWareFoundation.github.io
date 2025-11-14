import { init } from "@plausible-analytics/tracker";

import { IS_LIVE, PLAUSIBLE_ENDPOINT, SITE_HOST } from "@/config";

if (PLAUSIBLE_ENDPOINT && IS_LIVE) {
  console.log(
    "initializing plausible analytics - don't worry, we collect absolutely no personal data!",
  );
  init({
    domain: SITE_HOST.replaceAll(/:\d+/g, ""),
    endpoint: PLAUSIBLE_ENDPOINT,
    captureOnLocalhost: false,
    outboundLinks: true,
    fileDownloads: true,
    formSubmissions: true,
  });
}
