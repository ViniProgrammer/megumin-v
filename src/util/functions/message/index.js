module.exports = (client, message, args) => {
  Object.defineProperties(message, {
    say: {
      configurable: true,
      value: (mention, content, options) =>
        require("./Reply")(client, message, mention, content, options)
    },
    getUser: {
      configurable: true,
      value: (position, notAuthor, needMember) =>
        require("./GetUser")(message, args, position, notAuthor, needMember)
    }
  });
};
