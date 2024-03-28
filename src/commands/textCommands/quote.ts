import { Message } from "discord.js";

export const name: string = "citation";

export async function execute(interaction: Message) {
  if (interaction.author.bot) return;
  interaction.reply("citation textuelle");
}

export default { name, execute };
