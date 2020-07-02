const Command = require('../../structures/Command');
const weather = require('weather-js');
const moment = require('moment'); moment.locale('pt-BR');

module.exports = class WeaherCommand extends Command  {
  constructor() {
    super("weather", {
      aliases: ["clima", "temperatura"],
      category: "pesquisa",
      arguments: true,
      description: {
        content: "Veja o clima de algum lugar no mundo.",
        usage: "weather <cidade>",
        examples: ["são paulo", "tóquio"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  exec({ message, args }) {
    weather.find({ search: args.join(' '), degreeType: 'C', lang: 'pt-BR' }, async (e, r) => {
      if (e) {
        console.log(e.stack);
        return message.say(true, 'ocorreu um erro inesperado, tente novamente mais tarde!');
      }
      if(!r) return message.say(true, 'coloque uma cidade para mostrar sua previsão!');
      const [{ current, location, forecast }] = r;
      
      return message.say(false, {
        embed: new this.client.utils.embed(message.author).setThumbnail(current.imageUrl)
        .setDescriptionArray([
          [
            `Cidade: ${location.name}`,
            `Coordenadas: ${location.lat}, ${location.long}`,
            `Fuso horário: ${location.timezone} UTC`,
          ], [
            `Temperatura: ${current.temperature}° C`,
            `Sensação térmica: ${current.feelslike}°`,
            `Horário: ${current.observationtime}`,
            `Ventos: ${current.winddisplay}`,
            `Umidade do ar: ${current.humidity}%`,
          ],
        ])
        .addFieldArray(`${FirstUpperCase(forecast[0].day)} (${moment(forecast[0].date).format('L')})`, [[`Temperatura: Mín. ${forecast[0].low}°/Máx. ${forecast[0].high}°`, `Clima: ${forecast[0].skytextday}`]])
        .addFieldArray(`${FirstUpperCase(forecast[1].day)} (${moment(forecast[1].date).format('L')})`, [[`Temperatura: Mín. ${forecast[1].low}°/Máx. ${forecast[1].high}°`, `Clima: ${forecast[1].skytextday}`]])
        .addFieldArray(`${FirstUpperCase(forecast[2].day)} (${moment(forecast[2].date).format('L')})`, [[`Temperatura: Mín. ${forecast[2].low}°/Máx. ${forecast[2].high}°`, `Clima: ${forecast[2].skytextday}`]])
        .addFieldArray(`${FirstUpperCase(forecast[3].day)} (${moment(forecast[3].date).format('L')})`, [[`Temperatura: Mín. ${forecast[3].low}°/Máx. ${forecast[3].high}°`, `Clima: ${forecast[3].skytextday}`]])
        .addFieldArray(`${FirstUpperCase(forecast[4].day)} (${moment(forecast[4].date).format('L')})`, [[`Temperatura: Mín. ${forecast[4].low}°/Máx. ${forecast[4].high}°`, `Clima: ${forecast[4].skytextday}`]])
      });
    });
  }
}

function FirstUpperCase(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}
