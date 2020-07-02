const Command = require('../../structures/Command');
const { stringify } = require('querystring');
const fetch = require('node-fetch');
const request = require('request-promise-native');

module.exports = class GoogleCommand extends Command {
  constructor() {
    super('google', {
      aliases: ["go"],
      category: "pesquisa",
      arguments: true,
      maintenance: true,
      description: {
        content: "Pesquise no google pelo discord",
        usage: "google <pesquisa>",
        examples: ["youtube", "discord"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  async exec ({ message, args }) {
    try {
      const url = `http://google.com/search?${stringify({ q: args.join(' '), safe: 'active' })}`;
      console.log(url);
      const response = await request({
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:68.0) Gecko/20100101 Firefox/68.0' },
        url: 'http://google.com/search',
        qs: { q: args.join(' '), safe: 'active' }
      });
      const $ = require('cheerio').load(response);
      let results = [];
      $('.g').each((i) => { results[i] = {}; });
      $('.g .r a h3').each((i, e) => { results[i]['name'] = `${this.getText(e)} - ${e.parent.attribs['href']}`; });
      $('.g .s .st').each((i, e) => { results[i]['value'] = `${this.shortenerText(this.getText(e), 300)}`; });

      results = results.filter(r => r.name && r.value).slice(0, 4);

      return message.say(false, {
        embed: new this.client.utils.embed(message.author, { fields: results })
          .setAuthor(args.join(' '), 'https://imagepng.org/wp-content/uploads/2019/08/google-icon-4.png', url)
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  shortenerText(text, maxLeng = 300) {
    text < maxLeng ? text : text.substr(0, maxLeng - 3) + '...'
  }

  getText(children) {
    if (children.children) return this.getText(children.children);
    return children.map((c) => {
      return c.children ? this.getText(c.children) : c.data
    }).join('');
  }
}