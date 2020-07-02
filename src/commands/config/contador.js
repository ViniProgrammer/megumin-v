const Command = require('../../structures/Command');

module.exports = class ContadorCommand extends Command {
  constructor() {
    super('contador', {
      aliases: ["counter"],
      category: "config",
      description: {
        content: "Deixa o tópico do seu chat bonitinho com a quantidade  de membros nele! :3",
        usage: "contador <#canal> [mensagem]",
        examples: ["#canal", "#canal [mensagem]"]
      },
      userPerm: ["SEND_MESSAGES", "MANAGE_GUILD"],
      clientPerm: ["SEND_MESSAGES", "MANAGE_CHANNELS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }

  exec({ message, args, database }) {
    const channel = message.mentions.channels.first();
    const counterMsg = args.slice(1).join(' ');

    
    if (!args[0]) return message.say(false, new this.client.utils.embed(message.author)
      .setColor([255, 67, 54])
      .setDescriptionArray([[
          'Para utilizar este comando de forma correta, você deve inserir um canal de texto, caso queira adicionar uma mensagem personaliza, só digita-la depois de mencionar o chat...',
          `Desta forma: **${database.guild.prefix}contador #chat [mensagem]**`,
          'Coloque `{members}` na posição desejada da mensagem, indicando onde será mostrado a quantidade de membros!',
        ], [
          'Minha mensagem padrão é esta:',
          `<:emoji_3:714895779658989639> | Membros: {members}`.replace(/{members}/gi, this.client.utils.numberToEmoji(message.guild.memberCount))
        ]])
    )

    if (database.guild.config.counter.enabled && database.guild.config.counter.chat === channel.name) return message.say(true, `o contador já foi setado em <#${database.guild.config.counter.chat}>!`);
    if (database.guild.config.counter.enabled && database.guild.config.counter.chat !== channel.name) {
      message.say(true, `o contador já foi setado em <#${database.guild.config.counter.chat}>, porém ele será modificado para ${channel}!`);
      message.guild.channels.cache.get(database.guild.config.counter.chat).setTopic('');
    }
    database.guild.config.counter.enabled = true;
    database.guild.config.counter.chat = channel.id;
    database.guild.config.counter.message = counterMsg || '<:emoji_3:714895779658989639> | Membros: {members}';
    database.guild.save();

    message.say(true, `contador setado com sucesso em ${channel}`);
    message.guild.channels.cache.get(channel.id).setTopic(database.guild.config.counter.message.replace(/{members}/gi, this.client.utils.numberToEmoji(message.guild.memberCount)));
  }
}
