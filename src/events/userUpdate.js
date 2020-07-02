  const Event = require('../structures/Event');

  module.exports = class userUpdateEvent extends Event {
    constructor() {
      super("userUpdateEvent", {
        event: "userUpdate",
        type: "once",
        emmiter: "client"
      })
    }

    async exec(oldUser, newUser) {
      if ((oldUser && oldUser.bot) || (newUser && newUser.bot)) return;
      this.client.database.user.findOne({ _id: (oldUser && oldUser.id) || (newUser && newUser.id) }, (erro, docs) => {
        if(docs) {
          if (oldUser.username !== newUser.username) docs.old.usernames.push(oldUser.username);
          if (oldUser.avatar !== newUser.avatar) docs.old.avatars.push(oldUser.displayAvatarURL({ dynamic: true, format: 'png', size: 2048 }));
          docs.save();
        } else {
          new this.client.database.user({
            _id: (oldUser && oldUser.id) || (newUser && newUser.id),
            blacklist: false,
            rank: { xp: 0, level: 0, rep: 0, lastRep: "0000" },
            profileCard: { background: "https://i.imgur.com/BRenYsw.png", text: "Descrição pessoal não definida!" },
            economy: { coin: 0, daily: "0000", weekly: "0000", monthly: "0000" },
            vip: { enabled: false, eternal: false, time: "0000" },
            old: { usernames: [], avatars: [] }
          }).save();
          return this.client.emit('userUpdate', (oldUser, newUser));
        }
        if (erro) return console.error(erro);
      });
    }
  }