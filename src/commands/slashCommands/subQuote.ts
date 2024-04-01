import {
  CommandInteraction,
  SlashCommandBuilder,
  ApplicationCommand,
} from "discord.js";
import {
  getAllCitations,
  addCitation,
  removeCitation,
  getCitation,
} from "../../utils/actions";

export default {
  data: new SlashCommandBuilder()
    .setName("citations")
    .setDescription("Gestion des citations")
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("citations list")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("ajoute une citation")
        .addStringOption((option) =>
          option.setName("citations").setDescription("citations list")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("supprime une citation")
        .addStringOption((option) =>
          option.setName("citations").setDescription("citations list")
        )
    ),
  async execute(interaction: CommandInteraction | ApplicationCommand | any) {
    if (!interaction.isCommand()) return;
    switch (interaction.options.getSubcommand()) {
      case "list":
        const citations = await getAllCitations();
        interaction.reply(citations);
        break;
      case "add":
        const string = interaction.options.getString("citations");
        console.log(string);
        await addCitation(string);
        interaction.reply(`Citation ajoutée : ${string}`);
        break;
      case "delete":
        const toDelete = interaction.options.getString("citations");
        const deletedCitation = await removeCitation(toDelete);
        interaction.reply(`Citation supprimée : ${toDelete}`);
        break;
      default:
        const citation = await getCitation();
        interaction.reply(citation);
    }
  },
};
