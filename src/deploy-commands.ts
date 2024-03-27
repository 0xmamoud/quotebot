import { REST, Routes } from "discord.js";
import * as fs from "fs";
import * as path from "path";

const TOKEN = process.env.DISCORD_TOKEN as string;
const ClientID = process.env.CLIENT_ID as string;

const commands: JSON[] = [];

const commandPath = path.join(__dirname, "commands/slashCommands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const filepath = path.join(commandPath, file);
  const command = await import(filepath);
  if (command.default.data && command.default.execute) {
    commands.push(command.default.data.toJSON());
  } else {
    console.error(`Error with command ${file}`);
  }
}

const register = async (token: string, clientId: string, command: JSON[]) => {
  try {
    const rest = new REST().setToken(token);

    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(clientId), {
      body: command,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};

register(TOKEN, ClientID, commands);
