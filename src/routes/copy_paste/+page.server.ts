 import nano from 'nano';
 import type { PageServerLoad } from '../$types';

 export const load = (async ({ params }) => {
  console.log("hallo von dem backend")
  const nano_instance = nano("http://admin:marvinpw!@127.0.0.1:5984")
  console.log(nano_instance);
  

  await nano_instance.db.create('alice', { n: 3 })
  const info = await nano_instance.db.get('alice')

  return {key:info}
 
      
    
}) satisfies PageServerLoad;
 
