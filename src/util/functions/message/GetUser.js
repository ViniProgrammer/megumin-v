module.exports = (message, args, position, notAuthor, needMember) => {
  let user;
  if (message.mentions.users.first()) user = message.mentions.users.first();
  else if (message.client.users.cache.get(args[position])) {
    user = message.client.users.cache.get(args[position]);
    args = args.slice(position + 1);
  }
  else if (findMember(message, args[position])) {
    user = findMember(message, args[position]).user;
    args = args.slice(position + 1);
  }
  if (!user) user = message.author;
  if (user.id === message.author.id && notAuthor) return { type: 0 };
  if (needMember) {
    user = message.guild.members.cache.get(user.id);
  }
  if (!user) return { type: 1, mention: (args[position].match(/<@!?(\d{16,18})>/) ? args[position] : `\`${args[position]}\``) }
  
  return user;
}

function findMember(message, name) {
  if (!name) return;
  const member = message.guild.members.cache.filter(a =>
      (a.displayName.toLowerCase().includes(name.toLowerCase())
          || name.toLowerCase().includes(a.displayName.toLowerCase())
          && a.displayName >= name.length)
      || (a.user.username.toLowerCase().includes(name.toLowerCase())
          || name.toLowerCase().includes(a.user.username.toLowerCase())
          && a.user.username.length >= name.length
      ))
  return member.sort((a, b) => a.displayName.length - b.displayName.length).first();
}