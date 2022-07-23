class Event {
  constructor() {
    this.eventName = '';
  }

  execute(client, ...args) {
    return { client, args };
  }
}

export { Event };
