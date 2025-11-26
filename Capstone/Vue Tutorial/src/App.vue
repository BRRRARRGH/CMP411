<script setup>
import { ref, computed, onMounted } from 'vue'

// ref -->  W3 --> an alternative to methods in plain JavaScript like getElementById()
//          AI --> reactive primitive values && accessing DOM elements
//
// computed --> W3 --> Methods that output something depending on something else --> updated automatically, not when called on
//
// omMounted --> used when dealing with DOM properties -- in code, used to gain access to the window and button presses. 
//           --> onMounted basically occurs the moment that the DOM is set up
// 


// Initializes reactive primitave values
const wins = ref(0) 
const draws = ref(0)
const losses = ref(0)

//Additionally initializations
const choice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)

const outcomes = { //creates outcomes based on your and computer's choices
  rock: {
    rock: 'draw',
    paper: 'loss',
    scissors: 'win',
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'loss',
  },
  scissors: {
    rock: 'loss',
    paper: 'win',
    scissors: 'draw',
  }
}

//Method to calculate win percentage
const winPercentage = computed(() => {
  const total = wins.value + draws.value + losses.value // sets total to the value of all the hands
  return total ? (wins.value / total) * 100 : 0 //Return wins.value / total * 100 if total exists, otherwise return - 0
})


const play = c => {
  choice.value = c
  const choices = ['rock', 'paper', 'scissors']
  const random = Math.floor(Math.random() * choices.length)
  computerChoice.value = choices[random]

  const outcome = outcomes[c][computerChoice.value]

    if (outcome === 'win')
  {
    wins.value++
    verdict.value = 'You win!'
  } else if (outcome === 'loss')
  {
    losses.value++
    verdict.value = 'You Lose!'
  } else
  {
    draws.value++
    verdict.value = 'It is a draw.'
  }
  SaveGame()

}

//saves the state to local storage
const SaveGame = () => {
  localStorage.setItem('wins', wins.value)
  localStorage.setItem('draws', draws.value)
  localStorage.setItem('losses', losses.value)

}

//Loads the game from local storage, with 0s being accessed if no values are found
const LoadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins', wins.value)) || 0
  draws.value = parseInt(localStorage.getItem('draws', draws.value)) || 0
  losses.value = parseInt(localStorage.getItem('losses', losses.value)) || 0

}

//Resets the choices of you and the PC
const ResetRound = () => {
  choice.value = null
  computerChoice.value = null
  verdict.value = null
}

//Resets all local storage to 0, and then loads game
const resetCounters = () => {
  localStorage.setItem('wins', 0)
  localStorage.setItem('draws', 0)
  localStorage.setItem('losses', 0)
  LoadGame()
}

//Start of opening page
onMounted(() => {
  LoadGame() //load game

  //if "r" key is pressd, reset round
  window.addEventListener('keypress', e => {
    if (e.key === 'r')
  {
    ResetRound()
  }
  })
})
</script>

<template>
  <div class="bg-gray-700 text-white text-center min-h-screen flex flex-col">
    <header class="container mx-auto p-6">
      <h1 class="text-4x1 font-bold">Rock, Paper, Scissors</h1> <!-- header -->
    </header>

    <main class="container mx-auto p-6 flex-1"> <!-- Main -->
      <div v-if="choice === null" class="flex items-center justify-center -mx-6"> <!-- if player hasn't made a chioce yet -->

        <!-- Player can choose between rock, paper, or scissors by pressing on buttons -->
        <button @click="play('rock')"
          class="bg-white rounded-full shadow-lg w-64 p-12 mx-6
          transition-colors duration-300 hover:bg-pink-500">
          <img src="./assets/RockIcon.svg" alt="Rock" class="w-full" />
        </button>

        <button @click="play('paper')"
          class="bg-white rounded-full shadow-lg w-64 p-12 mx-6
          transition-colors duration-300 hover:bg-green-500">
          <img src="./assets/PaperIcon.svg" alt="Paper" class="w-full" />
        </button>

        <button @click="play('scissors')"
          class="bg-white rounded-full shadow-lg w-64 p-12 mx-6
          transition-colors duration-300 hover:bg-yellow-500">
          <img src="./assets/ScissorsIcon.svg" alt="Scissors" class="w-full" />
        </button>
      </div>
      
      <!-- If player has made a chioce -->
      <div v-else>
        <div class="text-3x1 mb-4">
          You picked <span class="text-pink-500">{{  choice  }}</span> <!-- Displays choice -->
        </div>

        <div class="text-3x1 mb-4">
          The Computer Picked <span class="text-green-500">{{  computerChoice  }}</span> <!-- Displays computer choice -->
        </div>

        <div class="text-6x1 mb-4">
          {{ verdict }} <!-- Displays who won -->
        </div>

        <button @click="ResetRound" class="bg-pink-500 text-lg py-2 px-4">Reset</button> <!-- Creates button to press if you want to reset round -->
      </div>

      <div class="mt-12 text-3x1 mb-4"> <!-- Displays win/loss/draw record -->
        {{ wins }} : {{ draws }} : {{ losses }}
      </div>

      <div class="text-lg">  <!-- Displays win percentage -->
        Win rate: {{ Math.round(winPercentage) }}%
      </div>
      <button @click="resetCounters()" class="bg-pink-500 text-lg py-2 px-4">Reset Totals</button> <!-- Creates button to reset totals -->
    </main>
  </div>

</template>

