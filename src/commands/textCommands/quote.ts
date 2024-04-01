import { Message } from "discord.js";
import { getCitation } from "../../utils/actions";

export const name: string = "citation";

export async function execute(interaction: Message, args: string) {
  if (interaction.author.bot) return;
  const citation = await getCitation();
  interaction.reply(citation);
}

export default { name, execute };
