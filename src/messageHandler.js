import { MessageEmbed } from "discord.js"
import { getCatImage, getCatTraits } from "./mooncatEndpoint.js"
import { Traits } from "./traits.js"

const PREFIX = '#'

const MAX_RESCUE_INDEX = 25439

export async function processMessage(msg) {
  if (!msg.content.startsWith(PREFIX)) return

  let content = msg.content.substring(PREFIX.length)//.toLowerCase()

  if (isValidCatId(content) || isValidRescueIndex(content)) {
    // Get Image
    let img = await getCatImage(content)
    if (img === undefined) return

    // Get Traits
    let traits = new Traits(await getCatTraits(content))

    // Create Embedding
    let catEmbed = getCatEmbed({
      title: traits.getTitle(),
      description: traits.getDescription(),
      img: `attachment://${img.name}`,
      infoUrl: traits.getMoonCatProUrl(),
      storeUrl: traits.getOpenSeaUrl()
    })
    
    // Send Embedding
    msg.channel.send({embeds: [catEmbed], files: [img.path + img.name]})
  }
}

function getCatEmbed({ title, description, img, infoUrl, storeUrl }) {
  let embed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle(title)
    .setDescription(description)
    .setImage(img)
  if (infoUrl || storeUrl) {
    let fieldName = 'Find out more'
    let fieldValues = []
    if (infoUrl) fieldValues.push(`[mooncat.pro](${infoUrl})`)
    if (storeUrl) fieldValues.push(`[OpenSea](${storeUrl})`)
    embed.addField(fieldName, fieldValues.join(', '))
  }
  return embed
}

function isValidRescueIndex(str) {
  return typeof str === 'string'
    && str.length <= String(MAX_RESCUE_INDEX).length
    && /^\d+$/.test(str)
    && parseInt(str) <= MAX_RESCUE_INDEX
}

function isValidCatId(str) {
  return /^0x00[a-fA-F0-9]{8}$/i.test(str) // rescue + lunar
    || /^0xff[a-fA-F0-9]{2}0{3}ca7$/i.test(str)
}