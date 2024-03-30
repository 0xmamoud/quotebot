import { Client, Collection, Message } from "discord.js";

export interface ExtendedClient extends Client {
  commands: Collection<string, any>;
  textCommands: Collection<string, any>;
}

export type Command = {
  name: string;
  execute: (interaction: Message) => void;
};
