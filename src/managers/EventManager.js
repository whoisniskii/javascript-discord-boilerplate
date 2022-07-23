import { readdirSync } from 'fs';

export class EventManager {
  constructor(client) {
    this.client = client;
  }

  async loadEvents() {
    const eventFiles = readdirSync('./listeners');

    for await (const file of eventFiles) {
      if (!file.endsWith('.js')) continue;

      const { default: EventClass } = await import(`../listeners/${file}`);
      const event = new EventClass();
      this.client.on(event.eventName, (...args) => event.execute(this.client, ...args));
    }

    this.client.logger.info(`Loaded ${eventFiles.length} events successfully!`, { tags: ['Events'] });
  }
}
