const Event = require("../structures/Event");
const { WebhookClient } = require('discord.js');

module.exports = class ReadyEvent extends Event {
  constructor() {
    super("ReadyEvent", {
      event: "ready",
      emmiter: "client",
      type: "once"
    });
  }

  exec() {
    console.log("[Megumin] Estou online e inicializada com sucesso!");
    this.client.user.setPresence({
      activity: { name: `m.help | ${this.client.guilds.cache.size} servidores!` }     
    });
    const webhook = new WebhookClient('712071798509928538', process.env.WEBHOOK_TOKEN);
    webhook.send('`[ONLINE]` Megumin **iniciada** com **sucesso**!', {
      username: 'Megumin Logs',
      avatarURL: 'https://cdn.discordapp.com/avatars/682277160345534686/95849ea176119f6971928f8a606b4f90.png'
    });
  }
};
