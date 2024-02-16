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

const ROUND = 1
const JACKPOT_CHANCE = 1 // 1%

const PARTICIPANTS = [
  '0x375153c297b6ce68e3d786d39f8116383ad7da1a 197',
  '0xf05ad6fa4eeb4ea4b4bf950ec774862a9a201f4d 106',
  '0xa28707248ceb6270adf5f9160efa8c841541ef1e 77',
  '0x723b38bc97e16c0540ca31ef7da9f61a13a0f55a 35',
  '0x155ceafe157c9b3e14844cc5914ffe2e8b2dabc9 35',
  '0x639c5b883959f9a75eb0b3141afed97ad2522602 25',
  '0xc87c9648573e8fb51f4a0ac37ced2b31b6c89a14 22',
  '0xa0c4a76bfb402fc682939e6148c12ba9da64a376 19',
  '0x31c4cd7f037e298b77ca93626b08237127f0ebf6 18',
  '0xbd228cb420bd7adfe6341a63f265c273d1a5a9ea 9',
  '0xdb854089b974275911eb9d04d1a91f8e7b32da47 7',
  '0xa72115ded7a05510acc86447bde07ff56c7d85fe 6',
  '0x2afdc666ad7e02ca19b13dd32cedaf1b116a9f82 5',
  '0xa80d108695758cf58f7fe977c2d369ca947bc71d 2',
  '0xca09026ef62153d87ef6f2663974eb82fd54bb01 1',
  '0x82f1e8132ab50ba6247ca018de57192e1819261b 1',
  '0xf3573908a25e649a2ce1531c3a4147f2e79f9e50 1',
  '0xccccaf428d2734eb3cd3bbdd901304dd9d225ae8 1',
  '0xe793a31266402335a6995317cf52ed01d7f68c6d 1',
  '0x66dd26c69ea19738f1d10e16706f1bca0973ef6c 1',
  '0x8cf1bffbd3b94bd44f1cdf261f83af391114986f 1',
  '0x104a33513e903379de3693c93e1fbce3784c7758 1',
  '0xfeeb414d63fe02eef6d6fa68d1eaed54167f5312 1',
  '0x73f00211c28d8be69c182ee474d6f64476fd0dc3 1',
  '0x11df76d095c4639c6ff0310db5393498b1d6cd38 1',
  '0xc9c628e06fd9ca3d07b23cefd61b79a5658f85ff 1',
]

getRoundData()
  .then(({ tickets, checksumHash }) => {
    console.log('Tickets:')
    console.log(tickets.map((ticket, index) => `${index + 1}, ${ticket}`).join('\n'))
    console.log('\nChecksum Hash:')
    console.log(checksumHash)
  })
  .catch(error => console.error('Execution failed', error));
