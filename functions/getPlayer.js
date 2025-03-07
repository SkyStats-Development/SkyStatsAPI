const axios = require('axios');
const key = process.env.HYPIXEL_API_KEY;
const { handleError } = require('../functions/handleError');

const cache = {};

async function getPlayer(uuid) {
  const cacheKey = `player_${uuid}`;
  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 120000)) {
    return cache[cacheKey].data;
  }

  try {
    const { data: { data: { player } } } = await axios.get(`https://playerdb.co/api/player/minecraft/${uuid}`);
    const { username, raw_id: uuid2 } = player;
    const [playerRes, profileRes] = await Promise.all([
      axios.get(`https://api.hypixel.net/v2/player?key=${key}&uuid=${uuid2}`),
      axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${uuid2}`)
    ]);
    if (playerRes.status !== 200 || profileRes.status !== 200) {
      throw new Error(`Error getting player or profile data.`);
    }
    const playerData = playerRes?.data;
    const profileData = profileRes?.data?.profiles?.find((a) => a.selected);
    const profile = profileData?.members[uuid2];
    const { cute_name: profilename, profile_id: profileid } = profileData;
    const result = { uuid2, username, profilename, profileid, playerData, profileData, profile };

    cache[cacheKey] = {
      data: result,
      timestamp: Date.now()
    };

    return result;

  } catch (error) {
    const errorMessage = handleError(error)
    return {
      error: errorMessage
    };

  }
}
module.exports = { getPlayer };