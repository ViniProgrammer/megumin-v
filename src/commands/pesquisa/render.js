const Command = require("../../structures/Command");
const puppeteer = require("puppeteer");

module.exports = class RenderCommand extends Command {
  constructor() {
    super("render", {
      aliases: ["renderizar"],
      category: "pesquisa",
      maintenance: true,
      arguments: true,
      description: {
        content: "Renderize um site.",
        usage: "render <site>",
        examples: ["https://www.youtube.com", "https://www.google.com"]
      },
      userPerm: ["SEND_MESSAGES"],
      clientPerm: ["SEND_MESSAGES"],
      limits: {
        rateLimit: 3,
        cooldown: 3e4,
      }
    });
  }

  async exec({ message, args }) {
    const pornSites = /(https?)?(:\/\/(www\.)?)?(xvideos|pornhub|xhamster|xnxx|pornpics|videostravesti.xxx|videosdesexo|thothub.tv|bluezão|bluezao|cameraprive|youporn|javhd|9xxx.net|jerkhd|hclips|porn|tnaflix|tube8|spankbang|drtuber|vporn|spankwire|keezmovies|nuvid|ixxx|sunporno|pornhd|porn300|sexvid|thumbzilla|zbporn|instawank|xxxbunker|3movs|xbabe|porndroids|alohatube|tubev|4tube|shameless|megatube|porntube|pornburst|bobs-tube|redporn|pornrox|pornmaki|pornid|fapster|slutload|proporn|pornhost|xxxvideos247|handjobhub|dansmovies|porn7|tubegals|camhub|24porn|pornheed|orgasm|pornrabbit|madthumbs|fux|bestpornbabes|xnxxhamster|xxvids|h2porn|metaporn|pornxio|pornerbros|youjizz|iporntv|mobilepornmovies|watchmygf\.mobi|pornplanner|mypornbible|badjojo|findtubes|pornmd|nudevista|jasmin|imlive|liveprivates|joyourself|stripchat|cams|luckycrush|camsoda|jerkmate|slutroulette|watchmyexgf|fantasti|watchmygf\.me|watch-my-gf\.com|watch-my-gf\.me|watchmygf\.tv|lovehomeporn|beeg|iknowthatgirl|daredorm|assoass|bigassporn|babesrater|stufferdb|pornpics|viewgals|jpegworld|pichunter|88gals|18asiantube|zenra|bdsmstreak|punishbang|clips4sale|zzcartoon|hentaihaven|hentaicore|hentaigasm|fakku|gelbooru|hentaipulse|porcore|cartoonporno|sankakucomplex|hentai-foundry|eggporncomics|vrporn|sexlikereal|vrbangers|vrsmash|badoinkvr|wankzvr|czechvr|vrcosplayx|vrconk|virtualtaboo|gaymaletube|manporn|youporngay|gayfuror|zzgays|justusboys|myporngay|iptorrents|pussytorrent|suicidegirls|fashiongirls|top live sex cams|freeones|barelist|babepedia|kindgirls|tubepornstars|hotsouthindiansex|xpaja|lesbian8|girlsway|shemalehd|anyshemale|tranny|tgtube|besttrannypornsites|nutaku|69games|gamcore|lifeselector|hooligapps|brazzers|the gf network|reality kings|digital playground|mofos|gfrevenge|twistys|teamskeet|bangbros|21sextury|ddf network|elegantangel|videosz|hustler|japanhdv|jav hd|newsensations|pornpros|perfect gonzo|all japanese pass|18videoz|nubiles|kinkyfamily|baberotica|all of gfs|dorcelclub|localhussies|adultfriendfinder|getiton|onlinefreechat|perezhilton|thehollywoodgossip|nakednews|avn|maxim|playboy|menshealth|forum\.xnxx|forumophilia|jdforum|joylovedolls|siliconwives|yourdoll|sexysexdoll|sexyrealsexdolls|kikdolls|asexdoll|dollwives|sexdollgenie|fansdolls)(\.com)?/g;

    if (!message.channel.nsfw && args[0].match(pornSites)) return message.say(true,"eu não posso renderizar sites pornográficos neste canal!");

    try {
      const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
      const page = await browser.newPage();
      await page.goto(`${args[0]}`);
      await page.setViewport({ width: 1360, height: 768 });
      message.say(false, {
        embed: new this.client.utils.embed(message.author)
          .setTitleURL("Clique aqui para acessar o site!", args[0])
          .setImage("attachment://render.png"),
        files: [{
          attachment: await page.screenshot({ clip: { x: 0, y: 0, width: 1360, height: 768 }}),
          name: "render.png"
        }]
      });
      return await browser.close();
    } catch (e) {
      console.error(e)
      return message.say(true, "favor, digite um site que seja válido!");
    }
  }
};
