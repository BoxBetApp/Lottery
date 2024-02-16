// Initialize an empty array to keep track of regular lottery winners
const regularLotteryWinners = []

function getJackpotLotteryWinner(randomWord) {
  const winner = parseInt(randomWord) % (TICKET_COUNT * 100 / JACKPOT_CHANCE) + 1

  // If the calculated winner number exceeds the TICKET_COUNT, return 'no winner' indicating no winner, otherwise return the winner number
  return winner > TICKET_COUNT ? 'no winner' : winner
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

function getRegularLotteryWinner(randomWord) {
  let winner = parseInt(randomWord) % TICKET_COUNT + 1

  // If the calculated winner has already won, manipulate the random word and recalculate
  if (regularLotteryWinners.includes(winner)) {
    randomWord = recreateRandomWord(randomWord)
    winner = getRegularLotteryWinner(randomWord)
  }
  else {
    regularLotteryWinners.push(winner)
  }

  return winner
}

async function getWinners() {
  // Return an array of winners by calculating regular and jackpot winners using the provided random words
  return {
    regular: [
      getRegularLotteryWinner(VRF_V2_RANDOM_WORDS[0]),
      getRegularLotteryWinner(VRF_V2_RANDOM_WORDS[1]),
      getRegularLotteryWinner(VRF_V2_RANDOM_WORDS[2]),
      getRegularLotteryWinner(VRF_V2_RANDOM_WORDS[3]),
      getRegularLotteryWinner(VRF_V2_RANDOM_WORDS[4])
    ].sort((a, b) => a - b),
    jackpot: getJackpotLotteryWinner(VRF_V2_RANDOM_WORDS[5]),
  }
}

/* *********************************************** */

const TICKET_COUNT = 55
const JACKPOT_CHANCE = 1 // 1%

// Sample array of random words used for determining lottery winners
const VRF_V2_RANDOM_WORDS = [
  '56349687540706602234275904854527788749025086370315707978939164348580928652502',
  '43270462519463765841868920552994843177368265002418015802309341390592245252470',
  '53857022786106096634940287759700761254868386890629383751327659383410717965556',
  '3926958926697983850877671245568307671681691565110505156134955204281375786976',
  '78161677672696030082084694841675884267560559752625629453581539027796816634003',
  '34540108220729456161181623813487922667149789418522953442082516959463719850557'
]

getWinners()
  .then(({ regular, jackpot }) => {
    console.log('Regular Lottery Winners:')
    console.log(regular.join(', '))
    console.log('\nJackpot Lottery Winner:')
    console.log(jackpot)
  })
  .catch(error => console.error('Execution failed', error));
