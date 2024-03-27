import {
  CommandInteraction,
  SlashCommandBuilder,
  ApplicationCommand,
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("citations")
    .setDescription("Gestion des citations")
    .addSubcommand((subcommand) =>
      subcommand.setName("list").setDescription("citations list")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("add").setDescription("ajoute une citation")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("delete").setDescription("supprime une citation")
    ),
  async execute(interaction: CommandInteraction | ApplicationCommand | any) {
    if (!interaction.isCommand()) return;
    if (interaction.options.getSubcommand() === "add") {
      await interaction.reply("toto le gay veut ajouter une citation");
    } else if (interaction.options.getSubcommand() === "delete") {
      await interaction.reply("toto le gay veut supprimer une citation");
    } else if (interaction.options.getSubcommand() === "list") {
      await interaction.reply("liste des citations");
    } else {
      await interaction.reply("Commande non reconnue");
    }
  },
};
