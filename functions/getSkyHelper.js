const axios = require('axios');
const { getNetworth } = require('skyhelper-networth');
require("dotenv").config();
const apiKey = process.env.HYPIXEL_API_KEY;

const cache = {};

const fetchMuseumData = async (profile, uuid) => {
   const url = `https://api.hypixel.net/v2/skyblock/museum?key=${apiKey}&profile=${profile}`;
   const cacheKey = `museum_${profile}_${uuid}`;
   if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 120000)) {
      return cache[cacheKey].data;
   }

   try {
      const response = await axios.get(url)
      const museumData = response.data.members[uuid];

      if (!museumData || !museumData.value) {
         return null;
      }

      cache[cacheKey] = {
         data: museumData,
         timestamp: Date.now()
      };

      return museumData;
   } catch (error) {
      return null;
   }
};

const fetchProfileData = async (uuid) => {
   const url = `https://api.hypixel.net/v2/skyblock/profiles?key=${apiKey}&uuid=${uuid}`;
   const cacheKey = `profile_${uuid}`;
   if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 120000)) {
      return cache[cacheKey].data;
   }

   try {
      const response = await axios.get(url);
      const profiles = response.data.profiles;

      const selectedProfile = profiles.find(profile => profile.selected && profile.members[uuid]);

      if (!selectedProfile) {
         console.error('Selected profile data not found or does not contain members:', response.data);
         return null;
      }

      const bankBalance = selectedProfile.banking?.balance || null;

      const result = {
         memberData: selectedProfile.members[uuid],
         bankBalance: bankBalance
      };

      cache[cacheKey] = {
         data: result,
         timestamp: Date.now()
      };

      return result;
   } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
   }
};

const getSkyHelper = async (profile, uuid) => {
   const { memberData, bankBalance } = await fetchProfileData(uuid);
   const museumData = await fetchMuseumData(profile, uuid);

   const networth = await getNetworth(memberData, bankBalance, { v2Endpoint: true, museumData });
   return { networth };
}

module.exports = { getSkyHelper };