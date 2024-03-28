import { Events, Message } from "discord.js";
import { textCommands } from "..";

const prefix: string = "!";

export const name = Events.MessageCreate;
export async function execute(interaction: Message) {
  if (interaction.author.bot) return;
  if (!interaction.content.startsWith(prefix)) return;
  const target = interaction.toString().slice(prefix.length).split(" ");

  if (target.length > 1) {
    const command = textCommands.find((cmd) => cmd.name === target[0]);
    console.log(command);
  } else {
    const fullCommand = target[0] + " " + target[1];
    const command = textCommands.find((cmd) => cmd.name === fullCommand);
    console.log(command);
  }
}

export default { name, execute };
