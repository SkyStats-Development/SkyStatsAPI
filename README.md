# SkyHelper API

A hypixel skyblock API wrapper containing most features that the [SkyHelper](https://top.gg/bot/710143953533403226) bot has to offer.

This API was made using the [Hypixel SkyBlock Facade](https://github.com/Senither/hypixel-skyblock-facade), [SkyCrypt](https://github.com/SkyCryptWebsite/SkyCrypt) and [Maro API](https://github.com/zt3h/MaroAPI).

# Installing

### Requirements:

Node.js >= 14

### Setup:

1. Clone the repository using
   `git clone https://github.com/Altpapier/SkyHelperAPI.git`

2. Install all dependencies using NPM by going into the `SkyHelperAPI` folder
   `npm install`

3. Set up the environment variables

4. Start the API using `node .` or `npm start`

### Environment Variables

Rename the `example.env` file to `.env`

The Port normally defaults to `3000`. If you want to change that, you can do so by changing the `PORT` environment variable.

You will have to set the Hypixel API key by adding the `HYPIXEL_API_KEY` environment variable.

To be able to use the API you will need to define your own API keys. For that add the `TOKENS` environment variable and add tokens seperated by a `,`
Example: `token1,token2`

The API automatically updates upon starting. If you wish to not have that feature, change the `AUTO_UPDATE` environment variable to `false`

# Endpoints:

### `POST` /v2/networth

Request Body:
| Field | Type | Description |
| ----- | ---- | ----------- |
| profileData | Object | The profile player data from the Hypixel API (profile.members[uuid]) |
| bankBalance | Number | The player's bank balance from the Hypixel API (profile.banking?.balance) |
| onlyNetworth | Boolean | (default: false) If true, only the networth will be returned |

### `POST` /v2/networth/item

Request Body:
| Field | Type | Description |
| ----- | ---- | ----------- |
| itemData | Object | The parsed item data of an item from the profiles endpoint |

### `GET` /v2/profiles/:user

### `GET` /v2/profile/:user/:profile

### `GET` /v1/profiles/:user

### `GET` /v1/profile/:user/:profile

### `GET` /v1/fetchur

| Parameter | Description                                |
| --------- | ------------------------------------------ |
| user      | This can be the UUID of a user or the name |
| profile   | This can be the users profile id or name   |

**Documentation**: https://api.altpapier.dev

# Credit:

-   https://github.com/zt3h/MaroAPI

-   https://github.com/Senither/hypixel-skyblock-facade

-   https://github.com/SkyCryptWebsite/SkyCrypt
