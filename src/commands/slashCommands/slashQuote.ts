import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { getCitation } from "../../utils/actions";

export default {
  data: new SlashCommandBuilder()
    .setName("citation")
    .setDescription("Get a random quote"),
  async execute(interaction: CommandInteraction) {
    const citation = await getCitation();
    if (!citation) {
      interaction.reply("No citation found");
      return;
    }
    interaction.reply(citation);
  },
};
