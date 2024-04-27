import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { database } from '../../database';
import { v4 } from 'uuid';

export const ballotHandler = async (interaction) => {
   database.set(v4(), {

   })

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