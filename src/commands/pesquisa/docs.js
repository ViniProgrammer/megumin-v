const Command = require('../../structures/Command')
const fetch = require('node-fetch')
const { stringify } = require('querystring');

module.exports = class DocsCommand extends Command {
  constructor(){
    super('docs', {
      aliases: ["docsjs"],
      category: "pesquisa",
      arguments: true,
      description: {
        content: "Obtenha informações das docs do Discord.js",
        usage: "docs <pesquisa>",
        examples: ["Client", "Message"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }
  
  async exec({ message, args }) {
    const docs = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https%3A%2F%2Fraw.githubusercontent.com%2Fdiscordjs%2Fdiscord.js%2Fdocs%2Fstable.json&q=${args.join(' ')}`)
      .then(res => res.json());
    if ([404, 400].includes(docs.status)) return message.say(true, `não foi possível encontrar algo sobre: \`${args.join(' ')}\``);

    message.say(false, { embed: docs });
  }
}