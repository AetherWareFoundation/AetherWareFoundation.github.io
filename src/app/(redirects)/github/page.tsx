import { GITHUB_URL } from "@/config";

import { ClientRedirect } from "@/components/shared/ClientRedirect";

const RedirectGithubPage = () => <ClientRedirect href={GITHUB_URL} />;
export default RedirectGithubPage;
