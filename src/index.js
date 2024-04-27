import { config } from 'dotenv';
import {
   Client,
   Events,
   GatewayIntentBits,
   Routes,
} from 'discord.js';
import { REST } from '@discordjs/rest';
import pingCommand, { pingHandler } from './commands/cabnit/ping.js'
import refreshCommand, { refreshHandler } from './commands/cabnit/refresh.js

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.BOT_CLIENT_ID;
export const GUILD_ID = process.env.DEFAULT_GUILD_ID;

export const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers
   ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () =>
   console.log(`
╭───────────────────────────────────────╮
│                     \t\t\t│
│      Started ${client.user.displayName}! v${process.env.VERSION}\t│
│      (/)  refreshing\t\t\t│
│      (DB) refreshing\t\t\t│
│                     \t\t\t│
╰───────────────────────────────────────╯
`)
);

client.on('messageCreate', async (message) => {
   if (message.author.bot || message.mentions.users.size === 0) {
      return;
   }

   if (!message.mentions.users.has(client.user.id)) {
      return;
   }

   const responses = [
      'Glory to  the UCD!',
      'Glory to  the free world!',
      'Glory to  the democracy!',
   ]

   await message.reply(responses[Math.floor(Math.random() * responses.length)]);
});

client.on(Events.InteractionCreate, async (interaction) => {
   if (interaction.isButton()) {
      return factionButtonsHandler(interaction);
   }

   switch (interaction.commandName) {

      case 'ping':
         return pingHandler(interaction);

      case 'refresh':
         return refreshHandler(interaction);

      default:
         return await interaction.reply({
            content: 'There was an error running this command or it was not found. Contact an admin.',
            ephemeral: true
         })
   }
});

const Main = async () => {
   const commands = [
      pingCommand,
      refreshCommand,
   ];

   try {

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
         body: commands,
      });
      client.login(TOKEN);
      db.register();

   } catch (err) {
      console.error(err);
   }

   // setInterval(() => {
   //    channelRefreshAll();
   // }, 1000 * 60 * 60 * 24)
}

Main();