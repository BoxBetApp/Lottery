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

const TICKET_COUNT = 575
const JACKPOT_CHANCE = 1 // 1%

// Sample array of random words used for determining lottery winners
const VRF_V2_RANDOM_WORDS = [
  '18870619766951287426960203588716995420703703721329150959705987051987933799643',
  '91361993820357640753271286920826995265014532081008101160253341183835615763813',
  '47462412788178475656478169058123181444033805159159656593408466857207002192229',
  '37543695694015661983423782456152752777950108355036110935416709504310175312309',
  '86784809472028015905122849016452865719015670677652479393341527619105263169525',
  '25898368865317194092684795208066735595040290999004163574303889649378234504801',
]

getWinners()
  .then(({ regular, jackpot }) => {
    console.log('Regular Lottery Winners:')
    console.log(regular.join(', '))
    console.log('\nJackpot Lottery Winner:')
    console.log(jackpot)
  })
  .catch(error => console.error('Execution failed', error));
