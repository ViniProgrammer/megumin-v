const Command = require('../../structures/Command')
const fetch = require('node-fetch')
module.exports = class RobloxCommand extends Command {
  constructor(){
    super('roblox', {
      aliases: ["rbuser"],
      category: "game",
      arguments: true,
      description: {
        content: "Veja as informações de um jogador do ROBLOX.",
        usage: "roblox <user>",
        examples: ["Vini166666"]
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
    const res = await fetch(`https://www.roblox.com/search/users/results?keyword=${args.join(' ')}`).then(res => res.json())
    if (res.TotalResults === 0) return message.say(true, 'nome inválido, verifique-o e tente novamente!');

    const RobloxUser = res.UserSearchResults[0];
    const RobloxFriends = await fetch(`https://www.roblox.com/users/friends/list-json?userId=${RobloxUser.UserId}&currentPage=0&friendsType=Following&imgHeight=100&imgWidth=100&pageSize=18`).then(res => res.json());
    const AvatarUser = await fetch(`https://www.roblox.com/search/users/avatar?isHeadshot=false&userIds=${RobloxUser.UserId}`).then(res => res.json())
    
    message.say(false, {
      embed: new this.client.utils.embed(message.author)
        .setAuthor(RobloxUser.Name, RobloxUser.IsOnline ? 'https://cdn.discordapp.com/emojis/612325153317060623.png?v=1' : 'https://cdn.discordapp.com/emojis/612325152759480332.png?v=1', `https://roblox.com${RobloxUser.UserProfilePageUrl}`)
        .setThumbnail(AvatarUser.PlayerAvatars[0].Thumbnail.Url)
        .setDescription(RobloxUser.Blurb)
        .addFields(
          { name: 'Grupo Primário', value: RobloxUser.PrimaryGroup || "Não possui um grupo primário." },
          { name: `Seguindo [${RobloxFriends.TotalFriends}]`, value: RobloxFriends.Friends.map(a => '`'+a.Username+'`').join(', ') || "Este usuário não segue ninguém."}
        )
    });
  }
}