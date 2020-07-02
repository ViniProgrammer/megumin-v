const Command = require('../../structures/Command');
const translate = require("@k3rn31p4nic/google-translate-api");
module.exports = class TranslateCommand extends Command {
  constructor(){
    super('translate', {
      aliases: ["trans"],
      category: "pesquisa",
      arguments: true,
     // maintenance: true,
      description: {
        content: "Traduza algo para qualquer linguagem.",
        usage: "translate [idioma 1] [idioma 2] (texto)",
        examples: ["en pt hi", "pt en oi", "en id hi"]
      },
      limits: {
        rateLimit: 1,
        cooldown: 3e4
      }
    })
  }
  async exec({ message, args, database }){
    try {
      
    const texto = args.slice(2).join(' ')
    
    if(!texto) return message.say(true, 'você deve dizer algo para ser traduzido.')
      let lang1 = args[0]
      let lang2 = args[1]
    if(!lang2) return message.say(true, 'você deve dizer a segunda linguagem.');
      
    const trans = await translate(texto, { from: lang1, to: lang2 })
    
    const embed = new this.client.utils.embed()
    .setDescription(trans.text)
    .setThumbnail(message.author.avatarURL())
    .setAuthor('Tradução', 'https://cdn.discordapp.com/attachments/537404035192455178/714635480490049597/1200px-Google_Translate_logo.svg.png')
    .addFields(
      { name: "Traduzido do:", value: args[0] },
      { name: "Traduzido para:", value: args[1] }
    )
    message.say(true, embed)
    } catch(e){
      message.say(true, 'linguagem inválida, tente novamente.')
    }
  }
}