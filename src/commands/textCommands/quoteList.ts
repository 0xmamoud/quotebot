import { Message } from "discord.js";
import { getAllCitations } from "../../utils/actions";

export const name: string = "citation list";

export async function execute(interaction: Message, args: string) {
  if (interaction.author.bot) return;
  const citations = await getAllCitations();
  interaction.reply(citations);
}

export default { name, execute };
