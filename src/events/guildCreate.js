const Event = require("../structures/Event");

module.exports = class guildCreateEvent extends Event {
  constructor() {
    super("guildCreateEvent", {
      event: "guildCreate",
      type: "once",
      emmiter: "client"
    });
  }
  async exec(guild) {
    this.client.user.setPresence({
      activity: { name: `m.help | ${this.client.guilds.cache.size} servidores!` }     
    });
    this.client.database.guild.create({
      _id: guild.id,
      prefix: "m.",
      language: "pt-br",
      config: {
        welcome: { enabled: false, chat: "Nenhum", message: "{user}, seja bem-vindo ao servidor!", captcha: { enabled: false, chat: "Nenhum" } },
        leave: { enabled: false, chat: "Nenhum", message: "{user.tag}, acaba de sair do servidor!" },
        counter: { chat: "Nenhum", enabled: false, message: "<:emoji_3:714895779658989639> | Membros: {members}" },
        commands: { enabled: true, chat: [], forbidden: false },
        starboard: { enabled: false, chat: "Nenhum", minimun: "5", blockedChat: [] },
        logs: { chat: "Nenhum", enabled: false },
        antiInvite: { enabled: false, allowedChannels: [], allowGuildInvites: false, deleteInvite: true, sendMessage: true, blockMessage: "{user}, não é possível divulgar outros servidores aqui!" },
        role: { auto: { enabled: false, roles: [] }, adm: "Nenhum", mod: "Nenhum", mute: { enabled: false, id: "Nenhum" }
        }
      }
    }).catch(console.error);
  }
};
