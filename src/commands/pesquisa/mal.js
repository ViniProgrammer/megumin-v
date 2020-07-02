const Command = require("../../structures/Command");
const { getInfoFromName } = require("mal-scraper");
const translate = require("@k3rn31p4nic/google-translate-api");

module.exports = class MalCommand extends Command {
  constructor() {
    super("mal", {
      aliases: ["myanimelist"],
      category: "pesquisa",
      arguments: true,
      description: {
        content: "Veja as informações de um anime.",
        usage: "mal <anime>",
        examples: ["konosuba", "sword art online"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES", "EMBED_LINKS"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }
  async exec({ message, args }) {
    const data = await getInfoFromName(args.join(" "));
    const stat = {
      "Currently Airing": "Em lançamento",
      "Publishing": "Em lançamento",
      "Finished Airing": "Finalizado",
      "Finished": "Finalizado",
      "Not Yet Aired": "Ainda não foi lançado",
      "Not Yet Published": "Ainda não foi publicado"
    }
    
    const trans = await translate(data.synopsis.split("\n\n")[0], { to: "pt" });
    const embed = new this.client.utils.embed()
      .setTitle(`${data.title}${data.japaneseTitle ? ` **(${data.japaneseTitle})**` : ""} ${data.type}`)
      .setDescription(trans.text || "Sinopse não publicada/encontrada")
      .setTimeFooter(`MyAnimeList ID: ${data.id}`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }));

    data.picture ? embed.setThumbnail(data.picture) : null;
    data.aired ? embed.addField("Exibido", data.aired, false) : null;
    data.episodes ? embed.addField("Episódios", data.episodes, true) : null;
    data.score ? embed.addField("Score", data.score, true) : null;
    data.status ? embed.addField("Status", stat[data.status], true) : null;
    
    message.say(false, { embed });
  }
};
