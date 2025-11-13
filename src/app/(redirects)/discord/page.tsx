import { DISCORD_URL } from "@/config";

import { ClientRedirect } from "@/components/shared/ClientRedirect";

const RedirectDiscordPage = () => <ClientRedirect href={DISCORD_URL} />;
export default RedirectDiscordPage;
