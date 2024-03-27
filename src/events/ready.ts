import { Events } from "discord.js";
import type { ExtendedClient } from "../utils/type";

export const name = Events.ClientReady;
export const once = true;
export function execute(client: ExtendedClient) {
  console.log(`Client is logged in as ${client.user?.tag}!`);
}

export default { name, once, execute };