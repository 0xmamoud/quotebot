import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import type { ExtendedClient } from "./utils/type";
import * as fs from "fs";
import * as path from "path";

const TOKEN = process.env.DISCORD_TOKEN;

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
