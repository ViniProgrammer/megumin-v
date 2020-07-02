const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class MCStatusCommand extends Command {
  constructor() {
    super('mcstatus', {
      category: "game",
      arguments: true,
      description: {
        content: "Veja os status de servidor de Minecraft.",
        usage: "mcstatus <ip do servidor>",
        examples: ["hypixel.net", "mc.skycraft.com.br"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }
  
  async exec({ message, args }) {
    const data = await fetch(`https://api.minetools.eu/ping/${args[0]}`).then(res => res.json()).then(body => body || body[0]);
    if (data.error === '[Errno -2] Name or service not known') return message.say(true, 'ip inválido, tente novamente depois de verifica-lo!');
    
    try {
     const samples = data.players.sample.length;
      const embed = new this.client.utils.embed().setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${args[0]}`)
        .setDescription(`\`\`\`css\n${data.description.replace(/§[a-z0-9]/g, '')}\`\`\``)
        .addFields(
          { name: 'Latência', value: `\`${parseInt(data.latency)}\` ms`, inline: samples > 0 ? true : false },
          { name: 'Versão', value: [`Nome: **${data.version.name.replace(/§[a-z0-9]/g, '')}**`,`Protocol: **${data.version.protocol}**`].join('\n'), inline: samples > 0 ? true : false },
          { name: 'Players', value: [`Máximo: **${data.players.max}**`, `Online: **${data.players.online}**`].join('\n'), inline: samples > 0 ? true : false }
        );
      
      samples > 0 ? embed.addField('Samples', data.players.sample.map(a => `\`\`\`css\n${a.name.replace(/§[a-z0-9]/g, '')}\`\`\``).join('')) : null
      
      message.say(false, { embed })
    } catch (e) {
      console.error(e);
      message.say(true, 'ocorreu um erro ao executar o comando!');
    }
  }
}