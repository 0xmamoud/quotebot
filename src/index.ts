import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { ExtendedClient, Command } from "./utils/type";
import * as fs from "fs";
import * as path from "path";

const TOKEN = process.env.DISCORD_TOKEN;
export const textCommands: Command[] = [];

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
}) as ExtendedClient;

client.commands = new Collection();
const commandPath = path.join(__dirname, "commands/slashCommands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filepath = path.join(commandPath, file);
  const command = await import(filepath);
  if (command.default.data && command.default.execute) {
    try {
      client.commands.set(command.default.data.name, command.default);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error(`Error with command ${file}`);
  }
}

client.textCommands = new Collection();
const textCommandPath = path.join(__dirname, "commands/textCommands");
const textCommandFiles = fs
  .readdirSync(textCommandPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of textCommandFiles) {
  const filepath = path.join(textCommandPath, file);
  const command = await import(filepath);
  if (command.default.name && command.default.execute) {
    client.textCommands.set(command.default.name, command.default);
  }
}
const eventPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
  const filepath = path.join(eventPath, file);
  const event = await import(filepath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(TOKEN);
