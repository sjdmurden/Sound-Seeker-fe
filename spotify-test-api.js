const axios = require('axios')

export async function getArtistInfo(artist_id) {
   console.log('start of api func');
   return axios
      .get("https://sound-seeker.onrender.com/api/users/8bks0ji4pz8nny17ddas1c939")
      .then(({data: {user}}) => {
         console.log('here');
         return user.access_token
      })
      .then((token) => {
         return axios.get(`https://api.spotify.com/v1/artists/${artist_id}`, {
          params: { limit: 50, offset: 0 },
          headers: {
            Authorization: "Bearer " + token
          },
        })
      })
     .then(({ data }) => {
      console.log(data);
       return items;
     });
 }
