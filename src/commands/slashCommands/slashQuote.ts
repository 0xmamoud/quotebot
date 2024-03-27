import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("citation")
    .setDescription("Get a random quote"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("Here is a random quote");
  },
};
