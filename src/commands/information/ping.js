import { ApplicationCommandType } from 'discord.js';
import { Command } from '../../structures/Command.js';

export default class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Shows the bot ping.',
      type: ApplicationCommandType.ChatInput,
    });
  }

  execute({ interaction }) {
    interaction.reply({ content: `My ping is \`${this.client.ws.ping}\`ms` });
  }
}
