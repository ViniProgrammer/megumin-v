const Command = require("../../structures/Command");
const moment = require("moment");
moment.locale("pt-br");

module.exports = class ServerinfoCommand extends Command {
  constructor() {
    super("serverinfo", {
      categoria: "utilitários",
      aliases: ["si"],
      description: {
        content: "Veja as informações do servidor.",
        usage: "serverinfo",
        examples: []
      },
      limits: {
        rateLimit: 0,
        cooldown: 0
      }
    });
  }

  async exec({ message, args, database }) {

    function getMembers(target) {
      return message.guild.members.cache.filter(m => m.user.bot == target).size;
    }

    message.say(false, `**${message.guild.name}**`,
      new this.client.utils.embed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .setDescriptionArray([
          [
            `▫ Dono: \`${message.guild.owner.user.username}\``,
            `▫ Data de criação: ${moment(message.guild.createdAt).format("llll")} (\`${moment().diff(message.guild.createdAt, "days")}\` dias)`,
            `▫ ID: \`${message.guild.id}\``
          ],
          [
            `▫ Membros: ${message.guild.memberCount}(\`${getMembers(true)}\` bots)`,
          ]
        ])
        .setImage(message.guild.splashURL() || message.guild.iconURL() || null)
      )
  }
};
