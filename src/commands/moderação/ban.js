const Command = require('../../structures/Command');

module.exports = class BanCommand extends Command {
  constructor(){
    super("ban", {
      aliases: ["b", "vaza"],
      category: "moderação",
      arguments: true,
      description: {
        content: "Usado para banir alguém.",
        usage: "ban @user [motivo]",
        examples: ["@Megumin", "@Megumin ¯\_(ツ)_//¯"],
      },
      userPerm: ["SEND_MESSAGES", "BAN_MEMBERS"],
      clientPerm: ["SEND_MESSAGES", "BAN_MEMBERS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }

  exec({ message, args }) {
    const member = message.getUser(0, true, false);
    if (member.type === 0) return message.say(true, 'você não pode mencionar a si mesmo!');
    if (member.type === 1) return message.say(true, `não foi possível encontrar ${member.mention}!`);
    if (!member.bannable)  return message.say(true, 'eu não posso banir este usuário!');

    message.guild.members.ban(member, { reason: args.slice(1).join(' ') || 'Não possui um motivo.' })
      .then(() => message.say(true, `**${member.user.username}** foi banido com sucesso!\n**Motivo**: \`${args.slice(1).join(' ') || `Não possui um motivo.`}\``))
      .catch((err) => {
        console.error(err);
        return message.say(true, 'ocorreu um erro na execução do banimento!');
    });
  }
};
  