const crypto = require('crypto')
const getTickets = require('./get-tickets')

async function getChecksumHash(
  ROUND_NUM,
  JACKPOT_WIN_CHANCE,
  tickets,
) {
  // concatenate all data into a single string with a newline character as a separator
  const input = [ String(ROUND_NUM), String(JACKPOT_WIN_CHANCE) ].concat(tickets).join('\n');

  // create a SHA-256 hash object
  const hash = crypto.createHash('sha256');

  // update the hash object with the input string, using UTF-8 encoding
  hash.update(input, 'utf8');

  // calculate the hash digest as a hexadecimal string
  return hash.digest('hex');
}

module.exports = async function getRoundData(
  ROUND_NUM,
  JACKPOT_WIN_CHANCE,
  PARTICIPANTS,
) {
  // transform participants list to tickets list
  const tickets = getTickets(PARTICIPANTS)

  const checksumHash = await getChecksumHash(
    ROUND_NUM,
    JACKPOT_WIN_CHANCE,
    tickets
  )

  return {
    tickets,
    checksumHash,
  }
}
