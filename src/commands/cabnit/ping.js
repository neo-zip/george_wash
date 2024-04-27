import { SlashCommandBuilder } from 'discord.js';
import { client } from '../../index.js';

export const pingHandler = async (interaction) => {

   return await interaction.reply({
      content: `🏓 API Latency is ${Math.round(client.ws.ping) + 1}ms`,
      ephemeral: true
   });

}
const pingCommand = new SlashCommandBuilder()
   .setName('ping')
   .setDescription('Fetches ping of the bot.')

export default pingCommand.toJSON();