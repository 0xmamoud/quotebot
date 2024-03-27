import { Events, Message } from "discord.js";

export const name = Events.MessageCreate;
export async function execute(interaction: Message) {
  if (interaction.author.bot) return;
  console.log(`Message received: ${interaction}`);
}

export default { name, execute };