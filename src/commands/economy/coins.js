const Command = require('../../structures/Command')
module.exports = class CoinsCommand extends Command {
  constructor() {
    super('coins', {
      description: {
        content: "economy"
      },
      category: "economy",
      aliases: ["money", "cash"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }

  async exec({ message, args, database }) {
    const user = message.getUser(0, false, false);
    this.client.database.user.findOne({
      _id: user.id
    }, (erro, docs) => {
      message.say(true, `${user.id === message.author.id ? 'você' : 'este usuário'} possui \`${docs.economy.coin}\` coins.`);
    });
  }
}