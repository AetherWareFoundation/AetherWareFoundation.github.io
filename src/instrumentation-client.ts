import { init } from "@plausible-analytics/tracker";

import { IS_LIVE, PLAUSIBLE_ENDPOINT, SITE_HOST } from "@/config";

// set up plausible analytics
if (PLAUSIBLE_ENDPOINT && IS_LIVE) {
  init({
    domain: SITE_HOST.replaceAll(/:\d+/, ""),
    captureOnLocalhost: false,
    outboundLinks: true,
    fileDownloads: true,
    formSubmissions: true,
  });
}
