const Command = require("../../structures/Command");

module.exports = class SetPrefixCommand extends Command {
  constructor() {
    super("setprefix", {
      aliases: ["prefix"],
      category: "config",
  //    desabled: true,
      maintenance: true,
      arguments: true,
      description: {
        content: "O bot irá dar uma role setada por um administrador toda vez que um membro entrar.",
        usage: "setprefix [prefixo]",
        examples: ["!", "-"]
      },
      userPerm: ["SEND_MESSAGES", "MANAGE_GUILD"],
      clientPerm: ["SEND_MESSAGES", "MANAGE_MEMBERS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  async exec({ message, args, database }) {
let prefix = args[0]

if (!prefix || prefix.length > 3) return message.say(true, 'você deve dizer um prefixo de `1` a `3` caracteres.');

    database.guild.prefix = prefix
    database.guild.save();
    

    message.say(true, `meu prefixo agora é: \`${database.guild.prefix}\`, use \`${database.guild.prefix}ping\` para testar.`)
    
  }
};
