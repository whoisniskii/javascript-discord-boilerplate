import { readdir } from 'node:fs/promises';
import { Collection } from 'discord.js';

export class CommandManager {
  constructor(client) {
    this.client = client;
    this.manager = new Collection();
  }

  async loadCommands(client) {
    const categories = await readdir('./commands/');
    for await (const category of categories) {
      const commands = await readdir(`./commands/${category}`);

      for await (const command of commands) {
        if (!command.endsWith('.js')) continue;
        const commandWithoutExtension = command.replace('.js', '');
        const { default: CommandClass } = await import(`../commands/${category}/${command}`);
        const cmd = new CommandClass(client);
        this.manager.set(commandWithoutExtension, cmd);
      }

      this.client.logger.info(`Loaded ${commands.length} commands successfully!`, { tags: ['Command'] });
    }
  }

  getCommand(commandName) {
    return this.manager.get(commandName);
  }

  async registerCommands() {
    const mappedCommands = this.client.commands.manager.map(x => x.options);

    await this.client.application?.commands.set(mappedCommands);
    this.client.logger.info(`Posted ${mappedCommands.length} commands to Discord!`, {
      tags: ['Commands'],
    });
  }
}
