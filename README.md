# BXBT Lottery

This documentation outlines the lottery draw process, ensuring transparency and fairness through the use of verifiable random functions and clear, step-by-step procedures.

### Smart Contract

https://polygonscan.com/address/0x3b5980efB4303dc20F31E55435a942034Fb78DB7#code

### Drawing Process Overview

The drawing process resembles a lottery involving a reel. Each ticket, bearing the player's wallet address, represents a chance to win. These tickets are collected, thoroughly mixed, and then five are drawn sequentially. The owners of the selected tickets are declared the winners. It's possible for multiple tickets from the same player to be selected as winning entries.

For the jackpot, which has a 1% winning probability, we adjust the process to maintain fairness. Specifically, we add `NUMBER OF TICKETS * 100 / CHANCE OF WINNING` blank tickets to the mix. From this enhanced pool, a single ticket is drawn. An empty ticket indicates that there is no jackpot winner in that round.

### Ensuring Fair Randomness

To guarantee fair randomness in the draw, we utilize Chainlink's Verifiable Random Function (VRF) within the Polygon network. This method involves requesting six random values from Chainlink. Each of these values is then used to determine the winners: the first five for the regular draw winners and the final one specifically for the jackpot draw.

### Winner Selection Method

A random value from Chainlink is a large, randomly generated number. To find a winner, we divide this number by the total ticket count, using the remainder as the winner's index. The formula for regular draws is `RANDOM_WORD % TICKET_COUNT + 1`. For the jackpot, due to the adjusted pool size, the formula is modified to `RANDOM_WORD % (TICKET_COUNT * 100 / JACKPOT_CHANCE) + 1`.

### Lottery Draw Stages

<ins>Player List Compilation:</ins> Gather a list of participants holding at least one ticket. This list includes each address and the corresponding ticket count. For example:

```
Address                     Number of Tickets

0x0000000000000000000000000000000000000001 10
0x0000000000000000000000000000000000000002 15
0x0000000000000000000000000000000000000003 30
```

<ins>Round Data Preparation:</ins> Utilize the `get-round-data.js` script to process the player list into round-specific data, including a comprehensive list of participating tickets and a data checksum. This checksum includes the round number, ticket list, and jackpot winning chance. For example, the data might look like this:

```
Tickets:

1, 0x0000000000000000000000000000000000000001
2, 0x0000000000000000000000000000000000000001
...
55, 0x0000000000000000000000000000000000000003

Checksum Hash:

e947a2d3d9b89129c2bfc55406a87db097bfedd3f51bb40204566db338956ee1
```

<ins>Randomness Request:</ins> Issue a request to generate the random "words" needed for the draw.

Winner Identification: Execute the "get-winners.js" script with the received random values to determine the winners. The output includes both regular and jackpot draw results. For instance:

```
Regular Lottery Winners:

46, 53, 34, 28, 3

Jackpot Lottery Winner:

No Winner
```
