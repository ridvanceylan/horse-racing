<template>
  <div>
    <div v-for="horse in currentHorses" :key="horse.id" class="track">
      <img
        class="horse"
        :src="`/src/assets/horse.svg`"
        :alt="'Horse ' + horse.id"
        :style="{
          left: horse.position + '%',
          transition: 'left 0.5s linear',
        }"
      />
      <span class="horse-name">{{ this.currentRound > 0 ? horse.name : '' }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      horsesPositions: [],
      raceInterval: null,
    }
  },
  computed: {
    ...mapGetters('race', ['raceSchedule', 'currentRound', 'raceResults']),
    currentHorses() {
      const round = this.raceSchedule[this.currentRound]
      return round
        ? round.horses.map((horse) => ({
            ...horse,
            position: this.horsesPositions.find((h) => h.id === horse.id)?.position || 0,
          }))
        : []
    },
    sortedHorses() {
      return [...this.currentHorses].sort((a, b) => b.position - a.position)
    },
    raceFinished() {
      return this.currentRound > 0 && this.horsesPositions.every((horse) => horse.position >= 90)
    },
  },
  methods: {
    ...mapActions('race', ['startRace', 'advanceRound', 'addRaceResult']),

    // Start or reset the race
    startRace() {
      if (this.raceInterval) {
        clearInterval(this.raceInterval) // Clear any existing interval
      }

      // Reset horses' positions
      this.horsesPositions = this.currentHorses.map((horse) => ({
        id: horse.id,
        position: 0,
      }))

      // Start the race and move horses
      this.raceInterval = setInterval(() => {
        this.moveHorses()
        if (this.checkRaceFinished()) {
          clearInterval(this.raceInterval)
          this.storeRaceResult()
          this.$store.dispatch('race/advanceRound')
        }
      }, 1000) // Adjust the interval time (1 second)
    },

    // Move horses randomly
    moveHorses() {
      this.horsesPositions.forEach((horse) => {
        horse.position += Math.random() * 10
        if (horse.position > 90) {
          horse.position = 90
        }
      })
    },

    // Check if the round is finished
    checkRaceFinished() {
      return this.horsesPositions.some((horse) => horse.position >= 90)
    },

    storeRaceResult() {
      const sortedResults = this.horsesPositions
        .map((horse) => {
          const horseData = this.currentHorses.find((h) => h.id === horse.id)
          return {
            horse: {
              id: horse.id,
              name: horseData?.name,
              position: horse.position,
            },
          }
        })
        .sort((a, b) => b.horse.position - a.horse.position)

      this.$store.dispatch('race/addRaceResult', {
        round: this.currentRound,
        results: sortedResults,
      })
    },
  },

  watch: {
    currentRound(newRound) {
      if (newRound > 0) {
        this.startRace()
      }
    },
  },
}
</script>

<style scoped>
.track {
  position: relative;
  height: 80px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: #f3f3f3;
  margin: 20px 0;
}

.horse {
  position: absolute;
  bottom: 5px;
  width: 65px;
  height: auto;
  text-align: center;
  line-height: 40px;
}

.horse-name {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: bold;
}
</style>
