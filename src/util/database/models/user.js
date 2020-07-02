const mongoose = require("mongoose");

const user = new mongoose.Schema({
  _id: { type: String},
  blacklist: { type: Boolean, default: false },
  rank: {
    xp: { type: { type: Number, default: 0 }, default: 0 },
    level: { type: Number, default: 0 },
    rep: { type: Number, default: 0 },
    lastRep: { type: String, default: "0000" }
  },
  profileCard: {
    background: { type: String, default: "https://i.imgur.com/BRenYsw.png" },
    text: { type: String, default: "Descrição pessoal não definida!" }
  },
  economy: {
    coin: { type: Number, default: 0 },
    daily: { type: String, default: "0000000000000" },
    weekly: { type: String, default: "0000000000000" },
    monthly: { type: String, default: "0000000000000" }
  },
  vip: {
    enabled: { type: Boolean, default: false },
    eternal: { type: Boolean, default: false },
    time: { type: String, default: "0000" }
  },
  old: {
    usernames: { type: Array, default: [] },
    avatars: { type: Array, default: [] }
  }
});

module.exports = mongoose.model("users", user);
