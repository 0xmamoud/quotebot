import { Message } from "discord.js";
import { addCitation } from "../../utils/actions";

export const name: string = "citation add";

export async function execute(interaction: Message, args: string) {
  if (interaction.author.bot) return;
  const command = args.split(" ").slice(2).join(" ");
  const citation = await addCitation(command);
  interaction.reply(`Citation ajoutée: ${command}`);
}

export default { name, execute };
