async function getChecksumHash(tickets) {
  // concatenate all data into a single string with a newline character as a separator
  const input = [ ROUND, JACKPOT_CHANCE ].concat(tickets).join('\n');

  // convert the concatenated string to a Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // use the SubtleCrypto API to hash the data
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // convert the hash buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
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

const ROUND = 1
const JACKPOT_CHANCE = 1 // 1%

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
