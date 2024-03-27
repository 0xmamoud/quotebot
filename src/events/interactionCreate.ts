import { Events, type Interaction } from "discord.js";
import type { ExtendedClient } from "../utils/type";

export const name = Events.InteractionCreate;
export async function execute(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;
  const client = interaction.client as ExtendedClient;
  console.log(interaction.client)
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`Command ${interaction.commandName} not found`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}

export default { name, execute };
