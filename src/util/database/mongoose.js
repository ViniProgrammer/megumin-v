const mongoose = require("mongoose");
const { WebhookClient } = require('discord.js')
const webhook = new WebhookClient('712071798509928538', 'G3e0Y-96OSfQdAPvGVy7D_LUh1Nshu5EFTNM9ggm-WudT53ChpkvzEoU2U4XGYOLzQ3e'); 

module.exports.init = () => {
  mongoose.connect(process.env.MONGO, {
    connectTimeoutMS: 10000,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    console.log("[BANCO DE DADOS] A conexão foi feita com sucesso!");
  });

  mongoose.connection.on("err", err => {
   console.log(
      "[BANCO DE DADOS] Erro ao conectar com a database:\n",
      err.stack
    );
  });

  mongoose.connection.on("disconnected", () => {
    console.log("[BANCO DE DADOS] A conexão com a database foi finalizada!");
  });
};
