const Command = require("../../structures/Command");
const moment = require("moment");
moment.locale("pt-br");

module.exports = class UserinfoCommand extends Command {
  constructor() {
    super("userinfo", {
      aliases: ["ui"],
      category: "utilitários",
      description: {
        content: "Veja as informações de um usuário.",
        usage: "userinfo [usuário]",
        examples: ["Megumin", "Megumin#9878", "@Megumin"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4
      }
    });
  }

  exec({ message, args, database }) {
    const member = message.getUser(0, false, true);
    if (member.type === 1) return message.say(true, `não foi possível encontrar ${member.mention}`);
    const servers = this.client.guilds.cache.filter(a => a.members.cache.get(member.id));
    const status = {
      online: "<:Online:612325153317060623> Online",
      dnd: "<:Dnd:612324956025520168> Não pertube",
      idle: "<:Idle:612324956390555655> Ausente",
      offline: "<:Offline:612325152759480332> Indisponível/Invisível",
      stream: "<:Streaming:612325157213700170> Transmitindo"
    };

    this.client.database.user.findOne({ _id: member.user.id }, (err, docs) => {
      if (docs) {

        message.say(true, `informações sobre **${member.user.tag}**`, new this.client.utils.embed()
            .setTitle(member.user.username)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`${member.user.username} ${member.user.bot ? "<:bot:538163542260580352>" : ""}`)
            .setDescriptionArray([
              [
                `▫ Apelido: ${member.nickname || "nenhum"}`,
                `▫ TAG: \`${member.user.discriminator}\``,
                `▫ ID: \`${member.user.id}\``,
                `▫ Data de criação: ${moment(member.user.createdAt).format("llll")} (\`${moment().diff(member.user.createdAt, "days")}\` dias)`,
                `▫ Status: ${status[member.user.presence.status]}`
              ], [
                `▫ Servidores em comum [${servers.size}]: ${servers.map(a => `\`${a.name}\``).join(", ")}`,
                `▫ Histórico de nomes [${docs.old.usernames.length}]: ${docs.old.usernames.map(a => `\`${a}\``).join(", ") || "nada registrado."}`

              ]
            ])
        );
      } else {
        new this.client.database.user({
          _id: message.author.id,
          blacklist: false,
          rank: { xp: 0, level: 0, rep: 0, lastRep: "0000" },
          profileCard: { background: "https://i.imgur.com/BRenYsw.png", text: "Descrição pessoal não definida!" },
          economy: { coin: 0, daily: "0000", weekly: "0000", monthly: "0000" },
          vip: { enabled: false, eternal: false, time: "0000" },
          old: { usernames: [], avatars: [] }
        }).save();
        return this.client.emit('message', message);
      }
    });
  }
};
