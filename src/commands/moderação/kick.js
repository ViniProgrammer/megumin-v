const Command = require('../../structures/Command');

module.exports = class KickCommand extends Command {
  constructor(){
    super("kick", {
      aliases: ["k", "chutar"],
      category: "moderação",
      arguments: true,
      description: {
        content: "Usado para expulsar alguém.",
        usage: "kick @user [motivo]",
        examples: ["@Megumin", "@Megumin ¯\_(ツ)_//¯"],
      },
      userPerm: ["SEND_MESSAGES", "KICK_MEMBERS"],
      clientPerm: ["SEND_MESSAGES", "KICK_MEMBERS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }

  exec({ message, args }) {
    const member = message.getUser(0, true, true);
    if (member.type && member.type === 0) return message.say(true, 'você não pode mencionar a si mesmo!');
    if (member.type && member.type === 1) return message.say(true, `não foi possível encontrar ${member.mention}!`);
    if (member.permissions.has("KICK_MEMBERS") || !member.kickable) return message.say(true, 'eu não posso expulsar este usuário!');

    member.kick(args.slice(1).join(' ') || 'Não possui um motivo.')
      .then(() => message.say(true, `**${member.user.username}** foi kickado com sucesso!\n**Motivo**: \`${args.slice(1).join(' ') || `Não possui um motivo.`}\``))
      .catch((err) => {
        console.error(err);
        return message.say(true, 'ocorreu um erro na execução da expulsão!');
    });
  }
};
  