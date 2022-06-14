import { once } from 'events'
import fs from 'fs'
import { default as fetch } from "node-fetch"

const MC_BASE_URL = 'https://api.mooncat.community'
const IMG_PATH = './resources/'
const IMG_NAME = 'cat.png'

/**
 * Pulls cat image from API and saves it as file
 * @param {string} id 
 * @returns file destination {path, name}
 */
export async function getCatImage(id) {
  try {
    const res = await fetch(`${MC_BASE_URL}/image/${id}`)
    if (!fs.existsSync(IMG_PATH)) fs.mkdirSync(IMG_PATH);
    const stream = fs.createWriteStream(IMG_PATH + IMG_NAME);
    res.body.pipe(stream);
    await once(stream, 'finish')
    return {
      path: IMG_PATH,
      name: IMG_NAME
    }

  } catch (err) {
    console.log(err.message); //can be console.error
  }
}

export async function getCatTraits(id) {
  try {
    const res = await fetch(`${MC_BASE_URL}/traits/${id}`)
    return res.json()

  } catch (err) {
    console.log(err.message); //can be console.error
  }
}