<template>
  <div>
    <button @click="generateRaceSchedule" class="btn btn-primary m-2">Generate Program</button>
    <button
      @click="handleStartOrReset"
      :class="['btn m-2', raceFinished ? 'btn-info' : 'btn-success']"
    >
      {{ raceFinished ? 'Reset' : 'Start' }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('race', ['currentRound', 'raceSchedule', 'isRaceInProgress']),
    raceFinished() {
      return this.currentRound >= this.raceSchedule.length
    },
  },
  methods: {
    ...mapActions('race', ['generateRaceSchedule', 'startRace', 'resetRace']),
    handleStartOrReset() {
      if (this.raceFinished) {
        this.resetRace()
      } else {
        this.startRace()
      }
    },
  },
}
</script>
