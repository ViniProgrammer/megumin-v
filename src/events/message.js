const Event = require('../structures/Event');
const Functions = require('../util/functions/message');

module.exports = class Message extends Event {
  constructor() {
    super("MessageEvent", {
      event: "message",
      emmiter: "client",
      type: "on"
    });
  }

  exec(message) {
    if (message.author.bot) return;
    
    this.client.database.guild.findOne({ _id: message.guild.id }, (errorGuild, docGuild) => {
      if (docGuild) {
        this.client.database.user.findOne({ _id: message.author.id }, (errorUser, docUser) => {
          if (docUser) {
            if (message.content === message.guild.me.toString()){
              return message.channel.send(`Meu prefixo neste servidor é \`${docGuild.prefix}\`, use  \`${docGuild.prefix}help\` para testar.`)
            }
            const prefix = (docGuild.prefix === 'm.' ? this.client.prefixes : [docGuild.prefix]).find(p => message.content.toLowerCase().startsWith(p));
            if (!prefix || message.content === prefix) return;
            
            const args = message.content.slice(prefix.length).trim().split(/\s+/g);
            const command = args.shift().toLowerCase();
            const cmd = this.client.commands.find((cmd) => cmd.help.name === command || cmd.config.aliases.includes(command));

            Functions(this.client, message, args);

            if (cmd && message.guild.me.permissions.has(['SEND_MESSAGES'])) {
              if (cmd.config.disabled && !this.client.owners.includes(message.author.id))
                return message.say(true, 'este comando foi desativado!');
              if (cmd.config.maintenance && !this.client.owners.includes(message.author.id))
                return message.say(true, 'este comando esta em manutenção!');
              if (cmd.requirements.ownerOnly && !this.client.owners.includes(message.author.id))
                return message.say(true, 'este comando só pode ser utilizado pelo meus donos!');
              if (cmd.requirements.guildOnly && message.channel.type === 'dm')
                return message.say(true, 'este comando não pode ser utilizado no meu privado!');
              if (cmd.requirements.userPerm && !message.member.permissions.has(cmd.requirements.userPerm))
                return message.say(true, `você precisa das seguintes permissões ${missingPerms(message.member, cmd.requirements.userPerm)}`);
              if (cmd.requirements.clientPerm && !message.guild.me.permissions.has(cmd.requirements.clientPerm))
                return message.say(true, `eu preciso das seguintes permissões ${missingPerms(message.guild.me, cmd.requirements.clientPerm)}`)            
              if (cmd.config.arguments && !args.join(' '))
                return message.say(true, `você está utilizando o comando de forma incorreta, tente desta maneira \`${docGuild.prefix}${cmd.help.usage}\``);
              if (cmd.requirements.limits) {
                const current = this.client.limits.get(`${command}-${message.author.id}`)
                if(!current) this.client.limits.set(`${command}-${message.author.id}`, 1);
                else {
                  if(current >= cmd.limits.rateLimit) return;
                  this.client.limits.set(`${command}-${message.author.id}`, current + 1)
                }
                setTimeout(() => {
                  this.client.limits.delete(`${command}-${message.author.id}`)
                }, cmd.limits.cooldown)
              }

              const database = { guild: docGuild, user: docUser, prefix };
              try { cmd.exec({ message, args, database }) } catch (error) {
                console.error(error);
              }
            }
            
          } else {
            new this.client.database.user({
              _id: message.author.id,
              blacklist: false,
              rank: { xp: 0, level: 0, rep: 0, lastRep: "0000" },
              profileCard: { background: "https://i.imgur.com/BRenYsw.png", text: "Descrição pessoal não definida!" },
              economy: { coin: 0, daily: "0000", weekly: "0000", monthly: "0000" },
              vip: { enabled: false, eternal: false, time: "0000" },
              old: { usernames: [], avatars: [] }
            }).save();
            return this.client.emit('message', message);
          }
          if (errorUser) return console.error(errorUser);
        });
      } else {
        new this.client.database.guild({
          _id: message.guild.id,
          prefix: "m.",
          language: "pt-br",
          config: {
            welcome: { enabled: false, chat: "Nenhum", message: "{user}, seja bem-vindo ao servidor!", captcha: { enabled: false, chat: "Nenhum" } },
            leave: { enabled: false, chat: "Nenhum", message: "{user.tag}, acaba de sair do servidor!" },
            counter: { chat: "Nenhum", enabled: false, message: "<:emoji_1:704570010214989825> | Membros: {members}" },
            commands: { enabled: true, chat: [], forbidden: false },
            starboard: { enabled: false, chat: "Nenhum", minimun: "5", blockedChat: [] },
            logs: { chat: "Nenhum", enabled: false },
            antiInvite: { enabled: false, allowedChannels: [], allowGuildInvites: false, deleteInvite: true, sendMessage: true, blockMessage: "{user}, não é possível divulgar outros servidores aqui!" },
            role: { auto: { enabled: false, roles: [] }, adm: "Nenhum", mod: "Nenhum", mute: { enabled: false, id: "Nenhum" }
            }
          }
        }).save();
        return this.client.emit('message', message);
      }
      if (errorGuild) return console.error(errorGuild);
    });
  }
}

function missingPerms(member, perms) {
  const missing = member.permissions.missing(perms)
    .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
  
  return missing.length > 1
    ? `\`${missing.slice(0, -1).join(', ')}\` e \`${missing.slice(-1)[0]}\``
    : missing[0];
}
