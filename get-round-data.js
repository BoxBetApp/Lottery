console.log('Tickets:')
console.log(tickets.map((ticket, index) => `${index + 1}, ${ticket}`).join('\n'))
console.log('\nChecksum Hash:')
console.log(checksumHash)
const { tickets, checksumHash } = await getRoundData(
  ROUND_NUM,
  JACKPOT_WIN_CHANCE,
  PARTICIPANTS,
)
