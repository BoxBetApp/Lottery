const getTickets = require('./get-tickets')

// Initialize an empty array to keep track of regular lottery winners
const regularLotteryWinners = []

const getBlankTicketCount = (JACKPOT_WIN_CHANCE, ticketCount) => {
  return ticketCount * (100 - JACKPOT_WIN_CHANCE)
}

function getJackpotLotteryWinner(JACKPOT_WIN_CHANCE, RANDOM_WORD, ticketCount) {
  const blankTicketCount = getBlankTicketCount(JACKPOT_WIN_CHANCE, ticketCount)
  const totalTicketCount = ticketCount + blankTicketCount

  console.log('\nJackpot Ticket Count:')
  console.log(totalTicketCount)

  return parseInt(RANDOM_WORD) % (totalTicketCount) + 1
}

function recreateRandomWord(randomWord) {
  console.log('WORD WAS RECREATED!')

  randomWord = randomWord.slice(1) + randomWord.charAt(0)

  // Recursively call itself if the first character is '0' to ensure the resulting word doesn't start with '0'
  if (randomWord.charAt(0) === '0') {
    return recreateRandomWord(randomWord)
  }

  return randomWord
}

function getRegularLotteryWinner(RANDOM_WORD, ticketCount) {
  // Get winner ticket number
  let winner = parseInt(RANDOM_WORD) % ticketCount + 1

  // If the calculated winner has already won, manipulate the random word and recalculate
  if (regularLotteryWinners.includes(winner)) {
    RANDOM_WORD = recreateRandomWord(RANDOM_WORD)
    winner = getRegularLotteryWinner(RANDOM_WORD)
  }
  else {
    regularLotteryWinners.push(winner)
  }

  return winner
}

module.exports = function getWinners(
  JACKPOT_WIN_CHANCE,
  PARTICIPANTS,
  RANDOM_WORDS,
) {
  const tickets = getTickets(PARTICIPANTS)
  const ticketCount = tickets.length

  console.log('\nRegular Ticket Count:')
  console.log(ticketCount)

  const regularWinners = [
    getRegularLotteryWinner(RANDOM_WORDS[0], ticketCount),
    getRegularLotteryWinner(RANDOM_WORDS[1], ticketCount),
    getRegularLotteryWinner(RANDOM_WORDS[2], ticketCount),
    getRegularLotteryWinner(RANDOM_WORDS[3], ticketCount),
    getRegularLotteryWinner(RANDOM_WORDS[4], ticketCount)
  ]
    .sort((a, b) => a - b)
    .map((ticketNum) => {
      return `${ticketNum}, ${tickets[ticketNum - 1]}`
    })

  const jackpotWinner = getJackpotLotteryWinner(
    JACKPOT_WIN_CHANCE,
    RANDOM_WORDS[5],
    ticketCount
  )

  console.log('\nRegular Lottery Winners:')
  console.log(regularWinners.join('\n'))
  console.log('\nJackpot Lottery Winner:')
  console.log(`${jackpotWinner}, ${jackpotWinner > ticketCount ? `blank ticket (no winner)` : tickets[jackpotWinner - 1]}`)
}
