const Command = require("../../structures/Command");

module.exports = class AutoRoleCommand extends Command {
  constructor() {
    super("autorole", {
      category: "config",
      desabled: true,
      description: {
        content: "O bot irá dar uma role setada por um administrador toda vez que um membro entrar.",
        usage: "autorole @role",
        examples: ["@Cargo1", "@Cargo1 @Cargo2", "@Cargo1 @Cargo2 @Cargo3"]
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
    try {
    const roles = message.mentions.roles.array();
    if (roles.length === 0) return message.say(true, 'você precisa mencionar um ou mais cargos!');
    if (database.guild.config.role.auto.enabled && roles.some(r => database.guild.config.role.auto.roles.includes(r.id))) return message.say(true, `o autoRole já foi setado com os seguintes cargos: ${database.guild.config.role.auto.roles.map(a => `\`${message.guild.roles.cache.get(a).name}\``).join(', ')}! Verifique se você não repetiu algum cargo!`);

    database.guild.config.role.auto.enabled = true;
    for (const r of roles) database.guild.config.role.auto.roles.push(r.id);
    database.guild.save();

    return message.say(true, `o autoRole foi setado/adicionado os seguintes cargos: ${roles.map(a => `\`${a.name}\``).join(', ')}!`);
    } catch(e){
      message.say(true, 'ocorreu um erro inesperado, desculpe! 😢')
    }
  }
};
