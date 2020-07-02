const { MessageEmbed } = require("discord.js");

module.exports = class Embed extends MessageEmbed {
  constructor(user, data = {}) {
    super(data);

    this.setColor("#FF6347");
    if (user) this.setFooter(user.tag, user.displayAvatarURL()).setTimestamp();
  }

  setDescriptionArray(messages = []) {
    this.setDescription(
      messages
        .map(lines => lines.filter(x => !!x).join("\n"))
        .filter(x => !!x.length)
        .join("\n\n")
    );

    return this;
  }

  setTitleURL(title, url) {
    this.setTitle(title);
    if (url) this.setURL(url);

    return this;
  }

  setTimeFooter(text, image) {
    this.setFooter(text, image || null);
    this.setTimestamp();

    return this;
  }

  addFieldArray(name, values, inline = false) {
    this.addField(
      name,
      values
        .map(lines => lines.filter(x => !!x).join("\n"))
        .filter(x => !!x.length)
        .join("\n\n"),
      inline
    );

    return this;
  }
};
