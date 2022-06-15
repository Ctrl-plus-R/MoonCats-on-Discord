# MoonCat Query Discord Bot

This is a Discord bot which replies to user messages with an embed containing information and a picture of the requested MoonCat.

## Requirements

Create a [Discord bot](https://discord.com/developers/applications/) and connect it with your Discord server.
Required permissions:
* Send Messages
* Embed Links
* Attach Files
* Read Message History

## Setup

1. Install node
2. run `npm install`
3. Create .env file in root with content: `DISCORD_TOKEN=${YOUR_TOKEN}`
4. run `npm start` (or `npm run dev` to have nodemon activated)

## Accepted Message Format

The bot answers messages with the prefix `#` followed by a valid `rescue index` or `cat ID`.\
Examples: `#12345`, `#0x0012345678`
