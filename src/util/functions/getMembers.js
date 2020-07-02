module.exports = message => {
  function getMembers(target) {
    return message.guild.members.cache.filter(m => m.user.bot == target).size;
  }
}