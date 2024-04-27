import { v4 } from 'uuid';
import { client } from './index.js';
import { QuickDB } from 'quick.db';

export const database = new QuickDB().table('storage');

export class Database {
   constructor() {
      this.items = database;
   }

   search = async (match, withID) => {
      const db = await database.all();
      let found = null;

      for (let i = 0; i < db.length; i++) {
         if (db[i].value.name.toLowerCase() === match.toString().toLowerCase()) {
            found = db[i];
            break;
         }
      }

      if (withID) {
         return found;
      }

      return found?.value;
   }

   getAll = async () => {
      return await database.all()
   }

   get = async (key) => {
      return await database.get(key)
   }

   add = async (data) => {
      const key = v4();

      if (!data.name || !data.description || !data.joinURL || !data.imgURL || !data.roleID) {
         console.error('Add call is missing a value')
         console.error(data)
         return;
      }

      await database.set(key, {
         id: key,
         timestamp: Date.now(),
         name: data.name,
         description: data.description,
         joinURL: data.joinURL,
         imgURL: data.imgURL,
         roleID: data.roleID,
      });
   }

   delete = async (key) => {
      const guild = client.guilds.cache.get(process.env.DEFAULT_GUILD_ID);
      const role = guild.roles.cache.get(key.value.roleID);

      if (!role) {
         console.error('Role to delete was not found.')
         return;
      }

      try {
         await role.delete();
      } catch (err) {
         console.error(err);
      }

      await database.delete(key.id);
   }

   register = async () => {
      const temp = database.all();

      for (let i = 0; i < temp.length; i++) {

         if (!await database.has(temp[i].id)) {
            addDB(temp[i].id, temp[i])
         }

      }
   }
}