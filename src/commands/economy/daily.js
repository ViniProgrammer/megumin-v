const Command = require('../../structures/Command');
const moment = require('moment'); require("moment-duration-format");
moment.locale('pt-br');
let sendCoin = new Set();

module.exports = class DailyCommand extends Command {
  constructor() {
    super('daily', {
      description: {
        content: "economy"
      },
      // maintenance: true,
      category: "economy",
      aliases: ["diário"],
      limits: {
        rateLimit: 0,
        cooldown: 0,
      }
    })
  }

  async exec({ message, args, database }) {
    const rVal = Math.floor(Math.random() * 8500);
    // let tempo = moment.duration.format([moment.duration((parseInt(database.user.economy.daily) + 86400000)- Date.now())], 'hh:mm:ss');
    
    if (sendCoin.has(message.author.id)) return message.say(true, `coins diário já coletado. Tente novamente amanhã!`);

    database.user.economy.coin +=+ rVal
    database.user.save();

    message.say(true, `parabéns! hoje você coletou \`${rVal}\` coins, não esqueça de coletar mais amanhã!`)
    sendCoin.add(message.author.id);
    setTimeout(() => sendCoin.delete(message.author.id), 86400000);
  }
}
