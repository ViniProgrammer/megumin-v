const Event = require("../structures/Event");

module.exports = class MessageUpdateEvent extends Event {
  constructor() {
    super("MessageUpdateEvent", {
      event: "messageUpdate",
      type: "once",
      emmiter: "client"
    });
  }

  exec(oldMsg, newMsg) {
    this.client.database.guild.findOne({ _id: oldMsg.guild.id }, (erro, docs) => {
      if (docs) {
        if (!newMsg.embeds[0] || newMsg.content.toLowerCase().startsWith(docs.prefix)) {
          this.client.emit("message", newMsg);
        }
      } else {
          new this.client.database.guild({
          _id: oldMsg.guild.id,
          prefix: "m.",
          language: "pt-br",
          config: {
            welcome: { enabled: false, chat: "Nenhum", message: "{user}, seja bem-vindo ao servidor!", captcha: { enabled: false, chat: "Nenhum" } },
            leave: { enabled: false, chat: "Nenhum", message: "{user.tag}, acaba de sair do servidor!" },
            counter: { chat: "Nenhum", enabled: false, message: "<:emoji_1:704570010214989825> | Membros: {members}" },
            commands: { enabled: true, chat: [], forbidden: false },
            starboard: { enabled: false, chat: "Nenhum", minimun: "5", blockedChat: [] },
            logs: { chat: "Nenhum", enabled: false },
            antiInvite: { enabled: false, allowedChannels: [], allowGuildInvites: false, deleteInvite: true, sendMessage: true, blockMessage: "{user}, não é possível divulgar outros servidores aqui!" },
            role: { auto: { enabled: false, roles: [] }, adm: "Nenhum", mod: "Nenhum", mute: { enabled: false, id: "Nenhum" }
            }
          }
        }).save();
        return this.client.emit("messageUpdate", (oldMsg, newMsg));
      }
      if (erro) return console.error(erro);
    });
  }
};
