import { SlashCommandBuilder } from 'discord.js';
import { channelRefresh, channelRefreshAll } from '../../util/channelRefresh.js';


export const refreshHandler = async (interaction) => {
   const all = await interaction.options.getBoolean('all');


   if (all) {
      channelRefreshAll();

      return await interaction.reply({
         content: 'okay, wiping all of the evidence.',
         ephemeral: true
      });
   }

   const res = channelRefresh(interaction.channel);

   if (!res) {
      return await interaction.reply({
         content: 'couldn\'t wipe the evidence. this category is probably exempted.',
         ephemeral: true
      });
   }

   return await interaction.reply({
      content: 'okay, wiping the evidence.',
      ephemeral: true
   });

}
const refreshCommand = new SlashCommandBuilder()
   .setName('refresh')
   .setDescription('Refreshes a channel.')
   .addBooleanOption(option => option
      .setName('all')
      .setDescription('Refresh all channels other than exempt ones.'))

export default refreshCommand.toJSON();