import { ChannelType } from 'discord.js';
import { GUILD_ID, client } from '../index.js';

const exempt = ['1230240462648901643', '1221934153478443049']

export const channelRefreshAll = async () => {
   const guild = await client.guilds.fetch(GUILD_ID);
   await guild.channels.fetch();

   guild.channels.cache.forEach(async channel => {
      channelRefresh(channel);
   });
}

export const channelRefresh = async (channel) => {
   if (channel.type != ChannelType.GuildText) {
      return false;
   }

   if (exempt.includes(channel.parentId)) {
      return false;
   }

   const deleted = {
      guild: channel.guild,
      name: channel.name,
      type: channel.type,
      parentId: channel.parentId,
      position: channel.position,
   }

   await channel.delete().then(async () => {
      channel.guild.channels.create({
         name: deleted.name,
         type: deleted.type,
         parent: deleted.parentId,
         position: deleted.position,
         reason: 'Channel refresh.'
      });

      return true;
   }).catch((err) => {
      console.log('Could not delete: ' + channel.name, err);
      return false;
   })

   return false;
} 