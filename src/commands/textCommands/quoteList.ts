import { Message } from "discord.js";

export const name: string = "citation list";

export async function execute(interaction: Message) {
  if (interaction.author.bot) return;
  interaction.reply("citation textuelle list");
}

export default { name, execute };
