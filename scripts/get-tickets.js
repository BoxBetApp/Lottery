module.exports = function getTickets(PARTICIPANTS) {
  return PARTICIPANTS.map(participant => {
    const [ address, ticketCount ] = participant.trim().split(' ')
    return new Array(+ticketCount).fill(address)
  }).flat()
}
