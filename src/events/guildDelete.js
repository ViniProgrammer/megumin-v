const Event = require("../structures/Event");

module.exports = class guildDeleteEvent extends Event {
  constructor() {
    super("guildDeleteEvent", {
      event: "guildDelete",
      type: "once",
      emmiter: "client"
    });
  }
  async exec(guild) {
    this.client.user.setPresence({
      activity: { name: `m.help | ${this.client.guilds.cache.size} servidores!` }     
    });
    this.client.database.guild.deleteOne({ _id: guild.id }).catch(console.error);
  }
};
