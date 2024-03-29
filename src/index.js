const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const config = require('../config.js');
const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds,Discord.GatewayIntentBits.GuildMembers,Discord.GatewayIntentBits.GuildMessages,Discord.GatewayIntentBits.GuildMessageReactions,Discord.GatewayIntentBits.MessageContent,Discord.GatewayIntentBits.GuildInvites,],partials: [Discord.Partials,Discord.Partials.Message,Discord.Partials.GuildMember,Discord.Partials.ThreadMember,Discord.Partials.Reaction,Discord.Partials.GuildScheduledEvent,]});
const { ActivityType, Events, Collection, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

client.commands = new Collection();
const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
(async () => {for (file of functions) {require(`./functions/${file}`)(client);}
console.log(chalk.green('[Discord API] Commands loaded.'));
console.log(chalk.green('[Discord API] Events loaded.'));

client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");
client.login(config.token)
})();