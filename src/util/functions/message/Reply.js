module.exports = (client, message, mention, content, options) => {
  if (!options && typeof content === "object" && !Array.isArray(content)) {
    options = content;
    content = "";
  }
  if (!options) {
    options = {};
  }
  const send = async channel => {
    try {
      message[channel].startTyping();
      message[channel]
        .send((mention ? `${message.author}, ` : "") + content, options)
        .then(() => message[channel].stopTyping(true));
    } catch (e) {
      options.member
        ? message.channel.send(
            `${message.author}, você deve ativar as suas mensagens privadas!`,
            new client.utils.embed(message.author)
              .setColor([255, 67, 54])
              .setImage(
                "https://image.prntscr.com/image/sdKzXqzBSiqxzV4rfWjrsA.png"
              )
          )
        : (() => {
            console.log(e);
            message.channel.send(
              `${message.author}, ocorreu um erro na execução este comando!`
            );
          })();
    }
  };
  return send(options.member ? "author" : "channel");
};
