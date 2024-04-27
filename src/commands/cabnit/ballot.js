import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const ballotHandler = async (interaction) => {

   return await interaction.reply({
      content: 'ballot',
      ephemeral: true
   });

}
const ballotCommand = new SlashCommandBuilder()
   .setName('ballot')
   .setDescription('starts a new ballot')
   .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export default ballotCommand.toJSON();