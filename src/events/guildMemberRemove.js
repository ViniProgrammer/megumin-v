const Event = require("../structures/Event");

module.exports = class guildMemberRemoveEvent extends Event {
  constructor() {
    super("guildMemberRemoveEvent", {
      event: "guildMemberRemove",
      type: "once",
      emmiter: "client"
    });
  }
  async exec(member) {
    this.client.database.guild.findOne({ _id: member.guild.id }, (erro, docs) => {
      if (docs) {
        if (docs.config.counter.enabled) {
          this.client.guilds.cache
            .get(member.guild.id)
            .channels.cache.get(docs.config.counter.chat)
            .setTopic(
              docs.config.counter.message.replace(
                /{members}/gi,
                this.client.utils.numberToEmoji(member.guild.memberCount)
              )
            );
        }
      } else {
        new this.client.database.guild({
          _id: member.guild.id,
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
        }).save();
        this.client.emit("guildMemberRemove", member)
      }
      if (erro) return console.error(erro);
    });
  }
};
