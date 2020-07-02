const Command = require('../../structures/Command')
module.exports = class MoneyTopCommand extends Command {
  constructor() {
    super('moneytop', {
      category: "economy",
      aliases: ["coinstop"],
      maintenance: true,
      description: {
        content: "Veja o rank das pessoas com mais dinheiro.",
        usage: "moneytop",
        examples: []
      },
      limits: {
        rateLimit: 1,
        cooldown: 3e4
      }
    })
  }

  async exec({ message, args, database }) {
    const top = await this.client.database.user.find().sort('-economy.coin');
    const medals = (p) => p === 0 ? '🥇' : p === 1 ? '🥈' : p === 2 ? '🥉' : '🏅';
    
    message.say(false, new this.client.utils.embed()
      .setAuthor('Aqui está a lista das pessoas com mais dinheiro:')
      .setDescription(top.slice(0, 10).map((user, position) => `${medals(position)} **${position + 1}º**\u2007\u2007${this.client.users.cache.get(user.id).username} - \`${user.economy.coin}\``).join("\n"))
    );
  }
}
