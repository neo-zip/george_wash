import { SlashCommandBuilder } from 'discord.js';

export const templateHandler = async (interaction) => {

   return await interaction.reply({
      content: 'template',
      ephemeral: true
   });

}
const templateCommand = new SlashCommandBuilder()
   .setName('template')
   .setDescription('template')

export default templateCommand.toJSON();