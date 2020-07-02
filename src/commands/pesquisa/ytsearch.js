const Command = require('../../structures/Command')
const ytSearch = require('yt-search')

module.exports = class YtsearchCommand extends Command {
  constructor() {
    super('ytsearch', {
      aliases: ["youtube"],
      category: "pesquisa",
      arguments: true,
      description: {
        content: "Pesquise algo do youtube.",
        usage: "ytsearch <título se um vídeo>",
        examples: ["minecraft", "valorant"]
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
    try {
ytSearch(args.join(' '), (erro, res) => {
        const [ r ] = res.videos;

        return message.say(false, new this.client.utils.embed()
          .setTitleURL(`${r.title}(${r.videoId})`, r.url)
          .setThumbnail(r.thumbnail)
          .setDescriptionArray([
            [ `Descrição: \`${r.description || "Nenhuma"}\`` ],
            [ `Views: ${r.views}` ],
            [ `Duração: ${r.timestamp}` ]
          ])
          .setImage(r.image)
          .setTimeFooter(`DE: ${r.author.name.toUpperCase()}`)
        )
      });
    } catch {
      message.say(true, `não encontrei nenhum vídeo com o título: ${args[0]}`)
    }     
  }
}