const getTickets = require('./get-tickets')

// Initialize an empty array to keep track of regular lottery winners
const regularLotteryWinners = []

function getJackpotLotteryWinner(JACKPOT_WIN_CHANCE, RANDOM_WORD, ticketCount) {
  const winner = parseInt(RANDOM_WORD) % (ticketCount * 100 / JACKPOT_WIN_CHANCE) + 1

  // If the calculated winner number exceeds the ticketCount, return 'no winner' indicating no winner, otherwise return the winner number
  return winner > ticketCount ? 'No Winner' : winner
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

  console.log('Regular Lottery Winners:')
  console.log(regularWinners.join('\n'))
  console.log('\nJackpot Lottery Winner:')
  console.log(jackpotWinner)
}
