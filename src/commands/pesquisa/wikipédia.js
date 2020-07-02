const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class WikipédiaCommand extends Command {
  constructor() {
    super("wikipédia", {
      aliases: ["wiki"],
      category: "pesquisa",
      arguments: true,
      description: {
        content: "Pesquise algo da wikipédia.",
        usage: "wikipédia <pesquisa>",
        examples: ["copa do mundo", "internet"]
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
    const res = await fetch(`https://pt.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|info|pageimages&exsentences=10&exintro=true&explaintext=true&inprop=url&pithumbsize=512&redirects=1&formatversion=2&titles=${encodeURIComponent(args.join(' '))}`)
      .then(res => res.json());
    const response = res.query.pages[0];
    
    if (response.missing) message.say(true, `não foi possivel encontrar algo sobre \`${args.join(' ')}\``);
    return message.say(false, {
      embed: new this.client.utils.embed(message.author)
        .setTitle(response.title || args.join(' '))
        .setDescription(`${response.extract.length < 1500 ? response.extract : response.extract.substr(0, 1497)}... **[Ler mais](${response.fullurl})**`)
        .setThumbnail(response.thumbnail ? response.thumbnail.source : '')
    })
  }
}