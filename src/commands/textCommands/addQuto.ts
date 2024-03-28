import { Message } from "discord.js";

export const name: string = 'citation add';

export async function execute(interaction: Message) {
	  if (interaction.author.bot) return;
	interaction.reply("citation textuelle add");
}

export default { name, execute };