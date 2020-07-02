const Command = require("../../structures/Command");

module.exports = class EvalCommand extends Command {
  constructor() {
    super("eval", {
      aliases: ["e"],
      category: "owner",
      arguments: true,
      description: {
        content: "Terminal no discord ¯\_(ツ)_/¯",
        usage: "eval <código>",
        examples: ["message.author.id"]
      },
      ownerOnly: true,
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES"],
      limits: {
        rateLimit: 3,
        cooldown: 0,
      }
    });
  }

  async exec({ message, args, database }) {
    const _user = (_id) => this.client.users.cache.find((user) => user.id == _id);
    const code = args.join(" ").replace(/^`{3}(js)?|`{3}$/g, '').replace(/<@!?(\d{16,18})>/g, '_user($1)');

    try {
      var result = require("util").inspect(eval(code), { depth: 0 });
    } catch (error) {
      result = error.toString();
    }
    
    message.say(false, result, { code: "js" });
  }
};
