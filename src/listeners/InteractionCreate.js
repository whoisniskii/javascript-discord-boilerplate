import { Event } from '../structures/Event.js';

export default class InteractionCreate extends Event {
  constructor() {
    super();
    this.eventName = 'interactionCreate';
  }

  execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.getCommand(interaction.commandName);

    command?.execute({ interaction });
  }
}
