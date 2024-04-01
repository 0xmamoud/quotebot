import { Events, Message } from "discord.js";
import type { ExtendedClient } from "../utils/type";

const prefix: string = "!";

export const name = Events.MessageCreate;
export async function execute(interaction: Message) {
  if (interaction.author.bot) return;
  if (!interaction.content.startsWith(prefix)) return;
  const client = interaction.client as ExtendedClient;
  const target = interaction.content.slice(prefix.length).split(" ");
  let fullTarget = target[0];
  if (target.length > 1) fullTarget = target[0] + " " + target[1];
  try {
    const command = client.textCommands.get(fullTarget);
    if (!command) {
      console.error(`Command ${fullTarget} not found`);
      return;
    }
    await command.execute(interaction, interaction.content);
  } catch (error) {
    console.error(error);
  }
}

export default { name, execute };
