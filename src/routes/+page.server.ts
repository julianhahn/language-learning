import nano from 'nano'
export const load =(async()=>{
  const nano_instance = nano("http://admin:marvinpw!@127.0.0.1:5984")
  try {
      const response = await nano_instance.db.create('marvin')
      return(response)
    } catch (e) {
      // failed
      return (e)
      
    }
})

