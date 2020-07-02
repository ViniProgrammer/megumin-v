const Command = require("../../structures/Command");

module.exports = class AvatarCommand extends Command {
  constructor() {
    super("avatar", {
      aliases: ["pic"],
      category: "utilitários",
      description: {
        content: "Veja o avatar de algum usuário.",
        usage: "avatar [usuário]",
        examples: ["Megumin", "Megumin#9878", "@Megumin"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4
      }
    });
  }

  exec({ message, args }) {
    const member = message.getUser(0, false, true);
    const avatar = (options = {}) => member.user.displayAvatarURL(options);

    return message.say(false, {
      embed: new this.client.utils.embed(message.author)
        .setDescription(`[Avatar](${avatar()}) de ${member}`)
        .setImage(avatar({ dynamic: true, size: 2048, format: "png" }))
    });
  }
};
