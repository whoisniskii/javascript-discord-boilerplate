class Command {
  constructor(client, options) {
    this.client = client;
    this.options = options;
  }

  execute({ interaction }) {
    return { interaction };
  }
}

export { Command };
