const MC_PRO_BASE_URL = 'https://mooncat.pro'
const OS_BASE_URL = 'https://opensea.io/assets/ethereum/0xc3f733ca98e0dad0386979eb96fb1722a1a05e69'

export class Traits {
  constructor(json) {
    this.description = json.description
    this.details = json.details
    this.attributes = convertArrayToObject(json.attributes, 'trait_type', 'value')
  }

  getTitle() {
    if (!this.isMinted()) return this.details.catId

    let res = []
    if (this.isNamed()) res.push(this.details.name)
    res.push('#' + this.details.rescueIndex, this.details.catId)
    return res.join(' - ')
  }

  getDescription() {
    return this.description.substring(0, this.description.indexOf("[")).slice(0, -1)
  }

  getMoonCatProUrl() {
    if (this.isMinted()) return `${MC_PRO_BASE_URL}/${this.details.catId}`
  }

  getOpenSeaUrl() {
    if (this.isAcclimated()) return `${OS_BASE_URL}/${this.details.rescueIndex}`
  }

  isMinted() {
    return ['rescue', 'genesis'].includes(this.details.classification)
  }

  isAcclimated() {
    return this.isMinted() && this.details.isAcclimated
  }

  isNamed() {
    return this.isMinted() && this.details.name !== null
  }
}

function convertArrayToObject(array, key, val) {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item[val],
    };
  }, initialValue);
};