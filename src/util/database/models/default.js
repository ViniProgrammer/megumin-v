module.expots = {
  guild: {
    prefix: "m.",
    config: {
      language: "pt-br",
      welcome: {
        enabled: false,
        chat: "Nenhum",
        message: "{user}, seja bem-vindo ao servidor!",
        captcha: {
          enabled: false,
          chat: "Nenhum"
        }
      },
      leave: {
        enabled: false,
        chat: "Nenhum",
        message: "{user.tag}, acaba de sair do servidor!"
      },
      counter: {
        chat: "Nenhum",
        enabled: false,
        message: "<:emoji_1:704570010214989825> | Membros: {members}"
      },
      commands: {
        enabled: true,
        chat: [],
        forbidden: false
      },
      starboard: {
        enabled: false,
        chat: "Nenhum",
        minimun: "5",
        blockedChat: []
      },
      logs: {
        chat: "Nenhum",
        enabled: false
      },
      antiInvite: {
        enabled: false,
        allowedChannels: [],
        allowGuildInvites: false,
        deleteInvite: true,
        sendMessage: true,
        blockMessage: "{user}, não é possível divulgar outros servidores aqui!"
      },
      role: {
        auto: {
          enabled: false,
          roles: []
        },
        adm: "Nenhum",
        mod: "Nenhum",
        mute: {
          enabled: false,
          id: "Nenhum"
        }
      }
    }
  },
  user: {
    blacklist: false,
    rank: {
      xp: 0,
      level: 0,
      rep: 0,
      lastRep: "0000"
    },
    profileCard: {
      background: "https://i.imgur.com/BRenYsw.png",
      text: "Descrição pessoal não definida!"
    },
    economy: {
      coin: 0,
      daily: "0000",
      weekly: "0000",
      monthly: "0000"
    },
    vip: {
      enabled: false,
      eternal: false,
      time: "0000"
    },
    old: {
      usernames: [],
      avatars: []
    }
  }
};
