const mongoose = require("mongoose");

const guild = new mongoose.Schema({
  _id: { type: String},
  booster_chat: { type: String, default: "Nenhum"},
  prefix: { type: String, default: "m." },
  config: {
    language: { type: String, default: "pt-br" },
    welcome: {
      enabled: { type: Boolean, default: false },
      chat: { type: String, default: "Nenhum" },
      message: { type: String, default: "{user}, seja bem-vindo ao servidor!" },
      captcha: {
        enabled: { type: Boolean, default: false },
        chat: { type: String, default: "Nenhum" }
      }
    },
    leave: {
      enabled: { type: Boolean, default: false },
      chat: { type: String, default: "Nenhum" },
      message: {
        type: String,
        default: "{user.tag}, acaba de sair do servidor!"
      }
    },
    counter: {
      chat: { type: String, default: "Nenhum" },
      enabled: { type: Boolean, default: false },
      message: {
        type: String,
        default: "<:emoji_1:704570010214989825> | Membros: {members}"
      }
    },
    commands: {
      chat: { type: Array, default: [] },
      forbidden: { type: Boolean, default: false }
    },
    starboard: {
      enabled: { type: Boolean, default: false },
      chat: { type: String, default: "Nenhum" },
      minimun: { type: String, default: "5" },
      blockedChat: { type: Array, default: [] }
    },
    logs: {
      chat: { type: String, default: "Nenhum" },
      enabled: { type: Boolean, default: false }
    },
    antiInvite: {
      enabled: { type: Boolean, default: false },
      allowedChannels: { type: Array, default: [] },
      allowGuildInvites: { type: Boolean, default: false },
      deleteInvite: { type: Boolean, default: false },
      sendMessage: { type: Boolean, default: true },
      blockMessage: {
        type: String,
        default: "{user}, não é possível divulgar outros servidores aqui!"
      }
    }
  },
    role: {
      auto: {
        enabled: { type: Boolean, default: false },
        roles: { type: Array, default: "Nenhum" }
      },
      adm: { type: String, default: "Nenhum" },
      mod: { type: String, default: "Nenhum" },
      mute: {
        enabled: { type: Boolean, default: false },
        id: { type: String, default: "Nenhum" }
      }
    }
});

module.exports = mongoose.model("guilds", guild);
