const crypto = require('crypto')

async function getChecksumHash(tickets) {
  // concatenate all data into a single string with a newline character as a separator
  const input = [ String(ROUND), String(JACKPOT_CHANCE) ].concat(tickets).join('\n');

  // create a SHA-256 hash object
  const hash = crypto.createHash('sha256');

  // update the hash object with the input string, using UTF-8 encoding
  hash.update(input, 'utf8');

  // calculate the hash digest as a hexadecimal string
  return hash.digest('hex');
}

async function getRoundData() {
  // transform participants list to tickets list
  const tickets = PARTICIPANTS.map(participant => {
    const [ address, ticketCount ] = participant.trim().split(' ')
    return new Array(+ticketCount).fill(address)
  }).flat()

  const checksumHash = await getChecksumHash(tickets)

  return {
    tickets,
    checksumHash,
  }
}

/* *********************************************** */

const ROUND = 999
const JACKPOT_CHANCE = 1 // 1%

// use data from a round.md file, each row should be "address ticket_count"
const PARTICIPANTS = [
  '0x0000000000000000000000000000000000000001 10',
  '0x0000000000000000000000000000000000000002 15',
  '0x0000000000000000000000000000000000000003 30',
]

getRoundData()
  .then(({ tickets, checksumHash }) => {
    console.log('Tickets:')
    console.log(tickets.map((ticket, index) => `${index + 1}, ${ticket}`).join('\n'))
    console.log('\nChecksum Hash:')
    console.log(checksumHash)
  })
  .catch(error => console.error('Execution failed', error));
