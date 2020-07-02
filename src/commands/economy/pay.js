const Command = require('../../structures/Command');

module.exports = class PayCommand extends Command {
  constructor() {
    super("pay", {
      description: {
        content: "envie dinheiro para alguém.",
        examples: ["Megumin", "Megumin#9878", "@Megumin"],
        usage: "pay @user [quantidade]"
      },
      arguments: true,
    
      category: "economy",
      aliases: ["pagar", "depositar", "doar"],
      
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    })
  }

  async exec({ message, args, database }) {
  
    const user = message.getUser(0, false, true);
    const coins  = parseInt(args[1]);

    if (parseInt(args[1]) > 0) {
      if (args[1] < database.user.economy.coin) {
        if (!user) return message.say(true, 'você deve mencionar alguém para enviar o dinheiro!');
        if (!args[0]) return message.say(true, 'você deve indicar um valor para ser enviado/doado');
        if (message.mentions.users.first().id == message.author.id) return message.say(true, 'você não pode doar para si mesmo');
        if (user.bot) return message.say(true, 'você não pode doar para um bot.');

        this.client.database.user.findOne({
          _id: user.id
        }, (erro, doc) => {
          doc.economy.coin += coins
          doc.save();
          database.user.economy.coin -= coins
          database.user.save();
          message.say(false, `você doou \`${coins}\` para ${user}`);
        });
      } else {
        message.say(true, `você não possui esse dinheiro.`);
     }
    }
    }
  }
