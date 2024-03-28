import { Message } from "discord.js";

export const name: string = "citation remove";

export async function execute(interaction: Message) {
  if (interaction.author.bot) return;
  interaction.reply("citation textuelle remove");
}

export default { name, execute };
