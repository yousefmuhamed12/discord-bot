// Load environment variables FIRST
require("dotenv").config();

const { 
  Client, 
  GatewayIntentBits, 
  Events 
} = require("discord.js");

// Validate token early
if (!process.env.DISCORD_TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing. Check your .env file.");
  process.exit(1);
}

// Create client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Fired once when bot is ready
client.once(Events.ClientReady, (client) => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Fired on every message
client.on(Events.MessageCreate, (message) => {
  // Ignore bots (including itself)
  if (message.author.bot) return;

  // 1️⃣ Define Q&A triggers
  const responses = {
    "who are you?": "Meng, the gacha gamer who somehow rolls every banner like they’ve got a cheat code installed. Five SSRs in one ten-pull? That’s normal for them. Rare limited characters? Already maxed. Meng will open a banner and mutter, 'I just have impeccable timing,' like the universe handing them every 5★ is somehow a flaw in everyone else’s technique. Meanwhile, the rest of us are grinding pity counters, sacrificing our sanity, and still only getting three stars and a rusty sword. But Meng? They’ll deny luck so hard, you’d think RNGesus himself is just their unpaid assistant.",
    "hello": "Hi there! Fuck mengo!",
    "how are you": "I am just a bot, but Fuck mengo! 😄",
    "mengo" : "mengo? fuck mengo"
  };

  // Normalize message
  const normalized = message.content.toLowerCase().trim();

  // 2️⃣ Check for trigger responses
  if (responses[normalized]) {
    message.reply(responses[normalized]);
    return; // Stop further processing
  }
  // 3️⃣ Role-specific reply: if the author has the target role
  const targetRoleName = "Meng el 3ars";
  if (message.member?.roles.cache.some(role => role.name === targetRoleName)) {
    message.reply("Sybau gng no one cares :wilted_rose: :pray: ");
    return; // stop further processing for role-holders
  }

  // 4️⃣ Check if bot was mentioned (special-case and fallback)
  if (message.mentions.has(client.user)) {
    if (message.author.username === "Naivera") {
      message.reply("I see you :7287based: ");
    } else {
      message.reply("Fuck mengo");
    }
  }
});


// Login
client.login(process.env.DISCORD_TOKEN)
  .catch((err) => {
    console.error("❌ Failed to login:", err.message);
    process.exit(1);
  });
