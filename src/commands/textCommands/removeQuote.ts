import { Message } from "discord.js";
import { removeCitation } from "../../utils/actions";

export const name: string = "citation delete";

export async function execute(interaction: Message, args: string) {
  if (interaction.author.bot) return;
  const command = args.split(" ").slice(2).join(" ");
  if (!command) return interaction.reply("Veuille une citation");
  const remove = await removeCitation(command);
  if (remove === -1) return interaction.reply(`Citation non trouvée: ${command}`);
  interaction.reply(`Citation supprimée: ${command}`);
}

export default { name, execute };
